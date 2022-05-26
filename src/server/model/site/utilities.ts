import toSite from 'server/model/site/serializer'
import { SiteModel, SiteProperties } from 'server/model/site/types'
import { CellType } from 'server/model/types'

export const toSiteModelMap = (
  siteMap: Record<string, Record<SiteProperties, CellType>>
) => {
  return Object.keys(siteMap).reduce<Record<string, SiteModel>>(
    (acc, siteKey) => {
      const siteModel = toSite(siteMap[siteKey])

      if (siteModel) {
        acc[siteKey] = siteModel
      }

      return acc
    },
    {}
  )
}

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
