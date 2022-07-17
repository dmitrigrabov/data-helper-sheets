import { SiteProperties } from 'server/model/site/types'
import { SheetConfig } from 'server/model/types'

export const siteConfig: SheetConfig<SiteProperties> = {
  sheetName: 'Sites',
  columns: [
    { name: 'siteKey', label: 'Site Key', type: 'string' },
    { name: 'oblast', label: 'Oblast', type: 'string' },
    { name: 'town', label: 'Town', type: 'string' },
    { name: 'latLng', label: 'Lat Lng', type: 'string' }
  ],
  key: 'siteKey'
}
