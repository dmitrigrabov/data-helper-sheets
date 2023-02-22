import { FlexColumn, FormSection } from 'client/sidebar/components/Layout'
import { Button, Label, Menu } from 'evergreen-ui'
import { FC, FormEvent } from 'react'
import { Form } from 'react-final-form'
import { CellInput } from 'server/lib/sheets/sheets'
import { CellContext } from 'shared/types/state'

type SourcesEditorProps = {
  cellContext: CellContext
  setContents: (contents: CellInput) => void
}

const SourcesEditor: FC<SourcesEditorProps> = ({
  cellContext,
  setContents
}) => {
  return (
    <Form
      onSubmit={values => {
        console.log('values', values)
      }}
      render={() => {
        return (
          <FlexColumn as="form">
            <FormSection>
              <Label>Oblast</Label>
              <SelectMenu
                title="Select name"
                options={[
                  'Apple',
                  'Apricot',
                  'Banana',
                  'Cherry',
                  'Cucumber'
                ].map(label => ({ label, value: label }))}
                selected={selected}
                hasFilter={false}
                hasTitle={false}
                onSelect={item => setSelected(item.value)}
              >
                <Button>{selected || 'Select name...'}</Button>
              </SelectMenu>
            </FormSection>
            <FormSection>
              <Button type="submit">Save</Button>
            </FormSection>
          </FlexColumn>
        )
      }}
    />
  )
}

export default SourcesEditor
