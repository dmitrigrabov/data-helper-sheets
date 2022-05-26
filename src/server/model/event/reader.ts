import {
  arraysToObjects,
  readSheet,
  validateLabels
} from 'server/app/readSheets'
import { bookConfig } from 'server/model/book/config'
import { SheetName } from 'server/model/types'

export const readEvents = (sheetName: SheetName) => {
  const sheetConfig = bookConfig[sheetName]
  const values = readSheet(sheetName)

  const [labels, ...rows] = values

  validateLabels({ labels, sheetConfig, sheetName })

  return arraysToObjects({
    rows,
    sheetConfig
  })
}
