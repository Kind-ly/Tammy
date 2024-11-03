import { useContext, useState } from 'react'

import { Label, SelectField } from '@redwoodjs/forms'

import {
  getDayOfTheWeekToday,
  getEnumerationForDate,
  getReadableDateToday,
} from 'src/lib/dateFunctions'

import TaskContext from './TaskContext'
import TaskCustomRepetitionModal from './TaskCustomRepetitionModal'

const TaskRepetitionForm = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const {
    repetition,
    setRepetition,
    repetitionCycles,
    // setRepetitionCycles,
    repetitionPeriod,
    // setRepetitionPeriod,
    repetitionOnMondays,
    // setRepetitionOnMondays,
    repetitionOnTuesdays,
    // setRepetitionOnTuesdays,
    repetitionOnWednesdays,
    // setRepetitionOnWednesdays,
    repetitionOnThursdays,
    // setRepetitionOnThursdays,
    repetitionOnFridays,
    // setRepetitionOnFridays,
    repetitionOnSaturdays,
    // setRepetitionOnSaturdays,
    repetitionOnSundays,
    // setRepetitionOnSundays,
    repetitionOnXDateOfMonth,
    // setRepetitionOnXDateOfMonth,
    repetitionOnFirstXDayOfMonth,
    // setRepetitionOnFirstXDayOfMonth,
    repetitionEnd,
    // setRepetitionEnd,
    repetitionUntil,
    // setRepetitionUntil,
    repetitionOccurrences,
    // setRepetitionOccurrences,
  } = useContext(TaskContext)

  const getRepetitionDescription = () => {
    let description = `Repeat every ${repetitionCycles} ${repetitionPeriod}${repetitionCycles > 1 ? 's' : ''} `
    if (repetitionPeriod === 'week') {
      description += `on `
      if (repetitionOnMondays) description += 'Mondays, '
      if (repetitionOnTuesdays) description += 'Tuesdays, '
      if (repetitionOnWednesdays) description += 'Wednesdays, '
      if (repetitionOnThursdays) description += 'Thursdays, '
      if (repetitionOnFridays) description += 'Fridays, '
      if (repetitionOnSaturdays) description += 'Saturdays, '
      if (repetitionOnSundays) description += 'Sundays, '
    }
    if (repetitionPeriod === 'month') {
      if (repetitionOnXDateOfMonth) {
        description += `on the ${repetitionOnXDateOfMonth}${getEnumerationForDate(repetitionOnXDateOfMonth)} `
      }
      if (repetitionOnFirstXDayOfMonth)
        description += `on the first ${repetitionOnFirstXDayOfMonth} `

      description += `of every month `
    }
    if (repetitionEnd === 'date')
      description += ` until ${new Date(repetitionUntil).toLocaleDateString('en-SG', { year: 'numeric', month: 'short', day: 'numeric' })}.`
    else description += ` for ${repetitionOccurrences} occurrences.`

    return description
  }

  return (
    <div className="mb-6">
      <Label
        name="repetition"
        className="mb-2 block text-base font-medium text-black"
        errorClassName="mb-2 block text-base font-medium text-red-700"
      >
        Repetition
      </Label>
      {repetition === 'custom' ? (
        <>
          <p>{getRepetitionDescription()}</p>

          <div className="mt-2 mb-2">
            <button
              className="appearance-none mr-4 text-slate-500 font-semibold focus:outline-none cursor-pointer"
              onClick={(event) => {
                event.preventDefault()
                setRepetition('no-repeat')
              }}
            >
              Clear
            </button>
            <button
              className="appearance-none mr-4 text-teal-500 font-bold focus:outline-none cursor-pointer"
              onClick={(event) => {
                event.preventDefault()
                setModalIsOpen(true)
              }}
            >
              Edit
            </button>
          </div>
        </>
      ) : (
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
            <option value="annually">
              Annually on {getReadableDateToday()}
            </option>
            <option value="weekdays">Every weekday</option>
            <option value="custom">Custom...</option>
          </SelectField>
        </div>
      )}
      <TaskCustomRepetitionModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  )
}

export default TaskRepetitionForm
