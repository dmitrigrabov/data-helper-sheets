import { getCellInfo } from 'server/lib/sidebar/sidebar'

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

  const selectedCell = { row, column, value, sheetName }
  const cellInfo = getCellInfo(selectedCell)

  return {
    selectedCell,
    cellInfo
  }
}
