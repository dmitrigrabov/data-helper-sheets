import * as t from 'io-ts'
import { associationMode } from 'server/model/types'

export const associationUpstream = t.type({
  id: t.string,
  description: t.string,
  mode: associationMode,
  filterPath: t.array(t.string)
})

export const associationModel = t.type({
  id: t.string,
  description: t.string,
  mode: associationMode,
  filterPath: t.array(t.string)
})

export type AssociationUpstream = t.TypeOf<typeof associationUpstream>
export type AssociationModel = t.TypeOf<typeof associationModel>
