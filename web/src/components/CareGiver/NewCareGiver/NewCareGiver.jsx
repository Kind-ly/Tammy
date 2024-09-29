import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import CareGiverForm from 'src/components/CareGiver/CareGiverForm'

const CREATE_CARE_GIVER_MUTATION = gql`
  mutation CreateCareGiverMutation($input: CreateCareGiverInput!) {
    createCareGiver(input: $input) {
      id
    }
  }
`

const NewCareGiver = () => {
  const [createCareGiver, { loading, error }] = useMutation(
    CREATE_CARE_GIVER_MUTATION,
    {
      onCompleted: () => {
        toast.success('CareGiver created')
        navigate(routes.careGivers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCareGiver({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CareGiver</h2>
      </header>
      <div className="rw-segment-main">
        <CareGiverForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCareGiver
