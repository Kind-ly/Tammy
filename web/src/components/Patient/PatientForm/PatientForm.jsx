import {
  Form,
  FormError,
  FieldError,
  Label,
  SelectField,
  TextField,
  TextAreaField,
  Submit,
  NumberField,
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
        Patient name
        <p className="mt-1 text-sm font-normal text-gray-700">
          This is something that could be spoken to the patient to put them at
          ease.
        </p>
      </Label>

      <FieldError name="name" className="mb-2 block text-sm text-red-700" />

      <TextField
        name="name"
        defaultValue={props.patient?.name}
        className="mb-4 w-full rounded-md border border-slate-200 bg-white px-6 py-3 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
        errorClassName="mb-4 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
        validation={{ required: "Please provide your patient's name" }}
      />

      <Label
        name="patientInfo"
        className="mb-2 block text-base font-medium text-black"
        errorClassName="text-red-700"
      >
        What is the patient&apos;s condition?
        <span className="ml-1 text-sm font-normal italic">(optional)</span>
      </Label>

      <FieldError
        name="patientInfo"
        className="mb-2 block text-sm text-red-700"
      />

      <TextAreaField
        name="patientInfo"
        defaultValue={props.patient?.patientInfo}
        className="mb-4 h-36 w-full rounded-md border border-slate-200 bg-white px-6 py-3 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
        errorClassName="mb-4 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
      />

      <Label
        name="timezone"
        className="mb-2 block text-base font-medium text-black"
        errorClassName="text-red-700"
      >
        What is the patient&apos;s timezone?
      </Label>

      <SelectField
        name="timezone"
        defaultValue={props.patient?.timezone}
        className="mb-4 w-full rounded-md border border-slate-200 bg-white px-6 py-3 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
        errorClassName="mb-4 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
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

      <FieldError name="timezone" className="mb-2 block text-sm text-red-700" />

      <Label
        name="timezone"
        className="mb-2 block text-base font-medium text-black"
        errorClassName="text-red-700"
      >
        ID number of the patient&apos;s Tammy device
      </Label>

      <NumberField
        name="deviceId"
        defaultValue={props.patient?.deviceId}
        className="mb-6 w-full rounded-md border border-slate-200 bg-white px-6 py-3 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
        errorClassName="mb-6 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
        min={1}
        max={999999999}
        validation={{
          min: 'The device ID must be a positive integer',
          max: 'The device ID must be with 9 digits',
        }}
      />

      <FieldError name="deviceId" className="mb-2 block text-sm text-red-700" />

      <Submit
        disabled={props.loading}
        className="focus:shadow-outline mt-2 flex w-full flex-row items-center rounded-lg bg-teal-500 px-4 py-2 text-lg font-semibold text-white transition-colors hover:bg-teal-400 hover:text-white focus:bg-teal-400 focus:text-white focus:outline-none md:mt-0 md:inline md:w-auto"
      >
        Save Patient Details
      </Submit>
    </Form>
  )
}

export default PatientForm
