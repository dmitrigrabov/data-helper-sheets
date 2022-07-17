import {
  EventExportProperties,
  EventProperties
} from 'server/model/event/types'
import { ExportSheetConfig, SheetConfig } from 'server/model/types'

export const eventConfig: SheetConfig<EventProperties> = {
  sheetName: 'Events',
  columns: [
    { name: 'eventKey', label: 'Event Key', type: 'string' },
    { name: 'description', label: 'Description', type: 'string' },
    {
      name: 'includeInMap',
      label: 'Include in map',
      type: 'boolean',
      format: 'checkbox'
    }
  ],
  key: 'eventKey'
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
    { name: 'sourceUrls', label: 'source[n]', type: 'string' }
  ]
}
