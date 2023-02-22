import { FlexColumn, FormSection } from 'client/sidebar/components/Layout'
import { formatInTimeZone } from 'date-fns-tz'
import { Button, Label } from 'evergreen-ui'
import { FC, useState, FormEvent } from 'react'
import { CellInput, setContents } from 'server/lib/sheets/sheets'
import { CellContext } from 'shared/types/state'

type DatePanelProps = {
  cellContext: CellContext
  setContents: (contents: CellInput) => Promise<unknown>
}

const formatDate = (dateString: string) => {
  try {
    const date = Date.parse(dateString)
    return formatInTimeZone(date, 'UTC', 'yyyy-MM-dd')
  } catch (e) {
    return ''
  }
}

const DatePanel: FC<DatePanelProps> = ({ cellContext }) => {
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
        <Label>Column name:</Label>
        <div>{cellInfo.columnName}</div>
      </FormSection>
      <FormSection>
        <Label>Is association:</Label>
        <div>{cellInfo.isAssociation ? 'Yes' : 'No'}</div>
      </FormSection>
      <FormSection>
        <Button type="submit">Save</Button>
      </FormSection>
    </FlexColumn>
  )
}

export default DatePanel
