import * as t from 'io-ts'
import { latLngModel } from 'server/model/latLng/types'

const Oblast = t.keyof({
  'Cherkasy Oblast': null,
  'Chernihiv Oblast': null,
  'Chernivtsi Oblast': null,
  'Dnipropetrovsk Oblast': null,
  'Donetsk Oblast': null,
  'Ivano-Frankivsk Oblast': null,
  'Kharkiv Oblast': null,
  'Kherson Oblast': null,
  'Khmelnytskyi Oblast': null,
  'Kyiv Oblast': null,
  'Kirovohrad Oblast': null,
  'Luhansk Oblast': null,
  'Lviv Oblast': null,
  'Mykolaiv Oblast': null,
  'Odessa Oblast': null,
  'Poltava Oblast': null,
  'Rivne Oblast': null,
  'Sumy Oblast': null,
  'Ternopil Oblast': null,
  'Vinnytsia Oblast': null,
  'Volyn Oblast': null,
  'Zakarpattia Oblast': null,
  'Zaporizhzhia Oblast': null,
  'Zhytomyr Oblast': null
})

export const siteUpstream = t.type({
  siteKey: t.string,
  town: t.string,
  oblast: t.string,
  latLng: t.string
})

export const siteModel = t.type({
  siteKey: t.string,
  town: t.string,
  oblast: Oblast,
  latLng: latLngModel
})

export type SiteUpstream = t.TypeOf<typeof siteUpstream>
export type SiteModel = t.TypeOf<typeof siteModel>

const siteProperties = t.keyof(siteUpstream.props)
export type SiteProperties = t.TypeOf<typeof siteProperties>
