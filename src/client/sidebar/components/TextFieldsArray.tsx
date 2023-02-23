import { Flex } from 'client/sidebar/components/Layout'
import { AddIcon, IconButton, TextInput, TrashIcon } from 'evergreen-ui'
import { ChangeEvent, FC, Fragment } from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'

type TextFieldsArrayProps = {
  fieldName: string
}

const TextFieldsArray: FC<TextFieldsArrayProps> = ({ fieldName }) => (
  <FieldArray name={fieldName}>
    {({ fields }) => (
      <>
        {fields.map((name, index) => {
          return (
            <Fragment key={index}>
              <Flex key={index}>
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
                    />
                  )}
                />
                <Flex style={{ width: '4px' }} />
                <IconButton
                  type="button"
                  icon={TrashIcon}
                  style={{ border: 'none' }}
                  onClick={() => fields.remove(index)}
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
