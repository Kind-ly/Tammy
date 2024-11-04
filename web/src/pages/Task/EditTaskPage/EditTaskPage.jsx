import EditTaskCell from 'src/components/Task/EditTaskCell'

const EditTaskPage = ({ patientId, taskId }) => {
  return <EditTaskCell patientId={patientId} taskId={taskId} />
}

export default EditTaskPage
