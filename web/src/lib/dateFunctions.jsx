export const getReadableDateToday = () => {
  const d = new Date()
  return d.toLocaleDateString('en-SG', { month: 'short', day: 'numeric' })
}

export const getDateWithOffset = (offset) => {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`
}

export const getDayOfTheWeekToday = () => {
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

export const getEnumerationForDate = (d) => {
  const last = +String(d).slice(-2)
  if (last > 3 && last < 21) return 'th'
  const remainder = last % 10
  if (remainder === 1) return 'st'
  if (remainder === 2) return 'nd'
  if (remainder === 3) return 'rd'
  return 'th'
}
