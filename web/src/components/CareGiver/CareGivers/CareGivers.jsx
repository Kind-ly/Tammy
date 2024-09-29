import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CareGiver/CareGiversCell'
import { truncate } from 'src/lib/formatters'

const DELETE_CARE_GIVER_MUTATION = gql`
  mutation DeleteCareGiverMutation($id: Int!) {
    deleteCareGiver(id: $id) {
      id
    }
  }
`

const CareGiversList = ({ careGivers }) => {
  const [deleteCareGiver] = useMutation(DELETE_CARE_GIVER_MUTATION, {
    onCompleted: () => {
      toast.success('CareGiver deleted')
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
    if (confirm('Are you sure you want to delete careGiver ' + id + '?')) {
      deleteCareGiver({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {careGivers.map((careGiver) => (
            <tr key={careGiver.id}>
              <td>{truncate(careGiver.id)}</td>
              <td>{truncate(careGiver.email)}</td>
              <td>{truncate(careGiver.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.careGiver({ id: careGiver.id })}
                    title={'Show careGiver ' + careGiver.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCareGiver({ id: careGiver.id })}
                    title={'Edit careGiver ' + careGiver.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete careGiver ' + careGiver.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(careGiver.id)}
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

export default CareGiversList
