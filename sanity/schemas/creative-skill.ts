import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const creativeSkillSchema = defineType({
  name: 'creativeSkill',
  title: 'Creatieve Skill',
  type: 'document',
  orderings: [orderRankOrdering],
  description: 'De skills die op de foto in de "Wie" sectie getoond worden.',
  
  fields: [
    orderRankField({ type: 'creativeSkill' }),
    
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'De naam van de skill (bv. "Social Strateeg")',
      validation: (Rule) => Rule.required().error('Titel is verplicht'),
    }),
    
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
      description: 'Korte uitleg over deze skill die getoond wordt wanneer iemand erop klikt.',
      validation: (Rule) => Rule.required().error('Beschrijving is verplicht'),
    }),
    
    defineField({
      name: 'desktopPosition',
      title: 'Desktop Positie',
      type: 'object',
      description: 'Waar de skill-tag op de foto verschijnt op desktop. Op mobiel worden de skills automatisch als een lijst getoond.',
      fields: [
        defineField({
          name: 'top',
          title: 'Verticale positie (%)',
          type: 'number',
          description: 'Percentage vanaf de bovenkant van de foto (0 = helemaal bovenaan, 100 = helemaal onderaan)',
          validation: (Rule) => Rule.required().min(0).max(100),
          initialValue: 50,
        }),
        defineField({
          name: 'left',
          title: 'Horizontale positie (%)',
          type: 'number',
          description: 'Percentage vanaf de linkerkant van de foto (0 = helemaal links, 100 = helemaal rechts)',
          validation: (Rule) => Rule.required().min(0).max(100),
          initialValue: 50,
        }),
      ],
      options: {
        columns: 2,
      },
    }),
    
    defineField({
      name: 'rotation',
      title: 'Rotatie (graden)',
      type: 'number',
      description: 'Hoeveel de skill-tag gedraaid is. Negatief = tegen de klok in, positief = met de klok mee.',
      validation: (Rule) => Rule.min(-45).max(45),
      initialValue: 0,
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({ title, description }) {
      return {
        title: title || 'Nieuwe skill',
        subtitle: description ? description.substring(0, 60) + '...' : 'Geen beschrijving',
      }
    },
  },
})
