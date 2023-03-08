import { Flex } from 'client/sidebar/components/Layout'
import { PageData, SetSourceCell } from 'client/sidebar/types'
import { Button, SelectMenu } from 'evergreen-ui'
import { FC } from 'react'
import { Field } from 'react-final-form'
import { SiteModel } from 'server/model/site/types'
import { CellContext } from 'shared/types/state'

type TownInputProps = {
  sites: Record<string, SiteModel>
  setPage: (page: PageData) => void
  setSourceCell: (cell: SetSourceCell) => Promise<boolean>
  cellContext: CellContext
}

const TownInput: FC<TownInputProps> = ({
  sites,
  setPage,
  setSourceCell,
  cellContext
}) => (
  <Field<string> name="oblast" subscription={{ value: true }}>
    {({ input: { value: oblast } }) => (
      <Field
        name="town"
        render={({ input }) => {
          return (
            <>
              <SelectMenu
                title="Select town"
                options={getTownOptions(oblast, sites)}
                selected={input.value}
                hasFilter={false}
                hasTitle={false}
                onSelect={item => {
                  const value = `${item.value}`.split('_')[1]
                  input.onChange(value)
                  setSourceCell({
                    row: cellContext.row,
                    column: cellContext.column,
                    value: value,
                    columnName: 'town'
                  })
                }}
                closeOnSelect
              >
                <Button type="button" disabled={!oblast}>
                  {sites[`${oblast}_${input.value}`]?.town || 'Select town...'}
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

export default TownInput

const getTownOptions = (oblast: string, sites: Record<string, SiteModel>) => {
  return Object.values(sites)
    .filter(site => site.siteKey.split('_')[0] === oblast)
    .map(site => ({
      label: site.town,
      value: site.siteKey
    }))
}
