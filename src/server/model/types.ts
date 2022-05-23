import * as t from 'io-ts'

export const sourceType = t.keyof({
  Telegram: null,
  Twitter: null,
  YouTube: null,
  Image: null,
  Video: null
})

export const associationMode = t.keyof({
  CATEGORY: null,
  NARRATIVE: null,
  FILTER: null
})
