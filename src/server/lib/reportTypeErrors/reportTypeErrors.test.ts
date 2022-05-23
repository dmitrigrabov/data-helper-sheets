import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'
import * as t from 'io-ts'
import { sendReport } from 'lib/sendReport'
import { reportTypeErrors } from 'lib/reportTypeErrors'

jest.unmock('lib/reportTypeErrors')

jest.mock('@sentry/react', () => ({
  captureMessage: jest.fn()
}))

jest.mock('lib/sendReport', () => ({
  sendReport: jest.fn()
}))

let cachedConsole: Console | undefined = undefined

describe('reportTypeErrors', () => {
  const mockerror = jest.fn()

  beforeAll(() => {
    cachedConsole = global.console
    global.console.error = mockerror
  })

  afterAll(() => {
    global.console = cachedConsole as Console
  })

  it('reports an error to the console with a content ID if supplied, and returns a fallback value', () => {
    const i = t.interface({ foo: t.string })

    const response = pipe(
      i.decode({ foo: 12345 }),
      fold(
        reportTypeErrors({ model: 'model', id: 'id', fallback: {} }),
        value => value
      )
    )

    expect(sendReport).toHaveBeenCalledWith(
      'Data Issues: Errors found in model with ID id:\nField: foo, Expected: string, Received: 12345\n'
    )
    expect(response).toStrictEqual({})
  })

  it('omits a missing ID from the error message', () => {
    const i = t.interface({ foo: t.string })

    const response = pipe(
      i.decode({ foo: 12345 }),
      fold(reportTypeErrors({ model: 'model', fallback: {} }), value => value)
    )

    expect(sendReport).toHaveBeenCalledWith(
      'Data Issues: Errors found in model:\nField: foo, Expected: string, Received: 12345\n'
    )
    expect(response).toStrictEqual({})
  })
})
