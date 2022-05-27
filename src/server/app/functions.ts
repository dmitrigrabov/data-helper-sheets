import { parseSheet } from 'server/lib/sheets/parseSheet'
import { toAssociationModelMap } from 'server/model/association/serializer'
import { exportEvents } from 'server/model/event/export'
import { toEventModelMap } from 'server/model/event/serializer'
import { toSiteModelMap } from 'server/model/site/serializer'
import { toSourceModelMap } from 'server/model/source/serializer'

/**
 * Generate EXPORT_EVENTS data
 *
 * @return Concatenated location name and oblast
 * @customfunction
 */
export const EXPORT_EVENTS = () => {
  const sourceMap = parseSheet('Sources')
  // Logger.log(
  //   'source',
  //   JSON.stringify(sourceMap, undefined, 2) as unknown as object
  // )

  const sourceModelMap = toSourceModelMap(sourceMap)
  // Logger.log(
  //   'sourceModelMap',
  //   JSON.stringify(sourceModelMap, undefined, 2) as unknown as object
  // )

  const siteMap = parseSheet('Sites')
  // Logger.log(
  //   'siteMap',
  //   JSON.stringify(siteMap, undefined, 2) as unknown as object
  // )
  const siteModelMap = toSiteModelMap(siteMap)
  // Logger.log(
  //   'siteModelMap',
  //   JSON.stringify(siteModelMap, undefined, 2) as unknown as object
  // )

  const associationMap = parseSheet('Associations')
  // Logger.log(
  //   'associationMap',
  //   JSON.stringify(associationMap, undefined, 2) as unknown as object
  // )
  const associationModelMap = toAssociationModelMap(associationMap)
  // Logger.log(
  //   'associationModelMap',
  //   JSON.stringify(associationModelMap, undefined, 2) as unknown as object
  // )

  const eventMap = parseSheet('Events')
  // Logger.log(
  //   'associationModelMap',
  //   JSON.stringify(eventMap, undefined, 2) as unknown as object
  // )
  const eventModelMap = toEventModelMap({
    eventMap,
    sourceModelMap,
    siteModelMap,
    associationModelMap
  })
  // Logger.log(
  //   'associationModelMap',
  //   JSON.stringify(eventMap, undefined, 2) as unknown as object
  // )

  return exportEvents(Object.values(eventModelMap))
}
