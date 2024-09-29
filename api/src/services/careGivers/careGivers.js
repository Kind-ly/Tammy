import { db } from 'src/lib/db'

export const careGivers = () => {
  return db.careGiver.findMany()
}

export const careGiver = ({ id }) => {
  return db.careGiver.findUnique({
    where: { id },
  })
}

export const createCareGiver = ({ input }) => {
  return db.careGiver.create({
    data: input,
  })
}

export const updateCareGiver = ({ id, input }) => {
  return db.careGiver.update({
    data: input,
    where: { id },
  })
}

export const deleteCareGiver = ({ id }) => {
  return db.careGiver.delete({
    where: { id },
  })
}

export const CareGiver = {
  patients: (_obj, { root }) => {
    return db.careGiver.findUnique({ where: { id: root?.id } }).patients()
  },
  devices: (_obj, { root }) => {
    return db.careGiver.findUnique({ where: { id: root?.id } }).devices()
  },
}
