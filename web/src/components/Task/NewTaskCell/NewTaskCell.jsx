import NewTask from 'src/components/Task/NewTask/NewTask'

export const QUERY = gql`
  query GetPatient($patientId: Int!) {
    patient: patient(id: $patientId) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty...</div>

export const Failure = ({ error }) => (
  <div className="text-red-400">{error?.message}</div>
)

export const Success = ({ patient }) => {
  return <NewTask patient={patient} />
}
