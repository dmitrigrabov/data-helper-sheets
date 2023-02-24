import { FlexColumn } from 'client/sidebar/components/Layout'
import SitesEditor from 'client/sidebar/components/SitesEditor'
import SourcesEditor from 'client/sidebar/components/SourcesEditor'
import { PageData } from 'client/sidebar/types'
import { serverFunctions } from 'client/utils/serverFunctions'
import { dequal } from 'dequal'
import { useEffect, useState } from 'react'
import { AssociationModel } from 'server/model/association/types'
import { SiteModel } from 'server/model/site/types'
import { CellContext } from 'shared/types/state'

const Sidebar = () => {
  const [cellContext, setCellContext] = useState<CellContext>()
  const [sites, setSites] = useState<Record<string, SiteModel>>({})
  const [associations, setAssociations] = useState<AssociationModel[]>([])
  const [page, setPage] = useState<PageData>({ page: 'sources' })

  useEffect(() => {
    const interval = setInterval(() => {
      serverFunctions
        .getContents()
        .then(context => {
          if (context && !dequal(context, cellContext)) {
            setCellContext(context)
          }
        })
        .catch(e => {
          console.log('ERROR: ', e)
        })
    }, 1000)

    return () => clearInterval(interval)
  }, [cellContext])

  useEffect(() => {
    getSites()
    getAssociations()
  }, [])

  const getSites = () => {
    serverFunctions
      .getSites()
      .then(sitesRes => {
        if (sitesRes) {
          setSites(sitesRes)
        }
      })
      .catch(e => {
        console.log('ERROR: ', e)
      })
  }

  const getAssociations = () => {
    serverFunctions
      .getAssociations()
      .then(associationsRes => {
        if (associationsRes) {
          setAssociations(associationsRes)
        }
      })
      .catch(e => {
        console.log('ERROR: ', e)
      })
  }

  return (
    <FlexColumn>
      {cellContext && (
        <>
          <FlexColumn
            style={{ display: page.page === 'sources' ? 'flex' : 'none' }}
          >
            <SourcesEditor
              key={`${cellContext.row}`}
              cellContext={cellContext}
              setContents={serverFunctions.setContents}
              getSites={getSites}
              sites={sites}
              getAssociations={getAssociations}
              associations={associations}
              setPage={setPage}
            />
          </FlexColumn>
          <FlexColumn
            style={{ display: page.page === 'sites' ? 'flex' : 'none' }}
          >
            <SitesEditor
              key={`${cellContext.row}`}
              getSites={getSites}
              oblast={'oblast' in page ? page.oblast : ''}
              setPage={setPage}
              setSite={serverFunctions.setSite}
            />
          </FlexColumn>
        </>
      )}
    </FlexColumn>
  )
}

export default Sidebar
