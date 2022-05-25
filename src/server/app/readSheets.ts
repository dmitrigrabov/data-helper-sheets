import format from 'server/format'
import toEvent from 'server/model/event/serializer'
import { EventModel } from 'server/model/event/types'
import { CellType, SheetName } from 'server/model/types'

function rowToObject(sheetName: SheetName, row: CellType[]) {
  const { columns } = format[sheetName]

  const names = columns.map(({ name }) => name)

  return names.reduce<Record<string, CellType>>((acc, name, index) => {
    acc[name] = row[index]

    return acc
  }, {})
}

const validateLabels = (labels: CellType[], sheetName: SheetName) => {
  const sheetFormat = format[sheetName]
  const columns = sheetFormat.columns

  Logger.log(labels)
  Logger.log(columns)

  return columns.map((column, index) => {
    const label = labels[index]
    if (typeof label === 'string' && label[index] !== column.label) {
      return label
    }

    throw new Error(`${column.label} does not match schema`)
  })
}

const toModel = (sheetName: SheetName, rowObject: Record<string, CellType>) => {
  switch (sheetName) {
    case 'Events':
      return toEvent(rowObject)

    // case 'Sources':
    //   return toSource(rowObject)

    // case 'Sites':
    //   return toSite(rowObject)

    // case 'Associations':
    //   return toAssociation(rowObject)

    default:
      throw new Error(`Unsupport model type: ${sheetName}`)
  }
}

interface ArraysToObjectsArgs {
  sheetName: SheetName
  values: CellType[][]
  key: string
}

function arraysToObjects({ sheetName, values, key }: ArraysToObjectsArgs) {
  const [labels, ...rows] = values

  validateLabels(labels, sheetName)

  return rows.reduce<Record<string, EventModel>>((acc, row) => {
    const object = rowToObject(sheetName, row)

    Logger.log('object')
    Logger.log(object)

    const model = toModel(sheetName, object)

    if (!model) {
      return acc
    }

    acc[model[key as 'id']] = model

    return acc
  }, {})
}

export const readSheet = (sheetName: SheetName) => {
  const sheetFormat = format[sheetName]

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)

  const values = sheet.getSheetValues(
    1,
    1,
    sheet.getLastRow(),
    sheet.getLastColumn()
  ) as CellType[][]

  Logger.log('values')
  Logger.log(values)

  return arraysToObjects({ sheetName, values, key: sheetFormat.key })
}
