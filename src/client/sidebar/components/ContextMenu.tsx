import AutoCompleteTagInput from 'client/sidebar/components/AutoCompleteTagInput'
import DatePanel from 'client/sidebar/components/DatePanel'
import { Flex, FlexColumn } from 'client/sidebar/components/Layout'
import { splitTrim } from 'client/utils/splitTrim'
import { FC, memo, useState } from 'react'
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
    const [selected, setSelected] = useState(splitTrim(selectedCell.value))

    console.log('selectedCell: ', selectedCell)
    console.log('cellInfo: ', cellInfo)

    return (
      <FlexColumn>
        {match(cellInfo.columnName)
          .with('dateOfPost', () => (
            <DatePanel cellContext={cellContext} setContents={setContents} />
          ))
          .otherwise(() => (
            <FlexColumn>
              <Flex>
                <Label>Value:</Label>
                <div>{selectedCell.value}</div>
              </Flex>
              <Flex>
                <Label>Column name:</Label>
                <div>{cellInfo.columnName}</div>
              </Flex>
              <Flex>
                <Label>Is association:</Label>
                <div>{cellInfo.isAssociation ? 'Yes' : 'No'}</div>
              </Flex>
            </FlexColumn>
          ))}

        {cellInfo.isAssociation && (
          <AutoCompleteTagInput
            options={cellInfo.options}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </FlexColumn>
    )
  }
)

export default ContextMenu
