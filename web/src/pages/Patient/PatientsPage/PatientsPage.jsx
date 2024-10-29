import { Metadata } from '@redwoodjs/web'

import PatientsCell from 'src/components/Patient/PatientsCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const PatientsPage = () => {
  return (
    <MainLayout>
      <Metadata title="Patients" description="Patients page" />

      <h1 className="text-2xl mb-4">My Patients</h1>

      <PatientsCell />
    </MainLayout>
  )
}

export default PatientsPage
