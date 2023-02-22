import DatePanel from 'client/sidebar/components/DatePanel'
import { Flex, FlexColumn, FormSection } from 'client/sidebar/components/Layout'
import OblastPanel from 'client/sidebar/components/OblastPanel'
import TownPanel from 'client/sidebar/components/TownPanel'
import { FC, memo } from 'react'
import { CellInput } from 'server/lib/sheets/sheets'

import { CellContext } from 'shared/types/state'
import styled from 'styled-components'
import { match } from 'ts-pattern'

type ContextMenuProps = {
  cellContext: CellContext
  setContents: (contents: CellInput) => void
}

const Label = styled.div`
  width: 120px;
  font-weight: 600;
`

const ContextMenu: FC<ContextMenuProps> = memo(
  ({ cellContext, setContents }) => {
    const { selectedCell, cellInfo } = cellContext

    console.log('cellInfo', cellInfo)

    return (
      <FlexColumn>
        {match(cellInfo.columnName)
          .with('dateOfPost', () => (
            <DatePanel cellContext={cellContext} setContents={setContents} />
          ))
          .with('oblast', () => (
            <OblastPanel cellContext={cellContext} setContents={setContents} />
          ))
          .with('town', () => (
            <TownPanel cellContext={cellContext} setContents={setContents} />
          ))
          .otherwise(() => (
            <FlexColumn>
              <FormSection>
                <Label>{cellInfo.columnLabel}</Label>
                <Flex>{selectedCell.value}</Flex>
              </FormSection>
            </FlexColumn>
          ))}
      </FlexColumn>
    )
  }
)

export default ContextMenu

// {cellInfo.isAssociation && (
//   <AutoCompleteTagInput
//     options={cellInfo.options}
//     selected={selected}
//     setSelected={setSelected}
//   />
// )}
