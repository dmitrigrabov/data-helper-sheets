import { EventProperties } from 'server/model/event/types'
import { SheetConfig } from 'server/model/types'

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
