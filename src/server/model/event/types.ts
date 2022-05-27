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
  date: date,
  site: siteModel,
  latLng: t.union([latLngModel, t.null]),
  incidentTypes: t.array(t.string),
  meansOfAttack: t.array(t.string),
  sources: t.array(t.string),
  includeInMap: t.boolean
})

export const eventExport = t.type({
  id: t.number,
  description: t.string,
  date: t.string,
  time: t.string,
  location: t.string,
  latitude: t.number,
  longitude: t.number,
  incidentTypes: t.array(t.string),
  meansOfAttack: t.array(t.string),
  sources: t.array(t.string)
})
export type EventExport = t.TypeOf<typeof eventExport>

export type EventUpstream = t.TypeOf<typeof eventUpstream>
export type EventModel = t.TypeOf<typeof eventModel>

const eventProperties = t.keyof(eventUpstream.props)
export type EventProperties = t.TypeOf<typeof eventProperties>

const eventExportProperties = t.keyof(eventExport.props)
export type EventExportProperties = t.TypeOf<typeof eventExportProperties>
