import { parseSheet } from 'server/lib/sheets/parseSheet'
import { toAssociationModelMap } from 'server/model/association/utilities'
import { toEventModelMap } from 'server/model/event/utilities'
import { toSiteModelMap } from 'server/model/site/utilities'
import { toSourceModelMap } from 'server/model/source/utilities'

/**
 * Generate EXPORT_EVENTS data
 *
 * @return Concatenated location name and oblast
 * @customfunction
 */
export const EXPORT_EVENTS = () => {
  const sourceMap = parseSheet('Sources')
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
}
