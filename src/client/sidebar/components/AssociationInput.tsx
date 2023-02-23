import { Button, SelectMenu } from 'evergreen-ui'
import { FC } from 'react'

type Option = {
  label: string
  value: string
}

type AssociationInputProps = {
  fieldName: string
  options: Option[]
  placeholder: string
  selected: string[]
  onChange: (selected: string[]) => void
}

const AssociationInput: FC<AssociationInputProps> = ({
  options,
  placeholder,
  selected,
  onChange
}) => {
  return (
    <SelectMenu
      isMultiSelect
      title={placeholder}
      options={options}
      selected={selected}
      onSelect={item => {
        onChange([...selected, item.value as string])
      }}
      onDeselect={item => {
        onChange(selected.filter(selectItem => selectItem !== item.value))
      }}
    >
      <Button type="button">{`count ${selected.length}`}</Button>
    </SelectMenu>
  )
}

export default AssociationInput
