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
