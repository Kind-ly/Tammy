import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CareGiverForm from 'src/components/CareGiver/CareGiverForm'

export const QUERY = gql`
  query EditCareGiverById($id: Int!) {
    careGiver: careGiver(id: $id) {
      id
      email
      name
    }
  }
`

const UPDATE_CARE_GIVER_MUTATION = gql`
  mutation UpdateCareGiverMutation($id: Int!, $input: UpdateCareGiverInput!) {
    updateCareGiver(id: $id, input: $input) {
      id
      email
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ careGiver }) => {
  const [updateCareGiver, { loading, error }] = useMutation(
    UPDATE_CARE_GIVER_MUTATION,
    {
      onCompleted: () => {
        toast.success('CareGiver updated')
        navigate(routes.careGivers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCareGiver({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CareGiver {careGiver?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CareGiverForm
          careGiver={careGiver}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
