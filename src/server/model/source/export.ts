import { EventModel } from 'server/model/event/types'
import { SourceExport, SourceModel } from 'server/model/source/types'
import URL from 'url-parse'

interface MaxCounts {
  paths: number
}

interface Acc {
  maxCounts: MaxCounts
  sourceExports: SourceExport[]
}

const buildLabels = (maxCounts: MaxCounts) => {
  // TODO generate based on config
  const labels = [
    'id',
    'title',
    'thumbnail',
    'description',
    'type',
    ...Array.from({ length: maxCounts.paths }, (v, i) => `path${i + 1}`)
  ]

  return labels
}

const getGoogleDriveId = (googleDriveLinks: string[]) => {
  return googleDriveLinks
    .map(link => {
      const url = new URL(link)

      const params = url.query
        .substring(1)
        .split('&')
        .reduce<Record<string, string>>((acc, item) => {
          const [key, value] = item.split('=')
          acc[key] = value

          return acc
        }, {})

      const id = params.id

      return id ?? ''
    })
    .filter(link => link)
}

const getSources = (sourceModel: SourceModel) => {
  switch (sourceModel.type) {
    case 'Telegram':
    case 'Twitter':
    case 'YouTube':
      return [sourceModel.sourceUrl]

    default:
      return getGoogleDriveId(sourceModel.googleDriveLinks)
  }
}

export const exportSources = (
  sourceModels: SourceModel[],
  eventModelMap: Record<string, EventModel>
) => {
  const initialCounts: MaxCounts = {
    paths: 0
  }

  const usedEventSourceUrls = Object.values(eventModelMap).reduce<
    Record<string, true>
  >((acc, eventModel) => {
    eventModel.sources.forEach(sourceUrl => {
      acc[sourceUrl] = true
    })

    return acc
  }, {})

  const { maxCounts, sourceExports } = sourceModels.reduce<Acc>(
    (acc, sourceModel) => {
      if (!usedEventSourceUrls[sourceModel.sourceUrl]) {
        return acc
      }

      const sourceExport: SourceExport = {
        id: sourceModel.sourceUrl,
        title: '',
        thumbnail: '',
        description: sourceModel.description,
        type: sourceModel.type,
        paths: getSources(sourceModel)
      }

      acc.sourceExports.push(sourceExport)

      acc.maxCounts.paths = Math.max(
        acc.maxCounts.paths,
        sourceExport.paths.length
      )

      return acc
    },
    { maxCounts: initialCounts, sourceExports: [] }
  )

  const labels = buildLabels(maxCounts)
  const values = sourceExports.map(
    ({ id, title, thumbnail, description, type, paths }) => [
      id,
      title,
      thumbnail,
      description,
      type,
      ...Array.from({ length: maxCounts.paths }, (v, i) => paths[i] ?? '')
    ]
  )

  return [labels, ...values]
}
