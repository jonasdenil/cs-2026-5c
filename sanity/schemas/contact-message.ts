export const contactMessageSchema = {
  name: 'contactMessage',
  title: 'Contactberichten',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'name',
      title: 'Naam',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'email',
      title: 'E-mailadres',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'message',
      title: 'Bericht',
      type: 'text',
      readOnly: true,
    },
    {
      name: 'submittedAt',
      title: 'Ingediend op',
      type: 'datetime',
      readOnly: true,
    },
    {
      name: 'read',
      title: 'Gelezen',
      type: 'boolean',
      initialValue: false,
      description: 'Markeer als gelezen nadat je het bericht hebt bekeken',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'submittedAt',
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
      }
    },
  },
}
