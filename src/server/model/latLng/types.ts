import * as t from 'io-ts'

export const latLngModel = t.type({
  lat: t.number,
  lng: t.number
})

export type LatLngModel = t.TypeOf<typeof latLngModel>
