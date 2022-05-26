import toSource from 'server/model/source/serializer'
import { SourceModel, SourceProperties } from 'server/model/source/types'
import { CellType } from 'server/model/types'

export const toSourceModelMap = (
  sourceMap: Record<string, Record<SourceProperties, CellType>>
) => {
  return Object.keys(sourceMap).reduce<Record<string, SourceModel>>(
    (acc, sourceKey) => {
      const sourceModel = toSource(sourceMap[sourceKey])

      if (sourceModel) {
        acc[sourceKey] = sourceModel
      }

      return acc
    },
    {}
  )
}
