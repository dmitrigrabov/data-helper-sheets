import { Flex } from 'client/sidebar/components/Layout'
import { SetSourceCell } from 'client/sidebar/types'
import { TextInput } from 'evergreen-ui'
import { ChangeEvent, FC } from 'react'
import { Field } from 'react-final-form'
import { CellContext } from 'shared/types/state'

type CoordinatesInputProps = {
  setSourceCell: (cell: SetSourceCell) => Promise<boolean>
  cellContext: CellContext
}

const CoordinatesInput: FC<CoordinatesInputProps> = ({
  setSourceCell,
  cellContext
}) => (
  <Field
    name="manualLatLng"
    render={({ input }) => {
      const { lat, lng } = input.value

      const onBlur = () => {
        if (!lat || !lng) {
          return
        }

        setSourceCell({
          row: cellContext.row,
          column: cellContext.column,
          value: `${lat},${lng}}`,
          columnName: 'manualLatLng'
        })
      }

      return (
        <>
          <TextInput
            type="text"
            name={input.name}
            value={lat}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              input.onChange(event.target.value)
            }}
            onBlur={onBlur}
          />
          <Flex style={{ height: '4px' }} />
          <TextInput
            type="text"
            name={input.name}
            value={lng}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              input.onChange(event.target.value)
            }}
            onBlur={onBlur}
          />
        </>
      )
    }}
  />
)

export default CoordinatesInput
