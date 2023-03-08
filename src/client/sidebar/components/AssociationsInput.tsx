import { Flex, FlexColumn } from 'client/sidebar/components/Layout'
import { SetSourceCell } from 'client/sidebar/types'
import { Button, SelectMenu, Text } from 'evergreen-ui'
import { FC } from 'react'
import { Field } from 'react-final-form'
import { AssociationModel } from 'server/model/association/types'
import { CellContext } from 'shared/types/state'

type AssociationsInputProps = {
  fieldName: string
  title: string
  associations: AssociationModel[]
  setSourceCell: (cell: SetSourceCell) => Promise<boolean>
  cellContext: CellContext
}

const AssociationsInput: FC<AssociationsInputProps> = ({
  fieldName,
  title,
  associations,
  setSourceCell,
  cellContext
}) => {
  return (
    <Field<string[] | string>
      name={fieldName}
      render={({ input }) => {
        const value = typeof input.value === 'string' ? [] : input.value
        const options = buildOptions(title, associations)

        return (
          <SelectMenu
            isMultiSelect
            options={options}
            selected={value}
            onCloseComplete={async () => {
              setSourceCell({
                row: cellContext.row,
                column: cellContext.column,
                value: value.join(', '),
                columnName: fieldName
              })
            }}
            onSelect={item => {
              input.onChange([...value, item.value as string])
            }}
            onDeselect={item => {
              input.onChange(
                value.filter(selectItem => selectItem !== item.value)
              )
            }}
          >
            <FlexColumn>
              <Text>
                {value
                  .map(item =>
                    associations
                      .find(association => association.id === item)
                      ?.filterPaths.slice(-1)
                  )
                  .join(' - ')}
              </Text>
              <Flex style={{ height: '4px' }} />
              <Button type="button">Edit</Button>
            </FlexColumn>
          </SelectMenu>
        )
      }}
    />
  )
}

export default AssociationsInput

const prefix = (count = 0) => {
  return Array.from(Array(count).keys()).reduce(acc => {
    return `${acc}- `
  }, '')
}

const buildOptions = (title: string, associations: AssociationModel[]) => {
  return associations
    .filter(
      association =>
        association.filterPaths[0] === title &&
        association.filterPaths.length > 1
    )
    .map(association => {
      const { filterPaths } = association
      const { length } = filterPaths

      const out = {
        label: `${prefix(length - 2)}${filterPaths[length - 1]}`,
        value: association.id
      }

      return out
    })
}
