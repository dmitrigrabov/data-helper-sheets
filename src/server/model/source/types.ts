import * as t from 'io-ts'
import { date } from 'server/lib/types/date'
import { latLngModel } from 'server/model/latLng/types'
import { sourceType } from 'server/model/types'

export const sourceUpstream = t.type({
  timestamp: date,
  sourceUrl: t.string,
  dateOfPost: date,
  oblast: t.string,
  town: t.string,
  manualLatLng: t.string,
  googleDriveLinks: t.string,
  fileNames: t.string,
  archiveLink: t.string,
  comment: t.string,
  incidentType: t.string,
  meansOfAttack: t.string,
  eventKey: t.string
})

export const sourceModel = t.type({
  timestamp: date,
  sourceUrl: t.string,
  dateOfPost: date,
  oblast: t.string,
  town: t.string,
  manualLatLng: t.union([latLngModel, t.null]),
  googleDriveLinks: t.array(t.string),
  fileNames: t.string,
  archiveLink: t.string,
  comment: t.string,
  incidentType: t.array(t.string),
  meansOfAttack: t.array(t.string),
  eventKey: t.string,
  type: sourceType
})

export const sourceExport = t.type({
  id: t.string,
  title: t.string,
  thumbnail: t.string,
  description: t.string,
  type: sourceType,
  paths: t.array(t.string)
})
export type SourceExport = t.TypeOf<typeof sourceExport>

const sourceExportProperties = t.keyof(sourceExport.props)
export type SourceExportProperties = t.TypeOf<typeof sourceExportProperties>

export type SourceUpstream = t.TypeOf<typeof sourceUpstream>
export type SourceModel = t.TypeOf<typeof sourceModel>

const sourceProperties = t.keyof(sourceUpstream.props)
export type SourceProperties = t.TypeOf<typeof sourceProperties>
