import { readEvents } from 'server/model/event/reader'
import { EventModel } from 'server/model/event/types'
import { toExportEventModel } from 'server/model/exportEvent/serializer'

/**
 * Generate EXPORT_EVENTS data
 *
 * @return Concatenated location name and oblast
 * @customfunction
 */
export const EXPORT_EVENTS = () => {
  try {
    const eventMap = readEvents('Events')


  //   Logger.log('eventsMap')
  //   Logger.log(JSON.stringify(eventsMap, undefined, 2))

  //   const out = Object.values(eventsMap)
  //     .map(event => {
  //       const exportEvent = toExportEventModel(event as EventModel)

  //       if (!exportEvent) {
  //         Logger.log('No valid event')
  //         return null
  //       }

  //       const {
  //         id,
  //         description,
  //         date,
  //         time,
  //         location,
  //         latitude,
  //         longitude,
  //         association1,
  //         association2,
  //         source1
  //       } = exportEvent

  //       return [
  //         id,
  //         description,
  //         date,
  //         time,
  //         location,
  //         latitude,
  //         longitude,
  //         association1,
  //         association2,
  //         source1
  //       ]
  //     })
  //     .filter(item => item)

  //   Logger.log('out')
  //   Logger.log(out)

  //   return out

  //   // const sites = readSheet('Sites')
  //   // const associations = readSheet('Associations')
  //   // const sources = readSheet('Sources')
  // } catch (error) {
  //   Logger.log('error')
  //   Logger.log(error as object)
  // }

  return [['Yay']]
}
