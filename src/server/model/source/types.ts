import * as t from 'io-ts'
import { date } from 'server/lib/types/date'
import { latLngModel } from 'server/model/latLng/types'
import { sourceType } from 'server/model/types'

export const sourceUpstream = t.type({
  timestamp: date,
  dateOfPost: date,
  sourceUrl: t.string,
  embedLinks: t.string,
  googleDriveLinks: t.string,
  postCaption: t.string,
  possibleLocationName: t.string,
  possibleAddress: t.string,
  possibleLatLng: t.string,
  type: t.string,
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
  possibleLatLng: t.union([latLngModel, t.null]),
  type: sourceType,
  manualLocation: t.string,
  manualLatLng: t.union([latLngModel, t.null]),
  mapLink: t.string,
  archiveLink: t.string,
  description: t.string,
  comment: t.string
})

// export const exportSourceModel = t.type({
//   id: t.string,
//   title: t.string,
//   thumbnail: t.string,
//   description: t.string,
//   type: sourceType,
//   paths: t.array(t.string)
// })

export const sourceExport = t.type({
  id: t.string,
  title: t.string,
  thumbnail: t.string,
  description: t.string,
  type: sourceType,
  path1: t.string
})

const sourceExportProperties = t.keyof(sourceExport.props)
export type SourceExportProperties = t.TypeOf<typeof sourceExportProperties>

export type SourceUpstream = t.TypeOf<typeof sourceUpstream>
export type SourceModel = t.TypeOf<typeof sourceModel>

const sourceProperties = t.keyof(sourceUpstream.props)
export type SourceProperties = t.TypeOf<typeof sourceProperties>
