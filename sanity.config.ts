import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schema} from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's7rzjtw7',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'North Pacific Skies Studio',
  plugins: [structureTool()],
  schema: {
    types: schema.types,
  },
})
