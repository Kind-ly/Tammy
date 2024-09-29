import { db } from 'src/lib/db'

export const reminders = () => {
  return db.reminder.findMany()
}

export const reminder = ({ id }) => {
  return db.reminder.findUnique({
    where: { id },
  })
}

export const createReminder = ({ input }) => {
  return db.reminder.create({
    data: input,
  })
}

export const updateReminder = ({ id, input }) => {
  return db.reminder.update({
    data: input,
    where: { id },
  })
}

export const deleteReminder = ({ id }) => {
  return db.reminder.delete({
    where: { id },
  })
}

export const Reminder = {
  patient: (_obj, { root }) => {
    return db.reminder.findUnique({ where: { id: root?.id } }).patient()
  },
  task: (_obj, { root }) => {
    return db.reminder.findUnique({ where: { id: root?.id } }).task()
  },
}
