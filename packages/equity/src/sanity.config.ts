import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'blogg',

  projectId: '3u8x638j',
  dataset: 'new',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
