import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Toaster } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Device/DevicesCell'

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
    <div className="relative flex h-full w-full flex-col overflow-scroll rounded-lg bg-white bg-clip-border text-gray-700 shadow-md">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr className="border-b border-slate-300 bg-slate-200">
            <th className="p-4 text-sm font-normal leading-none text-slate-700">
              Device ID
            </th>
            <th className="p-4 text-sm font-normal leading-none text-slate-700">
              Caregiver
            </th>
            <th className="p-4 text-sm font-normal leading-none text-slate-700"></th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id} className="hover:bg-slate-50">
              <td className="border-b border-slate-200 p-4">{device.id}</td>
              <td className="border-b border-slate-200 p-4">{device.userId}</td>
              <td className="flex flex-row border-b border-slate-200 p-4">
                <button
                  className="middle none center flex items-center justify-center rounded-lg p-3 font-sans text-xs font-bold uppercase text-teal-500 transition-all hover:bg-teal-500/10 active:bg-teal-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-dark="true"
                  onClick={() => {
                    navigate(routes.editDevice({ id: device.id }))
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
                    onDeleteClick(device.id)
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
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  )
}

export default DevicesList
