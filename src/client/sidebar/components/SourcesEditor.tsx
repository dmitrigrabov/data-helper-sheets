import { Flex, FlexColumn, FormSection } from 'client/sidebar/components/Layout'
import TextField from 'client/sidebar/components/TextField'
import TextFieldsArray from 'client/sidebar/components/TextFieldsArray'
import {
  Button,
  IconButton,
  Label,
  RefreshIcon,
  SelectMenu,
  Textarea,
  TextInput
} from 'evergreen-ui'
import { ChangeEvent, FC } from 'react'
import { Field, Form } from 'react-final-form'
import { CellInput } from 'server/lib/sheets/sheets'
import { CellContext } from 'shared/types/state'
import mutators from 'final-form-arrays'
import { SourceModel } from 'server/model/source/types'
import { formatDate } from 'client/utils/formatDate'
import { SiteModel } from 'server/model/site/types'
import TownInput from 'client/sidebar/components/TownInput'
import { PageData } from 'client/sidebar/types'

type SourcesEditorProps = {
  cellContext: CellContext
  setContents: (contents: CellInput) => void
  sites: Record<string, SiteModel>
  getSites: () => void
  setPage: (page: PageData) => void
}

// TODO
// - [ ] Fix names of fields
// - [ ] Test functionality
// - [ ] Add association handlers
// - [ ] Add site handler

const prepareSource = (source: SourceModel | undefined) => {
  if (!source) {
    return undefined
  }

  return {
    ...source,
    dateOfPost: formatDate(source.dateOfPost)
  }
}

const SourcesEditor: FC<SourcesEditorProps> = ({
  cellContext,
  sites,
  getSites,
  setPage
}) => {
  console.log(cellContext)

  const source = prepareSource(
    Object.values(cellContext.rowData)?.[0] as SourceModel | undefined
  )

  return (
    <Form
      keepDirtyOnReinitialize
      mutators={{ ...mutators }}
      initialValues={source}
      onSubmit={values => {
        console.log('values', values)
      }}
      render={() => {
        return (
          <FlexColumn as="form">
            <FormSection>
              <Label>Date of event</Label>
              <Flex style={{ height: '4px' }} />
              <Field
                name="dateOfPost"
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
              <Label>Comment</Label>
              <Flex style={{ height: '4px' }} />
              <Field
                name="comment"
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
              <Flex style={{ height: '4px' }} />
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
                    closeOnSelect
                  >
                    <Button type="button">
                      {oblastOptions.find(({ value }) => value === input.value)
                        ?.label || 'Select oblast...'}
                    </Button>
                  </SelectMenu>
                )}
              />
            </FormSection>

            <FormSection>
              <Flex
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-end'
                }}
              >
                <Label>Town</Label>
                <IconButton
                  type="button"
                  icon={RefreshIcon}
                  style={{ border: 'none' }}
                  onClick={() => getSites()}
                />
              </Flex>
              <Flex style={{ height: '4px' }} />
              <TownInput sites={sites} setPage={setPage} />
            </FormSection>

            <FormSection>
              <Label>Coordinates</Label>
              <Flex style={{ height: '4px' }} />
              <TextField fieldName="manualLatLng.lat" />
              <Flex style={{ height: '4px' }} />
              <TextField fieldName="manualLatLng.lng" />
            </FormSection>

            <FormSection>
              <Label>Google Drive links</Label>
              <Flex style={{ height: '4px' }} />
              <TextFieldsArray fieldName="googleDriveLinks" />
            </FormSection>

            <FormSection>
              <Label>Image file name</Label>
              <Flex style={{ height: '4px' }} />
              <TextFieldsArray fieldName="fileNames" />
            </FormSection>

            <FormSection>
              <Label>Means of attack</Label>
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

const oblastOptions = [
  { label: 'Cherkasy Oblast', value: 'CHERKASY' },
  { label: 'Chernihiv Oblast', value: 'CHERNIHIV' },
  { label: 'Chernivtsi Oblast', value: 'CHERNIVTSI' },
  { label: 'Dnipropetrovsk Oblast', value: 'DNIPROPETROVSK' },
  { label: 'Donetsk Oblast', value: 'DONETSK' },
  { label: 'Ivano-Frankivsk Oblast', value: 'IVANOFRANKIVSK' },
  { label: 'Kharkiv Oblast', value: 'KHARKVIV' },
  { label: 'Kherson Oblast', value: 'KHERSON' },
  { label: 'Khmelnytskyi Oblast', value: 'KHMELNYTSKYI' },
  { label: 'Kyiv Oblast', value: 'KYIV' },
  { label: 'Kirovohrad Oblast', value: 'KIROVOHRAD' },
  { label: 'Luhansk Oblast', value: 'LUHANSK' },
  { label: 'Lviv Oblast', value: 'LVIV' },
  { label: 'Mykolaiv Oblast', value: 'MYKOLAIV' },
  { label: 'Odessa Oblast', value: 'ODESSA' },
  { label: 'Poltava Oblast', value: 'POLTAVA' },
  { label: 'Rivne Oblast', value: 'RIVNE' },
  { label: 'Sumy Oblast', value: 'SUMY' },
  { label: 'Ternopil Oblast', value: 'TERNOPIL' },
  { label: 'Vinnytsia Oblast', value: 'VINNYTSIA' },
  { label: 'Volyn Oblast', value: 'VOLYN' },
  { label: 'Zakarpattia Oblast', value: 'ZAKARPATTIA' },
  { label: 'Zaporizhzhia Oblast', value: 'ZAPORIZHZHIA' },
  { label: 'Zhytomyr Oblast', value: 'ZHYTOMYR' }
]
