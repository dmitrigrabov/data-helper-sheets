import { Flex } from 'client/sidebar/components/Layout'
import { AddIcon, IconButton, TextInput, TrashIcon } from 'evergreen-ui'
import { ChangeEvent, FC } from 'react'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'

type TextFieldsArrayProps = {
  fieldName: string
}

const TextFieldsArray: FC<TextFieldsArrayProps> = ({ fieldName }) => (
  <FieldArray name={fieldName}>
    {({ fields }) => (
      <>
        {fields.map((name, index) => (
          <Flex key={index}>
            <Field
              name={`${name}[0]`}
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
            <IconButton icon={TrashIcon} />
          </Flex>
        ))}
        <IconButton icon={AddIcon} />
      </>
    )}
  </FieldArray>
)

export default TextFieldsArray
