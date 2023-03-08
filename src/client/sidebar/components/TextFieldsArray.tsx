import { Flex } from 'client/sidebar/components/Layout'
import { SetSourceCell } from 'client/sidebar/types'
import { AddIcon, IconButton, TextInput, TrashIcon } from 'evergreen-ui'
import { ChangeEvent, FC, Fragment } from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { CellContext } from 'shared/types/state'

type TextFieldsArrayProps = {
  fieldName: string
  setSourceCell: (cell: SetSourceCell) => Promise<boolean>
  cellContext: CellContext
}

const TextFieldsArray: FC<TextFieldsArrayProps> = ({
  fieldName,
  setSourceCell,
  cellContext
}) => (
  <FieldArray name={fieldName}>
    {({ fields }) => (
      <>
        {fields.map((name, index) => {
          const saveValue = async (value: string) => {
            return await setSourceCell({
              row: cellContext.row,
              column: cellContext.column,
              value,
              columnName: fieldName
            })
          }

          return (
            <Fragment key={name}>
              <Flex>
                <Field
                  name={`${name}`}
                  render={({ input }) => (
                    <TextInput
                      type="text"
                      name={input.name}
                      value={input.value}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        input.onChange(event.target.value)
                      }}
                      onBlur={async () => {
                        const mergedValue = fields.value.join(', ')
                        saveValue(mergedValue)
                      }}
                    />
                  )}
                />
                <Flex style={{ width: '4px' }} />
                {/* Disable on save and show spinner */}
                {/* Add confirm? */}
                <IconButton
                  type="button"
                  icon={TrashIcon}
                  style={{ border: 'none' }}
                  onClick={async () => {
                    const mergedValue = fields.value
                      .filter((_, i) => i !== index)
                      .join(', ')

                    const success = await saveValue(mergedValue)

                    if (success) {
                      fields.remove(index)
                    }
                  }}
                />
              </Flex>
              <Flex style={{ height: '4px' }} />
            </Fragment>
          )
        })}
        <Flex style={{ justifyContent: 'center' }}>
          <IconButton
            type="button"
            icon={AddIcon}
            style={{ border: 'none' }}
            onClick={() => fields.push('')}
          />
        </Flex>
      </>
    )}
  </FieldArray>
)

export default TextFieldsArray
