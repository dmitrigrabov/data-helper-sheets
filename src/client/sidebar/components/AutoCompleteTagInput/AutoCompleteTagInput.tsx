import { TagInput } from 'evergreen-ui'
import { FC, useMemo } from 'react'

type AutoCompleteTagInputProps = {
  selected: string[]
  options: string[]
  setSelected: (selected: string[]) => void
}

const AutoCompleteTagInput: FC<AutoCompleteTagInputProps> = ({
  selected,
  options,
  setSelected
}) => {
  const autocompleteItems = useMemo(
    () => options.filter(i => !selected.includes(i)),
    [options, selected]
  )

  return (
    <TagInput
      inputProps={{ placeholder: 'Enter something...' }}
      values={selected}
      onChange={setSelected}
      autocompleteItems={autocompleteItems}
    />
  )
}

export default AutoCompleteTagInput
