import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import PatientsCell from 'src/components/Patient/PatientsCell'

const PatientsPage = () => {
  return (
    <>
      <Metadata title="Patients" description="Patients page" />
      <ol className="mb-6 inline-flex list-none p-0">
        <li className="flex items-center">
          <Link
            to={routes.home()}
            className="text-slate-600 transition-colors duration-300 hover:text-teal-500"
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
        <li>My Patients</li>
      </ol>

      <div className="mb-4 flex w-full flex-row">
        <h1 className="flex-1 text-2xl">My Patients</h1>
        <Link
          to={routes.newPatient()}
          className="focus:shadow-outline inline-block w-full flex-none items-center rounded-lg bg-slate-400 px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:bg-slate-500 focus:bg-slate-500 focus:outline-none md:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-1 inline size-6 h-4 w-4 align-text-bottom"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
          Add new patient
        </Link>
      </div>

      <PatientsCell />
    </>
  )
}

export default PatientsPage
