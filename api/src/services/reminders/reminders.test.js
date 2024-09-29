import {
  reminders,
  reminder,
  createReminder,
  updateReminder,
  deleteReminder,
} from './reminders'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('reminders', () => {
  scenario('returns all reminders', async (scenario) => {
    const result = await reminders()

    expect(result.length).toEqual(Object.keys(scenario.reminder).length)
  })

  scenario('returns a single reminder', async (scenario) => {
    const result = await reminder({ id: scenario.reminder.one.id })

    expect(result).toEqual(scenario.reminder.one)
  })

  scenario('creates a reminder', async (scenario) => {
    const result = await createReminder({
      input: {
        date: 'String',
        time: 'String',
        patientId: scenario.reminder.two.patientId,
        taskId: scenario.reminder.two.taskId,
        instructions: 'String',
      },
    })

    expect(result.date).toEqual('String')
    expect(result.time).toEqual('String')
    expect(result.patientId).toEqual(scenario.reminder.two.patientId)
    expect(result.taskId).toEqual(scenario.reminder.two.taskId)
    expect(result.instructions).toEqual('String')
  })

  scenario('updates a reminder', async (scenario) => {
    const original = await reminder({
      id: scenario.reminder.one.id,
    })
    const result = await updateReminder({
      id: original.id,
      input: { date: 'String2' },
    })

    expect(result.date).toEqual('String2')
  })

  scenario('deletes a reminder', async (scenario) => {
    const original = await deleteReminder({
      id: scenario.reminder.one.id,
    })
    const result = await reminder({ id: original.id })

    expect(result).toEqual(null)
  })
})
