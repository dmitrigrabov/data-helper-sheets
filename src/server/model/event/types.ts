import * as t from 'io-ts'
import { latLngModel } from 'server/model/latLng/types'
import { siteModel } from 'server/model/site/types'

export const eventUpstream = t.type({
  eventKey: t.string,
  description: t.string,
  includeInMap: t.boolean
})

export const eventModel = t.type(
  {
    id: t.string,
    description: t.string,
    date: t.string,
    site: siteModel,
    latLng: t.union([latLngModel, t.null]),
    incidentTypes: t.array(t.string),
    meansOfAttack: t.array(t.string),
    sourceUrls: t.array(t.string),
    includeInMap: t.boolean
  },
  'EventModel'
)

export const eventExport = t.type(
  {
    id: t.string,
    description: t.string,
    date: t.string,
    time: t.string,
    location: t.string,
    latitude: t.number,
    longitude: t.number,
    incidentTypes: t.array(t.string),
    meansOfAttack: t.array(t.string),
    sourceUrls: t.array(t.string)
  },
  'EventExport'
)

export type EventExport = t.TypeOf<typeof eventExport>

export type EventUpstream = t.TypeOf<typeof eventUpstream>
export type EventModel = t.TypeOf<typeof eventModel>

const eventProperties = t.keyof(eventUpstream.props)
export type EventProperties = t.TypeOf<typeof eventProperties>

const eventExportProperties = t.keyof(eventExport.props)
export type EventExportProperties = t.TypeOf<typeof eventExportProperties>
