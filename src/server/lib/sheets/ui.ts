export { initialiseSheets } from 'server/lib/sheets/initialiseSheets'
export { refreshExports } from 'server/lib/sheets/refreshExports'

export const onOpen = () => {
  console.log('OPENING')

  const menu = SpreadsheetApp.getUi()
    .createMenu('Toolbox') // edit me!
    // .addItem('Sheet Editor', 'openDialog')
    // .addItem('Sheet Editor (Bootstrap)', 'openDialogBootstrap')
    .addItem('Open sidebar', 'openAboutSidebar')
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

// export const initialiseSheets = () => initialise()
// export const refreshExports = () => rf()

// export const openDialog = () => {
//   const html = HtmlService.createHtmlOutputFromFile('dialog-demo')
//     .setWidth(600)
//     .setHeight(600)
//   SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor')
// }

// export const openDialogBootstrap = () => {
//   const html = HtmlService.createHtmlOutputFromFile('dialog-demo-bootstrap')
//     .setWidth(600)
//     .setHeight(600)
//   SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (Bootstrap)')
// }

export const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-about-page')
  SpreadsheetApp.getUi().showSidebar(html)
}
