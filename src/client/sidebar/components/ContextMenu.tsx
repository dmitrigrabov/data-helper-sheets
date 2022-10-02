import AutoCompleteTagInput from 'client/sidebar/components/AutoCompleteTagInput/AutoCompleteTagInput'
import { Flex, FlexColumn } from 'client/sidebar/components/Layout'
import { splitTrim } from 'client/utils/splitTrim'
import { FC, useState } from 'react'

import { CellContext } from 'shared/types/state'
import styled from 'styled-components'

type ContextMenuProps = {
  cellContext: CellContext
}

const Label = styled.div`
  width: 120px;
  font-weight: 600;
`

const ContextMenu: FC<ContextMenuProps> = ({ cellContext }) => {
  const { selectedCell, cellInfo } = cellContext
  const [selected, setSelected] = useState(splitTrim(selectedCell.value))

  return (
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

export default ContextMenu
