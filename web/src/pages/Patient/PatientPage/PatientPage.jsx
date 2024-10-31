import { Link, routes } from '@redwoodjs/router'

import PatientCell from 'src/components/Patient/PatientCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const PatientPage = ({ id }) => {
  return (
    <MainLayout>
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
          <span className="mx-2">/</span>
        </li>
        <li>
          <Link
            to={routes.patients()}
            className="text-slate-600 hover:text-teal-500 transition-colors duration-300"
          >
            My Patients
          </Link>
        </li>
      </ol>
      <PatientCell id={id} />
    </MainLayout>
  )
}

export default PatientPage
