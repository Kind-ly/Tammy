import { useContext } from 'react'

import {
  Label,
  CheckboxField,
  DateField,
  RadioField,
  SelectField,
  NumberField,
  FieldError,
} from '@redwoodjs/forms'

import {
  getDateWithOffset,
  getDayOfTheWeekToday,
  getEnumerationForDate,
} from 'src/lib/dateFunctions'

import TaskContext from './TaskContext'

const TaskCustomRepetitionModal = (props) => {
  const modalIsOpen = props.modalIsOpen
  const setModalIsOpen = props.setModalIsOpen
  const {
    // repetition,
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
    // repetitionOnXDateOfMonth,
    setRepetitionOnXDateOfMonth,
    // repetitionOnFirstXDayOfMonth,
    setRepetitionOnFirstXDayOfMonth,
    repetitionEnd,
    setRepetitionEnd,
    repetitionUntil,
    setRepetitionUntil,
    repetitionOccurrences,
    setRepetitionOccurrences,
  } = useContext(TaskContext)

  let date = new Date().getDate()
  date = date === 31 ? 30 : date

  // const { onChange, name } = register('repeat-on-days')
  const atLeastOneDayChecked = (selectedDays) => {
    return selectedDays.length > 0
  }

  return (
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
          <div className="flex flex-row items-center mb-4">
            <span>Repeat every</span>
            <NumberField
              name="repeat-every-value"
              min={1}
              max={51}
              step={1}
              defaultValue={repetitionCycles}
              className="bg-slate-200 rounded-lg py-3 px-2 text-sm font-semibold text-center ml-1"
              onChange={(event) => setRepetitionCycles(event.target.value)}
            />
            <SelectField
              name="repeat-every-duration"
              defaultValue={repetitionPeriod}
              className="bg-slate-200 rounded-lg py-3 px-2 text-sm font-semibold text-center ml-1 appearance-none"
              onChange={(event) => setRepetitionPeriod(event.target.value)}
            >
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
              <option value="year">year</option>
            </SelectField>
          </div>
          {repetitionPeriod === 'week' && (
            <div className="mb-4">
              <p className="mb-2">Repeat on</p>
              <CheckboxField
                name="repeat-on-days"
                defaultChecked={repetitionOnMondays}
                className="bg-slate-200 checked:bg-teal-500 text-slate-700 checked:text-white relative text-sm font-bold uppercase text-center w-8 h-8 rounded-full appearance-none cursor-pointer after:content-['M'] after:top-2/4 after:absolute after:left-2/4 after:transform after:-translate-x-1/2 after:-translate-y-1/2 mr-2"
                onChange={(event) => {
                  setRepetitionOnMondays(event.target.checked)
                }}
                validation={{
                  validate:
                    atLeastOneDayChecked || 'Please select at least one day',
                }}
              />
              <CheckboxField
                name="repeat-on-days"
                defaultChecked={repetitionOnTuesdays}
                className="bg-slate-200 checked:bg-teal-500 text-slate-700 checked:text-white relative text-sm font-bold uppercase text-center w-8 h-8 rounded-full appearance-none cursor-pointer after:content-['T'] after:top-2/4 after:absolute after:left-2/4 after:transform after:-translate-x-1/2 after:-translate-y-1/2 mr-2"
                onChange={(event) => {
                  setRepetitionOnTuesdays(event.target.checked)
                }}
                validation={{
                  validate:
                    atLeastOneDayChecked || 'Please select at least one day',
                }}
              />
              <CheckboxField
                name="repeat-on-days"
                defaultChecked={repetitionOnWednesdays}
                className="bg-slate-200 checked:bg-teal-500 text-slate-700 checked:text-white relative text-sm font-bold uppercase text-center w-8 h-8 rounded-full appearance-none cursor-pointer after:content-['W'] after:top-2/4 after:absolute after:left-2/4 after:transform after:-translate-x-1/2 after:-translate-y-1/2 mr-2"
                onChange={(event) => {
                  setRepetitionOnWednesdays(event.target.checked)
                }}
                validation={{
                  validate:
                    atLeastOneDayChecked || 'Please select at least one day',
                }}
              />
              <CheckboxField
                name="repeat-on-days"
                defaultChecked={repetitionOnThursdays}
                className="bg-slate-200 checked:bg-teal-500 text-slate-700 checked:text-white relative text-sm font-bold uppercase text-center w-8 h-8 rounded-full appearance-none cursor-pointer after:content-['T'] after:top-2/4 after:absolute after:left-2/4 after:transform after:-translate-x-1/2 after:-translate-y-1/2 mr-2"
                onChange={(event) => {
                  setRepetitionOnThursdays(event.target.checked)
                }}
                validation={{
                  validate:
                    atLeastOneDayChecked || 'Please select at least one day',
                }}
              />
              <CheckboxField
                name="repeat-on-days"
                defaultChecked={repetitionOnFridays}
                className="bg-slate-200 checked:bg-teal-500 text-slate-700 checked:text-white relative text-sm font-bold uppercase text-center w-8 h-8 rounded-full appearance-none cursor-pointer after:content-['F'] after:top-2/4 after:absolute after:left-2/4 after:transform after:-translate-x-1/2 after:-translate-y-1/2 mr-2"
                onChange={(event) => {
                  setRepetitionOnFridays(event.target.checked)
                }}
                validation={{
                  validate:
                    atLeastOneDayChecked || 'Please select at least one day',
                }}
              />
              <CheckboxField
                name="repeat-on-days"
                defaultChecked={repetitionOnSaturdays}
                className="bg-slate-200 checked:bg-teal-500 text-slate-700 checked:text-white relative text-sm font-bold uppercase text-center w-8 h-8 rounded-full appearance-none cursor-pointer after:content-['S'] after:top-2/4 after:absolute after:left-2/4 after:transform after:-translate-x-1/2 after:-translate-y-1/2 mr-2"
                onChange={(event) => {
                  setRepetitionOnSaturdays(event.target.checked)
                }}
                validation={{
                  validate:
                    atLeastOneDayChecked || 'Please select at least one day',
                }}
              />
              <CheckboxField
                name="repeat-on-days"
                defaultChecked={repetitionOnSundays}
                className="bg-slate-200 checked:bg-teal-500 text-slate-700 checked:text-white relative text-sm font-bold uppercase text-center w-8 h-8 rounded-full appearance-none cursor-pointer after:content-['S'] after:top-2/4 after:absolute after:left-2/4 after:transform after:-translate-x-1/2 after:-translate-y-1/2 mr-2"
                onChange={(event) => {
                  setRepetitionOnSundays(event.target.checked)
                }}
                validation={{
                  validate:
                    atLeastOneDayChecked || 'Please select at least one day',
                }}
              />
              <FieldError
                name="repeat-on-days"
                className="text-red-700 text-sm block"
              />
            </div>
          )}
          {repetitionPeriod === 'month' && (
            <div className="mb-4">
              <SelectField
                name="repeat-monthly"
                defaultValue={'date'}
                className="bg-slate-200 rounded-lg py-3 px-2 text-sm font-semibold text-center ml-1 appearance-none"
                onChange={(event) => {
                  if (event.target.value === 'date') {
                    setRepetitionOnXDateOfMonth(date)
                    setRepetitionOnFirstXDayOfMonth(undefined)
                  }
                  if (event.target.value === 'firstDay') {
                    setRepetitionOnXDateOfMonth(undefined)
                    setRepetitionOnFirstXDayOfMonth(getDayOfTheWeekToday())
                  }
                }}
              >
                <option value="date">
                  Monthly on the {date}
                  {getEnumerationForDate(getDateWithOffset(0))}
                </option>
                <option value="firstDay">
                  Monthly on the first {getDayOfTheWeekToday()}
                </option>
              </SelectField>
            </div>
          )}
          <div className="mb-4">
            <p className="mb-4">Ends</p>
            <div className="mb-3 flex flex-row items-center">
              <RadioField
                name="repeat-end"
                id="date"
                value="date"
                className="w-5 h-5 accent-teal-500 cursor-pointer"
                defaultChecked={repetitionEnd === 'date'}
                onChange={(event) => {
                  setRepetitionEnd(event.target.value)
                }}
              />
              <Label
                name="date"
                className="ml-2 inline-block text-base font-medium text-black cursor-pointer"
              >
                On
              </Label>
              <DateField
                name="repeat-until"
                defaultValue={repetitionUntil}
                className="ml-4 bg-slate-200 rounded-lg py-3 px-2 text-sm font-semibold text-center ml-1 appearance-none cursor-pointer disabled:cursor-default disabled:text-slate-500 disabled:bg-slate-100"
                errorClassName="ml-4 bg-red-200 rounded-lg py-3 px-2 text-sm font-semibold text-center ml-1 appearance-none cursor-pointer disabled:cursor-default disabled:text-slate-500 disabled:bg-slate-100"
                disabled={repetitionEnd !== 'date'}
                min={getDateWithOffset(1)}
                max={getDateWithOffset(1825)}
                onChange={(event) => {
                  setRepetitionUntil(event.target.value)
                }}
                validation={{
                  required: 'Please provide an end date for this action',
                  valueAsDate: true,
                  min: {
                    value: new Date(getDateWithOffset(1)),
                    message: 'The end date should be no earlier than tomorrow',
                  },
                  max: {
                    value: new Date(getDateWithOffset(1825)),
                    message: 'Please schedule within the next 5 years',
                  },
                }}
              />
            </div>
            <div className="mb-3 flex flex-row items-center">
              <RadioField
                name="repeat-end"
                id="occurrences"
                value="occurrences"
                className="w-5 h-5 accent-teal-500 cursor-pointer"
                defaultChecked={repetitionEnd === 'occurrences'}
                onChange={(event) => {
                  setRepetitionEnd(event.target.value)
                }}
              />
              <Label
                name="occurrences"
                className="ml-2 inline-block text-base font-medium text-black cursor-pointer"
              >
                After
              </Label>
              <NumberField
                name="repeat-after"
                min={1}
                max={51}
                step={1}
                defaultValue={repetitionOccurrences}
                className="ml-4 mr-2 bg-slate-200 rounded-lg py-3 px-2 text-sm font-semibold text-center ml-1 appearance-none cursor-pointer disabled:cursor-default disabled:text-slate-500 disabled:bg-slate-100"
                disabled={repetitionEnd !== 'occurrences'}
                onChange={(event) => {
                  setRepetitionOccurrences(event.target.value)
                }}
              />
              <span>occurrences</span>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <button
              className="appearance-none mr-4 text-slate-500 font-semibold focus:outline-none"
              onClick={(event) => {
                event.preventDefault()
                setRepetition('no-repeat')
                setModalIsOpen(false)
              }}
            >
              Cancel
            </button>
            <button
              className="appearance-none mr-4 text-teal-500 font-bold focus:outline-none"
              onClick={(event) => {
                event.preventDefault()
                setModalIsOpen(false)
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCustomRepetitionModal
