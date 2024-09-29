import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ReminderForm from 'src/components/Reminder/ReminderForm'

export const QUERY = gql`
  query EditReminderById($id: Int!) {
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

const UPDATE_REMINDER_MUTATION = gql`
  mutation UpdateReminderMutation($id: Int!, $input: UpdateReminderInput!) {
    updateReminder(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ reminder }) => {
  const [updateReminder, { loading, error }] = useMutation(
    UPDATE_REMINDER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Reminder updated')
        navigate(routes.reminders())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateReminder({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Reminder {reminder?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ReminderForm
          reminder={reminder}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
