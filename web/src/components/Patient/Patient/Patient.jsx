import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_PATIENT_MUTATION = gql`
  mutation DeletePatientMutation($id: Int!) {
    deletePatient(id: $id) {
      id
    }
  }
`

const Patient = ({ patient }) => {
  const [deletePatient] = useMutation(DELETE_PATIENT_MUTATION, {
    onCompleted: () => {
      toast.success('Patient deleted')
      navigate(routes.patients())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete patient ' + id + '?')) {
      deletePatient({ variables: { id } })
    }
  }

  return (
    <>
      <h1 className="text-2xl mb-4">{patient.name}</h1>

      <div className="flex flex-col-reverse md:flex-row w-full">
        <div className="flex-1 md:mr-6">
          {/* schedule navigation */}
          {/* today's schedule */}
          <div className="w-full text-gray-800 bg-white shadow-md rounded-lg bg-clip-border p-4">
            today&apos;s schedule
          </div>
          {/* full log */}
        </div>
        <div className="md:flex-none md:w-1/3 mb-6 md:mb-0">
          <div className="w-full text-gray-800 bg-white shadow-md rounded-lg bg-clip-border p-4">
            <p className="mb-4">{patient.patientInfo}</p>
            <nav className="w-full">
              <Link
                to={routes.editPatient({ id: patient.id })}
                className="inline-block text-white bg-slate-400 items-center w-full px-4 py-3 mb-2 mr-2 text-sm font-semibold text-left rounded-lg md:w-auto hover:bg-slate-500 focus:bg-slate-500 focus:outline-none focus:shadow-outline transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="inline w-4 h-4 mr-1 size-6 align-text-bottom"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Edit patient details
              </Link>
              <button
                type="button"
                className="inline-block text-red-400 bg-white border border-red-400 items-center w-full px-4 py-3 text-sm font-semibold text-left rounded-lg md:w-auto hover:bg-red-50 focus:bg-red-50 focus:outline-none focus:shadow-outline transition-colors"
                onClick={() => onDeleteClick(patient.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="inline w-4 h-4 mr-2 size-6 align-text-bottom"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
                Retire patient
              </button>
            </nav>
          </div>
        </div>
        {/* <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Patient {patient.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{patient.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{patient.name}</td>
            </tr>
            <tr>
              <th>Patient info</th>
              <td>{patient.patientInfo}</td>
            </tr>
            <tr>
              <th>Timezone</th>
              <td>{patient.timezone}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">

        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(patient.id)}
        >
          Delete
        </button>
      </nav> */}
      </div>
    </>
  )
}

export default Patient
