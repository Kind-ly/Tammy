import { Link, routes } from '@redwoodjs/router'

import Devices from 'src/components/Device/Devices'

export const QUERY = gql`
  query FindDevices {
    devices {
      id
      careGiverId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No devices yet. '}
      <Link to={routes.newDevice()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ devices }) => {
  return <Devices devices={devices} />
}
