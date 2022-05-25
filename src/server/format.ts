import { Format } from 'server/model/types'

const format: Format = {
  Sources: {
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
  },
  Events: {
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
  },
  Sites: {
    columns: [
      { name: 'siteKey', label: 'Site Key', type: 'string' },
      { name: 'town', label: 'Town', type: 'string' },
      { name: 'oblast', label: 'Oblast', type: 'string' },
      { name: 'latLng', label: 'Lat Lng', type: 'string' }
    ],
    key: 'siteKey'
  },
  Categories: {
    columns: [],
    key: '' as never
  },
  Associations: {
    columns: [
      { name: 'id', label: 'Id', type: 'string' },
      { name: 'description', label: 'Description', type: 'string' },
      { name: 'mode', label: 'Mode', type: 'string' },
      { name: 'filterPath', label: 'Filter Path', type: 'string' }
    ],
    key: 'id'
  },
  EXPORT_EVENTS: {
    columns: [
      { name: 'id', label: 'id', type: 'string' },
      { name: 'description', label: 'description', type: 'string' },
      { name: 'date', label: 'date', type: 'string' },
      { name: 'time', label: 'time', type: 'string' },
      { name: 'location', label: 'location', type: 'string' },
      { name: 'latitude', label: 'latitude', type: 'string' },
      { name: 'longitude', label: 'longitude', type: 'string' },
      { name: 'association1', label: 'association1', type: 'string' },
      { name: 'association2', label: 'association2', type: 'string' },
      { name: 'source1', label: 'source1', type: 'string' }
    ],
    key: 'id'
  },
  EXPORT_SOURCES: {
    columns: [
      { name: 'id', label: 'id', type: 'string' },
      { name: 'title', label: 'title', type: 'string' },
      { name: 'thumbnail', label: 'thumbnail', type: 'string' },
      { name: 'description', label: 'description', type: 'string' },
      { name: 'type', label: 'type', type: 'string' },
      { name: 'path1', label: 'path1', type: 'string' }
    ],
    key: 'id'
  },
  EXPORT_ASSOCIATIONS: {
    columns: [
      { name: 'id', label: 'id', type: 'string' },
      { name: 'title', label: 'title', type: 'string' },
      { name: 'desc', label: 'desc', type: 'string' },
      { name: 'mode', label: 'mode', type: 'string' },
      { name: 'filter_path0', label: 'filter_path0', type: 'string' },
      { name: 'filter_path1', label: 'filter_path1', type: 'string' },
      { name: 'filter_path2', label: 'filter_path2', type: 'string' },
      { name: 'filter_path3', label: 'filter_path3', type: 'string' }
    ],
    key: 'id'
  }
}

export default format

export const dateFormat = 'dd/MM/yyyy'
export const timeFormat = 'HH:mm:ss'
export const dateTimeFormat = 'dd/MM/yyyy HH:mm:ss'
