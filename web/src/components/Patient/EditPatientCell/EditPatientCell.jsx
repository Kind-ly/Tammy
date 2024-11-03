import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PatientForm from 'src/components/Patient/PatientForm'

export const QUERY = gql`
  query EditPatientById($id: String!) {
    patient: patient(id: $id) {
      id
      name
      patientInfo
      timezone
    }
  }
`

const UPDATE_PATIENT_MUTATION = gql`
  mutation UpdatePatientMutation($id: String!, $input: UpdatePatientInput!) {
    updatePatient(id: $id, input: $input) {
      id
      name
      patientInfo
      timezone
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="text-red-400">{error?.message}</div>
)

export const Success = ({ patient }) => {
  const [updatePatient, { loading, error }] = useMutation(
    UPDATE_PATIENT_MUTATION,
    {
      onCompleted: (result) => {
        toast.success('Patient updated')
        navigate(routes.patient({ id: result.updatePatient.id }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updatePatient({ variables: { id, input } })
  }

  return (
    <PatientForm
      patient={patient}
      onSave={onSave}
      error={error}
      loading={loading}
    />
  )
}
