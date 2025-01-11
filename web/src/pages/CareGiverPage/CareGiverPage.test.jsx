import { render } from '@redwoodjs/testing/web'

import CareGiverPage from './CareGiverPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CareGiverPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CareGiverPage />)
    }).not.toThrow()
  })
})
