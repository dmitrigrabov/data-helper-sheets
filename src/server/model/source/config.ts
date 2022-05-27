import {
  SourceExportProperties,
  SourceProperties
} from 'server/model/source/types'
import { ExportSheetConfig, SheetConfig } from 'server/model/types'

export const sourceConfig: SheetConfig<SourceProperties> = {
  sheetName: 'Events',
  columns: [
    { name: 'timestamp', label: 'Timestamp', type: 'date' },
    { name: 'dateOfPost', label: 'Date of post', type: 'date' },
    { name: 'sourceUrl', label: 'Source Url', type: 'string' },
    { name: 'embedLinks', label: 'Embed links', type: 'string' },
    { name: 'googleDriveLinks', label: 'Google Drive Links', type: 'string' },
    { name: 'postCaption', label: 'Post caption', type: 'string' },
    {
      name: 'possibleLocationName',
      label: 'Possible location name',
      type: 'string'
    },
    { name: 'possibleAddress', label: 'Possible address', type: 'string' },
    { name: 'possibleLatLng', label: 'Possible lat, lng', type: 'string' },
    { name: 'type', label: 'Type', type: 'string' },
    { name: 'manualLocation', label: 'Manual location', type: 'string' },
    { name: 'manualLatLng', label: 'Manual lat, lng', type: 'string' },
    { name: 'mapLink', label: 'Map link', type: 'string' },
    { name: 'archiveLink', label: 'Archive link', type: 'string' },
    { name: 'description', label: 'Description', type: 'string' },
    { name: 'comment', label: 'Comment', type: 'string' }
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
