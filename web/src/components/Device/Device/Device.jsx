import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_DEVICE_MUTATION = gql`
  mutation DeleteDeviceMutation($id: Int!) {
    deleteDevice(id: $id) {
      id
    }
  }
`

const Device = ({ device }) => {
  const [deleteDevice] = useMutation(DELETE_DEVICE_MUTATION, {
    onCompleted: () => {
      toast.success('Device deleted')
      navigate(routes.devices())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete device ' + id + '?')) {
      deleteDevice({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Device {device.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{device.id}</td>
            </tr>
            <tr>
              <th>Care giver id</th>
              <td>{device.careGiverId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDevice({ id: device.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(device.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Device
