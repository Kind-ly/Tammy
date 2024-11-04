import { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'

import Tasks from 'src/components/Task/Tasks'
import { getReadableDate, isSameDay } from 'src/lib/dateFunctions'

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

const EmptyTasks = ({ patientId }) => (
  <>
    <p className="mb-4 text-lg text-slate-600">
      You haven&apos;t added any tasks for your patient yet.
    </p>
    <Link
      className="focus:shadow-outline inline-block w-full items-center rounded-lg bg-teal-500 px-4 py-3 text-left font-semibold text-white transition-colors hover:bg-teal-400 focus:bg-teal-400 focus:outline-none md:w-auto"
      to={routes.newTask({ id: patientId })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="mr-2 inline h-6 w-6 align-bottom"
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

export const Loading = () => <div>Loading...</div>

export const Empty = ({ patientId }) => <EmptyTasks patientId={patientId} />

export const Failure = ({ error }) => (
  <div className="text-red-400">{error?.message}</div>
)

export const Success = ({ patientId, tasks, queryResult }) => {
  const [scheduleDate, setScheduleDate] = useState(new Date())

  const getFilteredTasks = () => {
    return tasks.filter((task) => isSameDay(new Date(task.date), scheduleDate))
  }

  const goBack1Day = () => {
    setScheduleDate(new Date(scheduleDate.setDate(scheduleDate.getDate() - 1)))
  }

  const goForward1Day = () => {
    setScheduleDate(new Date(scheduleDate.setDate(scheduleDate.getDate() + 1)))
  }

  return (
    <>
      <div className="flex flex-row justify-between p-4 align-middle ">
        <button
          className="middle none center flex items-center justify-center rounded-lg font-sans text-xs font-bold uppercase text-slate-500 transition-all hover:text-teal-500 active:text-teal-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={() => goBack1Day()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <h2 className="text-center text-lg font-bold leading-10">
          {getReadableDate(scheduleDate)}
        </h2>
        <button
          className="middle none center flex items-center justify-center rounded-lg font-sans text-xs font-bold uppercase text-slate-500 transition-all hover:text-teal-500 active:text-teal-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={() => goForward1Day()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      {getFilteredTasks().length ? (
        <Tasks
          tasks={getFilteredTasks()}
          patientId={patientId}
          refetch={queryResult.refetch}
        />
      ) : (
        <div className="p-4">
          <EmptyTasks patientId={patientId} />
        </div>
      )}
    </>
  )
}
