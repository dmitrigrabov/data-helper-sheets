import {
  SourceExportProperties,
  SourceProperties
} from 'server/model/source/types'
import { ExportSheetConfig, SheetConfig } from 'server/model/types'

export const sourceConfig: SheetConfig<SourceProperties> = {
  sheetName: 'Events',
  columns: [
    { name: 'timestamp', label: 'Timestamp', type: 'date' },
    {
      name: 'sourceUrl',
      label: 'Source video/photo hyperlink',
      type: 'string'
    },
    {
      name: 'dateOfPost',
      label: 'Date of incident or publication',
      type: 'date'
    },
    {
      name: 'oblast',
      label: 'Oblast',
      type: 'string'
    },
    {
      name: 'town',
      label: 'City or village',
      type: 'string'
    },
    { name: 'manualLatLng', label: 'Coordinates', type: 'string' },
    { name: 'googleDriveLinks', label: 'Google Drive Links', type: 'string' },
    {
      name: 'fileNames',
      label: 'Copy here name of the uploaded file or files',
      type: 'string'
    },
    {
      name: 'archiveLink',
      label: 'Link for the archived web-page',
      type: 'string'
    },
    { name: 'comment', label: 'Comment', type: 'string' },
    { name: 'incidentType', label: 'Type of incident', type: 'string' },
    { name: 'meansOfAttack', label: 'Means of attack', type: 'string' },
    { name: 'eventKey', label: 'Event key', type: 'string' }
  ],
  key: 'sourceUrl'
}

export const sourceExportConfig: ExportSheetConfig<SourceExportProperties> = {
  sheetName: 'EXPORT_SOURCES',
  columns: [
    { name: 'id', label: 'id', type: 'string' },
    { name: 'title', label: 'title', type: 'string' },
    { name: 'thumbnail', label: 'thumbnail', type: 'string' },
    { name: 'description', label: 'description', type: 'string' },
    { name: 'type', label: 'type', type: 'string' },
    { name: 'paths', label: 'path[n]', type: 'string' }
  ]
}
