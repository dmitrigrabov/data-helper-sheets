import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { reportTypeErrors } from 'server/lib/reportTypeErrors/reportTypeErrors'
import returnValidModel from 'server/lib/returnValidModel/returnValidModel'
import toLatLng from 'server/model/latLng/serializer'
import {
  siteModel,
  SiteModel,
  SiteProperties,
  siteUpstream,
  SiteUpstream
} from 'server/model/site/types'
import { CellType } from 'server/model/types'

type ToSite = (input: unknown) => SiteModel | null

export const toSite: ToSite = (input: unknown) => {
  const site: SiteUpstream | null = pipe(
    siteUpstream.decode(input),
    fold(
      reportTypeErrors({
        id: (input as SiteUpstream)?.siteKey,
        idFieldName: 'Site key',
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
        id: model.siteKey,
        idFieldName: 'Site key',
        model: 'Site',
        fallback: null
      }),
      returnValidModel
    )
  )
}

export const toSiteModelMap = (
  siteMap: Record<string, Record<SiteProperties, CellType>>
) => {
  return Object.keys(siteMap).reduce<Record<string, SiteModel>>(
    (acc, siteKey) => {
      const model = toSite(siteMap[siteKey])

      if (model) {
        acc[siteKey] = model
      }

      return acc
    },
    {}
  )
}
