import {
  Form,
  FormError,
  FieldError,
  EmailField,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { Metadata } from '@redwoodjs/web'

const UserForm = ({ user, onSave, error, loading }) => {
  const onSubmit = (data) => {
    onSave(data, user?.id)
  }
  return (
    <Form onSubmit={onSubmit} error={error}>
      <Metadata title={user.name} description={user.name + "'s profile"} />
      <FormError
        error={error}
        wrapperClassName="w-full rounded-md border text-red-700 mb-4 py-3 px-6 bg-red-50"
        titleClassName="text-red-900"
        listClassName="text-red-700"
      />

      <Label
        name="name"
        className="mb-2 block text-base font-medium text-black"
        errorClassName="text-red-700"
      >
        Your name
      </Label>

      <FieldError name="name" className="mb-2 block text-sm text-red-700" />

      <TextField
        name="name"
        defaultValue={user?.name}
        className="mb-4 w-full rounded-md border border-slate-200 bg-white px-6 py-3 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
        errorClassName="mb-4 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
        validation={{ required: 'Please provide your name' }}
      />

      <Label
        name="email"
        className="mb-2 block text-base font-medium text-black"
        errorClassName="text-red-700"
      >
        Your email address
      </Label>

      <FieldError name="email" className="mb-2 block text-sm text-red-700" />

      <EmailField
        name="email"
        defaultValue={user?.email}
        disabled
        className="disabled mb-4 w-full rounded-md border border-slate-200 bg-white px-6 py-3 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      />

      <Label
        name="phoneNumber"
        className="mb-2 block text-base font-medium text-black"
        errorClassName="text-red-700"
      >
        Your phone number
        <p className="mt-1 text-sm font-normal text-gray-700">
          This might be shared with a patient if they need to contact you.
        </p>
      </Label>

      <FieldError
        name="phoneNumber"
        className="mb-2 block text-sm text-red-700"
      />

      <TextField
        name="phoneNumber"
        defaultValue={user?.phoneNumber}
        className="mb-4 w-full rounded-md border border-slate-200 bg-white px-6 py-3 text-base font-medium text-black outline-none focus:border-teal-300 focus:shadow-md"
        errorClassName="mb-4 w-full rounded-md border py-3 px-6 text-base font-medium outline-none focus:border-red-400 focus:shadow-md bg-red-50 border-red-500 text-red-900"
        validation={{ required: 'Please provide your phone number' }}
      />

      <Submit
        disabled={loading}
        className="focus:shadow-outline mt-2 flex w-full flex-row items-center rounded-lg bg-teal-500 px-4 py-2 text-lg font-semibold text-white transition-colors hover:bg-teal-400 hover:text-white focus:bg-teal-400 focus:text-white focus:outline-none md:mt-0 md:inline md:w-auto"
      >
        Save Profile
      </Submit>
      {/* email */}
      {/* phoneNumber */}
    </Form>
  )
}

export default UserForm
