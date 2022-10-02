export { initialiseSheets } from 'server/lib/sheets/initialiseSheets'
export { refreshExports } from 'server/lib/sheets/refreshExports'

export const onOpen = () => {
  console.log('OPENING')

  const menu = SpreadsheetApp.getUi()
    .createMenu('Toolbox') // edit me!
    .addItem('Open sidebar', 'openSidebar')
    .addItem('Initialise sheets', 'initialiseSheets')
    .addItem('Refresh exports', 'refreshExports')

  menu.addToUi()
}

export function onSelectionChange(e: GoogleAppsScript.Events.SheetsOnEdit) {
  // Set background to red if a single empty cell is selected.
  SpreadsheetApp.getActive().toast('SELECTION CHANGED')
  console.log('SELECTION CHANGEd')
  const range = e.range
  console.log('Range ', range)

  if (range.getNumRows() === 1 && range.getNumColumns() === 1) {
    console.log(range.getCell(1, 1).getValue())
  }
}

export const openSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar')
  SpreadsheetApp.getUi().showSidebar(html)
}
