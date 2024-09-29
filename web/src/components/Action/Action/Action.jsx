import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_ACTION_MUTATION = gql`
  mutation DeleteActionMutation($id: Int!) {
    deleteAction(id: $id) {
      id
    }
  }
`

const Action = ({ action }) => {
  const [deleteAction] = useMutation(DELETE_ACTION_MUTATION, {
    onCompleted: () => {
      toast.success('Action deleted')
      navigate(routes.actions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete action ' + id + '?')) {
      deleteAction({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Action {action.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{action.id}</td>
            </tr>
            <tr>
              <th>Patient id</th>
              <td>{action.patientId}</td>
            </tr>
            <tr>
              <th>Task id</th>
              <td>{action.taskId}</td>
            </tr>
            <tr>
              <th>Details</th>
              <td>{action.details}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{action.date}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{action.time}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAction({ id: action.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(action.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Action
