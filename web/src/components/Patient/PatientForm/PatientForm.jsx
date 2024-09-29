import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const PatientForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.patient?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.patient?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="patientInfo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Patient info
        </Label>

        <TextField
          name="patientInfo"
          defaultValue={props.patient?.patientInfo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="patientInfo" className="rw-field-error" />

        <Label
          name="timezone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Timezone
        </Label>

        <TextField
          name="timezone"
          defaultValue={props.patient?.timezone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="timezone" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PatientForm
