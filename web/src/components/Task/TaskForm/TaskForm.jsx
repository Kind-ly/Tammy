import { useState } from 'react'

import {
  Form,
  FormError,
  FieldError,
  Label,
  DateField,
  TextField,
  TimeField,
  Submit,
} from '@redwoodjs/forms'

import TaskRepetitionForm from 'src/components/Task/TaskForm/TaskRepetitionForm'
import { getDateWithOffset, getDayOfTheWeekToday } from 'src/lib/dateFunctions'

import TaskContext from './TaskContext'

const TaskForm = (props) => {
  const { patient } = props
  let date = new Date().getDate()
  date = date === 31 ? 30 : date
  const [repetition, setRepetition] = useState('no-repeat')
  const [repetitionCycles, setRepetitionCycles] = useState(1)
  const [repetitionPeriod, setRepetitionPeriod] = useState('week')
  const [repetitionOnMondays, setRepetitionOnMondays] = useState(
    getDayOfTheWeekToday() === 'Monday'
  )
  const [repetitionOnTuesdays, setRepetitionOnTuesdays] = useState(
    getDayOfTheWeekToday() === 'Tuesday'
  )
  const [repetitionOnWednesdays, setRepetitionOnWednesdays] = useState(
    getDayOfTheWeekToday() === 'Wednesday'
  )
  const [repetitionOnThursdays, setRepetitionOnThursdays] = useState(
    getDayOfTheWeekToday() === 'Thursday'
  )
  const [repetitionOnFridays, setRepetitionOnFridays] = useState(
    getDayOfTheWeekToday() === 'Friday'
  )
  const [repetitionOnSaturdays, setRepetitionOnSaturdays] = useState(
    getDayOfTheWeekToday() === 'Saturday'
  )
  const [repetitionOnSundays, setRepetitionOnSundays] = useState(
    getDayOfTheWeekToday() === 'Sunday'
  )
  const [repetitionOnXDateOfMonth, setRepetitionOnXDateOfMonth] = useState(date)
  const [repetitionOnFirstXDayOfMonth, setRepetitionOnFirstXDayOfMonth] =
    useState()
  const [repetitionEnd, setRepetitionEnd] = useState('date')
  const [repetitionUntil, setRepetitionUntil] = useState(getDateWithOffset(14))
  const [repetitionOccurrences, setRepetitionOccurrences] = useState(10)

  const onSubmit = (data) => {
    const taskFormData = {
      description: data.description,
      instructions: data.instructions,
      date: data.date,
      time: data.time,
      repetition,
      repetitionCycles,
      repetitionPeriod,
      repetitionOnMondays,
      repetitionOnTuesdays,
      repetitionOnWednesdays,
      repetitionOnThursdays,
      repetitionOnFridays,
      repetitionOnSaturdays,
      repetitionOnSundays,
      repetitionOnXDateOfMonth,
      repetitionOnFirstXDayOfMonth,
      repetitionEnd,
      repetitionUntil,
      repetitionOccurrences,
    }
    props.onSave(taskFormData, props?.task?.id)
  }

  return (
    <TaskContext.Provider
      value={{
        repetition,
        setRepetition,
        repetitionCycles,
        setRepetitionCycles,
        repetitionPeriod,
        setRepetitionPeriod,
        repetitionOnMondays,
        setRepetitionOnMondays,
        repetitionOnTuesdays,
        setRepetitionOnTuesdays,
        repetitionOnWednesdays,
        setRepetitionOnWednesdays,
        repetitionOnThursdays,
        setRepetitionOnThursdays,
        repetitionOnFridays,
        setRepetitionOnFridays,
        repetitionOnSaturdays,
        setRepetitionOnSaturdays,
        repetitionOnSundays,
        setRepetitionOnSundays,
        repetitionOnFirstXDayOfMonth,
        setRepetitionOnFirstXDayOfMonth,
        repetitionOnXDateOfMonth,
        setRepetitionOnXDateOfMonth,
        repetitionEnd,
        setRepetitionEnd,
        repetitionUntil,
        setRepetitionUntil,
        repetitionOccurrences,
        setRepetitionOccurrences,
      }}
    >
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="w-full rounded-md border text-red-700 mb-4 py-3 px-6 bg-red-50"
          titleClassName="text-red-900"
          listClassName="text-red-700"
        />

        <div className="mb-4">
          <Label
            name="description"
            className="mb-2 block text-base font-medium text-black"
            errorClassName="mb-2 block text-base font-medium text-red-700"
          >
            Action to be taken
            <p className="text-sm text-gray-700 font-normal mt-1">
              This is the action that will be given to the patient in reminders.
              It should start with a verb and contain a noun (e.g. &ldquo;Take
              your medicine&rdquo;, or &ldquo;Go for a walk&rdquo;)
            </p>
          </Label>

          <TextField
            name="description"
            defaultValue={props.task?.description}
            className="mb-2 w-full rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
            errorClassName="mb-2 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
            validation={{
              required: 'Please provide a description for the action',
            }}
            placeholder="e.g. Take your medicine"
          />

          <FieldError
            name="description"
            className="text-red-700 text-sm block"
          />
        </div>

        <div className="mb-4">
          <Label
            name="instructions"
            className="mb-2 block text-base font-medium text-black"
            errorClassName="mb-2 block text-base font-medium text-red-700"
          >
            Instructions
            <span className="text-sm ml-1 italic font-normal">(optional)</span>
            <p className="text-sm text-gray-700 font-normal mt-1">
              This is guidance that can be given to the patient to help them
              complete the action. For example, &ldquo;The medicine is called
              Aspirin and it&apos;s in the cupboard behind the mirror.&rdquo;
            </p>
          </Label>

          <TextField
            name="instructions"
            defaultValue={props.task?.instructions}
            className="mb-2 w-full rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
            errorClassName="mb-2 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
            placeholder="e.g. The medicine is in the drawer in a blue box. Take 1 pill only."
          />

          <FieldError
            name="instructions"
            className="text-red-700 text-sm block"
          />
        </div>

        <div className="mb-4">
          <Label
            name="date"
            className="mb-2 block text-base font-medium text-black"
            errorClassName="mb-2 block text-base font-medium text-red-700"
          >
            Start Date
            <p className="text-sm text-gray-700 font-normal mt-1">
              When should {patient.name} start taking this action?
            </p>
          </Label>

          <DateField
            name="date"
            defaultValue={props.task?.date}
            className="mb-2 w-full rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
            errorClassName="mb-2 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
            validation={{
              required: 'Please provide a start date for this action',
              valueAsDate: true,
              min: {
                value: new Date(getDateWithOffset(0)),
                message: 'The start date cannot be in the past',
              },
              max: {
                value: new Date(getDateWithOffset(365)),
                message: 'Please schedule within the next year',
              },
            }}
          />

          <FieldError name="date" className="text-red-700 text-sm block" />
        </div>

        <div className="mb-4">
          <Label
            name="time"
            className="mb-2 block text-base font-medium text-black"
            errorClassName="mb-2 block text-base font-medium text-red-700"
          >
            Time of Day
          </Label>

          <TimeField
            name="time"
            defaultValue={props.task?.time}
            className="mb-2 w-full rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
            errorClassName="mb-2 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
            validation={{ required: 'Please provide a time' }}
          />

          <FieldError name="time" className="text-red-700 text-sm block" />
        </div>

        <TaskRepetitionForm />

        <Submit
          disabled={props.loading}
          className="flex flex-row text-white bg-teal-500 items-center w-full px-4 py-2 text-lg font-semibold rounded-lg md:w-auto md:inline md:mt-0 hover:text-white focus:text-white hover:bg-teal-400 focus:bg-teal-400 focus:outline-none focus:shadow-outline transition-colors"
        >
          Save Task
        </Submit>
      </Form>
    </TaskContext.Provider>
  )
}

export default TaskForm
