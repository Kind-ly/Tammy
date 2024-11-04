import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const getUserByEmail = ({ email }) => {
  return db.user.findUnique({
    where: { email },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  patients: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).patients()
  },
  devices: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).devices()
  },
}
