import { Errors } from 'io-ts'

type ReportTypeErrors = <T>(args: {
  idFieldName?: string
  id?: string
  model: string
  fallback: T
}) => (errors: Errors) => T

export const reportTypeErrors: ReportTypeErrors =
  ({ id, idFieldName = 'ID', model, fallback }) =>
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

    console.log(
      [
        `${model} ${id ? `${idFieldName} ${id}` : ''} Data Issues: `,
        report,
        ''
      ].join('\n')
    )

    return fallback
  }
