import { EventModel } from 'server/model/event/types'
import {
  AssociationExport,
  AssociationModel
} from 'server/model/association/types'

interface MaxCounts {
  filterPaths: number
}

interface Acc {
  maxCounts: MaxCounts
  associationExports: AssociationExport[]
}

const buildLabels = (maxCounts: MaxCounts) => {
  // TODO generate based on config
  const labels = [
    'id',
    'title',
    'desc',
    'mode',
    ...Array.from(
      { length: maxCounts.filterPaths },
      (v, i) => `filter_path${i + 1}`
    )
  ]

  return labels
}

export const exportAssociations = (
  associationModels: AssociationModel[],
  eventModelMap: Record<string, EventModel>
) => {
  const initialCounts: MaxCounts = {
    filterPaths: 0
  }

  const usedEventAssociationIds = Object.values(eventModelMap).reduce<
    Record<string, number>
  >((acc, { meansOfAttack, incidentTypes }) => {
    const eventAssociations = [...meansOfAttack, ...incidentTypes]

    eventAssociations.forEach(eventAssociation => {
      acc[eventAssociation] = acc[eventAssociation]
        ? acc[eventAssociation] + 1
        : 1
    })

    return acc
  }, {})

  const { maxCounts, associationExports } = associationModels.reduce<Acc>(
    (acc, associationModel) => {
      if (!usedEventAssociationIds[associationModel.id]) {
        return acc
      }

      const associationExport: AssociationExport = {
        id: associationModel.id,
        title: '',
        description: associationModel.description,
        mode: associationModel.mode,
        filterPaths: associationModel.filterPaths
      }

      acc.associationExports.push(associationExport)

      acc.maxCounts.filterPaths = Math.max(
        acc.maxCounts.filterPaths,
        associationExport.filterPaths.length
      )

      return acc
    },
    { maxCounts: initialCounts, associationExports: [] }
  )

  const labels = buildLabels(maxCounts)
  const values = associationExports.map(
    ({ id, title, description, mode, filterPaths }) => [
      id,
      title,
      description,
      mode,
      ...Array.from(
        { length: maxCounts.filterPaths },
        (v, i) => filterPaths[i] ?? ''
      )
    ]
  )

  return [labels, ...values]
}
