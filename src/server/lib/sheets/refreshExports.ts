import { getSheets } from 'server/lib/sheets/sheets'
import { exportSheets } from 'server/model/book/config'

export const refreshExports = () => {
  const existingSheets = getSheets().reduce<
    Record<string, GoogleAppsScript.Spreadsheet.Sheet>
  >((acc, sheet) => ({ ...acc, [sheet.getName()]: sheet }), {})

  exportSheets.forEach(sheetName => {
    const exportSheet = existingSheets[sheetName]

    if (!exportSheet) {
      throw new Error('Missing sheet', exportSheet)
    }

    exportSheet
      .getRange(`${sheetName}!A1`)
      .setValue(
        `=${sheetName}(${Math.random()
          .toString()
          .substring(2)})` as unknown as object
      )
  })
}
