export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Website Instellingen',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      hidden: true,
      initialValue: 'Website Instellingen',
    },
    {
      name: 'hero',
      title: 'Hero Sectie',
      type: 'object',
      fields: [
        {
          name: 'titleLine1',
          title: 'Titel Regel 1',
          type: 'string',
          description: 'Bv. "Creatief Strateeg"',
        },
        {
          name: 'titleLine2',
          title: 'Titel Regel 2',
          type: 'string',
          description: 'Bv. "All Things Social"',
        },
        {
          name: 'introLine1',
          title: 'Intro Tekst Regel 1',
          type: 'string',
        },
        {
          name: 'introLine2',
          title: 'Intro Tekst Regel 2',
          type: 'string',
        },
        {
          name: 'ctaButtonText',
          title: 'CTA Knop Tekst',
          type: 'string',
          description: 'Bv. "Hit My Pager"',
        },
      ],
    },
    {
      name: 'whoSection',
      title: 'Over Mij Sectie',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string',
          description: 'Bv. "Mijn creatieve stack"',
        },
        {
          name: 'bio',
          title: 'Bio Tekst',
          type: 'text',
        },
        {
          name: 'ctaButtonText',
          title: 'CTA Knop Tekst',
          type: 'string',
        },
      ],
    },
    {
      name: 'casesSection',
      title: 'Cases Sectie',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Sectie Titel',
          type: 'string',
          description: 'Bv. "Mijn werk"',
        },
        {
          name: 'subtitle',
          title: 'Subtitel',
          type: 'string',
        },
      ],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Telefoonnummer',
          type: 'string',
        },
        {
          name: 'email',
          title: 'E-mailadres',
          type: 'string',
        },
        {
          name: 'instagram',
          title: 'Instagram Handle',
          type: 'string',
          description: 'Bv. "@charlotteschaerlaecken"',
        },
        {
          name: 'formTitle',
          title: 'Formulier Titel',
          type: 'string',
          description: 'Bv. "Or hit my pager"',
        },
        {
          name: 'submitButtonText',
          title: 'Verstuur Knop Tekst',
          type: 'string',
        },
      ],
    },
    {
      name: 'navigation',
      title: 'Navigatie',
      type: 'object',
      fields: [
        {
          name: 'whoLink',
          title: '"Who" Link Tekst',
          type: 'string',
        },
        {
          name: 'casesLink',
          title: '"Cases" Link Tekst',
          type: 'string',
        },
        {
          name: 'contactLink',
          title: '"Contact" Link Tekst',
          type: 'string',
        },
      ],
    },
  ],
}
