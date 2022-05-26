import {
  EventExportProperties,
  EventProperties
} from 'server/model/event/types'
import { ExportSheetConfig, SheetConfig } from 'server/model/types'

export const eventConfig: SheetConfig<EventProperties> = {
  sheetName: 'Events',
  columns: [
    { name: 'id', label: 'Id', type: 'string' },
    { name: 'description', label: 'Description', type: 'string' },
    { name: 'date', label: 'Date', type: 'string' },
    { name: 'time', label: 'Time', type: 'string' },
    { name: 'siteKey', label: 'Site Key', type: 'string' },
    { name: 'latLng', label: 'Lat Lng', type: 'string' },
    { name: 'incidentTypes', label: 'Incident Types', type: 'string' },
    { name: 'meansOfAttack', label: 'Means of Attack', type: 'string' },
    { name: 'sources', label: 'Sources', type: 'string' },
    { name: 'includeInMap', label: 'Include in map', type: 'boolean' }
  ],
  key: 'id'
}

export const eventExportConfig: ExportSheetConfig<EventExportProperties> = {
  sheetName: 'EXPORT_EVENTS',
  columns: [
    { name: 'id', label: 'id', type: 'string' },
    { name: 'description', label: 'description', type: 'string' },
    { name: 'date', label: 'date', type: 'string' },
    { name: 'time', label: 'time', type: 'string' },
    { name: 'location', label: 'location', type: 'string' },
    { name: 'latitude', label: 'latitude', type: 'string' },
    { name: 'longitude', label: 'longitude', type: 'string' },
    { name: 'meansOfAttack', label: 'association[m]', type: 'string' },
    { name: 'incidentTypes', label: 'association[m]', type: 'string' },
    { name: 'sources', label: 'source[n]', type: 'string' }
  ]
}
