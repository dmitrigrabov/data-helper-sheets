import { FlexColumn, FormSection } from 'client/sidebar/components/Layout'
import { Button, Label, Menu } from 'evergreen-ui'
import { FC, useState, FormEvent } from 'react'
import { CellInput } from 'server/lib/sheets/sheets'
import { CellContext } from 'shared/types/state'

type OblastPanelProps = {
  cellContext: CellContext
  setContents: (contents: CellInput) => void
}

const OblastPanel: FC<OblastPanelProps> = ({ cellContext, setContents }) => {
  const { selectedCell, cellInfo } = cellContext
  const [value, setValue] = useState(selectedCell.value)

  return (
    <FlexColumn
      as="form"
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!cellInfo.columnName) {
          console.log('no column name found')
          return
        }

        setContents({
          row: selectedCell.row,
          column: selectedCell.column,
          value,
          columnName: cellInfo.columnName,
          sheetName: selectedCell.sheetName
        })
      }}
    >
      <FormSection>
        <Label>Oblast</Label>
        <Menu>
          <Menu.OptionsGroup
            options={oblastOptions}
            selected={value}
            onChange={selected => setValue(selected)}
          />
        </Menu>
      </FormSection>
      <FormSection>
        <Button type="submit">Save</Button>
      </FormSection>
    </FlexColumn>
  )
}

export default OblastPanel
