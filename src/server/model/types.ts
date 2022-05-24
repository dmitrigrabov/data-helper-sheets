import * as t from 'io-ts'
import { associationUpstream } from 'server/model/association/types'
import { eventUpstream } from 'server/model/event/types'
import { exportAssociationDownstream } from 'server/model/exportAssociation/types'
import { exportEventDownstream } from 'server/model/exportEvent/types'
import { exportSourceDownstream } from 'server/model/exportSource/types'
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

export const format = t.type({
  Sources: t.array(
    t.type({
      name: t.keyof(sourceUpstream.props),
      label: t.string
    })
  ),
  Events: t.array(
    t.type({
      name: t.keyof(eventUpstream.props),
      label: t.string
    })
  ),
  Sites: t.array(
    t.type({
      name: t.keyof(siteUpstream.props),
      label: t.string
    })
  ),
  Categories: t.array(t.unknown),
  Associations: t.array(
    t.type({
      name: t.keyof(associationUpstream.props),
      label: t.string
    })
  ),
  EXPORT_EVENTS: t.array(
    t.type({
      name: t.keyof(exportEventDownstream.props),
      label: t.string
    })
  ),
  EXPORT_SOURCES: t.array(
    t.type({
      name: t.keyof(exportSourceDownstream.props),
      label: t.string
    })
  ),
  EXPORT_ASSOCIATIONS: t.array(
    t.type({
      name: t.keyof(exportAssociationDownstream.props),
      label: t.string
    })
  )
})

export type Format = t.TypeOf<typeof format>
