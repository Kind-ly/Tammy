import OpenAI from 'openai'

import { getTasks } from 'src/functions/getTasksForPatientOnDate/getTasksForPatientOnDate'
import { logger } from 'src/lib/logger'
import { getSchedulePrompt } from 'src/lib/prompts'

const openai = new OpenAI()

async function getResponse({ transcript, deviceId }) {
  // TODO: get the patient ID as a parameter – currently hard-coded in the prompt
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: getSchedulePrompt },
      { role: 'user', content: { transcript, deviceId } },
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'getPatientDetails',
          description:
            "Get the details about a patient using a particular device, including their ID, their name, their medical condition, caregivers' details, and the patient's current date and time. Call this first to get the patient ID and whenever you need additional context about the patient.",
          strict: false,
          parameters: {
            type: 'object',
            required: ['id'],
            properties: {
              id: {
                type: 'integer',
                description: 'The device ID.',
              },
            },
            additionalProperties: false,
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'tasksForPatientOnDate',
          description:
            "Get the schedule for a patient on a specific date. This will be a list of tasks that the patient should complete at specific times. Call this whenever you need to know the patient's schedule, for example when a patient asks 'What do I have to do today'",
          parameters: {
            type: 'object',
            required: ['id', 'date'],
            properties: {
              id: {
                type: 'string',
                description: 'The patient ID.',
              },
              date: {
                type: 'string',
                description:
                  'The date for which the tasks schedule should be returned.',
              },
            },
            additionalProperties: false,
          },
        },
      },
    ],
    model: 'gpt-3.5-turbo',
  })

  const message = chatCompletion.choices[0].message

  if (message.tool_calls[0]?.id) {
    const schedule = await getTasks({
      id: parseInt(JSON.parse(message.tool_calls[0]?.function.arguments).id),
    })
    const finalResponse = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: getSchedulePrompt },
        { role: 'user', content: transcript },
        message,
        {
          role: 'tool',
          content: JSON.stringify(schedule),
          tool_call_id: message.tool_calls[0].id,
        },
      ],
      model: 'gpt-3.5-turbo',
    })
    return finalResponse.choices[0].message.content
  } else {
    return message.content
  }
}

export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: getResponse function`)

  const transcript = JSON.parse(event.body).transcript
  const deviceId = JSON.parse(event.body).deviceId
  const response = await getResponse({ transcript, deviceId })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      response,
    }),
  }
}
