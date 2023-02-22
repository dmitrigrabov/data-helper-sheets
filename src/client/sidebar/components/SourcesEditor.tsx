import { FlexColumn, FormSection } from 'client/sidebar/components/Layout'
import TextField from 'client/sidebar/components/TextField'
import TextFieldsArray from 'client/sidebar/components/TextFieldsArray'
import { Button, Label, SelectMenu, Textarea, TextInput } from 'evergreen-ui'
import { ChangeEvent, FC } from 'react'
import { Field, Form } from 'react-final-form'
import { CellInput } from 'server/lib/sheets/sheets'
import { CellContext } from 'shared/types/state'

type SourcesEditorProps = {
  cellContext: CellContext
  setContents: (contents: CellInput) => void
}

// TODO
// - [ ] Fix names of fields
// - [ ] Test functionality
// - [ ] Add association handlers
// - [ ] Add site handler

const SourcesEditor: FC<SourcesEditorProps> = ({ cellContext }) => {
  const { selectedCell } = cellContext
  return (
    <Form
      keepDirtyOnReinitialize
      initialValues={{ oblast: selectedCell.value }}
      onSubmit={values => {
        console.log('values', values)
      }}
      render={() => {
        return (
          <FlexColumn as="form">
            <FormSection>
              <Label>Date of event</Label>
              <Field
                name="dateOfTHING"
                render={({ input }) => (
                  <TextInput
                    type="date"
                    name={input.name}
                    value={input.value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      input.onChange(event.target.value)
                    }}
                  />
                )}
              />
            </FormSection>

            <FormSection>
              <Label>COmment</Label>
              <Field
                name="COMMENT"
                render={({ input }) => (
                  <Textarea
                    name={input.name}
                    value={input.value}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                      input.onChange(event.target.value)
                    }}
                  />
                )}
              />
            </FormSection>

            <FormSection>
              <Label>Oblast</Label>
              <Field
                name="oblast"
                render={({ input }) => (
                  <SelectMenu
                    title="Select name"
                    options={oblastOptions}
                    selected={input.value}
                    hasFilter={false}
                    hasTitle={false}
                    onSelect={item => input.onChange(item.value)}
                  >
                    <Button>{input.value || 'Select oblast...'}</Button>
                  </SelectMenu>
                )}
              />
            </FormSection>

            <FormSection>
              <Label>Town</Label>
              <Field name="oblast" subscription={{ value: true }}>
                {({ input: { value: oblast } }) => (
                  <Field
                    name="town"
                    render={({ input }) => (
                      <SelectMenu
                        title="Select name"
                        options={getTownOptions(oblast)}
                        selected={input.value}
                        hasFilter={false}
                        hasTitle={false}
                        onSelect={item => input.onChange(item.value)}
                      >
                        <Button>{input.value || 'Select town...'}</Button>
                      </SelectMenu>
                    )}
                  />
                )}
              </Field>
            </FormSection>

            <FormSection>
              <Label>Coordinates</Label>
              <TextField fieldName="manualLatLng.lat" />
              <TextField fieldName="manualLatLng.lng" />
            </FormSection>

            <FormSection>
              <Label>Google Drive links</Label>
              <TextFieldsArray fieldName="LINKS" />
            </FormSection>

            <FormSection>
              <Label>Image file name</Label>
              <TextFieldsArray fieldName="IMAGES" />
            </FormSection>

            <FormSection>
              <Label>Means of attack</Label>
              <SelectMenu
                isMultiSelect
                title="Select multiple names"
                options={options}
                selected={selectedItemsState}
                onSelect={item => {
                  const selected = [...selectedItemsState, item.value]
                  const selectedItems = selected
                  const selectedItemsLength = selectedItems.length
                  let selectedNames = ''
                  if (selectedItemsLength === 0) {
                    selectedNames = ''
                  } else if (selectedItemsLength === 1) {
                    selectedNames = selectedItems.toString()
                  } else if (selectedItemsLength > 1) {
                    selectedNames =
                      selectedItemsLength.toString() + ' selected...'
                  }
                  setSelectedItems(selectedItems)
                  setSelectedItemNames(selectedNames)
                }}
                onDeselect={item => {
                  const deselectedItemIndex = selectedItemsState.indexOf(
                    item.value
                  )
                  const selectedItems = selectedItemsState.filter(
                    (_item, i) => i !== deselectedItemIndex
                  )
                  const selectedItemsLength = selectedItems.length
                  let selectedNames = ''
                  if (selectedItemsLength === 0) {
                    selectedNames = ''
                  } else if (selectedItemsLength === 1) {
                    selectedNames = selectedItems.toString()
                  } else if (selectedItemsLength > 1) {
                    selectedNames =
                      selectedItemsLength.toString() + ' selected...'
                  }

                  setSelectedItems(selectedItems)
                  setSelectedItemNames(selectedNames)
                }}
              >
                <Button>
                  {selectedItemNamesState || 'Select multiple...'}
                </Button>
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

const getTownOptions = (oblast: string) => {
  return [] as { label: string; value: string }[]
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
