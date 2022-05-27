import { format } from 'date-fns-tz'
import { dateFormat, timeFormat } from 'server/format'
import { EventExport, EventModel } from 'server/model/event/types'

interface MaxCounts {
  incidentTypes: number
  meansOfAttack: number
  sources: number
}

interface Acc {
  maxCounts: MaxCounts
  eventExports: EventExport[]
}

const buildLabels = (maxCounts: MaxCounts) => {
  // TODO generate based on config
  const labels = [
    'id',
    'description',
    'date',
    'time',
    'location',
    'latitude',
    'longitude',
    ...Array.from(
      { length: maxCounts.incidentTypes },
      (v, i) => `association${i + 1}`
    ),
    ...Array.from(
      { length: maxCounts.meansOfAttack },
      (v, i) => `association${i + maxCounts.incidentTypes + 1}`
    ),
    ...Array.from({ length: maxCounts.sources }, (v, i) => `source${i + 1}`)
  ]

  Logger.log(labels)

  return labels
}

export const exportEvents = (eventModels: EventModel[]) => {
  const initialCounts: MaxCounts = {
    incidentTypes: 0,
    meansOfAttack: 0,
    sources: 0
  }

  const { maxCounts, eventExports } = eventModels.reduce<Acc>(
    (acc, eventModel) => {
      if (!eventModel.includeInMap) {
        return acc
      }

      const time = format(eventModel.date, timeFormat, {
        timeZone: 'UTC'
      })

      const eventExport: EventExport = {
        id: eventModel.id,
        description: eventModel.description,
        date: format(eventModel.date, dateFormat, {
          timeZone: 'UTC'
        }),
        time: time === '00:00:00' ? '' : time,
        location: `${eventModel.site.town}, ${eventModel.site.oblast}`,
        latitude: eventModel.latLng
          ? eventModel.latLng.lat
          : eventModel.site.latLng.lat,
        longitude: eventModel.latLng
          ? eventModel.latLng.lng
          : eventModel.site.latLng.lng,
        incidentTypes: eventModel.incidentTypes,
        meansOfAttack: eventModel.meansOfAttack,
        sources: eventModel.sources
      }

      acc.eventExports.push(eventExport)

      acc.maxCounts.incidentTypes = Math.max(
        acc.maxCounts.incidentTypes,
        eventExport.incidentTypes.length
      )

      acc.maxCounts.meansOfAttack = Math.max(
        acc.maxCounts.meansOfAttack,
        eventExport.meansOfAttack.length
      )

      acc.maxCounts.sources = Math.max(
        acc.maxCounts.sources,
        eventExport.sources.length
      )

      return acc
    },
    { maxCounts: initialCounts, eventExports: [] }
  )

  eventExports.sort((a, b) => a.id - b.id)

  const labels = buildLabels(maxCounts)
  const values = eventExports.map(
    ({
      id,
      description,
      date,
      time,
      location,
      latitude,
      longitude,
      incidentTypes,
      meansOfAttack,
      sources
    }) => [
      id,
      description,
      date,
      time,
      location,
      latitude,
      longitude,
      ...Array.from(
        { length: maxCounts.incidentTypes },
        (v, i) => incidentTypes[i] ?? ''
      ),
      ...Array.from(
        { length: maxCounts.meansOfAttack },
        (v, i) => meansOfAttack[i] ?? ''
      ),
      ...Array.from({ length: maxCounts.sources }, (v, i) => sources[i] ?? '')
    ]
  )

  return [labels, ...values]
}
