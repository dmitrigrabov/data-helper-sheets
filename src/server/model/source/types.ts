import * as t from 'io-ts'
import { date } from 'server/lib/types/date'
import { sourceType } from 'server/model/types'

export const latLng = t.type({
  lat: t.number,
  lng: t.number
})

export const sourceUpstream = t.type({
  timestamp: t.string,
  dateOfPost: t.string,
  sourceUrl: t.string,
  embedLinks: t.string,
  googleDriveLinks: t.string,
  postCaption: t.string,
  possibleLocationName: t.string,
  possibleAddress: t.string,
  possibleLatLng: t.string,
  type: sourceType,
  manualLocation: t.string,
  manualLatLng: t.string,
  mapLink: t.string,
  archiveLink: t.string,
  description: t.string,
  comment: t.string
})

export const sourceModel = t.type({
  timestamp: date,
  dateOfPost: date,
  sourceUrl: t.string,
  embedLinks: t.array(t.string),
  googleDriveLinks: t.array(t.string),
  postCaption: t.string,
  possibleLocationName: t.string,
  possibleAddress: t.string,
  possibleLatLng: t.union([latLng, t.null]),
  type: sourceType,
  manualLocation: t.string,
  manualLatLng: t.union([latLng, t.null]),
  mapLink: t.string,
  archiveLink: t.string,
  description: t.string,
  comment: t.string
})

export type SourceUpstream = t.TypeOf<typeof sourceUpstream>
export type SourceModel = t.TypeOf<typeof sourceModel>
