import { AssociationProperties } from 'server/model/association/types'
import { SheetConfig } from 'server/model/types'

export const associationConfig: SheetConfig<AssociationProperties> = {
  sheetName: 'Association',
  columns: [
    { name: 'id', label: 'Id', type: 'string' },
    { name: 'description', label: 'Description', type: 'string' },
    { name: 'mode', label: 'Mode', type: 'string' },
    { name: 'filterPath', label: 'Filter Path', type: 'string' }
  ],
  key: 'id'
}
