import {
  Form,
  FormError,
  FieldError,
  Label,
  SelectField,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

import timezones from './timezones'

const PatientForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.patient?.id)
  }

  // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <Form onSubmit={onSubmit} error={props.error}>
      <FormError
        error={props.error}
        wrapperClassName="w-full rounded-md border text-red-700 mb-4 py-3 px-6 bg-red-50"
        titleClassName="text-red-900"
        listClassName="text-red-700"
      />

      <Label
        name="name"
        className="mb-2 block text-base font-medium text-black"
        errorClassName="text-red-700"
      >
        Patient Name
        <p className="text-sm text-gray-700 font-normal mt-1">
          This is something that could be spoken to the patient to put them at
          ease.
        </p>
      </Label>

      <FieldError name="name" className="text-red-700 mb-2 text-sm block" />

      <TextField
        name="name"
        defaultValue={props.patient?.name}
        className="mb-4 w-full rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
        errorClassName="mb-6 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
        validation={{ required: "Please provide your patient's name" }}
      />

      <Label
        name="patientInfo"
        className="mb-2 block text-base font-medium text-black"
        errorClassName="text-red-700"
      >
        What is the patient&apos;s condition?
        <span className="text-sm ml-1 italic font-normal">(optional)</span>
      </Label>

      <FieldError
        name="patientInfo"
        className="text-red-700 mb-2 text-sm block"
      />

      <TextAreaField
        name="patientInfo"
        defaultValue={props.patient?.patientInfo}
        className="mb-4 h-36 w-full rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
        errorClassName="mb-6 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
      />

      <Label
        name="timezone"
        className="mb-2 block text-base font-medium text-black"
        errorClassName="text-red-700"
      >
        Where does the patient live?
        <p className="text-sm text-gray-700 font-normal mt-1">
          This will help to determine their timezone
        </p>
      </Label>

      <SelectField
        name="timezone"
        defaultValue={props.patient?.timezone}
        className="mb-6 w-full rounded-md border border-slate-200 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
        errorClassName="mb-6 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
        validation={{
          required: "Please provide the patient's general location",
        }}
      >
        {timezones.map((timezone, index) => (
          <option key={index} value={timezone}>
            {timezone}
          </option>
        ))}
      </SelectField>

      <FieldError name="timezone" className="text-red-700 mb-2 text-sm block" />

      <Submit
        disabled={props.loading}
        className="flex flex-row text-white bg-teal-500 items-center w-full px-4 py-2 mt-2 text-lg font-semibold rounded-lg md:w-auto md:inline md:mt-0 hover:text-white focus:text-white hover:bg-teal-400 focus:bg-teal-400 focus:outline-none focus:shadow-outline transition-colors"
      >
        Save Patient Details
      </Submit>
    </Form>
  )
}

export default PatientForm
