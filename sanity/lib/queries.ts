import { groq } from 'next-sanity'

// Fetch all creative skills ordered by drag & drop order
export const creativeSkillsQuery = groq`
  *[_type == "creativeSkill"] | order(orderRank) {
    _id,
    title,
    description,
    desktopPosition {
      top,
      left
    },
    rotation
  }
`

// Fetch all cases ordered by drag & drop order (preview data only)
export const casesQuery = groq`
  *[_type == "case"] | order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    previewImage,
    fileName,
    shortIntro,
    collaboration
  }
`

// Fetch a single case by slug (for future detail page)
export const caseBySlugQuery = groq`
  *[_type == "case" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    previewImage,
    fileName,
    shortIntro,
    collaboration
  }
`

// Fetch site settings (singleton document)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    hero,
    whoSection,
    casesSection,
    footer,
    navigation
  }
`

// Fetch all contact messages
export const contactMessagesQuery = groq`
  *[_type == "contactMessage"] | order(_createdAt desc) {
    _id,
    name,
    email,
    message,
    submittedAt,
    read
  }
`
