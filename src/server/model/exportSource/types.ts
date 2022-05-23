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
