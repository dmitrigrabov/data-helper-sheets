import { CellInfo, SelectedCell } from 'shared/types/state'
import { associationConfig } from 'server/model/association/config'
import { eventConfig } from 'server/model/event/config'
import { siteConfig } from 'server/model/site/config'
import { toSourceModelMap } from 'server/model/source/serializer'
import { toEventModelMap } from 'server/model/event/serializer'
import { toSiteModelMap } from 'server/model/site/serializer'
import { toAssociationModelMap } from 'server/model/association/serializer'
import { sourceConfig } from 'server/model/source/config'
import { parseRow, parseSheet } from 'server/lib/sheets/parseSheet'
import { ImportSheetName } from 'server/model/types'
import { match } from 'ts-pattern'
import { SiteModel } from 'server/model/site/types'

const getSheetConfig = (sheetName: string) => {
  switch (sheetName) {
    case 'Sources':
      return sourceConfig
    case 'Events':
      return eventConfig
    case 'Sites':
      return siteConfig
    case 'Associations':
      return associationConfig
  }
}

const emptyCellInfo = {
  columnLabel: undefined,
  columnName: undefined,
  rowData: {}
}

const getSourcesRowData = (rowNumber: number) => {
  const rowData = parseRow('Sources', rowNumber)

  const row = toSourceModelMap(rowData)

  return row
}

const getSitesRowData = (rowNumber: number) => {
  const rowData = parseRow('Sites', rowNumber)

  const row = toSiteModelMap(rowData)

  return row
}

const getAssociationsRowData = (rowNumber: number) => {
  const rowData = parseRow('Associations', rowNumber)

  const row = toAssociationModelMap(rowData)

  return row
}

const getEventsRowData = (rowNumber: number) => {
  const eventsRow = parseRow('Events', rowNumber)

  const sourceModelMap = getSourcesRowData(rowNumber)
  const siteModelMap = getSitesRowData(rowNumber)
  const associationModelMap = getAssociationsRowData(rowNumber)

  const eventModelMap = toEventModelMap({
    eventMap: eventsRow,
    sourceModelMap,
    siteModelMap,
    associationModelMap
  })

  return eventModelMap
}

export const getCellInfo = (selectedCell: SelectedCell): CellInfo => {
  console.log('Selected cell', selectedCell)
  const sheetConfig = getSheetConfig(selectedCell.sheetName)

  if (!sheetConfig) {
    return emptyCellInfo
  }

  const rowData = selectedCell.row
    ? match(sheetConfig.sheetName as ImportSheetName)
        .with('Sources', () => getSourcesRowData(selectedCell.row))
        .with('Sites', () => getSitesRowData(selectedCell.row))
        .with('Associations', () => getAssociationsRowData(selectedCell.row))
        .with('Events', () => getEventsRowData(selectedCell.row))
        .exhaustive()
    : {}

  console.log('Row data', rowData)

  const column = sheetConfig.columns[selectedCell.column]

  if (!column) {
    return emptyCellInfo
  }

  const cellInfo = {
    columnLabel: column.label,
    columnName: column.name,
    rowData
  }

  return cellInfo
}

export const getSitesInfo = (): Record<string, SiteModel> => {
  const rowData = parseSheet('Sites')

  const siteModelMap = toSiteModelMap(rowData)

  return siteModelMap
}

// export const getCellInfo = (selectedCell: SelectedCell): CellInfo => {
//   console.log('Selected cell', selectedCell)
//   const sheetConfig = getSheetConfig(selectedCell.sheetName)

//   if (!sheetConfig) {
//     return emptyCellInfo
//   }

//   const associationMap = parseSheet('Associations')
//   const associationModelMap = toAssociationModelMap(associationMap)

//   const column = sheetConfig.columns[selectedCell.column]

//   console.log('Column', column)

//   if (!column) {
//     return emptyCellInfo
//   }

//   const isAssociation = Boolean(
//     column &&
//       Object.values(associationMap).some(
//         ({ filterPath0 }) => filterPath0 === column.label
//       )
//   )

//   const options = isAssociation
//     ? Object.values(associationMap)
//         .filter(({ filterPath0 }) => filterPath0 === column.label)
//         .map(association => association.id as string)
//     : []

//   const cellInfo = {
//     columnLabel: column.label,
//     columnName: column.name,
//     associationModelMap,
//     associationMap,
//     isAssociation,
//     options
//   }

//   console.log('cellInfo', cellInfo)

//   return cellInfo
// }
