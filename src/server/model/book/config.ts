import { associationConfig } from 'server/model/association/config'
import { eventConfig } from 'server/model/event/config'
import { siteConfig } from 'server/model/site/config'
import { sourceConfig } from 'server/model/source/config'

export const bookConfig = {
  Sources: sourceConfig,
  Events: eventConfig,
  Sites: siteConfig,
  Associations: associationConfig
}
