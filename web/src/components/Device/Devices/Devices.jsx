import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Device/DevicesCell'
import { truncate } from 'src/lib/formatters'

const DELETE_DEVICE_MUTATION = gql`
  mutation DeleteDeviceMutation($id: Int!) {
    deleteDevice(id: $id) {
      id
    }
  }
`

const DevicesList = ({ devices }) => {
  const [deleteDevice] = useMutation(DELETE_DEVICE_MUTATION, {
    onCompleted: () => {
      toast.success('Device deleted')
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
    if (confirm('Are you sure you want to delete device ' + id + '?')) {
      deleteDevice({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Care giver id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{truncate(device.id)}</td>
              <td>{truncate(device.careGiverId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.device({ id: device.id })}
                    title={'Show device ' + device.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDevice({ id: device.id })}
                    title={'Edit device ' + device.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete device ' + device.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(device.id)}
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

export default DevicesList
