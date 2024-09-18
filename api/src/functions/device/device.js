import { logger } from 'src/lib/logger'
import OpenAI from 'openai'

const openai = new OpenAI()
const prompt = 'Just repeat back what you heard with a friendly message'

async function getResponse(transcript) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: prompt },{ role: 'user', content: transcript }],
    model: 'gpt-3.5-turbo',
  });
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