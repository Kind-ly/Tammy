import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TasksCell from 'src/components/Task/TasksCell/TasksCell'

const DELETE_PATIENT_MUTATION = gql`
  mutation DeletePatientMutation($id: String!) {
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
      <Metadata
        title={patient.name}
        description={patient.name + "'s details and schedule"}
      />
      <ol className="list-none p-0 inline-flex mb-6">
        <li className="flex items-center">
          <Link
            to={routes.home()}
            className="text-slate-600 hover:text-teal-500 transition-colors duration-300"
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
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
          <span className="mx-2">/</span>
        </li>
        <li>
          <Link
            to={routes.patients()}
            className="text-slate-600 hover:text-teal-500 transition-colors duration-300"
          >
            My Patients
          </Link>
          <span className="mx-2">/</span>
        </li>
        <li>{patient.name}</li>
      </ol>

      <h1 className="text-2xl mb-4">{patient.name}</h1>

      <div className="flex flex-col-reverse md:flex-row w-full">
        <div className="flex-1 md:mr-6">
          <div className="w-full text-gray-800 bg-white shadow-md rounded-lg bg-clip-border mb-4 pb-2">
            <TasksCell patientId={patient.id} />
          </div>
          {/* <div className="w-full text-gray-800 bg-white shadow-md rounded-lg bg-clip-border p-4">
            patient&apos;s conversation log
          </div> */}
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
      </div>
    </>
  )
}

export default Patient
