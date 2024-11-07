import { isPatientCareGiver } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const patients = () => {
  return db.patient.findMany()
}

export const patient = ({ id }) => {
  // must be patient's caregiver or admin
  isPatientCareGiver()
  return db.patient.findUnique({
    where: { id },
  })
}

export const createPatient = ({ input }) => {
  return db.patient.create({
    data: input,
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
