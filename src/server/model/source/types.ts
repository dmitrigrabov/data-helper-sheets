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
  possibleLatLng: t.union([latLng, t.null]),
  type: sourceType,
  manualLocation: t.string,
  manualLatLng: t.union([latLng, t.null]),
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

export const exportSourceDownstream = t.type({
  id: t.string,
  title: t.string,
  thumbnail: t.string,
  description: t.string,
  type: sourceType,
  path1: t.string
})

export const exportSourceDownstreamExtended = t.intersection([
  exportSourceDownstream,
  t.partial({
    path2: t.string,
    path3: t.string,
    path4: t.string,
    path5: t.string,
    path6: t.string,
    path7: t.string,
    path8: t.string,
    path9: t.string
  })
])

export type SourceUpstream = t.TypeOf<typeof sourceUpstream>
export type SourceModel = t.TypeOf<typeof sourceModel>

const sourceProperties = t.keyof(sourceUpstream.props)
export type SourceProperties = t.TypeOf<typeof sourceProperties>
