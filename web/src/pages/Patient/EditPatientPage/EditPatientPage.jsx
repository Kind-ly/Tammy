import EditPatientCell from 'src/components/Patient/EditPatientCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const EditPatientPage = ({ id }) => {
  return (
    <MainLayout>
      <EditPatientCell id={id} />
    </MainLayout>
  )
}

export default EditPatientPage
