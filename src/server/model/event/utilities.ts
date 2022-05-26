import { AssociationModel } from 'server/model/association/types'
import toEvent from 'server/model/event/serializer'
import { EventModel, EventProperties } from 'server/model/event/types'
import { SiteModel } from 'server/model/site/types'
import { SourceModel } from 'server/model/source/types'
import { CellType } from 'server/model/types'

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
      const eventModel = toEvent({
        event: eventMap[eventKey],
        associationModelMap,
        siteModelMap,
        sourceModelMap
      })

      if (eventModel) {
        acc[eventKey] = eventModel
      }

      return acc
    },
    {}
  )
}
