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
import { CellType } from 'server/model/types'

type ToSource = (input: unknown) => SourceModel | null

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
    dateOfPost,
    sourceUrl,
    embedLinks,
    googleDriveLinks,
    postCaption,
    possibleLocationName,
    possibleAddress,
    possibleLatLng,
    type,
    manualLocation,
    manualLatLng,
    mapLink,
    archiveLink,
    description,
    comment
  } = source

  const model = {
    timestamp,
    dateOfPost,
    sourceUrl,
    embedLinks: splitTrim(embedLinks),
    googleDriveLinks: splitTrim(googleDriveLinks),
    postCaption,
    possibleLocationName,
    possibleAddress,
    possibleLatLng: toLatLng(possibleLatLng),
    type,
    manualLocation,
    manualLatLng: toLatLng(manualLatLng),
    mapLink,
    archiveLink,
    description,
    comment
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
