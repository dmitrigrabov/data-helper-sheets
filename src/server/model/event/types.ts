import * as t from 'io-ts'
import { date } from 'server/lib/types/date'
import { latLngModel } from 'server/model/latLng/types'
import { siteModel } from 'server/model/site/types'

export const eventUpstream = t.type({
  id: t.number,
  description: t.string,
  date: date,
  time: t.union([date, t.literal('')]),
  siteKey: t.string,
  latLng: t.union([t.string, t.literal('')]),
  incidentTypes: t.string,
  meansOfAttack: t.string,
  sources: t.string,
  includeInMap: t.boolean
})

export const eventModel = t.type({
  id: t.number,
  description: t.string,
  date,
  site: siteModel,
  latLng: t.union([latLngModel, t.null]),
  incidentTypes: t.array(t.string),
  meansOfAttack: t.array(t.string),
  sources: t.array(t.string),
  includeInMap: t.boolean
})

// export const exportEventModel = t.type({
//   id: t.number,
//   description: t.string,
//   date,
//   location: siteModel,
//   latLng: t.union([latLngModel, t.null]),
//   incidentTypes: t.array(associationModel),
//   meansOfAttach: t.array(associationModel),
//   sources: t.array(t.string)
// })

export const eventExport = t.type({
  id: t.number,
  description: t.string,
  date: t.string,
  time: t.string,
  location: t.string,
  latitude: t.string,
  longitude: t.string,
  association1: t.string,
  association2: t.string,
  source1: t.string
})

export type EventUpstream = t.TypeOf<typeof eventUpstream>
export type EventModel = t.TypeOf<typeof eventModel>

const eventProperties = t.keyof(eventUpstream.props)
export type EventProperties = t.TypeOf<typeof eventProperties>

const eventExportProperties = t.keyof(eventExport.props)
export type EventExportProperties = t.TypeOf<typeof eventExportProperties>
