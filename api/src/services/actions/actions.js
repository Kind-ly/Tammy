import { db } from 'src/lib/db'

export const actions = () => {
  return db.action.findMany()
}

export const action = ({ id }) => {
  return db.action.findUnique({
    where: { id },
  })
}

export const createAction = ({ input }) => {
  return db.action.create({
    data: input,
  })
}

export const updateAction = ({ id, input }) => {
  return db.action.update({
    data: input,
    where: { id },
  })
}

export const deleteAction = ({ id }) => {
  return db.action.delete({
    where: { id },
  })
}

export const Action = {
  patient: (_obj, { root }) => {
    return db.action.findUnique({ where: { id: root?.id } }).patient()
  },
  task: (_obj, { root }) => {
    return db.action.findUnique({ where: { id: root?.id } }).task()
  },
}
