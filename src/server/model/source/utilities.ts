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

interface ValidateSourceArgs {
  sourceKey: string
  sourceModelMap: Record<string, SourceModel>
}

export const validateSource = ({
  sourceKey,
  sourceModelMap
}: ValidateSourceArgs) => {
  return sourceModelMap[sourceKey] ? sourceKey : ''
}

interface ValidateSourcesArgs {
  sourceKeys: string[]
  sourceModelMap: Record<string, SourceModel>
}

export const validateSources = ({
  sourceKeys,
  sourceModelMap
}: ValidateSourcesArgs) => {
  return sourceKeys.filter(sourceKey => {
    return validateSource({
      sourceKey,
      sourceModelMap
    })
  })
}
