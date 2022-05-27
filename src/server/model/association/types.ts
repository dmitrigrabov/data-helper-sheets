import * as t from 'io-ts'
import { associationMode } from 'server/model/types'

const filterType = t.keyof({
  'Type of incident': null,
  'Means of attack': null
})

export type FilterType = t.TypeOf<typeof filterType>

export const associationUpstream = t.type({
  id: t.string,
  description: t.string,
  mode: associationMode,
  filterPath0: filterType,
  filterPath1: t.string,
  filterPath2: t.string,
  filterPath3: t.string
})

export const associationModel = t.type({
  id: t.string,
  description: t.string,
  mode: associationMode,
  filterPath: t.array(t.string)
})

export const associationExport = t.type({
  id: t.string,
  title: t.string,
  desc: t.string,
  mode: associationMode,
  filter_path0: t.string,
  filter_path1: t.string,
  filter_path2: t.string,
  filter_path3: t.string
})

const associationExportProperties = t.keyof(associationExport.props)
export type AssociationExportProperties = t.TypeOf<
  typeof associationExportProperties
>

export type AssociationUpstream = t.TypeOf<typeof associationUpstream>
export type AssociationModel = t.TypeOf<typeof associationModel>

const associationProperties = t.keyof(associationUpstream.props)
export type AssociationProperties = t.TypeOf<typeof associationProperties>
