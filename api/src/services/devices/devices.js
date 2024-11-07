import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const devices = () => {
  requireAuth({ roles: 'admin' })
  return db.device.findMany()
}

export const device = ({ id }) => {
  requireAuth({ roles: 'admin' })
  return db.device.findUnique({
    where: { id },
  })
}

export const createDevice = ({ id }) => {
  requireAuth({ roles: 'admin' })
  return db.device.create({
    data: {
      id,
    },
  })
}

export const updateDevice = ({ id, input }) => {
  requireAuth({ roles: 'admin' })
  return db.device.update({
    data: input,
    where: { id },
  })
}

export const deleteDevice = ({ id }) => {
  requireAuth({ roles: 'admin' })
  return db.device.delete({
    where: { id },
  })
}

export const Device = {
  User: (_obj, { root }) => {
    return db.device.findUnique({ where: { id: root?.id } }).User()
  },
}
