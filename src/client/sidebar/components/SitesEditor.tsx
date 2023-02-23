import { FlexColumn } from 'client/sidebar/components/Layout'
import { PageData } from 'client/sidebar/types'
import { Button } from 'evergreen-ui'
import { FC } from 'react'
import { CellInput } from 'server/lib/sheets/sheets'
import { SiteModel } from 'server/model/site/types'
import { CellContext } from 'shared/types/state'

type SitesEditorProps = {
  cellContext: CellContext
  setContents: (contents: CellInput) => void
  sites: Record<string, SiteModel>
  getSites: () => void
  setPage: (page: PageData) => void
}

const SitesEditor: FC<SitesEditorProps> = ({
  // sites,
  // setContents,
  // cellContext,
  // getSites,
  setPage
}) => {
  return (
    <FlexColumn>
      <Button type="button" onClick={() => setPage({ page: 'sources' })}>
        Back to sources
      </Button>
    </FlexColumn>
  )
}

export default SitesEditor
