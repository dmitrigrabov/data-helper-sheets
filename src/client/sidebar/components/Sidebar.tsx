import ContextMenu from 'client/sidebar/components/ContextMenu'
import { FlexColumn } from 'client/sidebar/components/Layout'
import { serverFunctions } from 'client/utils/serverFunctions'
import { useEffect, useState } from 'react'

import { CellContext } from 'shared/types/state'

const Sidebar = () => {
  const [cellContext, setCellContext] = useState<CellContext>()

  useEffect(() => {
    const interval = setInterval(() => {
      serverFunctions
        .getContents({ a: 'Testing a' })
        .then(context => {
          console.log('Client context: ', context)
          context && setCellContext(context)
        })
        .catch(e => {
          console.log('ERROR: ', e)
        })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <FlexColumn>
      {cellContext && (
        <ContextMenu
          key={`${cellContext.selectedCell.row}-${cellContext.selectedCell.column}`}
          setContents={serverFunctions.setContents}
          cellContext={cellContext}
        />
      )}
    </FlexColumn>
  )
}

export default Sidebar
