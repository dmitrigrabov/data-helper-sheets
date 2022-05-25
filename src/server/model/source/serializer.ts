import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { reportTypeErrors } from 'server/lib/reportTypeErrors/reportTypeErrors'
import returnValidModel from 'server/lib/returnValidModel/returnValidModel'
import {
  sourceModel,
  SourceModel,
  SourceUpstream,
  sourceUpstream
} from 'server/model/source/types'
import { splitTrim } from 'server/lib/util/splitTrim'
import toLatLng from 'server/model/latLng/serializer'

type ToSource = (input: unknown) => SourceModel | null

const toSource: ToSource = (input: unknown) => {
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
    timestamp: Date.parse(timestamp),
    dateOfPost: Date.parse(dateOfPost),
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

export default toSource
