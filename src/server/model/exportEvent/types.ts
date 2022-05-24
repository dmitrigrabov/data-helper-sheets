import * as t from 'io-ts'
import { date } from 'server/lib/types/date'
import { associationModel } from 'server/model/association/types'
import { latLngModel } from 'server/model/latLng/types'
import { siteModel } from 'server/model/site/types'

export const exportEventModel = t.type({
  id: t.number,
  description: t.string,
  date,
  location: siteModel,
  latLng: t.union([latLngModel, t.null]),
  incidentTypes: t.array(associationModel),
  meansOfAttach: t.array(associationModel),
  sources: t.array(t.string)
})

export const exportEventDownstream = t.type({
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

export const exportEventDownstreamExtended = t.intersection([
  exportEventDownstream,
  t.partial({
    association2: t.string,
    association3: t.string,
    association4: t.string,
    association5: t.string,
    association6: t.string,
    association7: t.string,
    association8: t.string,
    association9: t.string,
    source2: t.string,
    source3: t.string,
    source4: t.string,
    source5: t.string,
    source6: t.string,
    source7: t.string,
    source8: t.string,
    source9: t.string
  })
])
