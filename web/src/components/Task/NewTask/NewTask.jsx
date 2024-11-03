import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskForm from 'src/components/Task/TaskForm'

const CREATE_TASK_MUTATION = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      patientId
    }
  }
`

const NewTask = ({ patient }) => {
  const [createTask, { loading, error }] = useMutation(CREATE_TASK_MUTATION, {
    onCompleted: (result) => {
      toast.success('Task created')
      navigate(routes.patient({ id: result.createTask.patientId }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    // console.log(input)
    createTask({ variables: { input } })
  }

  return (
    <>
      <Metadata
        title={'Add a new task for ' + patient.name}
        description={'Add a new task for ' + patient.name}
      />
      <ol className="list-none p-0 inline-flex mb-6">
        <li className="flex items-center">
          <Link
            to={routes.home()}
            className="text-slate-600 hover:text-teal-500 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
          <span className="mx-2">/</span>
        </li>
        <li>
          <Link
            to={routes.patients()}
            className="text-slate-600 hover:text-teal-500 transition-colors duration-300"
          >
            My Patients
          </Link>
          <span className="mx-2">/</span>
        </li>
        <li>
          <Link
            to={routes.patient({ id: patient.id })}
            className="text-slate-600 hover:text-teal-500 transition-colors duration-300"
          >
            {patient.name}
          </Link>
          <span className="mx-2">/</span>
        </li>
        <li>Add a new task</li>
      </ol>

      <header className="mb-4">
        <h1 className="text-2xl">Add a New Task for {patient.name}</h1>
      </header>

      <TaskForm
        onSave={onSave}
        loading={loading}
        error={error}
        patient={patient}
      />
    </>
  )
}

export default NewTask
