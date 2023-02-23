export type SelectedCell = {
  row: number
  column: number
  value: string
  sheetName: string
}

export type CellInfo = {
  columnLabel: string | undefined
  columnName: string | undefined
  rowData: Record<string, unknown>
}

// associationModelMap: Record<
// string,
// {
//   id: string
//   description: string
//   mode: 'CATEGORY' | 'NARRATIVE' | 'FILTER'
//   filterPaths: string[]
// }
// >
// associationMap: Record<string, unknown>
// isAssociation: boolean
// options: string[]

export type CellContext = SelectedCell & CellInfo
