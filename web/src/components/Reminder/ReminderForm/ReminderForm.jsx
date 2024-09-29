import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const ReminderForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.reminder?.id)
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
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <TextField
          name="date"
          defaultValue={props.reminder?.date}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="time"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Time
        </Label>

        <TextField
          name="time"
          defaultValue={props.reminder?.time}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="time" className="rw-field-error" />

        <Label
          name="patientId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Patient id
        </Label>

        <NumberField
          name="patientId"
          defaultValue={props.reminder?.patientId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="patientId" className="rw-field-error" />

        <Label
          name="taskId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Task id
        </Label>

        <NumberField
          name="taskId"
          defaultValue={props.reminder?.taskId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="taskId" className="rw-field-error" />

        <Label
          name="instructions"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Instructions
        </Label>

        <TextField
          name="instructions"
          defaultValue={props.reminder?.instructions}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="instructions" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ReminderForm
