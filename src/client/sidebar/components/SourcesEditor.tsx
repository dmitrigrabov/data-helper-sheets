import { Flex, FlexColumn, FormSection } from 'client/sidebar/components/Layout'
import TextField from 'client/sidebar/components/TextField'
import TextFieldsArray from 'client/sidebar/components/TextFieldsArray'
import {
  Button,
  IconButton,
  Label,
  RefreshIcon,
  SavedIcon,
  SelectMenu,
  Textarea,
  TextInput
} from 'evergreen-ui'
import { ChangeEvent, FC, useEffect } from 'react'
import { Field, Form, FormSpy } from 'react-final-form'
import { CellInput } from 'server/lib/sheets/sheets'
import { CellContext } from 'shared/types/state'
import mutators from 'final-form-arrays'
import { SourceModel } from 'server/model/source/types'
import { formatDate } from 'client/utils/formatDate'
import { SiteModel } from 'server/model/site/types'
import TownInput from 'client/sidebar/components/TownInput'
import { PageData } from 'client/sidebar/types'
import { oblastOptions } from 'client/utils/oblastOptions'
import { AssociationModel } from 'server/model/association/types'
import AssociationsInput from 'client/sidebar/components/AssociationsInput'

type SetSourceCell = {
  row: number
  column: number
  value: string
  columnName: string
  format?: string
}

type SourcesEditorProps = {
  cellContext: CellContext
  setContents: (contents: CellInput) => void
  sites: Record<string, SiteModel>
  getSites: () => void
  associations: AssociationModel[]
  getAssociations: () => void
  setPage: (page: PageData) => void
  setSourceCell: (cell: SetSourceCell) => void
}

// TODO
// - [x] Fix names of fields
// - [x] Add site handler
// - [ ] Add association handlers
// - [ ] Test functionality

const prepareSource = (source: SourceModel | undefined) => {
  if (!source) {
    return undefined
  }

  return {
    ...source,
    dateOfPost: formatDate(source.dateOfPost),
    meansOfAttack: source.meansOfAttack?.filter(Boolean) ?? [],
    incidentType: source.incidentType?.filter(Boolean) ?? []
  }
}

const SourcesEditor: FC<SourcesEditorProps> = ({
  cellContext,
  sites,
  getSites,
  setPage,
  associations,
  getAssociations,
  setSourceCell
}) => {
  useEffect(() => {
    getSites()
    getAssociations()
  }, [])

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
      render={({ handleSubmit }) => {
        return (
          <FlexColumn as="form" onSubmit={handleSubmit}>
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
              <Flex style={{ height: '4px' }} />
              <AssociationsInput
                fieldName="meansOfAttack"
                title="Means of attack"
                associations={associations}
              />
            </FormSection>

            <FormSection>
              <Label>Type of incident</Label>
              <Flex style={{ height: '4px' }} />
              <AssociationsInput
                fieldName="incidentType"
                title="Type of incident"
                associations={associations}
              />
            </FormSection>
            <FormSection>
              <Label>Event key</Label>

              <FormSpy subscription={{ values: true }}>
                {({ values: { oblast, town, dateOfPost } }) => {
                  const dateChunks = dateOfPost?.split('-')
                  const eventKey =
                    oblast && town && dateOfPost && dateChunks.length === 3
                      ? `${oblast}_${town}_${dateChunks[2]}-${dateChunks[1]}-${dateChunks[0]}`
                      : ''

                  return (
                    <Flex>
                      <Field
                        name="eventKey"
                        render={({ input }) => (
                          <TextInput
                            type="text"
                            name={input.name}
                            value={eventKey}
                            disabled
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ) => {
                              input.onChange(event.target.value)
                            }}
                          />
                        )}
                      />
                      <Flex style={{ width: '4px' }} />
                      <IconButton
                        type="button"
                        icon={SavedIcon}
                        style={{ border: 'none' }}
                        onClick={() =>
                          setSourceCell({
                            row: cellContext.row,
                            column: cellContext.column,
                            columnName: 'eventKey',
                            value: eventKey
                          })
                        }
                      />
                    </Flex>
                  )
                }}
              </FormSpy>
            </FormSection>
          </FlexColumn>
        )
      }}
    />
  )
}

export default SourcesEditor
