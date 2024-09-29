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
      <div className="rw-segment">
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
        <Link
          to={routes.editPatient({ id: patient.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(patient.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Patient
