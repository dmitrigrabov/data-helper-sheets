import { addSheet, getSheets } from 'server/lib/sheets/sheets'
import format from 'server/format'

export const initialiseSheet = () => {
  const sheets = getSheets()

  Object.keys(format).forEach(tabName => {
    addSheet(tabName)
  })
}
