import { logger } from 'src/lib/logger'
import { patient } from 'src/services/patients/patients'
import { tasksForPatientOnDate } from 'src/services/tasks/tasks'

export const getTasks = async ({ id }) => {
  const patientInfo = await patient({ id })
  const date = new Date()
  const schedule = await tasksForPatientOnDate({
    id: 1,
    date: date.toLocaleDateString('en-SG'),
  })
  const response = {
    patientName: patientInfo.name,
    patientInfo: patientInfo.patientInfo,
    schedule,
  }
  return response
}

export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: schedule function`)

  const response = getTasks({ id: event.queryStringParameters?.id })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response),
  }
}
