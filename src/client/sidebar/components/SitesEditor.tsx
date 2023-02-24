import { Flex, FlexColumn, FormSection } from 'client/sidebar/components/Layout'
import { PageData } from 'client/sidebar/types'
import { oblastOptions } from 'client/utils/oblastOptions'
import { Button, Label, TextInput } from 'evergreen-ui'
import { ChangeEvent, FC, useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import { SiteModel } from 'server/model/site/types'

type SitesEditorProps = {
  getSites: () => void
  setPage: (page: PageData) => void
  oblast: string
  setSite: (site: SiteModel) => Promise<boolean>
}

type FormValues = {
  town: string
  latLng: {
    lat: string
    lng: string
  }
}

const SitesEditor: FC<SitesEditorProps> = ({
  // sites,
  // setContents,
  // cellContext,
  getSites,
  setPage,
  oblast,
  setSite
}) => {
  useEffect(() => {
    getSites()
  }, [])

  return (
    <FlexColumn>
      <Button type="button" onClick={() => setPage({ page: 'sources' })}>
        Back to sources
      </Button>
      <Flex style={{ height: '16px' }} />
      <Form<FormValues>
        onSubmit={(values, form) => {
          const site = {
            ...values,
            siteKey: `${oblast}_${normalize(values.town)}`,
            oblast:
              oblastOptions.find(({ value }) => value === oblast)?.label ?? '',
            latLng: {
              lat: parseFloat(values.latLng.lat),
              lng: parseFloat(values.latLng.lng)
            }
          }
          console.log('Site', site)

          setSite(site)
            .then(success => {
              if (success) {
                getSites()
                form.reset({ town: '', latLng: { lat: '', lng: '' } })
                setPage({ page: 'sources' })
              }
            })
            .catch(e => console.log(e))
        }}
        render={({ handleSubmit }) => {
          return (
            <FlexColumn as="form" onSubmit={handleSubmit}>
              <FormSection>
                <Label>Site Key</Label>
                <Flex style={{ height: '4px' }} />
                <Field name="town" subscription={{ value: true }}>
                  {({ input: { value: town } }) => (
                    <Field
                      name="siteKey"
                      render={({ input }) => (
                        <TextInput
                          disabled
                          type="text"
                          name={input.name}
                          value={`${oblast}_${normalize(town)}`}
                        />
                      )}
                    />
                  )}
                </Field>
              </FormSection>
              <FormSection>
                <Label>Oblast</Label>
                <Flex style={{ height: '4px' }} />
                <TextInput
                  disabled
                  type="text"
                  value={
                    oblastOptions.find(({ value }) => value === oblast)?.label
                  }
                />
              </FormSection>
              <FormSection>
                <Label>Town</Label>
                <Flex style={{ height: '4px' }} />
                <Field
                  name="town"
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
              </FormSection>
              <FormSection>
                <Label>Coordinates lat</Label>
                <Flex style={{ height: '4px' }} />
                <Field
                  name="latLng.lat"
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
              </FormSection>
              <FormSection>
                <Label>Coordinates lng</Label>
                <Flex style={{ height: '4px' }} />
                <Field
                  name="latLng.lng"
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
              </FormSection>
              <Flex style={{ height: '16px' }} />
              <FormSection>
                <Button type="submit">Save</Button>
              </FormSection>
            </FlexColumn>
          )
        }}
      />
    </FlexColumn>
  )
}

export default SitesEditor

// replace all non-alphanumeric characters with an underscore
const normalize = (value: string) => {
  return value.replace(/[^a-zA-Z]/g, '-').toLocaleUpperCase()
}
