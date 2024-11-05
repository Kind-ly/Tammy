// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { PrivateSet, Router, Route } from '@redwoodjs/router'

import { useAuth } from './auth'
import MainLayout from './layouts/MainLayout/MainLayout'

// import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/" page={HomePage} name="home" />

      {/* PATIENTS & TASKS */}
      <PrivateSet unauthenticated="home" wrap={MainLayout}>
        <Route path="/patients" page={PatientPatientsPage} name="patients" />
        <Route path="/patients/new" page={PatientNewPatientPage} name="newPatient" />
        <Route path="/patients/{id:String}" page={PatientPatientPage} name="patient" />
        <Route path="/patients/{id:String}/edit" page={PatientEditPatientPage} name="editPatient" />
        <Route path="/patients/{id:String}/tasks/new" page={TaskNewTaskPage} name="newTask" />
        <Route path="/patients/{patientId:String}/tasks/{taskId:String}/edit" page={TaskEditTaskPage} name="editTask" />
      </PrivateSet>

      <PrivateSet unauthenticated="home" roles="admin" wrap={MainLayout}>
        <Route path="/admin/devices" page={AdminDevicesPage} name="devices" />
        <Route path="/admin/devices/new" page={AdminNewDevicePage} name="newDevice" />
        <Route path="/admin/devices/{id:Int}/edit" page={AdminEditDevicePage} name="editDevice" />
      </PrivateSet>

      {/* <Set wrap={ScaffoldLayout} title="CareGivers" titleTo="careGivers" buttonLabel="New CareGiver" buttonTo="newCareGiver">
        <Route path="/care-givers/new" page={CareGiverNewCareGiverPage} name="newCareGiver" />
        <Route path="/care-givers/{id:Int}/edit" page={CareGiverEditCareGiverPage} name="editCareGiver" />
        <Route path="/care-givers/{id:Int}" page={CareGiverCareGiverPage} name="careGiver" />
        <Route path="/care-givers" page={CareGiverCareGiversPage} name="careGivers" />
      </Set> */}
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
