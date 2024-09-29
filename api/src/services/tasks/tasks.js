import { db } from 'src/lib/db'
import { patient } from '../patients/patients'

export const tasks = () => {
  return db.task.findMany()
}

export const tasksForPatientOnDate = ({ id, date }) => {
  return db.task.findMany({
    where: {
      patientId: id,
      date
    }
  })
}

export const task = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}

export const createTask = ({ input }) => {
  return db.task.create({
    data: input,
  })
}

export const updateTask = ({ id, input }) => {
  return db.task.update({
    data: input,
    where: { id },
  })
}

export const deleteTask = ({ id }) => {
  return db.task.delete({
    where: { id },
  })
}

export const Task = {
  patient: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).patient()
  },
  action: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).action()
  },
  reminder: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).reminder()
  },
}
