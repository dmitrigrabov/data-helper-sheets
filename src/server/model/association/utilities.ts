import toAssociation from 'server/model/association/serializer'
import {
  AssociationModel,
  AssociationProperties
} from 'server/model/association/types'
import { CellType } from 'server/model/types'

export const toAssociationModelMap = (
  associationMap: Record<string, Record<AssociationProperties, CellType>>
) => {
  return Object.keys(associationMap).reduce<Record<string, AssociationModel>>(
    (acc, associationKey) => {
      const associationModel = toAssociation(associationMap[associationKey])

      if (associationModel) {
        acc[associationKey] = associationModel
      }

      return acc
    },
    {}
  )
}

interface ValidateAssociationArgs {
  associationId: string
  filterType: 'Type of incident' | 'Means of attack'
  associationModelMap: Record<string, AssociationModel>
}

export const validateAssociation = ({
  associationId,
  filterType,
  associationModelMap
}: ValidateAssociationArgs) => {
  const association = associationModelMap[associationId]
  const associationType = association?.filterPath?.[0]

  return associationType === filterType ? associationId : ''
}

interface ValidateAssociationsArgs {
  associationIds: string[]
  associationModelMap: Record<string, AssociationModel>
}

export const validateIncidentTypes = ({
  associationIds,
  associationModelMap
}: ValidateAssociationsArgs) => {
  return associationIds.filter(associationId => {
    return validateAssociation({
      associationId,
      filterType: 'Type of incident',
      associationModelMap
    })
  })
}

export const validateMeansOfAttack = ({
  associationIds,
  associationModelMap
}: ValidateAssociationsArgs) => {
  return associationIds.filter(associationId => {
    return validateAssociation({
      associationId,
      filterType: 'Means of attack',
      associationModelMap
    })
  })
}
