// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Actions" titleTo="actions" buttonLabel="New Action" buttonTo="newAction">
        <Route path="/actions/new" page={ActionNewActionPage} name="newAction" />
        <Route path="/actions/{id:Int}/edit" page={ActionEditActionPage} name="editAction" />
        <Route path="/actions/{id:Int}" page={ActionActionPage} name="action" />
        <Route path="/actions" page={ActionActionsPage} name="actions" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Reminders" titleTo="reminders" buttonLabel="New Reminder" buttonTo="newReminder">
        <Route path="/reminders/new" page={ReminderNewReminderPage} name="newReminder" />
        <Route path="/reminders/{id:Int}/edit" page={ReminderEditReminderPage} name="editReminder" />
        <Route path="/reminders/{id:Int}" page={ReminderReminderPage} name="reminder" />
        <Route path="/reminders" page={ReminderRemindersPage} name="reminders" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Tasks" titleTo="tasks" buttonLabel="New Task" buttonTo="newTask">
        <Route path="/tasks/new" page={TaskNewTaskPage} name="newTask" />
        <Route path="/tasks/{id:Int}/edit" page={TaskEditTaskPage} name="editTask" />
        <Route path="/tasks/{id:Int}" page={TaskTaskPage} name="task" />
        <Route path="/tasks" page={TaskTasksPage} name="tasks" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Devices" titleTo="devices" buttonLabel="New Device" buttonTo="newDevice">
        <Route path="/devices/new" page={DeviceNewDevicePage} name="newDevice" />
        <Route path="/devices/{id:Int}/edit" page={DeviceEditDevicePage} name="editDevice" />
        <Route path="/devices/{id:Int}" page={DeviceDevicePage} name="device" />
        <Route path="/devices" page={DeviceDevicesPage} name="devices" />
      </Set>
      <Set wrap={ScaffoldLayout} title="CareGivers" titleTo="careGivers" buttonLabel="New CareGiver" buttonTo="newCareGiver">
        <Route path="/care-givers/new" page={CareGiverNewCareGiverPage} name="newCareGiver" />
        <Route path="/care-givers/{id:Int}/edit" page={CareGiverEditCareGiverPage} name="editCareGiver" />
        <Route path="/care-givers/{id:Int}" page={CareGiverCareGiverPage} name="careGiver" />
        <Route path="/care-givers" page={CareGiverCareGiversPage} name="careGivers" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Patients" titleTo="patients" buttonLabel="New Patient" buttonTo="newPatient">
        <Route path="/patients/new" page={PatientNewPatientPage} name="newPatient" />
        <Route path="/patients/{id:Int}/edit" page={PatientEditPatientPage} name="editPatient" />
        <Route path="/patients/{id:Int}" page={PatientPatientPage} name="patient" />
        <Route path="/patients" page={PatientPatientsPage} name="patients" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
