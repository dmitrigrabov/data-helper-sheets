import * as t from 'io-ts'

export const latLngModel = t.type(
  {
    lat: t.number,
    lng: t.number
  },
  'LatLngModel'
)

export type LatLngModel = t.TypeOf<typeof latLngModel>
