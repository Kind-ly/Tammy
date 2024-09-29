import {
  careGivers,
  careGiver,
  createCareGiver,
  updateCareGiver,
  deleteCareGiver,
} from './careGivers'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('careGivers', () => {
  scenario('returns all careGivers', async (scenario) => {
    const result = await careGivers()

    expect(result.length).toEqual(Object.keys(scenario.careGiver).length)
  })

  scenario('returns a single careGiver', async (scenario) => {
    const result = await careGiver({ id: scenario.careGiver.one.id })

    expect(result).toEqual(scenario.careGiver.one)
  })

  scenario('creates a careGiver', async () => {
    const result = await createCareGiver({
      input: { email: 'String8290817', name: 'String' },
    })

    expect(result.email).toEqual('String8290817')
    expect(result.name).toEqual('String')
  })

  scenario('updates a careGiver', async (scenario) => {
    const original = await careGiver({
      id: scenario.careGiver.one.id,
    })
    const result = await updateCareGiver({
      id: original.id,
      input: { email: 'String76800652' },
    })

    expect(result.email).toEqual('String76800652')
  })

  scenario('deletes a careGiver', async (scenario) => {
    const original = await deleteCareGiver({
      id: scenario.careGiver.one.id,
    })
    const result = await careGiver({ id: original.id })

    expect(result).toEqual(null)
  })
})
