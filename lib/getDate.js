const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export default function getDateFromData(data) {
  const date = new Date(data)

  const dd = String(date.getDate()).padStart(2, '0')
  const mm = month[date.getMonth() - 1]
  const yyyy = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  return `${dd} ${mm} ${yyyy} ${hours}:${minute}`
}
