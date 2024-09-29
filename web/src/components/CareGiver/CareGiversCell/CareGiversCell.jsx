import { Link, routes } from '@redwoodjs/router'

import CareGivers from 'src/components/CareGiver/CareGivers'

export const QUERY = gql`
  query FindCareGivers {
    careGivers {
      id
      email
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No careGivers yet. '}
      <Link to={routes.newCareGiver()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ careGivers }) => {
  return <CareGivers careGivers={careGivers} />
}
