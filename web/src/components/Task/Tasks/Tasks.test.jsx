import { render } from '@redwoodjs/testing/web'

import Tasks from './Tasks/Tasks'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Tasks', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Tasks />)
    }).not.toThrow()
  })
})
