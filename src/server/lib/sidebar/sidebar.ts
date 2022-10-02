import { CellInfo, SelectedCell } from 'shared/types/state'
import { associationConfig } from 'server/model/association/config'
import { eventConfig } from 'server/model/event/config'
import { siteConfig } from 'server/model/site/config'
import { sourceConfig } from 'server/model/source/config'
import { parseSheet } from 'server/lib/sheets/parseSheet'
import { toAssociationModelMap } from 'server/model/association/serializer'

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
  columnName: undefined,
  associationModelMap: {},
  associationMap: {},
  isAssociation: false,
  options: []
}

export const getCellInfo = (selectedCell: SelectedCell): CellInfo => {
  const sheetConfig = getSheetConfig(selectedCell.sheetName)

  if (!sheetConfig) {
    return emptyCellInfo
  }

  const associationMap = parseSheet('Associations')
  const associationModelMap = toAssociationModelMap(associationMap)

  const column = sheetConfig.columns[selectedCell.column]

  if (!column) {
    return emptyCellInfo
  }

  const isAssociation = Boolean(
    column &&
      Object.values(associationMap).some(
        ({ filterPath0 }) => filterPath0 === column.label
      )
  )

  const options = isAssociation
    ? Object.values(associationMap)
        .filter(({ filterPath0 }) => filterPath0 === column.label)
        .map(association => association.id as string)
    : []

  return {
    columnName: column.label,
    associationModelMap,
    associationMap,
    isAssociation,
    options
  }
}
