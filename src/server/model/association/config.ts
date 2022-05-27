import {
  AssociationExportProperties,
  AssociationProperties
} from 'server/model/association/types'
import { ExportSheetConfig, SheetConfig } from 'server/model/types'

export const associationConfig: SheetConfig<AssociationProperties> = {
  sheetName: 'Association',
  columns: [
    { name: 'id', label: 'Id', type: 'string' },
    { name: 'description', label: 'Description', type: 'string' },
    { name: 'mode', label: 'Mode', type: 'string' },
    { name: 'filterPath0', label: 'Filter Path 1', type: 'string' },
    { name: 'filterPath1', label: 'Filter Path 2', type: 'string' },
    { name: 'filterPath2', label: 'Filter Path 3', type: 'string' },
    { name: 'filterPath3', label: 'Filter Path 4', type: 'string' }
  ],
  key: 'id'
}

export const associationExportConfig: ExportSheetConfig<AssociationExportProperties> =
  {
    sheetName: 'EXPORT_ASSOCIATION',
    columns: [
      { name: 'id', label: 'id', type: 'string' },
      { name: 'title', label: 'title', type: 'string' },
      { name: 'description', label: 'desc', type: 'string' },
      { name: 'mode', label: 'mode', type: 'string' },
      { name: 'filterPaths', label: 'filter_path[n]', type: 'string' }
    ]
  }
