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
