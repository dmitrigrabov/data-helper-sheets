import * as t from 'io-ts'
import { associationMode } from 'server/model/types'

export const exportAssociationModel = t.type({
  id: t.string,
  title: t.string,
  desc: t.string,
  mode: associationMode,
  filterPath: t.array(t.string)
})
