export type SelectedCell = {
  row: number
  column: number
  value: string
  sheetName: string
}

export type CellInfo = {
  columnName: string | undefined
  associationModelMap: Record<
    string,
    {
      id: string
      description: string
      mode: 'CATEGORY' | 'NARRATIVE' | 'FILTER'
      filterPaths: string[]
    }
  >
  associationMap: Record<string, unknown>
  isAssociation: boolean
  options: string[]
}

export type CellContext = {
  selectedCell: SelectedCell
  cellInfo: CellInfo
}
