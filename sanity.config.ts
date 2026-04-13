import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { CogIcon, EnvelopeIcon, TagIcon, DocumentIcon } from '@sanity/icons'

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
            // Website Instellingen (singleton)
            S.listItem()
              .title('Website Instellingen')
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Website Instellingen')
              ),
            S.divider(),
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
            S.divider(),
            // Contactberichten (read-only overzicht)
            S.listItem()
              .title('Contactberichten')
              .icon(EnvelopeIcon)
              .child(
                S.documentTypeList('contactMessage')
                  .title('Contactberichten')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
          ])
      },
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
})
