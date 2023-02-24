import { getCellInfo, getSitesInfo } from 'server/lib/sidebar/sidebar'
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
  const sites = getSitesInfo()

  return sites
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

export function setSite({ siteKey, oblast, town, latLng }: SiteModel) {
  const sites = getSitesInfo()

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
