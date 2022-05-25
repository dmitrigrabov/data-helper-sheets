import format from 'server/format'
import { getNthChar } from 'server/lib/sheets/getNthChar'
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

  return columns.map((column, index) => {
    const label = labels[index]
    if (typeof label === 'string' && label[index] !== column.label) {
      return label
    }

    throw new Error(`${column.label} does not match schema`)
  })
}

interface ArraysToObjectsArgs {
  sheetName: SheetName
  values: CellType[][]
  keyLabel: string
}

function arraysToObjects({ sheetName, values, keyLabel }: ArraysToObjectsArgs) {
  const [labels, ...rows] = values

  validateLabels(labels, sheetName)

  return rows.reduce<Record<string, Record<string, CellType>>>((acc, row) => {
    const object = rowToObject(sheetName, row)
    const key = object[keyLabel]

    if (!key || typeof key !== 'string') {
      return acc
    }

    acc[key] = object

    return acc
  }, {})
}

const getKeyColumn = <D>(columns: Column<D>[], key: D) => {
  const column = columns.find(item => item.name === key) as Column<D>

  return column.label
}

export const readSheet = (sheetName: SheetName) => {
  const sheetFormat = format[sheetName]
  const lastColumnName = getNthChar(sheetFormat.columns.length)
  const rangeName = `${sheetName}A:${lastColumnName}`

  const sheet = SpreadsheetApp.getActiveSpreadsheet()

  const range = sheet.getRange(rangeName)
  const values = range.getValues() as CellType[][]
  const keyLabel = getKeyColumn(sheetFormat.columns, sheetFormat.key)
  return arraysToObjects({ sheetName, values, keyLabel })
}
