import { type SchemaTypeDefinition } from 'sanity'
import { diaryType } from './diaryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [diaryType],
}
