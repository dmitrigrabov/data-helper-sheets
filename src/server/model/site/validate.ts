import { SiteModel } from 'server/model/site/types'

interface ValidateSiteArgs {
  siteKey: string
  siteModelMap: Record<string, SiteModel>
}

export const validateSiteKey = ({
  siteKey,
  siteModelMap
}: ValidateSiteArgs): SiteModel | undefined => {
  return siteModelMap[siteKey] ? siteModelMap[siteKey] : undefined
}
