export const standard = defineScenario({
  device: {
    one: {
      data: {
        CareGiver: { create: { email: 'String7437516', name: 'String' } },
      },
    },
    two: {
      data: {
        CareGiver: { create: { email: 'String1699179', name: 'String' } },
      },
    },
  },
})
