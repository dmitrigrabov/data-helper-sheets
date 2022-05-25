import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { reportTypeErrors } from 'server/lib/reportTypeErrors/reportTypeErrors'
import returnValidModel from 'server/lib/returnValidModel/returnValidModel'
import {
  eventModel,
  EventModel,
  eventUpstream,
  EventUpstream
} from 'server/model/event/types'
import { splitTrim } from 'server/lib/util/splitTrim'
import toLatLng from 'server/model/latLng/serializer'
import { add } from 'date-fns'

type ToEvent = (input: unknown) => EventModel | null

const toEvent: ToEvent = (input: unknown) => {
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
    latLng: toLatLng(latLng),
    incidentTypes: splitTrim(incidentTypes),
    meansOfAttack: splitTrim(meansOfAttack),
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
