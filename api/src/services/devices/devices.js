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
    data: {
      ...input,
      id:
        Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000,
    },
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
