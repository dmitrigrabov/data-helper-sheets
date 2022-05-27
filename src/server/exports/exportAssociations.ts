import { parseSheet } from 'server/lib/sheets/parseSheet'
import { toAssociationModelMap } from 'server/model/association/serializer'
import { toEventModelMap } from 'server/model/event/serializer'
import { toSiteModelMap } from 'server/model/site/serializer'
import { exportAssociations } from 'server/model/association/export'
import { toSourceModelMap } from 'server/model/source/serializer'

/**
 * Generate EXPORT_ASSOCIATIONS data
 *
 * @return EXPORT_ASSOCIATIONS data sheet
 * @customfunction
 */
export const EXPORT_ASSOCIATIONS = () => {
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

  return exportAssociations(Object.values(associationModelMap), eventModelMap)
}
