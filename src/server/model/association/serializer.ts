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
        model: 'Association',
        fallback: null
      }),
      returnValidModel
    )
  )

  if (!association) {
    return null
  }

  const { id, description, mode, filterPath } = association

  const model = {
    id,
    description,
    mode,
    filterPath
  }

  return pipe(
    associationModel.decode(model),
    fold(
      reportTypeErrors({
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
