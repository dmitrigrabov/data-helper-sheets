import { Flex } from 'client/sidebar/components/Layout'
import { PageData } from 'client/sidebar/types'
import { Button, SelectMenu } from 'evergreen-ui'
import { FC } from 'react'
import { Field } from 'react-final-form'
import { SiteModel } from 'server/model/site/types'

type TownInputProps = {
  sites: Record<string, SiteModel>
  setPage: (page: PageData) => void
}

const TownInput: FC<TownInputProps> = ({ sites, setPage }) => {
  return (
    <Field<string> name="oblast" subscription={{ value: true }}>
      {({ input: { value: oblast } }) => (
        <Field
          name="town"
          render={({ input }) => {
            console.log('input', input)
            return (
              <>
                <SelectMenu
                  title="Select town"
                  options={getTownOptions(oblast, sites)}
                  selected={input.value}
                  hasFilter={false}
                  hasTitle={false}
                  onSelect={item => {
                    console.log('item', item)
                    input.onChange(`${item.value}`.split('_')[1])
                  }}
                  closeOnSelect
                >
                  <Button type="button" disabled={!oblast}>
                    {sites[`${oblast}_${input.value}`]?.town ||
                      'Select town...'}
                  </Button>
                </SelectMenu>
                <Flex style={{ height: '4px' }} />
                <Button
                  disabled={!oblast}
                  type="button"
                  onClick={() => setPage({ page: 'sites', oblast })}
                >
                  Add town
                </Button>
              </>
            )
          }}
        />
      )}
    </Field>
  )
}

export default TownInput

const getTownOptions = (oblast: string, sites: Record<string, SiteModel>) => {
  return Object.values(sites)
    .filter(site => site.siteKey.split('_')[0] === oblast)
    .map(site => ({
      label: site.town,
      value: site.siteKey
    }))
}
