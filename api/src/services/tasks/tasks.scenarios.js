export const standard = defineScenario({
  task: {
    one: {
      data: {
        date: 'String',
        time: 'String',
        description: 'String',
        patient: { create: { name: 'String', timezone: 'String' } },
      },
    },
    two: {
      data: {
        date: 'String',
        time: 'String',
        description: 'String',
        patient: { create: { name: 'String', timezone: 'String' } },
      },
    },
  },
})
