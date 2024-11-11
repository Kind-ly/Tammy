import { UserInputError } from '@redwoodjs/graphql-server'

import { isPatientCareGiverOrAdmin } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { device } from 'src/services/devices/devices'
import { user } from 'src/services/users/users'

export const patients = () => {
  return db.patient.findMany({
    include: {
      users: true,
    },
  })
}

export const patient = async ({ id }) => {
  await isPatientCareGiverOrAdmin({ id })
  return db.patient.findUnique({
    where: { id },
    include: {
      users: true,
    },
  })
}

export const getPatientForDevice = ({ id }) => {
  return db.patient.findUnique({
    where: { deviceId: id },
    include: {
      users: true,
    },
  })
}

export const createPatient = async ({ input }) => {
  // console.log(context)
  // console.log(context.currentUser)
  // console.log(context.requestContext)
  // console.log(context.requestContext.clientContext)
  const userId = context.requestContext.clientContext.user.user_metadata.userID
  console.log(userId)
  const caregiver = await user({ id: userId })

  if (input.deviceId) {
    if (!device({ id: input.deviceId })) {
      throw new UserInputError('Device ID does not exist.')
    } else {
      return db.patient.create({
        data: {
          name: input.name,
          patientInfo: input.patientInfo,
          timezone: input.timezone,
          users: {
            connect: [
              {
                id: caregiver.id,
              },
            ],
          },
          Device: {
            connect: {
              id: input.deviceId,
            },
          },
        },
      })
    }
  } else {
    return db.patient.create({
      data: {
        name: input.name,
        patientInfo: input.patientInfo,
        timezone: input.timezone,
        users: {
          connect: [
            {
              id: caregiver.id,
            },
          ],
        },
      },
    })
  }
}

export const updatePatient = async ({ id, input }) => {
  await isPatientCareGiverOrAdmin({ id })

  if (input.deviceId) {
    if (!device({ id: input.deviceId })) {
      throw new UserInputError('Device ID does not exist.')
    } else {
      return db.patient.update({
        data: {
          name: input.name,
          patientInfo: input.patientInfo,
          timezone: input.timezone,
          Device: {
            connect: {
              id: input.deviceId,
            },
          },
        },
        where: { id },
      })
    }
  } else {
    return db.patient.update({
      data: input,
      where: { id },
    })
  }
}

export const deletePatient = async ({ id }) => {
  await isPatientCareGiverOrAdmin({ id })
  return db.patient.delete({
    where: { id },
  })
}

export const Patient = {
  users: (_obj, { root }) => {
    return db.patient.findUnique({ where: { id: root?.id } }).users()
  },
  tasks: (_obj, { root }) => {
    return db.patient.findUnique({ where: { id: root?.id } }).tasks()
  },
  actions: (_obj, { root }) => {
    return db.patient.findUnique({ where: { id: root?.id } }).actions()
  },
}
