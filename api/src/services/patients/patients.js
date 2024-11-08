import { isPatientCareGiver } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { user } from 'src/services/users/users'

export const patients = () => {
  return db.patient.findMany({
    include: {
      users: true,
    },
  })
}

export const patient = ({ id }) => {
  // must be patient's caregiver or admin
  isPatientCareGiver({ id })
  return db.patient.findUnique({
    where: { id },
    include: {
      users: true,
    },
  })
}

export const createPatient = async ({ input }) => {
  // check device exists and connect if one is given
  const caregiver = await user({ id: context.currentUser.user_metadata.userID })
  console.log(caregiver)
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

export const updatePatient = ({ id, input }) => {
  // must be patient's caregiver or admin
  return db.patient.update({
    data: input,
    where: { id },
  })
}

export const deletePatient = ({ id }) => {
  // must be patient's caregiver or admin
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
