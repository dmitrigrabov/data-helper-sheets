import * as t from 'io-ts'
import { associationUpstream } from 'server/model/association/types'
import { eventUpstream } from 'server/model/event/types'
// import { exportAssociationDownstream } from 'server/model/exportAssociation/types'
// import { exportSourceDownstream } from 'server/model/exportSource/types'
import { exportEventDownstream } from 'server/model/exportEvent/types'
import { siteUpstream } from 'server/model/site/types'
import { sourceUpstream } from 'server/model/source/types'

export const sourceType = t.keyof({
  Telegram: null,
  Twitter: null,
  YouTube: null,
  Image: null,
  Video: null
})

export const associationMode = t.keyof({
  CATEGORY: null,
  NARRATIVE: null,
  FILTER: null
})

const cellType = t.keyof({
  string: null,
  number: null,
  boolean: null,
  date: null
})

const sheetFormat = <
  D extends {
    [key: string]: unknown
  }
>(
  upstreamProps: t.KeyofC<D>
) =>
  t.type({
    columns: t.array(
      t.type({
        name: upstreamProps,
        label: t.string,
        type: cellType
      })
    ),
    key: upstreamProps
  })

export const format = t.type({
  // Sources: sheetFormat(t.keyof(sourceUpstream.props)),
  Events: sheetFormat(t.keyof(eventUpstream.props))
  // Sites: sheetFormat(t.keyof(siteUpstream.props)),
  // Categories: sheetFormat(t.keyof({})),
  // Associations: sheetFormat(t.keyof(associationUpstream.props)),
  // EXPORT_EVENTS: sheetFormat(t.keyof(exportEventDownstream.props))
  // EXPORT_SOURCES: sheetFormat(t.keyof(exportSourceDownstream.props)),
  // EXPORT_ASSOCIATIONS: sheetFormat(t.keyof(exportAssociationDownstream.props))
})

export type Format = t.TypeOf<typeof format>

const sheetName = t.keyof(format.props)
export type SheetName = t.TypeOf<typeof sheetName>

export type CellTypeName = t.TypeOf<typeof cellType>
export type CellType = number | string | boolean | Date
