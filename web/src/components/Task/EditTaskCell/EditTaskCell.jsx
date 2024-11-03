import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskForm from 'src/components/Task/TaskForm'

export const QUERY = gql`
  query EditTaskById($patientId: String!, $taskId: String!) {
    task: task(id: $taskId) {
      id
      date
      time
      description
      instructions
      patientId
    }
    patient: patient(id: $patientId) {
      id
      name
    }
  }
`

const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTaskMutation($id: String!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      date
      time
      description
      instructions
      patientId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="text-red-400">{error?.message}</div>
)

export const Success = ({ patient, task }) => {
  const [updateTask, { loading, error }] = useMutation(UPDATE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task updated')
      navigate(routes.patient({ id: patient.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateTask({ variables: { id, input } })
  }

  return (
    <>
      <Metadata
        title={'Edit task for ' + patient.name}
        description={'Edit task for ' + patient.name}
      />

      <TaskForm
        patient={patient}
        task={task}
        onSave={onSave}
        error={error}
        loading={loading}
      />
    </>
  )
}
