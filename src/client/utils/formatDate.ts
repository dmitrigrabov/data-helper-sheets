import { formatInTimeZone } from 'date-fns-tz'

export const formatDate = (dateString: string) => {
  try {
    const date = Date.parse(dateString)
    return formatInTimeZone(date, 'UTC', 'yyyy-MM-dd')
  } catch (e) {
    return ''
  }
}
