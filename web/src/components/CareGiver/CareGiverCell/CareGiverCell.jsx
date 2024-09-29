import CareGiver from 'src/components/CareGiver/CareGiver'

export const QUERY = gql`
  query FindCareGiverById($id: Int!) {
    careGiver: careGiver(id: $id) {
      id
      email
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>CareGiver not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ careGiver }) => {
  return <CareGiver careGiver={careGiver} />
}
