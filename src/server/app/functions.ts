import { readSheet } from 'server/app/readSheets'

export const EXPORT_EVENTS = () => {
  const events = readSheet('Events')
}
