import { logger } from 'src/lib/logger'
import { device } from 'src/services/devices/devices'
import { getPatientForDevice } from 'src/services/patients/patients'

export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: getPatientDetails function`)

  const deviceId = event.queryStringParameters?.id

  if (!deviceId)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'No device ID provided',
      }),
    }

  const foundDevice = await device({ id: parseInt(deviceId) })
  if (!foundDevice)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'No device with that ID',
      }),
    }

  const patient = await getPatientForDevice({
    id: parseInt(deviceId),
  })

  if (!patient)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Patient does not have a device set up',
      }),
    }

  let options = {
      timeZone: patient.timezone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
    formatter = new Intl.DateTimeFormat([], options)

  const date = formatter.format(new Date())

  options = {
    timeZone: patient.timezone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  const time = formatter.format(new Date())

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: patient.name,
      condition: patient.condition,
      date,
      time,
    }),
  }
}
