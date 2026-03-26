import { type SchemaTypeDefinition } from 'sanity'
import { diaryType } from './diaryType'
import { tributeType } from './tributeType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [diaryType, tributeType],
}
