export type Page = 'sources' | 'sites'

export type PageData =
  | {
      page: 'sources'
    }
  | {
      page: 'sites'
      oblast: string
    }

export type SetSourceCell = {
  row: number
  column: number
  value: string
  columnName: string
  format?: string
}
