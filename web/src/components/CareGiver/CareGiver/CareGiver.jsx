import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_CARE_GIVER_MUTATION = gql`
  mutation DeleteCareGiverMutation($id: Int!) {
    deleteCareGiver(id: $id) {
      id
    }
  }
`

const CareGiver = ({ careGiver }) => {
  const [deleteCareGiver] = useMutation(DELETE_CARE_GIVER_MUTATION, {
    onCompleted: () => {
      toast.success('CareGiver deleted')
      navigate(routes.careGivers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete careGiver ' + id + '?')) {
      deleteCareGiver({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            CareGiver {careGiver.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{careGiver.id}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{careGiver.email}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{careGiver.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCareGiver({ id: careGiver.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(careGiver.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default CareGiver
