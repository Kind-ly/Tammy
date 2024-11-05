import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const DeviceForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.device?.id)
  }

  // const randdomID = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000

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
        Device ID
      </Label>

      <FieldError name="name" className="mb-2 block text-sm text-red-700" />

      <NumberField
        name="id"
        defaultValue={props.device?.id}
        className="mb-4 w-full rounded-md border border-slate-200 bg-white px-6 py-3 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
        errorClassName="mb-6 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
        min={1}
        max={9999}
        validation={{
          min: 1,
          max: 9999,
          required: 'Please provide the device ID',
        }}
      />

      <Submit
        disabled={props.loading}
        className="focus:shadow-outline mt-2 flex w-full flex-row items-center rounded-lg bg-teal-500 px-4 py-2 text-lg font-semibold text-white transition-colors hover:bg-teal-400 hover:text-white focus:bg-teal-400 focus:text-white focus:outline-none md:mt-0 md:inline md:w-auto"
      >
        Save Device
      </Submit>
    </Form>
  )
}

export default DeviceForm
