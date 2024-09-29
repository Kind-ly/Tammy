import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Reminder/RemindersCell'
import { truncate } from 'src/lib/formatters'

const DELETE_REMINDER_MUTATION = gql`
  mutation DeleteReminderMutation($id: Int!) {
    deleteReminder(id: $id) {
      id
    }
  }
`

const RemindersList = ({ reminders }) => {
  const [deleteReminder] = useMutation(DELETE_REMINDER_MUTATION, {
    onCompleted: () => {
      toast.success('Reminder deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete reminder ' + id + '?')) {
      deleteReminder({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Time</th>
            <th>Patient id</th>
            <th>Task id</th>
            <th>Instructions</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((reminder) => (
            <tr key={reminder.id}>
              <td>{truncate(reminder.id)}</td>
              <td>{truncate(reminder.date)}</td>
              <td>{truncate(reminder.time)}</td>
              <td>{truncate(reminder.patientId)}</td>
              <td>{truncate(reminder.taskId)}</td>
              <td>{truncate(reminder.instructions)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.reminder({ id: reminder.id })}
                    title={'Show reminder ' + reminder.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editReminder({ id: reminder.id })}
                    title={'Edit reminder ' + reminder.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete reminder ' + reminder.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(reminder.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RemindersList
