import PatientCell from 'src/components/Patient/PatientCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const PatientPage = ({ id }) => {
  return (
    <MainLayout>
      <PatientCell id={id} />
    </MainLayout>
  )
}

export default PatientPage
