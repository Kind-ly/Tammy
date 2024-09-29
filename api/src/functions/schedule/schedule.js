import { logger } from 'src/lib/logger'
import { patient } from 'src/services/patients/patients'
import { tasksForPatientOnDate } from 'src/services/tasks/tasks'



export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: schedule function`)

  const patientInfo = await patient( { id: 1 } )
  const date = new Date()
  console.log(date.toLocaleDateString())
  console.log(typeof date.toLocaleDateString())
  const schedule = await tasksForPatientOnDate( { id: 1, date: '29/09/2024' } )
  const response = {
    patientName: patientInfo.name,
    patientInfo: patientInfo.patientInfo,
    schedule,
  }


  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response),
  }
}
