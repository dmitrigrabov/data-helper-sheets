import { addSheet, getSheets } from 'server/lib/sheets/sheets'
import { bookConfig, exportSheets } from 'server/model/book/config'
import { ImportSheetName } from 'server/model/types'

const initialiseImportSheets = (existingSheetNames: Record<string, true>) => {
  const importSheets = Object.keys(bookConfig) as ImportSheetName[]

  importSheets.forEach(sheetName => {
    if (existingSheetNames[sheetName]) {
      return
    }

    const sheet = addSheet(sheetName)

    const { columns } = bookConfig[sheetName]

    if (!columns.length) {
      return
    }

    const columnLabels = columns.map(column => column.label)

    sheet.appendRow(columnLabels as unknown as object[])
  })
}

const initialiseExportSheets = (existingSheetNames: Record<string, true>) => {
  exportSheets.forEach(sheetName => {
    if (existingSheetNames[sheetName]) {
      return
    }

    const sheet = addSheet(sheetName)

    sheet.appendRow([`=${sheetName}()` as unknown as object])
  })
}

export const initialise = () => {
  const existingSheetNames = getSheets().reduce<Record<string, true>>(
    (acc, sheetName) => ({ ...acc, [sheetName.getName()]: true }),
    {}
  )

  initialiseImportSheets(existingSheetNames)
  initialiseExportSheets(existingSheetNames)
}
