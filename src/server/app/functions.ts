import { parseSheet } from 'server/lib/sheets/parseSheet'

/**
 * Generate EXPORT_EVENTS data
 *
 * @return Concatenated location name and oblast
 * @customfunction
 */
export const EXPORT_EVENTS = () => {
  const eventMap = parseSheet('Events')
  const sourceMap = parseSheet('Sources')
  const siteMap = parseSheet('Sites')
  const associationMap = parseSheet('Associations')
}
