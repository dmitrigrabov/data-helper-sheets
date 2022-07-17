import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { reportTypeErrors } from 'server/lib/reportTypeErrors/reportTypeErrors'
import returnValidModel from 'server/lib/returnValidModel/returnValidModel'
import {
  sourceModel,
  SourceModel,
  SourceProperties,
  SourceUpstream,
  sourceUpstream
} from 'server/model/source/types'
import { splitTrim } from 'server/lib/util/splitTrim'
import toLatLng from 'server/model/latLng/serializer'
import { CellType, SourceType } from 'server/model/types'

type ToSource = (input: unknown) => SourceModel | null

// TODO possibly move to own model
const typeFromUrl = (url: string): SourceType => {
  if (url.startsWith('https://t.me/')) {
    return 'Telegram'
  }

  if (url.startsWith('https://twitter.com/')) {
    return 'Telegram'
  }

  if (
    url.startsWith('https://youtu.be/') ||
    url.startsWith('https://www.youtube.com/watch?')
  ) {
    return 'YouTube'
  }

  if (url.startsWith('https://www.facebook.com/')) {
    return 'Facebook'
  }

  return 'Unknown'
}

export const toSource: ToSource = (input: unknown) => {
  const source: SourceUpstream | null = pipe(
    sourceUpstream.decode(input),
    fold(
      reportTypeErrors({
        model: 'Source',
        fallback: null
      }),
      returnValidModel
    )
  )

  if (!source) {
    return null
  }

  const {
    timestamp,
    sourceUrl,
    dateOfPost,
    oblast,
    town,
    manualLatLng,
    googleDriveLinks,
    fileNames,
    archiveLink,
    comment,
    incidentType,
    meansOfAttack,
    eventKey
  } = source

  const model = {
    timestamp,
    sourceUrl,
    dateOfPost,
    oblast,
    town,
    manualLatLng: toLatLng(manualLatLng),
    googleDriveLinks: splitTrim(googleDriveLinks),
    fileNames,
    archiveLink,
    comment,
    incidentType: splitTrim(incidentType),
    meansOfAttack: splitTrim(meansOfAttack),
    eventKey,
    type: typeFromUrl(sourceUrl)
  }

  return pipe(
    sourceModel.decode(model),
    fold(
      reportTypeErrors({
        model: 'Source',
        fallback: null
      }),
      returnValidModel
    )
  )
}

export const toSourceModelMap = (
  sourceMap: Record<string, Record<SourceProperties, CellType>>
) => {
  return Object.keys(sourceMap).reduce<Record<string, SourceModel>>(
    (acc, sourceKey) => {
      const model = toSource(sourceMap[sourceKey])

      if (model) {
        acc[sourceKey] = model
      }

      return acc
    },
    {}
  )
}
