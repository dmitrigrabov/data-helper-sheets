import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { reportTypeErrors } from 'server/lib/reportTypeErrors/reportTypeErrors'
import returnValidModel from 'server/lib/returnValidModel/returnValidModel'
import {
  eventModel,
  EventModel,
  eventUpstream,
  EventUpstream,
  eventExport,
  EventProperties
} from 'server/model/event/types'
import { splitTrim } from 'server/lib/util/splitTrim'
import toLatLng from 'server/model/latLng/serializer'
import { add } from 'date-fns'
import { format } from 'date-fns'
import { dateFormat, timeFormat } from 'server/format'
import { CellType } from 'server/model/types'
import { AssociationModel } from 'server/model/association/types'
import { SiteModel } from 'server/model/site/types'
import { SourceModel } from 'server/model/source/types'
import {
  validateIncidentTypes,
  validateMeansOfAttack
} from 'server/model/association/utilities'

interface ToEventArgs {
  event: Record<EventProperties, CellType>
  associationModelMap: Record<string, AssociationModel>
  siteModelMap: Record<string, SiteModel>
  sourceModelMap: Record<string, SourceModel>
}

type ToEvent = (args: ToEventArgs) => EventModel | null

const toEvent: ToEvent = ({
  event: input,
  associationModelMap,
  siteModelMap,
  sourceModelMap
}) => {
  const event: EventUpstream | null = pipe(
    eventUpstream.decode(input),
    fold(
      reportTypeErrors({
        model: 'Event',
        fallback: null
      }),
      returnValidModel
    )
  )

  if (!event) {
    return null
  }

  const {
    id,
    description,
    date,
    time,
    siteKey,
    latLng,
    incidentTypes,
    meansOfAttack,
    sources,
    includeInMap
  } = event

  const model = {
    id,
    description,
    date: time
      ? add(date, {
          hours: time.getUTCHours(),
          minutes: time.getUTCMinutes(),
          seconds: time.getUTCSeconds()
        })
      : date,
    siteKey,
    latLng: latLng ? toLatLng(latLng) : { lat: 0, lng: 0 },
    incidentTypes: validateIncidentTypes({
      associationIds: splitTrim(incidentTypes),
      associationModelMap
    }),
    meansOfAttack: validateMeansOfAttack({
      associationIds: splitTrim(meansOfAttack),
      associationModelMap
    }),
    sources: splitTrim(sources),
    includeInMap
  }

  return pipe(
    eventModel.decode(model),
    fold(
      reportTypeErrors({
        model: 'Event',
        fallback: null
      }),
      returnValidModel
    )
  )
}

export default toEvent

export const toExportEventModel = (event: EventModel) => {
  Logger.log(JSON.stringify(event, undefined, 2))

  const {
    id,
    description,
    date,
    //siteKey,
    latLng,
    incidentTypes,
    meansOfAttack,
    sources,
    includeInMap
  } = event

  if (!includeInMap) {
    return null
  }

  const exportModel = {
    id,
    description,
    date: format(date, dateFormat),
    time: format(date, timeFormat),
    location: 'Add location',
    latitude: latLng ? latLng.lat + '' : '',
    longitude: latLng ? latLng.lng + '' : '',
    association1: meansOfAttack[0],
    association2: incidentTypes[0],
    source1: sources[0]
  }

  Logger.log('exportModel')
  Logger.log(exportModel)

  return pipe(
    eventExport.decode(exportModel),
    fold(
      reportTypeErrors({
        model: 'EventExport',
        fallback: null
      }),
      returnValidModel
    )
  )
}
