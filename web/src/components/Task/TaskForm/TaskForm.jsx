import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const TaskForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.task?.id)
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
          defaultValue={props.task?.date}
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
          defaultValue={props.task?.time}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="time" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.task?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="instructions"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Instructions
        </Label>

        <TextField
          name="instructions"
          defaultValue={props.task?.instructions}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="instructions" className="rw-field-error" />

        <Label
          name="patientId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Patient id
        </Label>

        <NumberField
          name="patientId"
          defaultValue={props.task?.patientId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="patientId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TaskForm
