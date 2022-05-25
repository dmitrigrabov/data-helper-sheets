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
