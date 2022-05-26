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
  associationKey: string
  filterType: 'Type of incident' | 'Means of attack'
  associationModelMap: Record<string, AssociationModel>
}

export const validateAssociation = ({
  associationKey,
  filterType,
  associationModelMap
}: ValidateAssociationArgs) => {
  const association = associationModelMap[associationKey]
  const associationType = association?.filterPath?.[0]

  return associationType === filterType ? associationKey : ''
}

interface ValidateAssociationsArgs {
  associationKeys: string[]
  associationModelMap: Record<string, AssociationModel>
}

export const validateIncidentTypes = ({
  associationKeys,
  associationModelMap
}: ValidateAssociationsArgs) => {
  return associationKeys.filter(associationKey => {
    return validateAssociation({
      associationKey,
      filterType: 'Type of incident',
      associationModelMap
    })
  })
}

export const validateMeansOfAttack = ({
  associationKeys,
  associationModelMap
}: ValidateAssociationsArgs) => {
  return associationKeys.filter(associationKey => {
    return validateAssociation({
      associationKey,
      filterType: 'Means of attack',
      associationModelMap
    })
  })
}
