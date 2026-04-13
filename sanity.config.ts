import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { TagIcon, DocumentIcon } from '@sanity/icons'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'charlotte-schaerlaecken',
  title: 'Charlotte Schaerlaecken - CMS',
  
  projectId,
  dataset,
  
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Creative Skills met drag & drop ordening
            orderableDocumentListDeskItem({
              type: 'creativeSkill',
              title: 'Creatieve Skills',
              icon: TagIcon,
              S,
              context,
            }),
            // Cases met drag & drop ordening
            orderableDocumentListDeskItem({
              type: 'case',
              title: 'Cases',
              icon: DocumentIcon,
              S,
              context,
            }),
          ])
      },
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
})
