import { SourceModel } from 'server/model/source/types'

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
