import { Link, routes } from '@redwoodjs/router'

import Tasks from 'src/components/Task/Tasks'

// export const beforeQuery = (props) => {
//   return {
//     variables: props,
//     fetchPolicy: 'no-cache',
//   }
// }

export const QUERY = gql`
  query GetPatientSchedule($patientId: String!) {
    tasks: tasksForPatient(id: $patientId) {
      id
      date
      time
      description
      instructions
      status
      timeCompleted
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ patientId }) => (
  <>
    <p className="text-lg mb-4 text-slate-600">
      You haven&apos;t added any tasks for your patient yet.
    </p>
    <Link
      className="inline-block text-white bg-teal-500 items-center w-full px-4 py-3 font-semibold text-left rounded-lg md:w-auto hover:bg-teal-400 focus:bg-teal-400 focus:outline-none focus:shadow-outline transition-colors"
      to={routes.newTask({ id: patientId })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="inline w-6 h-6 mr-2 align-bottom"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      Add a task
    </Link>
  </>
)

export const Failure = ({ error }) => (
  <div className="text-red-400">{error?.message}</div>
)

export const Success = ({ patientId, tasks, queryResult }) => {
  return (
    <Tasks tasks={tasks} patientId={patientId} refetch={queryResult.refetch} />
  )
}
