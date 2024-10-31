import { useState } from 'react'

import {
  Form,
  FormError,
  FieldError,
  Label,
  SelectField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const getDateToday = () => {
  const d = new Date()
  return d.toLocaleDateString('en-SG', { month: 'short', day: '2-digit' })
}

const getDayOfTheWeekToday = () => {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const d = new Date()
  return dayNames[d.getDay()]
}

const TaskForm = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [repetition, setRepetition] = useState('no-repeat')
  const { patient } = props
  const onSubmit = (data) => {
    props.onSave(data, props?.task?.id)
  }

  return (
    <Form onSubmit={onSubmit} error={props.error}>
      <FormError
        error={props.error}
        wrapperClassName="w-full rounded-md border text-red-700 mb-4 py-3 px-6 bg-red-50"
        titleClassName="text-red-900"
        listClassName="text-red-700"
      />

      <div className="block mb-4">
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

        <TextField
          name="date"
          defaultValue={props.task?.date}
          className="mb-2 w-full rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
          errorClassName="mb-2 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
          validation={{
            required: 'Please provide a start date for this action',
          }}
        />

        <FieldError name="date" className="text-red-700 text-sm block" />
      </div>

      <div className="block mb-4">
        <Label
          name="time"
          className="mb-2 block text-base font-medium text-black"
          errorClassName="mb-2 block text-base font-medium text-red-700"
        >
          Time of Day
        </Label>

        <TextField
          name="time"
          defaultValue={props.task?.time}
          className="mb-2 w-full rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
          errorClassName="mb-2 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
          validation={{ required: 'Please provide a time' }}
        />

        <FieldError name="time" className="text-red-700 text-sm block" />
      </div>

      <div className="block mb-4">
        <Label
          name="repetition"
          className="mb-2 block text-base font-medium text-black"
          errorClassName="text-red-700"
        >
          Repetition
        </Label>

        <div className="relative select-wrapper inline-block">
          <SelectField
            name="repetition"
            className="select text-gray-900 bg-white border border-slate-200 w-full pl-4 pr-12 py-3 text-left rounded-lg md:w-auto md:inline hover:text-teal-600 focus:text-teal-600 focus:outline-none focus:shadow-outline cursor-pointer appearance-none"
            onChange={(event) => {
              setRepetition(event.target.value)
              if (event.target.value === 'custom') setModalIsOpen(true)
            }}
            value={repetition}
          >
            <option value="no-repeat">Does not repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly on {getDayOfTheWeekToday()}</option>
            <option value="annually">Annually on {getDateToday()}</option>
            <option value="weekdays">Every weekday</option>
            <option value="custom">Custom...</option>
          </SelectField>
        </div>
      </div>

      <div className="block mb-4">
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

        <FieldError name="description" className="text-red-700 text-sm block" />
      </div>

      <div className="block mb-6">
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

      <Submit
        disabled={props.loading}
        className="flex flex-row text-white bg-teal-500 items-center w-full px-4 py-2 text-lg font-semibold rounded-lg md:w-auto md:inline md:mt-0 hover:text-white focus:text-white hover:bg-teal-400 focus:bg-teal-400 focus:outline-none focus:shadow-outline transition-colors"
      >
        Save Task
      </Submit>

      <div
        className={
          modalIsOpen
            ? 'fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-70 py-10 opacity-100 transition-opacity'
            : 'fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-70 py-10 pointer-events-none opacity-0 transition-opacity'
        }
      >
        <div
          className={
            modalIsOpen
              ? 'max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white shadow-[0_15px_30px_-15px_rgba(0,0,0,0.6)] opacity-100 transition-all delay-400'
              : 'max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white shadow-[0_15px_30px_-15px_rgba(0,0,0,0.6)] opacity-0 transition-all -translate-y-24'
          }
        >
          <div className="w-full p-6 overflow-y-scroll">
            <h3 className="text-lg mb-4">Custom recurrence</h3>
            <div className="flex flex-row mb-4">Repeat every</div>
            <div className="mb-4">Repeat on</div>
            <div className="mb-4">Ends</div>
            <div className="flex flex-row justify-end">
              <button
                className="appearance-none mr-4 text-slate-500 font-semibold"
                onClick={(event) => {
                  event.preventDefault()
                  setRepetition('no-repeat')
                  setModalIsOpen(false)
                }}
              >
                Cancel
              </button>
              <span>Done</span>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default TaskForm
