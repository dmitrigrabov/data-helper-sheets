import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { reportTypeErrors } from 'server/lib/reportTypeErrors/reportTypeErrors'
import returnValidModel from 'server/lib/returnValidModel/returnValidModel'
import toLatLng from 'server/model/latLng/serializer'
import {
  siteModel,
  SiteModel,
  siteUpstream,
  SiteUpstream
} from 'server/model/site/types'

type ToSite = (input: unknown) => SiteModel | null

const toSite: ToSite = (input: unknown) => {
  const site: SiteUpstream | null = pipe(
    siteUpstream.decode(input),
    fold(
      reportTypeErrors({
        model: 'Site',
        fallback: null
      }),
      returnValidModel
    )
  )

  if (!site) {
    return null
  }

  const { siteKey, town, oblast, latLng } = site

  const model = {
    siteKey,
    town,
    oblast,
    latLng: toLatLng(latLng)
  }

  return pipe(
    siteModel.decode(model),
    fold(
      reportTypeErrors({
        model: 'Site',
        fallback: null
      }),
      returnValidModel
    )
  )
}

export default toSite
