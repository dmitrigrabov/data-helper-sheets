import { associationConfig } from 'server/model/association/config'
import { eventConfig } from 'server/model/event/config'
import { siteConfig } from 'server/model/site/config'
import { sourceConfig } from 'server/model/source/config'

export const bookConfig = {
  Sources: sourceConfig,
  Events: eventConfig,
  Sites: siteConfig,
  Associations: associationConfig
  // Categories are skipped for now since they are not in use

  // EXPORT_EVENTS: {
  //   columns: [
  //     { name: 'id', label: 'id', type: 'string' },
  //     { name: 'description', label: 'description', type: 'string' },
  //     { name: 'date', label: 'date', type: 'string' },
  //     { name: 'time', label: 'time', type: 'string' },
  //     { name: 'location', label: 'location', type: 'string' },
  //     { name: 'latitude', label: 'latitude', type: 'string' },
  //     { name: 'longitude', label: 'longitude', type: 'string' },
  //     { name: 'association1', label: 'association1', type: 'string' },
  //     { name: 'association2', label: 'association2', type: 'string' },
  //     { name: 'source1', label: 'source1', type: 'string' }
  //   ],
  //   key: 'id'
  // }
  // EXPORT_SOURCES: {
  //   columns: [
  //     { name: 'id', label: 'id', type: 'string' },
  //     { name: 'title', label: 'title', type: 'string' },
  //     { name: 'thumbnail', label: 'thumbnail', type: 'string' },
  //     { name: 'description', label: 'description', type: 'string' },
  //     { name: 'type', label: 'type', type: 'string' },
  //     { name: 'path1', label: 'path1', type: 'string' }
  //   ],
  //   key: 'id'
  // },
  // EXPORT_ASSOCIATIONS: {
  //   columns: [
  //     { name: 'id', label: 'id', type: 'string' },
  //     { name: 'title', label: 'title', type: 'string' },
  //     { name: 'desc', label: 'desc', type: 'string' },
  //     { name: 'mode', label: 'mode', type: 'string' },
  //     { name: 'filter_path0', label: 'filter_path0', type: 'string' },
  //     { name: 'filter_path1', label: 'filter_path1', type: 'string' },
  //     { name: 'filter_path2', label: 'filter_path2', type: 'string' },
  //     { name: 'filter_path3', label: 'filter_path3', type: 'string' }
  //   ],
  //   key: 'id'
  // }
}
