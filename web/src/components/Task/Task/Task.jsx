import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Toaster } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`

const Task = ({ patientId, task, refetch }) => {
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } })
    }
  }

  const getStatus = (s) => {
    switch (s) {
      case 'TODO':
        return 'Not done yet'
      case 'UNCERTAIN':
        return 'Uncertain'
      case 'COMPLETED':
        return 'Done'
    }
  }

  return (
    <tr className="">
      <td className="min-w-20 p-2 py-4 pl-4 font-bold">{task.time}</td>
      <td className="p-2 py-4">{task.description}</td>
      <td className="p-2 py-4 pr-4">
        <div
          className={
            task.status === 'TODO'
              ? 'relative inline-block rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500'
              : task.status === 'COMPLETED'
                ? 'relative inline-block rounded-md bg-teal-100 px-2 py-1 text-xs text-teal-600'
                : 'relative inline-block rounded-md bg-red-100 px-2 py-1 text-xs text-red-500'
          }
        >
          <span className="pr-px font-semibold uppercase">
            <span>{getStatus(task.status)}</span>
          </span>
        </div>
      </td>
      <td className="flex flex-row p-2 py-4">
        <button
          className="middle none center flex items-center justify-center rounded-lg p-3 font-sans text-xs font-bold uppercase text-teal-500 transition-all hover:bg-teal-500/10 active:bg-teal-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-dark="true"
          onClick={() => {
            navigate(routes.editTask({ patientId, taskId: task.id }))
          }}
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
        <button
          className="middle none center flex items-center justify-center rounded-lg p-3 font-sans text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-dark="true"
          onClick={() => {
            onDeleteClick(task.id)
          }}
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </td>
      <Toaster />
    </tr>
  )
}

export default Task
