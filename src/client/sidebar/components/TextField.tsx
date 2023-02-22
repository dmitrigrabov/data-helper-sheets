import { TextInput } from 'evergreen-ui'
import { ChangeEvent, FC } from 'react'
import { Field } from 'react-final-form'

type TextFieldProps = {
  fieldName: string
}

const TextField: FC<TextFieldProps> = ({ fieldName }) => (
  <Field
    name={fieldName}
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
)

export default TextField
