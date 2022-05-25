/**
 * Looks up source export based on source url
 *
 * @param {sourceUrl} event id or column range of event ids
 * @return Concatenated location name and oblast
 * @customfunction
 */

const GET_SOURCE = (sourceUrl: string) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()

  const sourcesRange = sheet.getRange('Sources!A:P')
  const sourcesValues = sourcesRange.getValues()
  const sourcesByUrl = arraysToObjects(sourcesValues, 'Source Url')

  return Array.isArray(sourceUrl)
    ? sourceUrl.map(row => getSource(row[0], sourcesByUrl))
    : getSource(sourceUrl, sourcesByUrl)
}

/**
 * Looks up location based on event id
 *
 * @param {eventIdInput} event id or column range of event ids
 * @return Concatenated location name and oblast
 * @customfunction
 */
const GET_LOCATION = (eventIdInput: string) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()

  const eventsRange = sheet.getRange('Events!A:F')
  const eventsValues = eventsRange.getValues()
  const eventsById = arraysToObjects(eventsValues, 'Id')

  const sitesRange = sheet.getRange('Sites!A:D')
  const sitesValues = sitesRange.getValues()
  const sitesBySiteKey = arraysToObjects(sitesValues, 'Site Key')

  return Array.isArray(eventIdInput)
    ? eventIdInput.map(row => getLocation(row[0], eventsById, sitesBySiteKey))
    : getLocation(eventIdInput, eventsById, sitesBySiteKey)
}

/**
 * Looks up coordinates based on event id
 *
 * @param {eventIdInput} event id or column range of event ids
 * @return Range of latitudes of event based on event location or site.
 * @customfunction
 */
const GET_LATLNG = (eventIdInput: string) => {
  Logger.clear()

  const sheet = SpreadsheetApp.getActiveSpreadsheet()

  const eventsRange = sheet.getRange('Events!A:F')
  const eventsValues = eventsRange.getValues()
  const eventsById = arraysToObjects(eventsValues, 'Id')

  const sitesRange = sheet.getRange('Sites!A:D')
  const sitesValues = sitesRange.getValues()
  const sitesBySiteKey = arraysToObjects(sitesValues, 'Site Key')

  const latLng = Array.isArray(eventIdInput)
    ? eventIdInput.map(row => getLatLng(row[0], eventsById, sitesBySiteKey))
    : getLatLng(eventIdInput, eventsById, sitesBySiteKey)

  Logger.log(latLng)

  return latLng
}

const getSource = (sourceUrl: string, sourcesMap) => {
  const source = sourcesMap[sourceUrl]

  if (!source) {
    return ''
  }

  // title, thumbnail, description, type, paths
  return ['', '', source['Description'], source['Type'], sourceUrl]
}

function getLocation(eventId, eventsMap, sitesMap) {
  const event = eventsMap[eventId]

  if (!event) {
    return ''
  }

  const eventSiteKey = event['Site Key']

  if (!eventSiteKey) {
    return ''
  }

  const site = sitesMap[event['Site Key']]

  if (!site) {
    return ''
  }

  return `${site['Town']}, ${site['Oblast']}`
}

function getLatLng(eventId, eventsMap, sitesMap) {
  const event = eventsMap[eventId]

  if (!event) {
    return []
  }

  const eventLatLng = event['Lat Lng']

  if (eventLatLng) {
    return eventLatLng.split(',').map(chunk => chunk.trim())
  }

  const site = sitesMap[event['Site Key']]

  if (!site) {
    return []
  }

  const siteLatLng = site['Lat Lng']

  if (siteLatLng) {
    return siteLatLng.split(',').map(chunk => chunk.trim())
  }

  return []
}

function rowToObject(labels, row) {
  return labels.reduce((acc, label, index) => {
    acc[label] = row[index]

    return acc
  }, {})
}

function arraysToObjects(input, keyName) {
  const [labels, ...rows] = input

  return rows.reduce((acc, row) => {
    const object = rowToObject(labels, row)
    const key = object[keyName]

    if (!key) {
      return acc
    }

    acc[key] = object

    return acc
  }, {})
}
