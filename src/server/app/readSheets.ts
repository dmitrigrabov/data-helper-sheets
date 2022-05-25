import format from 'server/format'
import { AssociationModel } from 'server/model/association/types'
import toEvent from 'server/model/event/serializer'
import { EventModel } from 'server/model/event/types'
import { SiteModel } from 'server/model/site/types'
import { SourceModel } from 'server/model/source/types'
import { CellType, CellTypeName, SheetName } from 'server/model/types'

interface Column<D> {
  name: D
  label: string
  type: CellTypeName
}

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

  return rows.reduce<
    Record<string, EventModel | SourceModel | SiteModel | AssociationModel>
  >((acc, row) => {
    const object = rowToObject(sheetName, row)

    Logger.log('object')
    Logger.log(object)

    const model = toModel(sheetName, object)

    if (!model) {
      return acc
    }

    acc[key] = model

    return acc
  }, {})
}

const getKeyColumn = <D>(columns: Column<D>[], key: D) => {
  const column = columns.find(item => item.name === key) as Column<D>

  return column.label
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

  const keyLabel = getKeyColumn(sheetFormat.columns, sheetFormat.key)

  Logger.log('keyLabel')
  Logger.log({ keyLabel })

  return arraysToObjects({ sheetName, values, key: sheetFormat.key })
}
