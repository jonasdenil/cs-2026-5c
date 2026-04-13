import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const caseSchema = defineType({
  name: 'case',
  title: 'Case',
  type: 'document',
  orderings: [orderRankOrdering],
  description: 'Portfolio cases die in de "In de vitrine" sectie getoond worden.',
  
  groups: [
    {
      name: 'preview',
      title: 'Voorvertoning',
      description: 'Wat bezoekers zien in het case-overzicht',
    },
    {
      name: 'detail',
      title: 'Detailpagina',
      description: 'De volledige case pagina (komt later)',
      default: false,
    },
  ],
  
  fields: [
    orderRankField({ type: 'case' }),
    
    // === PREVIEW FIELDS ===
    defineField({
      name: 'title',
      title: 'Projectnaam',
      type: 'string',
      group: 'preview',
      description: 'De naam van het project (bv. "STICO", "AIKI")',
      validation: (Rule) => Rule.required().error('Projectnaam is verplicht'),
    }),
    
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'preview',
      description: 'De URL-vriendelijke versie van de naam. Klik op "Generate" om automatisch aan te maken.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is verplicht voor de URL'),
    }),
    
    defineField({
      name: 'previewImage',
      title: 'Afbeelding',
      type: 'image',
      group: 'preview',
      description: 'De hoofdafbeelding die in het overzicht getoond wordt.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Afbeelding is verplicht'),
    }),
    
    defineField({
      name: 'fileName',
      title: 'Bestandsnaam',
      type: 'string',
      group: 'preview',
      description: 'De bestandsnaam die in de MacOS-stijl titelbalk getoond wordt (bv. "stico_merkstrategie_2026_v6")',
      validation: (Rule) => Rule.required().error('Bestandsnaam is verplicht'),
    }),
    
    defineField({
      name: 'shortIntro',
      title: 'Korte Intro',
      type: 'text',
      rows: 3,
      group: 'preview',
      description: 'Optioneel: Een korte beschrijving van het project (1-2 zinnen)',
    }),
    
    defineField({
      name: 'collaboration',
      title: 'In samenwerking met',
      type: 'string',
      group: 'preview',
      description: 'Optioneel: Naam van samenwerkingspartner(s). Laat leeg als er geen samenwerking was.',
    }),
    
    // === DETAIL FIELDS (placeholder for future) ===
    defineField({
      name: 'detailPlaceholder',
      title: 'Detailpagina Content',
      type: 'text',
      group: 'detail',
      description: 'De pagebuilder voor de detailpagina komt later wanneer het ontwerp klaar is.',
      readOnly: true,
      initialValue: 'De pagebuilder voor de detailpagina wordt later toegevoegd.',
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortIntro',
      media: 'previewImage',
      collaboration: 'collaboration',
    },
    prepare({ title, subtitle, media, collaboration }) {
      const collaborationText = collaboration ? `In samenwerking met ${collaboration}` : ''
      return {
        title: title || 'Nieuwe case',
        subtitle: subtitle || collaborationText || 'Geen beschrijving',
        media,
      }
    },
  },
})
