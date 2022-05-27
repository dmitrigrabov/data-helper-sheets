import { AssociationModel } from 'server/model/association/types'

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
  const associationType = association?.filterPaths?.[0]

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
