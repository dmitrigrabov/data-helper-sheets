import * as t from 'io-ts'
import { associationMode } from 'server/model/types'

export const exportAssociationModel = t.type({
  id: t.string,
  title: t.string,
  desc: t.string,
  mode: associationMode,
  filterPath: t.array(t.string)
})

export const exportAssociationDownstream = t.type({
  id: t.string,
  title: t.string,
  desc: t.string,
  mode: associationMode,
  filter_path0: t.string,
  filter_path1: t.string,
  filter_path2: t.string,
  filter_path3: t.string
})
