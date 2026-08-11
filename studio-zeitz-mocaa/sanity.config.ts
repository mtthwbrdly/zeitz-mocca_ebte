import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from '../schemaTypes/index.ts'

export default defineConfig({
  name: 'default',
  title: 'Zeitz MOCAA Archived Legacy Studio',

  projectId: 'p7t0rr17',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
