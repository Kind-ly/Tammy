export const standard = defineScenario({
  reminder: {
    one: {
      data: {
        date: 'String',
        time: 'String',
        instructions: 'String',
        patient: { create: { name: 'String', timezone: 'String' } },
        task: {
          create: {
            date: 'String',
            time: 'String',
            description: 'String',
            patient: { create: { name: 'String', timezone: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        date: 'String',
        time: 'String',
        instructions: 'String',
        patient: { create: { name: 'String', timezone: 'String' } },
        task: {
          create: {
            date: 'String',
            time: 'String',
            description: 'String',
            patient: { create: { name: 'String', timezone: 'String' } },
          },
        },
      },
    },
  },
})
