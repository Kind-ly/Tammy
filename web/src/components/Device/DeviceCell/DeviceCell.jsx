import Device from 'src/components/Device/Device'

export const QUERY = gql`
  query FindDeviceById($id: Int!) {
    device: device(id: $id) {
      id
      careGiverId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Device not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ device }) => {
  return <Device device={device} />
}
