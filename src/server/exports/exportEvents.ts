import { parseSheet } from 'server/lib/sheets/parseSheet'
import { toAssociationModelMap } from 'server/model/association/serializer'
import { exportEvents } from 'server/model/event/export'
import { toEventModelMap } from 'server/model/event/serializer'
import { toSiteModelMap } from 'server/model/site/serializer'
import { toSourceModelMap } from 'server/model/source/serializer'

/**
 * Generate EXPORT_EVENTS data
 *
 * @return EXPORT_EVENTS data sheet
 * @customfunction
 */

// clearCacheNum is a fake input used to force
// Google Sheets to recalculate values
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EXPORT_EVENTS = (clearCacheNum: number) => {
  const sourceMap = parseSheet('Sources')
  console.log('Source map', sourceMap)
  const sourceModelMap = toSourceModelMap(sourceMap)

  const siteMap = parseSheet('Sites')
  const siteModelMap = toSiteModelMap(siteMap)

  const associationMap = parseSheet('Associations')
  const associationModelMap = toAssociationModelMap(associationMap)

  const eventMap = parseSheet('Events')
  const eventModelMap = toEventModelMap({
    eventMap,
    sourceModelMap,
    siteModelMap,
    associationModelMap
  })

  return exportEvents(Object.values(eventModelMap))
}
