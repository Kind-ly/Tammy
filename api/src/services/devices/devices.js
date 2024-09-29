import { db } from 'src/lib/db'

export const devices = () => {
  return db.device.findMany()
}

export const device = ({ id }) => {
  return db.device.findUnique({
    where: { id },
  })
}

export const createDevice = ({ input }) => {
  return db.device.create({
    data: input,
  })
}

export const updateDevice = ({ id, input }) => {
  return db.device.update({
    data: input,
    where: { id },
  })
}

export const deleteDevice = ({ id }) => {
  return db.device.delete({
    where: { id },
  })
}

export const Device = {
  CareGiver: (_obj, { root }) => {
    return db.device.findUnique({ where: { id: root?.id } }).CareGiver()
  },
}
