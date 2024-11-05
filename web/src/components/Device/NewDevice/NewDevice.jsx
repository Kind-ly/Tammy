import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DeviceForm from 'src/components/Device/DeviceForm'

const CREATE_DEVICE_MUTATION = gql`
  mutation CreateDeviceMutation($id: Int!) {
    createDevice(id: $id) {
      id
    }
  }
`

const NewDevice = () => {
  const [createDevice, { loading, error }] = useMutation(
    CREATE_DEVICE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Device created')
        navigate(routes.devices())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createDevice({ variables: { id: input.id } })
    // console.log(input)
  }

  return <DeviceForm onSave={onSave} loading={loading} error={error} />
}

export default NewDevice
