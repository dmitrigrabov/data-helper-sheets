import { bookConfig } from 'server/model/book/config'
import { CellType, SheetConfig, ImportSheetName } from 'server/model/types'

const rowToObject = <D extends string>(
  sheetConfig: SheetConfig<D>,
  row: CellType[]
) => {
  const { columns } = sheetConfig

  const names = columns.map(({ name }) => name)

  return names.reduce<Record<string, CellType>>((acc, name, index) => {
    acc[name] = row[index]

    return acc
  }, {})
}

interface ValidateLabelsArgs<D extends string> {
  labels: CellType[]
  sheetConfig: SheetConfig<D>
  sheetName: ImportSheetName
}

const validateLabels = <D extends string>({
  labels,
  sheetConfig,
  sheetName
}: ValidateLabelsArgs<D>) => {
  const { columns } = sheetConfig

  return columns.map((column, index) => {
    const label = labels[index]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(label as string, ' = ', column.label)

    if (typeof label === 'string' && label == column.label) {
      return label
    }

    throw new Error(
      `Column '${column.label}' in sheet '${sheetName}' does not match schema`
    )
  })
}

interface ArraysToObjectsArgs<D extends string> {
  rows: CellType[][]
  sheetConfig: SheetConfig<D>
}

const arraysToObjects = <D extends string>({
  rows,
  sheetConfig
}: ArraysToObjectsArgs<D>): Record<string, Record<D, CellType>> => {
  return rows.reduce<Record<string, Record<D, CellType>>>((acc, row) => {
    const sheetObject = rowToObject(sheetConfig, row)
    const keyValue = sheetObject[sheetConfig.key] as string

    acc[keyValue] = sheetObject

    return acc
  }, {})
}

const readSheet = (sheetName: ImportSheetName) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)

  return sheet?.getSheetValues(
    1,
    1,
    sheet.getLastRow(),
    sheet.getLastColumn()
  ) as CellType[][]
}

export const parseSheet = (sheetName: ImportSheetName) => {
  console.log(`Parsing ${sheetName}`)

  const sheetConfig = bookConfig[sheetName]

  const values = readSheet(sheetName)

  const [labels, ...rows] = values

  validateLabels({ labels, sheetConfig, sheetName })

  return arraysToObjects({
    rows,
    sheetConfig
  })
}
