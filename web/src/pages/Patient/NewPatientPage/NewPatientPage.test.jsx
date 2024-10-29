import { render } from '@redwoodjs/testing/web'

import NewPatientPage from './NewPatientPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewPatientPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewPatientPage />)
    }).not.toThrow()
  })
})
