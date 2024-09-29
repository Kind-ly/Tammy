import Reminder from 'src/components/Reminder/Reminder'

export const QUERY = gql`
  query FindReminderById($id: Int!) {
    reminder: reminder(id: $id) {
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

export const Empty = () => <div>Reminder not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ reminder }) => {
  return <Reminder reminder={reminder} />
}
