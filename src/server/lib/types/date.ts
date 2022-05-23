import * as t from 'io-ts'
import { fromRefinement } from 'server/lib/types/fromRefinement'

export type DateC = t.Type<Date, Date, unknown>

const isDate = (u: unknown): u is Date => u instanceof Date

export const date: DateC = fromRefinement('Date', isDate)
