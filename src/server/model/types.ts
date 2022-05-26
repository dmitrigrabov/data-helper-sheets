import * as t from 'io-ts'
import { bookConfig } from 'server/model/book/config'

export const sourceType = t.keyof({
  Telegram: null,
  Twitter: null,
  YouTube: null,
  Image: null,
  Video: null
})

export const associationMode = t.keyof({
  CATEGORY: null,
  NARRATIVE: null,
  FILTER: null
})

const cellTypeName = t.keyof({
  string: null,
  number: null,
  boolean: null,
  date: null
})

export type CellTypeName = t.TypeOf<typeof cellTypeName>

export interface ColumnConfig<D> {
  name: D
  label: string
  type: CellTypeName
}

export interface ExportSheetConfig<D extends string> {
  sheetName: string
  columns: ColumnConfig<D>[]
}

export interface SheetConfig<D extends string> extends ExportSheetConfig<D> {
  key: D
}

export type SheetName = keyof typeof bookConfig
// | 'Sources'
// | 'Events'
// | 'Sites'
// | 'Categories'
// | 'Associations'
// | 'EXPORT_EVENTS'
// | 'EXPORT_SOURCES'
// | 'EXPORT_ASSOCIATIONS'

export type CellType = number | string | boolean | Date
