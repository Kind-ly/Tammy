import {
  devices,
  device,
  createDevice,
  updateDevice,
  deleteDevice,
} from './devices'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('devices', () => {
  scenario('returns all devices', async (scenario) => {
    const result = await devices()

    expect(result.length).toEqual(Object.keys(scenario.device).length)
  })

  scenario('returns a single device', async (scenario) => {
    const result = await device({ id: scenario.device.one.id })

    expect(result).toEqual(scenario.device.one)
  })

  scenario('creates a device', async (scenario) => {
    const result = await createDevice({
      input: { careGiverId: scenario.device.two.careGiverId },
    })

    expect(result.careGiverId).toEqual(scenario.device.two.careGiverId)
  })

  scenario('updates a device', async (scenario) => {
    const original = await device({ id: scenario.device.one.id })
    const result = await updateDevice({
      id: original.id,
      input: { careGiverId: scenario.device.two.careGiverId },
    })

    expect(result.careGiverId).toEqual(scenario.device.two.careGiverId)
  })

  scenario('deletes a device', async (scenario) => {
    const original = await deleteDevice({
      id: scenario.device.one.id,
    })
    const result = await device({ id: original.id })

    expect(result).toEqual(null)
  })
})
