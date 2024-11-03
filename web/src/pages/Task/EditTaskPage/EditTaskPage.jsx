import EditTaskCell from 'src/components/Task/EditTaskCell'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const EditTaskPage = ({ patientId, taskId }) => {
  return (
    <MainLayout>
      <EditTaskCell patientId={patientId} taskId={taskId} />
    </MainLayout>
  )
}

export default EditTaskPage
