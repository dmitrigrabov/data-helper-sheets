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
import { CellType } from 'server/model/types'
import { AssociationModel } from 'server/model/association/types'
import { SiteModel } from 'server/model/site/types'
import { SourceModel } from 'server/model/source/types'
import {
  validateIncidentTypes,
  validateMeansOfAttack
} from 'server/model/association/validate'
import { validateSiteKey } from 'server/model/site/validate'
import { LatLngModel } from 'server/model/latLng/types'

interface ToEventArgs {
  event: Record<EventProperties, CellType>
  associationModelMap: Record<string, AssociationModel>
  siteModelMap: Record<string, SiteModel>
  sourceModelMap: Record<string, SourceModel>
}

type ToEvent = (args: ToEventArgs) => EventModel | null

interface SiteInfo {
  site: SiteModel | undefined
  latLng: LatLngModel | undefined
}

const getSiteInfo = (
  eventSources: SourceModel[],
  siteModelMap: Record<string, SiteModel>
): SiteInfo => {
  const siteSource = eventSources.find(source => source.oblast && source.town)
  const latLngSource = eventSources.find(source => source.manualLatLng)

  if (!siteSource) {
    return {
      site: undefined,
      latLng: undefined
    }
  }

  const site = validateSiteKey({
    siteKey: `${siteSource.oblast}_${siteSource.town}`,
    siteModelMap
  })

  const latLng = latLngSource?.manualLatLng ?? site?.latLng

  return {
    site,
    latLng
  }
}

interface EventInfoRecords {
  incidentTypeRecord: Record<string, null>
  meansOfAttackRecord: Record<string, null>
}

interface EventInfo {
  incidentTypes: string[]
  meansOfAttack: string[]
}

const getEventInfo = (
  eventSources: SourceModel[],
  associationModelMap: Record<string, AssociationModel>
): EventInfo => {
  const { incidentTypeRecord, meansOfAttackRecord } =
    eventSources.reduce<EventInfoRecords>(
      (eventInfoRecords, source) => {
        source.incidentType.forEach(
          incidentType =>
            (eventInfoRecords.incidentTypeRecord[incidentType] = null)
        )

        source.meansOfAttack.forEach(
          meansOfAttack =>
            (eventInfoRecords.meansOfAttackRecord[meansOfAttack] = null)
        )

        return eventInfoRecords
      },
      {
        incidentTypeRecord: {},
        meansOfAttackRecord: {}
      }
    )

  return {
    incidentTypes: validateIncidentTypes({
      associationKeys: Object.keys(incidentTypeRecord),
      associationModelMap
    }),
    meansOfAttack: validateMeansOfAttack({
      associationKeys: Object.keys(meansOfAttackRecord),
      associationModelMap
    })
  }
}

const getSourceUrls = (eventSources: SourceModel[]) => {
  return eventSources.map(source => source.sourceUrl)
}

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

  const { eventKey, description, includeInMap } = event

  // Use sourceModel keyed on eventKey
  const eventSources = Object.values(sourceModelMap).filter(
    source => source.eventKey === eventKey
  )

  console.log('EVENT KEY', eventKey)
  console.log('EVENT SOURCES', eventSources)

  const date = eventSources.find(source => source.dateOfPost)?.dateOfPost
  const { site, latLng } = getSiteInfo(eventSources, siteModelMap)
  const { incidentTypes, meansOfAttack } = getEventInfo(
    eventSources,
    associationModelMap
  )

  const sourceUrls = getSourceUrls(eventSources)

  const model: Partial<EventModel> = {
    id: eventKey,
    description,
    date,
    site,
    latLng,
    incidentTypes,
    meansOfAttack,
    sourceUrls,
    includeInMap
  }

  console.log('EVENT', model)

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
