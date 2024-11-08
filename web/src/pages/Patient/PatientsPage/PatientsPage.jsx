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
      </div>

      <div className="relative flex h-full w-full flex-col overflow-scroll rounded-lg bg-white bg-clip-border text-gray-700 shadow-md">
        <PatientsCell />
      </div>
    </>
  )
}

export default PatientsPage
