export default {
  Source: [
    { name: 'timestamp', label: 'Timestamp' },
    { name: 'dateOfPost', label: 'Date of post' },
    { name: 'sourceUrl', label: 'Source Url' },
    { name: 'embedLinks', label: 'Embed links' },
    { name: 'googleDriveLinks', label: 'Google Drive Links' },
    { name: 'postCaption', label: 'Post caption' },
    { name: 'possibleLocationName', label: 'Possible location name' },
    { name: 'possibleAddress', label: 'Possible address' },
    { name: 'possibleLatLng', label: 'Possible lat, lng' },
    { name: 'type', label: 'Type' },
    { name: 'manualLocation', label: 'Manual location' },
    { name: 'manualLatLng', label: 'Manual lat, lng' },
    { name: 'mapLink', label: 'Map link' },
    { name: 'archiveLink', label: 'Archive link' },
    { name: 'description', label: 'Description' },
    { name: 'comment', label: 'Comment' }
  ],
  Events: [
    { name: 'id', label: 'Id' },
    { name: 'description', label: 'Description' },
    { name: 'date', label: 'Date' },
    { name: 'time', label: 'Time' },
    { name: 'siteKey', label: 'Site Key' },
    { name: 'latLng', label: 'Lat Lng' },
    { name: 'incidentTypes', label: 'Incident Types' },
    { name: 'meansOfAttack', label: 'Means of Attack' },
    { name: 'sources', label: 'Sources' },
    { name: 'includeInMap', label: 'Include in map' }
  ],
  Sites: [
    { name: 'siteKey', label: 'Site Key' },
    { name: 'town', label: 'Town' },
    { name: 'oblast', label: 'Oblast' },
    { name: 'latLng', label: 'Lat Lng' }
  ],
  Categories: [],
  Associations: [
    { name: 'id', label: 'Id' },
    { name: 'description', label: 'Description' },
    { name: 'mode', label: 'Mode' },
    { name: 'filterPath', label: 'Filter Path' }
  ],
  EXPORT_EVENTS: [
    { name: 'id', label: 'id' },
    { name: 'description', label: 'description' },
    { name: 'date', label: 'date' },
    { name: 'time', label: 'time' },
    { name: 'location', label: 'location' },
    { name: 'latitude', label: 'latitude' },
    { name: 'longitude', label: 'longitude' },
    { name: 'association1', label: 'association1' },
    { name: 'association2', label: 'association2' },
    { name: 'source1', label: 'source1' }
  ],
  EXPORT_SOURCES: [
    { name: 'id', label: 'id' },
    { name: 'title', label: 'title' },
    { name: 'thumbnail', label: 'thumbnail' },
    { name: 'description', label: 'description' },
    { name: 'type', label: 'type' },
    { name: 'path1', label: 'path1' },
    { name: 'path2', label: 'path2' },
    { name: 'path3', label: 'path3' }
  ],
  EXPORT_ASSOCIATIONS: [
    { name: 'id', label: 'id' },
    { name: 'title', label: 'title' },
    { name: 'desc', label: 'desc' },
    { name: 'mode', label: 'mode' },
    { name: 'filter_path0', label: 'filter_path0' },
    { name: 'filter_path1', label: 'filter_path1' },
    { name: 'filter_path2', label: 'filter_path2' },
    { name: 'filter_path3', label: 'filter_path3' }
  ]
}

export const dateFormat = 'dd/MM/yyyy'
export const timeFormat = 'HH:mm:ss'
export const dateTimeFormat = 'dd/MM/yyyy HH:mm:ss'
