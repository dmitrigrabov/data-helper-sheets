import { Flex } from 'client/sidebar/components/Layout'
import { SetSourceCell } from 'client/sidebar/types'
import { IconButton, SavedIcon, TextInput } from 'evergreen-ui'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Field, useFormState } from 'react-final-form'
import { CellContext } from 'shared/types/state'

type EventKeyInputProps = {
  setSourceCell: (cell: SetSourceCell) => Promise<boolean>
  cellContext: CellContext
  addEventsKey: (key: string) => Promise<boolean>
}

export const EventKeyInput: FC<EventKeyInputProps> = ({
  setSourceCell,
  cellContext,
  addEventsKey
}) => {
  const { values } = useFormState({ subscription: { values: true } })
  const { oblast, town, dateOfPost, eventKey: originalEventKey } = values
  const dateChunks = dateOfPost?.split('-')
  const autoEventKey =
    oblast && town && dateOfPost && dateChunks.length === 3
      ? `${oblast}_${town}_${dateChunks[2]}-${dateChunks[1]}-${dateChunks[0]}`
      : ''

  console.log(`originalEventKey: "${originalEventKey}"`)
  console.log(`autoEventKey: "${autoEventKey}"`)
  const [eventKey, setEventKey] = useState(originalEventKey)

  useEffect(() => {
    if (!originalEventKey) {
      setEventKey(autoEventKey)
    }
  }, [autoEventKey])

  return (
    <Flex>
      <Field
        name="eventKey"
        render={({ input }) => (
          <TextInput
            type="text"
            name={input.name}
            value={eventKey}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setEventKey(event.target.value)
            }}
          />
        )}
      />
      <Flex style={{ width: '4px' }} />
      <IconButton
        type="button"
        icon={SavedIcon}
        style={{ border: 'none' }}
        onClick={() => {
          setSourceCell({
            row: cellContext.row,
            column: cellContext.column,
            columnName: 'eventKey',
            value: eventKey
          })
          addEventsKey(eventKey)
        }}
      />
    </Flex>
  )
}
