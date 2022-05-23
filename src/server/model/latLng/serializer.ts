import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { reportTypeErrors } from 'server/lib/reportTypeErrors'
import returnValidModel from 'server/lib/returnValidModel'
import { latLngModel, LatLngModel } from 'server/model/latLng/types'

type ToLatLng = (input: unknown) => LatLngModel | null

const toLatLng: ToLatLng = (input: unknown) => {
  if (!input || typeof input !== 'string') {
    return null
  }

  const [lat, lng] = input.split(',').map(str => str.trim())

  return pipe(
    latLngModel.decode({ lat, lng }),
    fold(
      reportTypeErrors({
        model: 'LatLng',
        fallback: null
      }),
      returnValidModel
    )
  )
}

export default toLatLng
