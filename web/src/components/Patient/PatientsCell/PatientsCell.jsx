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
    <div>
      <p className="mb-4">No patients set up yet</p>
      <button
        className="flex flex-row text-white bg-teal-500 items-center w-full px-4 py-2 mt-2 text-lg font-semibold rounded-lg md:w-auto md:inline md:mt-0 hover:text-white focus:text-white hover:bg-teal-400 focus:bg-teal-400 focus:outline-none focus:shadow-outline transition-colors"
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
