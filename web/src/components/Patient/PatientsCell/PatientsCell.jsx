import { navigate, routes } from '@redwoodjs/router'

import Patients from 'src/components/Patient/Patients'

export const QUERY = gql`
  query FindPatients {
    patients {
      id
      name
      patientInfo
      timezone
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="p-4">
      <p className="mb-4">No patients set up yet</p>
      <button
        className="focus:shadow-outline mt-2 flex w-full flex-row items-center rounded-lg bg-teal-500 px-4 py-2 text-lg font-semibold text-white transition-colors hover:bg-teal-400 hover:text-white focus:bg-teal-400 focus:text-white focus:outline-none md:mt-0 md:inline md:w-auto"
        onClick={() => navigate(routes.newPatient())}
      >
        <span>Set up your patient</span>
      </button>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="text-red-400">{error?.message}</div>
)

export const Success = ({ patients }) => {
  return <Patients patients={patients} />
}
