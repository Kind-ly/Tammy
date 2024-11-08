import { isPatientCareGiverOrAdmin } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const tasks = () => {
  return db.task.findMany()
}

export const tasksForPatient = ({ id }) => {
  return db.task.findMany({
    where: {
      patientId: id,
    },
  })
}

export const tasksForPatientOnDate = ({ id, date }) => {
  return db.task.findMany({
    where: {
      patientId: id,
      date,
    },
  })
}

export const task = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}

export const createTask = async ({ input }) => {
  await isPatientCareGiverOrAdmin({ id: input.patientId })
  return db.task.create({
    data: input,
  })
}

export const updateTask = async ({ id, input }) => {
  await isPatientCareGiverOrAdmin({ id })
  return db.task.update({
    data: input,
    where: { id },
  })
}

export const deleteTask = async ({ id }) => {
  await isPatientCareGiverOrAdmin({ id })
  return db.task.delete({
    where: { id },
  })
}

export const Task = {
  patient: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).patient()
  },
}
