import * as t from 'io-ts'
import { associationMode } from 'server/model/types'

const filterType = t.keyof({
  'Type of incident': null,
  'Means of attack': null
})

export type FilterType = t.TypeOf<typeof filterType>

export const associationUpstream = t.type(
  {
    id: t.string,
    description: t.string,
    mode: associationMode,
    filterPath0: filterType,
    filterPath1: t.string,
    filterPath2: t.string,
    filterPath3: t.string
  },
  'AssociationUpstream'
)

export const associationModel = t.type(
  {
    id: t.string,
    description: t.string,
    mode: associationMode,
    filterPaths: t.array(t.string)
  },
  'AssociationModel'
)

export const associationExport = t.type(
  {
    id: t.string,
    title: t.string,
    description: t.string,
    mode: associationMode,
    filterPaths: t.array(t.string)
  },
  'AssociationExport'
)
export type AssociationExport = t.TypeOf<typeof associationExport>

const associationExportProperties = t.keyof(associationExport.props)
export type AssociationExportProperties = t.TypeOf<
  typeof associationExportProperties
>

export type AssociationUpstream = t.TypeOf<typeof associationUpstream>
export type AssociationModel = t.TypeOf<typeof associationModel>

const associationProperties = t.keyof(associationUpstream.props)
export type AssociationProperties = t.TypeOf<typeof associationProperties>
