export { initialiseSheets } from 'server/lib/sheets/initialiseSheets'
export { refreshExports } from 'server/lib/sheets/refreshExports'

export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('Toolbox') // edit me!
    // .addItem('Sheet Editor', 'openDialog')
    // .addItem('Sheet Editor (Bootstrap)', 'openDialogBootstrap')
    .addItem('About me', 'openAboutSidebar')
    .addItem('Initialise sheets', 'initialiseSheets')
    .addItem('Refresh exports', 'refreshExports')

  menu.addToUi()
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
