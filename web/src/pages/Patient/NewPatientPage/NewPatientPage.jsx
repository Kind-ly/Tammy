// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import NewPatient from 'src/components/Patient/NewPatient/NewPatient'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const NewPatientPage = () => {
  return (
    <MainLayout>
      <Metadata title="New Patient" description="Set up a new patient" />

      <h1 className="text-2xl mb-4">Set up your patient</h1>
      <NewPatient />
    </MainLayout>
  )
}

export default NewPatientPage
