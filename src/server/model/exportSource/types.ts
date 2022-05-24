import * as t from 'io-ts'
import { sourceType } from 'server/model/types'

export const exportSourceModel = t.type({
  id: t.string,
  title: t.string,
  thumbnail: t.string,
  description: t.string,
  type: sourceType,
  paths: t.array(t.string)
})

export const exportSourceDownstream = t.type({
  id: t.string,
  title: t.string,
  thumbnail: t.string,
  description: t.string,
  type: sourceType,
  path1: t.string
})

export const exportSourceDownstreamExtended = t.intersection([
  exportSourceDownstream,
  t.partial({
    path2: t.string,
    path3: t.string,
    path4: t.string,
    path5: t.string,
    path6: t.string,
    path7: t.string,
    path8: t.string,
    path9: t.string
  })
])
