import { render } from '@redwoodjs/testing/web'

import PatientsPage from './PatientsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PatientsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PatientsPage />)
    }).not.toThrow()
  })
})
