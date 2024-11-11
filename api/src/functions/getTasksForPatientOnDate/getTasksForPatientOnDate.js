import { logger } from 'src/lib/logger'
import { patient } from 'src/services/patients/patients'
import { tasksForPatientOnDate } from 'src/services/tasks/tasks'

export const handler = async (event, _context) => {
  logger.info(
    `${event.httpMethod} ${event.path}: getTasksForPatientOnDate function`
  )

  const patientId = event.queryStringParameters?.id
  const date = new Date(event.queryStringParameters?.date)

  if (!patientId)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'No patient ID provided',
      }),
    }

  if (!date || !(date instanceof Date) || isNaN(date))
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'No date provided',
      }),
    }

  const foundPatient = await patient({ id: patientId })
  if (!foundPatient)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'No patient found with that ID',
      }),
    }

  if (new Date().getTime() - date.getTime() > 0)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Date is in the past',
      }),
    }

  const tasks = await tasksForPatientOnDate({
    id: patientId,
    date,
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tasks),
  }
}
