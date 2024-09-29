export const standard = defineScenario({
  action: {
    one: {
      data: {
        details: 'String',
        date: 'String',
        time: 'String',
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
        details: 'String',
        date: 'String',
        time: 'String',
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
