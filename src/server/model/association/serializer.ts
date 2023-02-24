import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { reportTypeErrors } from 'server/lib/reportTypeErrors/reportTypeErrors'
import returnValidModel from 'server/lib/returnValidModel/returnValidModel'
import {
  associationModel,
  AssociationModel,
  associationUpstream,
  AssociationUpstream,
  AssociationProperties
} from 'server/model/association/types'
import { CellType } from 'server/model/types'

type ToAssociation = (input: unknown) => AssociationModel | null

export const toAssociation: ToAssociation = (input: unknown) => {
  const association: AssociationUpstream | null = pipe(
    associationUpstream.decode(input),
    fold(
      reportTypeErrors({
        id: (input as AssociationUpstream)?.id,
        idFieldName: 'Id',
        model: 'Association',
        fallback: null
      }),
      returnValidModel
    )
  )

  if (!association) {
    return null
  }

  const {
    id,
    description,
    mode,
    filterPath0,
    filterPath1,
    filterPath2,
    filterPath3
  } = association

  const filterPaths = [
    filterPath0,
    filterPath1,
    filterPath2,
    filterPath3
  ].filter(str => str)

  const model = {
    id,
    description,
    mode,
    filterPaths
  }

  return pipe(
    associationModel.decode(model),
    fold(
      reportTypeErrors({
        id: model.id,
        idFieldName: 'Id',
        model: 'Association',
        fallback: null
      }),
      returnValidModel
    )
  )
}

export const toAssociationModelMap = (
  associationMap: Record<string, Record<AssociationProperties, CellType>>
) => {
  return Object.keys(associationMap).reduce<Record<string, AssociationModel>>(
    (acc, associationKey) => {
      const model = toAssociation(associationMap[associationKey])

      if (model) {
        acc[associationKey] = model
      }

      return acc
    },
    {}
  )
}

export const toAssociationModelList = (
  associationMap: Record<string, Record<AssociationProperties, CellType>>
) => {
  return Object.keys(associationMap).reduce<AssociationModel[]>(
    (acc, associationKey) => {
      const model = toAssociation(associationMap[associationKey])

      if (model) {
        acc.push(model)
      }

      return acc
    },
    []
  )
}
