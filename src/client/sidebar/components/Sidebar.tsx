import ContextMenu from 'client/sidebar/components/ContextMenu'
import { FlexColumn } from 'client/sidebar/components/Layout'
import { serverFunctions } from 'client/utils/serverFunctions'
import { useEffect, useState } from 'react'
import { CellInput } from 'server/lib/sheets/sheets'
import { CellContext } from 'shared/types/state'

const Sidebar = () => {
  const [cellContext, setCellContext] = useState<CellContext>()
  const [contents, setContents] = useState<CellInput>()

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
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (contents) {
      serverFunctions.setContents(contents).catch(e => {
        console.log('ERROR: ', e)
      })
    }
  }, [contents])

  return (
    <FlexColumn>
      {cellContext && (
        <ContextMenu
          key={`${cellContext.selectedCell.row}-${cellContext.selectedCell.column}`}
          setContents={setContents}
          cellContext={cellContext}
        />
      )}
    </FlexColumn>
  )
}

export default Sidebar
