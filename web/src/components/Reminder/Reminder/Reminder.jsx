import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_REMINDER_MUTATION = gql`
  mutation DeleteReminderMutation($id: Int!) {
    deleteReminder(id: $id) {
      id
    }
  }
`

const Reminder = ({ reminder }) => {
  const [deleteReminder] = useMutation(DELETE_REMINDER_MUTATION, {
    onCompleted: () => {
      toast.success('Reminder deleted')
      navigate(routes.reminders())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete reminder ' + id + '?')) {
      deleteReminder({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Reminder {reminder.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{reminder.id}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{reminder.date}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{reminder.time}</td>
            </tr>
            <tr>
              <th>Patient id</th>
              <td>{reminder.patientId}</td>
            </tr>
            <tr>
              <th>Task id</th>
              <td>{reminder.taskId}</td>
            </tr>
            <tr>
              <th>Instructions</th>
              <td>{reminder.instructions}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editReminder({ id: reminder.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(reminder.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Reminder
