// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import NewPatient from 'src/components/Patient/NewPatient/NewPatient'

const NewPatientPage = () => {
  return (
    <>
      <Metadata title="New Patient" description="Set up a new patient" />

      <header className="mb-4">
        <h1 className="text-2xl">Set up your new patient</h1>
      </header>
      <NewPatient />
    </>
  )
}

export default NewPatientPage
