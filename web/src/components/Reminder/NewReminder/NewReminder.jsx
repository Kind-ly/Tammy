import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import ReminderForm from 'src/components/Reminder/ReminderForm'

const CREATE_REMINDER_MUTATION = gql`
  mutation CreateReminderMutation($input: CreateReminderInput!) {
    createReminder(input: $input) {
      id
    }
  }
`

const NewReminder = () => {
  const [createReminder, { loading, error }] = useMutation(
    CREATE_REMINDER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Reminder created')
        navigate(routes.reminders())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createReminder({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Reminder</h2>
      </header>
      <div className="rw-segment-main">
        <ReminderForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewReminder
