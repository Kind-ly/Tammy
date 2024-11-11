import { navigate, routes } from '@redwoodjs/router'

import Devices from 'src/components/Device/Devices'

export const QUERY = gql`
  query FindDevices {
    devices {
      id
      userId
      patient {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div>
      <p className="mb-4">No devices set up yet</p>
      <button
        className="focus:shadow-outline mt-2 flex w-full flex-row items-center rounded-lg bg-teal-500 px-4 py-2 text-lg font-semibold text-white transition-colors hover:bg-teal-400 hover:text-white focus:bg-teal-400 focus:text-white focus:outline-none md:mt-0 md:inline md:w-auto"
        onClick={() => navigate(routes.newDevice())}
      >
        <span>Add a device</span>
      </button>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="text-red-400">{error?.message}</div>
)

export const Success = ({ devices }) => {
  return <Devices devices={devices} />
}
