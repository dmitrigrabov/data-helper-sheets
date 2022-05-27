import { Errors } from 'io-ts'

type ReportTypeErrors = <T>(args: {
  id?: string
  model: string
  fallback: T
}) => (errors: Errors) => T

export const reportTypeErrors: ReportTypeErrors =
  ({ id, model, fallback }) =>
  (errors: Errors) => {
    const report = errors
      .map(error =>
        error.context
          .filter(({ key }) => Boolean(key))
          .map(
            ({ key, type, actual }) =>
              `Field: ${key}, Expected: ${
                type.name
              }, Received: ${JSON.stringify(actual)}`
          )
          .join('\n')
      )
      .join('\n')

    Logger.log(
      [
        `Data Issues: Errors found in ${model}${id ? ` with ID ${id}` : ''}:`,
        report,
        ''
      ].join('\n')
    )

    return fallback
  }
