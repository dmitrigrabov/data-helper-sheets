export type Page = 'sources' | 'sites'

export type PageData =
  | {
      page: 'sources'
    }
  | {
      page: 'sites'
      oblast: string
    }
