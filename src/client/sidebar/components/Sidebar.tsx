import { FlexColumn } from 'client/sidebar/components/Layout'
import SourcesEditor from 'client/sidebar/components/SourcesEditor'
import { serverFunctions } from 'client/utils/serverFunctions'
import { dequal } from 'dequal'
import { useEffect, useState } from 'react'
import { CellContext } from 'shared/types/state'

const Sidebar = () => {
  const [cellContext, setCellContext] = useState<CellContext>()

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

  return (
    <FlexColumn>
      {cellContext && (
        <SourcesEditor
          key={`${cellContext.row}`}
          cellContext={cellContext}
          setContents={serverFunctions.setContents}
        />
      )}
    </FlexColumn>
  )
}

export default Sidebar
