import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { reportTypeErrors } from 'server/lib/reportTypeErrors/reportTypeErrors'
import returnValidModel from 'server/lib/returnValidModel/returnValidModel'
import {
  eventModel,
  EventModel,
  eventUpstream,
  EventUpstream,
  EventProperties
} from 'server/model/event/types'
import { splitTrim } from 'server/lib/util/splitTrim'
import toLatLng from 'server/model/latLng/serializer'
import { add } from 'date-fns'
import { CellType } from 'server/model/types'
import { AssociationModel } from 'server/model/association/types'
import { SiteModel } from 'server/model/site/types'
import { SourceModel } from 'server/model/source/types'
import {
  validateIncidentTypes,
  validateMeansOfAttack
} from 'server/model/association/validate'
import { validateSiteKey } from 'server/model/site/validate'
import { validateSources } from 'server/model/source/utilities'

interface ToEventArgs {
  event: Record<EventProperties, CellType>
  associationModelMap: Record<string, AssociationModel>
  siteModelMap: Record<string, SiteModel>
  sourceModelMap: Record<string, SourceModel>
}

type ToEvent = (args: ToEventArgs) => EventModel | null

export const toEvent: ToEvent = ({
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

  const model: Partial<EventModel> = {
    id,
    description,
    date: time
      ? add(date, {
          hours: time.getUTCHours(),
          minutes: time.getUTCMinutes(),
          seconds: time.getUTCSeconds()
        })
      : date,
    site: validateSiteKey({ siteKey, siteModelMap }),
    latLng: toLatLng(latLng),
    incidentTypes: validateIncidentTypes({
      associationKeys: splitTrim(incidentTypes),
      associationModelMap
    }),
    meansOfAttack: validateMeansOfAttack({
      associationKeys: splitTrim(meansOfAttack),
      associationModelMap
    }),
    sources: validateSources({
      sourceKeys: splitTrim(sources),
      sourceModelMap
    }),
    includeInMap
  }

  Logger.log(`TZ ${date.toISOString()}` as unknown as object)
  Logger.log(`TZ ${model.date?.toISOString()}` as unknown as object)

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

interface ToEventModelMapArgs {
  eventMap: Record<string, Record<EventProperties, CellType>>
  associationModelMap: Record<string, AssociationModel>
  siteModelMap: Record<string, SiteModel>
  sourceModelMap: Record<string, SourceModel>
}

export const toEventModelMap = ({
  eventMap,
  associationModelMap,
  siteModelMap,
  sourceModelMap
}: ToEventModelMapArgs) => {
  return Object.keys(eventMap).reduce<Record<string, EventModel>>(
    (acc, eventKey) => {
      const model = toEvent({
        event: eventMap[eventKey],
        associationModelMap,
        siteModelMap,
        sourceModelMap
      })

      if (model) {
        acc[eventKey] = model
      }

      return acc
    },
    {}
  )
}
