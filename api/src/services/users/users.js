import { isUserOrAdmin } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  isUserOrAdmin()
  return db.user.findUnique({
    where: { id },
    include: {
      patients: true,
    },
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
  isUserOrAdmin()
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  isUserOrAdmin()
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
