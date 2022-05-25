import { pipe } from 'fp-ts/lib/function'
import { fold } from 'fp-ts/lib/Either'
import { format } from 'date-fns'
import { dateFormat, timeFormat } from 'server/format'
import { EventModel } from 'server/model/event/types'
import { exportEventDownstream } from 'server/model/exportEvent/types'
import { reportTypeErrors } from 'server/lib/reportTypeErrors/reportTypeErrors'
import returnValidModel from 'server/lib/returnValidModel/returnValidModel'

export const toExportEventModel = (event: EventModel) => {
  const {
    id,
    description,
    date,
    //siteKey,
    latLng,
    incidentTypes,
    meansOfAttack,
    sources,
    includeInMap
  } = event

  if (includeInMap) {
    return null
  }

  const exportModel = {
    id,
    description,
    date: format(date, dateFormat),
    time: format(date, timeFormat),
    location: 'Add location',
    latitude: latLng ? latLng.lat : '',
    longitude: latLng ? latLng.lng : '',
    association1: meansOfAttack[0],
    association2: incidentTypes[0],
    source1: sources[0]
  }

  return pipe(
    exportEventDownstream.decode(exportModel),
    fold(
      reportTypeErrors({
        model: 'EventExport',
        fallback: null
      }),
      returnValidModel
    )
  )
}
