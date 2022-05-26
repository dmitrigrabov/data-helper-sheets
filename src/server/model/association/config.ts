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
    { name: 'filterPath', label: 'Filter Path', type: 'string' }
  ],
  key: 'id'
}

export const associationExportConfig: ExportSheetConfig<AssociationExportProperties> =
  {
    sheetName: 'EXPORT_ASSOCIATION',
    columns: [
      { name: 'id', label: 'id', type: 'string' },
      { name: 'title', label: 'title', type: 'string' },
      { name: 'desc', label: 'desc', type: 'string' },
      { name: 'mode', label: 'mode', type: 'string' },
      { name: 'filter_path0', label: 'filter_path0', type: 'string' },
      { name: 'filter_path1', label: 'filter_path1', type: 'string' },
      { name: 'filter_path2', label: 'filter_path2', type: 'string' },
      { name: 'filter_path3', label: 'filter_path3', type: 'string' }
    ]
  }
