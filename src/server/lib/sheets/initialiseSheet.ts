import { addSheet, getSheets } from 'server/lib/sheets/sheets'
import format from 'server/format'
import { SheetName } from 'server/model/types'

export const initialiseSheet = () => {
  const existingSheetNames = getSheets().reduce<Record<string, true>>(
    (acc, sheetName) => ({ ...acc, [sheetName.getName()]: true }),
    {}
  )

  const sheetNames = Object.keys(format) as SheetName[]

  sheetNames.forEach(sheetName => {
    if (existingSheetNames[sheetName]) {
      return
    }
    console.log('INSERTING ', sheetName)

    const sheet = addSheet(sheetName)

    const { columns } = format[sheetName]

    if (!columns.length) {
      return
    }

    const columnLabels = columns.map(column => column.label)

    sheet.appendRow(columnLabels as unknown as object[])
  })
}
