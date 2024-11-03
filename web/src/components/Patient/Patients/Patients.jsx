import { Link, routes } from '@redwoodjs/router'
// import { useMutation } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/toast'

// import { QUERY } from 'src/components/Patient/PatientsCell'

// const DELETE_PATIENT_MUTATION = gql`
//   mutation DeletePatientMutation($id: String!) {
//     deletePatient(id: $id) {
//       id
//     }
//   }
// `

const PatientsList = ({ patients }) => {
  // const [deletePatient] = useMutation(DELETE_PATIENT_MUTATION, {
  //   onCompleted: () => {
  //     toast.success('Patient deleted')
  //   },
  //   onError: (error) => {
  //     toast.error(error.message)
  //   },
  //   // This refetches the query on the list page. Read more about other ways to
  //   // update the cache over here:
  //   // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
  //   refetchQueries: [{ query: QUERY }],
  //   awaitRefetchQueries: true,
  // })

  // const onDeleteClick = (id) => {
  //   if (confirm('Are you sure you want to delete patient ' + id + '?')) {
  //     deletePatient({ variables: { id } })
  //   }
  // }

  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr className="border-b border-slate-300 bg-slate-200">
            <th className="p-4 text-sm font-normal leading-none text-slate-700">
              Name
            </th>
            <th className="p-4 text-sm font-normal leading-none text-slate-700">
              Most recent activity
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="hover:bg-slate-50">
              <td className="border-b border-slate-200">
                <Link
                  className="block p-4 py-5 focus:text-teal-600 hover:text-teal-600 transition-colors"
                  to={routes.patient({ id: patient.id })}
                  title={'Check up on ' + patient.name}
                >
                  {patient.name}
                </Link>
              </td>
              <td className="p-4 border-b border-slate-200 py-5">
                {/* Things to show here: last update, warnings */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PatientsList
