import { FlexColumn, FormSection } from 'client/sidebar/components/Layout'
import { formatDate } from 'client/utils/formatDate'
import { Button, Label } from 'evergreen-ui'
import { FC, useState, FormEvent } from 'react'
import { CellInput } from 'server/lib/sheets/sheets'
import { CellContext } from 'shared/types/state'

type DatePanelProps = {
  cellContext: CellContext
  setContents: (contents: CellInput) => void
}

const DatePanel: FC<DatePanelProps> = ({ cellContext, setContents }) => {
  const { selectedCell, cellInfo } = cellContext
  const date = formatDate(selectedCell.value)
  const [value, setValue] = useState(date)

  return (
    <FlexColumn
      as="form"
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log('date num', value)
        console.log('date ', new Date(value).toUTCString())

        if (!cellInfo.columnName) {
          console.log('no column name found')
          return
        }

        setContents({
          row: selectedCell.row,
          column: selectedCell.column,
          value: new Date(value).toUTCString(),
          columnName: cellInfo.columnName,
          sheetName: selectedCell.sheetName
        })
      }}
    >
      <FormSection>
        <Label>Value:</Label>
        <input
          type="date"
          name="date"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </FormSection>
      <FormSection>
        <Button type="submit">Save</Button>
      </FormSection>
    </FlexColumn>
  )
}

export default DatePanel
