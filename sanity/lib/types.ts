import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface CreativeSkill {
  _id: string
  title: string
  description: string
  desktopPosition: {
    top: number
    left: number
  }
  rotation: number
}

export interface Case {
  _id: string
  title: string
  slug: string
  previewImage: SanityImageSource
  fileName: string
  shortIntro?: string
  collaboration?: string
}

export interface SiteSettings {
  _id: string
  hero: {
    titleLine1: string
    titleLine2: string
    introLine1: string
    introLine2: string
    ctaButtonText: string
  }
  whoSection: {
    title: string
    bio: string
    ctaButtonText: string
  }
  casesSection: {
    title: string
    subtitle: string
  }
  footer: {
    phone: string
    email: string
    instagram: string
    formTitle: string
    submitButtonText: string
  }
  navigation: {
    whoLink: string
    casesLink: string
    contactLink: string
  }
}

export interface ContactMessage {
  _id: string
  name: string
  email: string
  message: string
  submittedAt: string
  read: boolean
}
