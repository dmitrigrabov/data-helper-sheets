import { FlexColumn, FormSection } from 'client/sidebar/components/Layout'
import { Text, Button, Label, Menu } from 'evergreen-ui'
import { FC, useState, FormEvent } from 'react'
import { CellInput } from 'server/lib/sheets/sheets'
import { SourceModel } from 'server/model/source/types'
import { CellContext } from 'shared/types/state'

type OblastPanelProps = {
  cellContext: CellContext
  setContents: (contents: CellInput) => void
}

const oblastOptions = [
  { label: 'Cherkasy Oblast', value: 'CHERKASY' },
  { label: 'Chernihiv Oblast', value: 'CHERNIHIV' },
  { label: 'Chernivtsi Oblast', value: 'CHERNIVTSI' },
  { label: 'Dnipropetrovsk Oblast', value: 'DNIPROPOTROVSK' },
  { label: 'Donetsk Oblast', value: 'DONETSK' },
  { label: 'Ivano-Frankivsk Oblast', value: 'IVANO_FRANKIVSK' },
  { label: 'Kharkiv Oblast', value: 'KHARKVIV' },
  { label: 'Kherson Oblast', value: 'KHERSON' },
  { label: 'Khmelnytskyi Oblast', value: 'KHMELNYSKYI' },
  { label: 'Kyiv Oblast', value: 'KYIV' },
  { label: 'Kirovohrad Oblast', value: 'KIROVGRAD' },
  { label: 'Luhansk Oblast', value: 'LUHANSK' },
  { label: 'Lviv Oblast', value: 'LVIV' },
  { label: 'Mykolaiv Oblast', value: 'MYKOLAIV' },
  { label: 'Odessa Oblast', value: 'ODESSA' },
  { label: 'Poltava Oblast', value: 'POLTAVA' },
  { label: 'Rivne Oblast', value: 'RIVNE' },
  { label: 'Sumy Oblast', value: 'SUMY' },
  { label: 'Ternopil Oblast', value: 'TERNOPIL' },
  { label: 'Vinnytsia Oblast', value: 'VINNITSIA' },
  { label: 'Volyn Oblast', value: 'VOLYN' },
  { label: 'Zakarpattia Oblast', value: 'ZAKARPATTIA' },
  { label: 'Zaporizhzhia Oblast', value: 'ZAPORIZHZHIA' },
  { label: 'Zhytomyr Oblast', value: 'ZHYTOMYR' }
]

const OblastPanel: FC<OblastPanelProps> = ({ cellContext, setContents }) => {
  const { selectedCell, cellInfo } = cellContext
  const [value, setValue] = useState(selectedCell.value)
  const [row] = Object.values(cellInfo.rowData) as SourceModel[]
  const oblast = oblastOptions.find(o => o.value === row?.oblast)

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
        <Text>{oblast?.label}</Text>
      </FormSection>
      <FormSection>
        <Label>Town</Label>

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
