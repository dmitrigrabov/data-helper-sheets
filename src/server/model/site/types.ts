import * as t from 'io-ts'
import { latLngModel } from 'server/model/latLng/types'

export const siteUpstream = t.type(
  {
    siteKey: t.string,
    town: t.string,
    oblast: t.string,
    latLng: t.string
  },
  'SiteUpstream'
)

export const siteModel = t.type(
  {
    siteKey: t.string,
    town: t.string,
    oblast: t.string,
    latLng: latLngModel
  },
  'SiteModel'
)

export type SiteUpstream = t.TypeOf<typeof siteUpstream>
export type SiteModel = t.TypeOf<typeof siteModel>

const siteProperties = t.keyof(siteUpstream.props)
export type SiteProperties = t.TypeOf<typeof siteProperties>
