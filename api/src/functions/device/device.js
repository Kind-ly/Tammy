import OpenAI from 'openai'

import { logger } from 'src/lib/logger'

const openai = new OpenAI()
const prompt =
  'Do your best to respond to the user input in a friendly and polite manner'

async function getResponse(transcript) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: transcript },
    ],
    tools: [
      {
          "type": "function",
          "function": {
              "name": "tasksForPatientOnDate",
              "description": "Get the schedule for a patient on a specific date. This will be a list of tasks that the patient should complete at specific times. Call this whenever you need to know the patient's schedule, for example when a patient asks 'What do I have to do today'",
              "parameters": {
                  "type": "object",
                  "properties": {},
                  "required": [],
                  "additionalProperties": False,
              },
          }
      }
    ],
    model: 'gpt-3.5-turbo',
  })
  return chatCompletion.choices[0].message.content
}

export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: device function`)
  //console.log(JSON.parse(event.body))

  const transcript = JSON.parse(event.body).transcript
  const response = await getResponse(transcript)
  //console.log(response)

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