import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import PatientsCell from 'src/components/Patient/PatientsCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const PatientsPage = () => {
  return (
    <MainLayout>
      <Metadata title="Patients" description="Patients page" />
      <ol className="list-none p-0 inline-flex mb-6">
        <li className="flex items-center">
          <Link
            to={routes.home()}
            className="text-slate-600 hover:text-teal-500 transition-colors duration-300"
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
        </li>
      </ol>

      <div className="w-full flex flex-row mb-4">
        <h1 className="text-2xl flex-1">My Patients</h1>
        <Link
          to={routes.newPatient()}
          className="flex-none inline-block text-white bg-slate-400 items-center w-full px-4 py-3 text-sm font-semibold text-left rounded-lg md:w-auto hover:bg-slate-500 focus:bg-slate-500 focus:outline-none focus:shadow-outline transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="inline w-4 h-4 mr-1 size-6 align-text-bottom"
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
    </MainLayout>
  )
}

export default PatientsPage
