import { db } from 'src/lib/db'

export const patients = () => {
  return db.patient.findMany()
}

export const patient = ({ id }) => {
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
  return db.patient.update({
    data: input,
    where: { id },
  })
}

export const deletePatient = ({ id }) => {
  return db.patient.delete({
    where: { id },
  })
}

export const Patient = {
  careGivers: (_obj, { root }) => {
    return db.patient.findUnique({ where: { id: root?.id } }).careGivers()
  },
  tasks: (_obj, { root }) => {
    return db.patient.findUnique({ where: { id: root?.id } }).tasks()
  },
  actions: (_obj, { root }) => {
    return db.patient.findUnique({ where: { id: root?.id } }).actions()
  },
  reminders: (_obj, { root }) => {
    return db.patient.findUnique({ where: { id: root?.id } }).reminders()
  },
}
