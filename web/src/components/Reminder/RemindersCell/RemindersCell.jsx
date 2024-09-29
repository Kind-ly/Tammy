import { Link, routes } from '@redwoodjs/router'

import Reminders from 'src/components/Reminder/Reminders'

export const QUERY = gql`
  query FindReminders {
    reminders {
      id
      date
      time
      patientId
      taskId
      instructions
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No reminders yet. '}
      <Link to={routes.newReminder()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ reminders }) => {
  return <Reminders reminders={reminders} />
}
