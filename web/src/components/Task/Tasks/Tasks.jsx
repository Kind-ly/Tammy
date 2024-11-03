import Task from 'src/components/Task/Task'

const Tasks = ({ patientId, tasks, refetch }) => {
  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr className="border-b border-slate-300 bg-slate-200">
          <th className="p-2 pl-4">Time</th>
          <th className="p-2">Description</th>
          <th className="p-2">Status</th>
          <th className="p-2 pr-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <Task
            key={task.id}
            patientId={patientId}
            task={task}
            refetch={refetch}
          />
        ))}
      </tbody>
    </table>
  )
}

export default Tasks
