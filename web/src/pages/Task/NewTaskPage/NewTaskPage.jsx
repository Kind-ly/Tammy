import NewTaskCell from 'src/components/Task/NewTaskCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const NewTaskPage = ({ id }) => {
  return (
    <MainLayout>
      <NewTaskCell patientId={id} />
    </MainLayout>
  )
}

export default NewTaskPage
