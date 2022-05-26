import * as t from 'io-ts'
import { date } from 'server/lib/types/date'
import { latLngModel } from 'server/model/latLng/types'

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
  siteKey: t.string,
  latLng: latLngModel,
  incidentTypes: t.array(t.string),
  meansOfAttack: t.array(t.string),
  sources: t.array(t.string),
  includeInMap: t.boolean
})

export type EventUpstream = t.TypeOf<typeof eventUpstream>
export type EventModel = t.TypeOf<typeof eventModel>

const eventProperties = t.keyof(eventUpstream.props)
export type EventProperties = t.TypeOf<typeof eventProperties>
