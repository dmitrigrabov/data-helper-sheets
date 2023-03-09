import { parseSheet } from 'server/lib/sheets/parseSheet'
import {
  getAssociationsSheetData,
  getCellInfo,
  getSheetConfig,
  getSitesSheetData
} from 'server/lib/sidebar/sidebar'
import { formatDate } from 'server/lib/util/formatDate'
import { SiteModel } from 'server/model/site/types'
import { match } from 'ts-pattern'

export const getSheets = () => SpreadsheetApp.getActive().getSheets()

export const getActiveSheetName = () =>
  SpreadsheetApp.getActive().getSheetName()

export const getSheetsData = () => {
  const activeSheetName = getActiveSheetName()

  return getSheets().map((sheet, index) => {
    const name = sheet.getName()

    return {
      name,
      index,
      isActive: name === activeSheetName
    }
  })
}

export const addSheet = (sheetTitle: string) => {
  return SpreadsheetApp.getActive().insertSheet(sheetTitle)
}

export const deleteSheet = (sheetIndex: number) => {
  const sheets = getSheets()

  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex])

  return getSheetsData()
}

export const setActiveSheet = (sheetName: string) => {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName)

  if (sheet) {
    sheet.activate()
  }

  return getSheetsData()
}

// const state = {
//   changed: true,
//   value: ''
// }

// export function onSelectionChange(e: GoogleAppsScript.Events.SheetsOnEdit) {
//   // Set background to red if a single empty cell is selected.
//   SpreadsheetApp.getActive().toast('SELECTION CHANGED')
//   console.log('SELECTION CHANGEd')
//   const range = e.range
//   console.log('Range ', range)

//   if (range.getNumRows() === 1 && range.getNumColumns() === 1) {
//     state.changed = true
//     state.value = range.getCell(1, 1).getValue()
//   }
// }

export function getContents() {
  const cell = SpreadsheetApp.getActive().getCurrentCell()

  if (!cell) {
    return null
  }

  const row = cell.getRow() - 1
  const column = cell.getColumn() - 1
  const value = cell.getValue()
  const sheetName = SpreadsheetApp.getActive().getActiveSheet().getSheetName()

  const selectedCell = {
    row,
    column,
    value: value instanceof Date ? value.toUTCString() : value,
    sheetName
  }
  const cellInfo = getCellInfo(selectedCell)

  const contents = {
    ...selectedCell,
    ...cellInfo
  }

  console.log('Server contents', contents)

  return contents
}

export function getSites() {
  const sites = getSitesSheetData()

  return sites
}

export function getAssociations() {
  const associations = getAssociationsSheetData()

  return associations
}

export type CellInput = {
  row: number
  column: number
  value: string
  sheetName: string
  columnName: string
}

export function setContents(contents: CellInput) {
  console.log('Server setContents', contents)

  const cell = SpreadsheetApp?.getActive().getCurrentCell()

  if (!cell) {
    return null
  }

  match(contents.columnName)
    .with('dateOfPost', () => {
      const value = formatDate(contents.value)

      if (value !== 'ERROR') {
        cell.setValue(value)
        cell.setNumberFormat('dd/mm/yyyy')
      }
    })
    .otherwise(() => cell.setValue(contents.value))
}

const getColumnIndexFromName = (sheetName: string, columnName: string) => {
  const config = getSheetConfig(sheetName)
  return config?.columns.findIndex(column => column.name === columnName)
}

type SetSourceCell = {
  row: number
  column: number
  value: string
  columnName: string
  format?: string
}

export const setSourceCell = (contents: SetSourceCell): boolean => {
  const { row, columnName } = contents
  // columnName, value, format
  const column = getColumnIndexFromName('Sources', columnName)

  if (!column) {
    return false
  }

  const cell = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Sources')
    ?.getRange(row + 1, column + 1, 1, 1)

  if (!cell) {
    return false
  }

  console.log('Contents', contents)
  console.log('Cell value', cell.getValue())

  return match(contents.columnName)
    .with('dateOfPost', () => {
      const value = formatDate(contents.value)

      if (value !== 'ERROR') {
        cell.setValue(value)
        cell.setNumberFormat('dd/mm/yyyy')
        return true
      } else {
        return false
      }
    })
    .otherwise(() => {
      cell.setValue(contents.value)
      return true
    })
}

export const addEventsKey = (eventsKey: string): boolean => {
  const eventsRows = parseSheet('Events')

  if (Object.keys(eventsRows).includes(eventsKey)) {
    return false
  }

  console.log('Adding events key', eventsKey)

  try {
    SpreadsheetApp?.getActive().getSheetByName('Events')?.appendRow([eventsKey])
    return true
  } catch (e) {
    console.log('Error', e)
    return false
  }
}

export function setSite({ siteKey, oblast, town, latLng }: SiteModel) {
  const sites = getSitesSheetData()

  if (sites[siteKey]) {
    console.log(`Site ${siteKey} already exists`)
    return false
  }
  try {
    SpreadsheetApp?.getActive()
      .getSheetByName('Sites')
      ?.appendRow([siteKey, oblast, town, `${latLng.lat},${latLng.lng}`])
    return true
  } catch (e) {
    console.log('Error', e)
    return false
  }
}
