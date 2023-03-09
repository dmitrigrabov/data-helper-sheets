import { Flex, FlexColumn, FormSection } from 'client/sidebar/components/Layout'
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
import { ChangeEvent, FC, useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import { CellInput } from 'server/lib/sheets/sheets'
import { CellContext } from 'shared/types/state'
import mutators from 'final-form-arrays'
import { SourceModel } from 'server/model/source/types'
import { formatDate } from 'client/utils/formatDate'
import { SiteModel } from 'server/model/site/types'
import TownInput from 'client/sidebar/components/TownInput'
import { PageData, SetSourceCell } from 'client/sidebar/types'
import { oblastOptions } from 'client/utils/oblastOptions'
import { AssociationModel } from 'server/model/association/types'
import AssociationsInput from 'client/sidebar/components/AssociationsInput'
import CoordinatesInput from 'client/sidebar/components/CoordinatesInput'
import { EventKeyInput } from 'client/sidebar/components/EventKeyInput'

type SourcesEditorProps = {
  cellContext: CellContext
  setContents: (contents: CellInput) => void
  sites: Record<string, SiteModel>
  getSites: () => void
  associations: AssociationModel[]
  getAssociations: () => void
  setPage: (page: PageData) => void
  setSourceCell: (cell: SetSourceCell) => Promise<boolean>
  addEventsKey: (key: string) => Promise<boolean>
}

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
  setSourceCell,
  addEventsKey
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
                    onBlur={() => {
                      setSourceCell({
                        row: cellContext.row,
                        column: cellContext.column,
                        value: input.value,
                        columnName: 'dateOfPost'
                      })
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
                    onBlur={() => {
                      console.log('blurring textarea', input.value)
                      setSourceCell({
                        row: cellContext.row,
                        column: cellContext.column,
                        value: input.value,
                        columnName: 'comment'
                      })
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
                    onSelect={item => {
                      setSourceCell({
                        row: cellContext.row,
                        column: cellContext.column,
                        value: item.value as string,
                        columnName: 'oblast'
                      })
                      return input.onChange(item.value)
                    }}
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
              <TownInput
                sites={sites}
                setPage={setPage}
                setSourceCell={setSourceCell}
                cellContext={cellContext}
              />
            </FormSection>

            <FormSection>
              <Label>Coordinates</Label>
              <Flex style={{ height: '4px' }} />
              <CoordinatesInput
                cellContext={cellContext}
                setSourceCell={setSourceCell}
              />
            </FormSection>

            <FormSection>
              <Label>Google Drive links</Label>
              <Flex style={{ height: '4px' }} />
              <TextFieldsArray
                fieldName="googleDriveLinks"
                setSourceCell={setSourceCell}
                cellContext={cellContext}
              />
            </FormSection>

            {/* Uses mixed delimiters */}
            {/* <FormSection>
              <Label>Image file name</Label>
              <Flex style={{ height: '4px' }} />
              <TextFieldsArray
                fieldName="fileNames"
                setSourceCell={setSourceCell}
                cellContext={cellContext}
              />
            </FormSection> */}

            <FormSection>
              <Label>Means of attack</Label>
              <Flex style={{ height: '4px' }} />
              <AssociationsInput
                fieldName="meansOfAttack"
                title="Means of attack"
                associations={associations}
                setSourceCell={setSourceCell}
                cellContext={cellContext}
              />
            </FormSection>

            <FormSection>
              <Label>Type of incident</Label>
              <Flex style={{ height: '4px' }} />
              <AssociationsInput
                fieldName="incidentType"
                title="Type of incident"
                associations={associations}
                setSourceCell={setSourceCell}
                cellContext={cellContext}
              />
            </FormSection>
            <FormSection>
              <Label>Event key</Label>

              <EventKeyInput
                setSourceCell={setSourceCell}
                cellContext={cellContext}
                addEventsKey={addEventsKey}
              />
            </FormSection>
          </FlexColumn>
        )
      }}
    />
  )
}

export default SourcesEditor
