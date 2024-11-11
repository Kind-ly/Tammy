import OpenAI from 'openai'

import { getTasks } from 'src/functions/getTasksForPatientOnDate/getTasksForPatientOnDate'
import { logger } from 'src/lib/logger'
import { getSchedulePrompt } from 'src/lib/prompts'

const openai = new OpenAI()

async function getResponse(transcript) {
  // TODO: get the patient ID as a parameter – currently hard-coded in the prompt
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: getSchedulePrompt },
      { role: 'user', content: transcript },
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'tasksForPatientOnDate',
          description:
            "Get the schedule for a patient on a specific date. This will be a list of tasks that the patient should complete at specific times. Call this whenever you need to know the patient's schedule, for example when a patient asks 'What do I have to do today'",
          parameters: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'The patient ID.',
              },
            },
            required: ['id'],
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

  // TODO get the device ID and map to the patient ID
  const transcript = JSON.parse(event.body).transcript
  const response = await getResponse(transcript)

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

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } _context - contains information about the invocation,
 * function, and execution environment.
 */

// tools: [
//   {
//       "type": "function",
//       "function": {
//           "name": "tasksForPatientOnDate",
//           "description": "Get the schedule for a patient on a specific date. This will be a list of tasks that the patient should complete at specific times. Call this whenever you need to know the patient's schedule, for example when a patient asks 'What do I have to do today'",
//           "parameters": {
//               "type": "object",
//               "properties": {
//                   "id": {
//                     "type": "integer",
//                     "description": "The patient ID.",
//                   },
//                   "date": {
//                     "type": "string",
//                     "description": "The date on which the tasks should be completed",
//                   }
//               },
//               "required": ["id", "date"],
//               "additionalProperties": False,
//           },
//       }
//   }
// ],
