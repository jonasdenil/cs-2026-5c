import { writeClient } from '@/sanity/lib/client'
import { NextRequest, NextResponse } from 'next/server'

const SKILLS_DATA = [
  {
    _type: 'creativeSkill',
    title: 'Brand Design',
    description: 'Developing strong brand identities through strategic design and visual storytelling',
    desktopPosition: {
      top: 15,
      left: 45,
      rotation: -8
    },
    order: 0
  },
  {
    _type: 'creativeSkill',
    title: 'Art Direction',
    description: 'Guiding visual concepts from conception to execution with a keen eye for detail',
    desktopPosition: {
      top: 45,
      left: 15,
      rotation: 5
    },
    order: 1
  },
  {
    _type: 'creativeSkill',
    title: 'Creative Strategy',
    description: 'Creating innovative solutions that push boundaries and inspire action',
    desktopPosition: {
      top: 50,
      left: 75,
      rotation: -12
    },
    order: 2
  },
  {
    _type: 'creativeSkill',
    title: 'Visual Communication',
    description: 'Translating complex ideas into compelling visual narratives',
    desktopPosition: {
      top: 75,
      left: 50,
      rotation: 8
    },
    order: 3
  }
]

const CASES_DATA = [
  {
    _type: 'case',
    preview: {
      title: 'Branding Sustainable Future',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-placeholder-1'
        }
      },
      filenamePreview: 'sustainable-future-preview',
      intro: 'A comprehensive brand identity for a sustainable fashion company',
      collaboration: 'In collaboration with Studio XYZ'
    },
    order: 0
  },
  {
    _type: 'case',
    preview: {
      title: 'Digital Product Design',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-placeholder-2'
        }
      },
      filenamePreview: 'digital-product-preview',
      intro: 'Designing an intuitive mobile app for a tech startup',
      collaboration: 'In collaboration with Tech Partners Inc'
    },
    order: 1
  },
  {
    _type: 'case',
    preview: {
      title: 'Campaign Identity Design',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-placeholder-3'
        }
      },
      filenamePreview: 'campaign-identity-preview',
      intro: 'Creating a bold visual campaign for a social initiative',
      collaboration: null
    },
    order: 2
  },
  {
    _type: 'case',
    preview: {
      title: 'Packaging Design Excellence',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-placeholder-4'
        }
      },
      filenamePreview: 'packaging-design-preview',
      intro: 'Innovative packaging design for a luxury consumer brand',
      collaboration: 'In collaboration with Design Studios Group'
    },
    order: 3
  }
]

const SITE_SETTINGS_DATA = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  hero: {
    titleLine1: 'Creatief Strateeg',
    titleLine2: 'All Things Social',
    introLine1: 'If it stops the scroll, there\'s strategy behind it.',
    introLine2: 'From tone to timing, I help your brand own the feed.',
    ctaButtonText: 'Hit My Pager'
  },
  whoSection: {
    title: 'Mijn creatieve stack',
    bio: 'Hi there, it\'s me! 26-jarige internet-raised strateeg, altijd op zoek naar het volgende aha-moment.\n\nIk ontleed graag campagnes: waarom werkt het, wat zit erachter en wat kan beter? Vanuit online communities en niches haal ik inzichten die ik vertaal naar strategieën, concepten en verhalen die mensen willen blijven kijken. In omgevingen waar ideeën snel bewegen ben ik op mijn gemak. Brainstorms, workshops en samen bouwen met andere creatieven. Met een scherp oog voor trends, een neus voor onverwachte invalshoeken en een sterke organisatorische blik.',
    ctaButtonText: 'Hit My Pager'
  },
  casesSection: {
    title: 'Mijn werk',
    subtitle: 'Selectie van recente projecten'
  },
  footer: {
    phone: '+32 476 35 36 77',
    email: 'hallo@charlotteschaerlaecken.be',
    instagram: '@c.schaerlaecken',
    formTitle: 'Or hit my pager',
    submitButtonText: 'Versturen'
  },
  navigation: {
    whoLink: 'Who?',
    casesLink: 'Cases',
    contactLink: 'Hit My Pager'
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (authHeader !== `Bearer ${process.env.SANITY_SEED_SECRET || 'dev-secret'}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('[v0] Starting data seeding...')

    // Delete existing data
    console.log('[v0] Deleting existing data...')
    await writeClient.delete({ query: '*[_type == "creativeSkill"]' })
    await writeClient.delete({ query: '*[_type == "case"]' })
    await writeClient.delete({ query: '*[_type == "siteSettings"]' })

    // Create skills
    console.log('[v0] Creating skills...')
    for (const skill of SKILLS_DATA) {
      const doc = {
        ...skill,
        _id: `skill-${skill.order}`
      }
      await writeClient.create(doc)
      console.log(`[v0] Created skill: ${skill.title}`)
    }

    // Create cases
    console.log('[v0] Creating cases...')
    for (const caseItem of CASES_DATA) {
      const doc = {
        ...caseItem,
        _id: `case-${caseItem.order}`
      }
      await writeClient.create(doc)
      console.log(`[v0] Created case: ${caseItem.preview.title}`)
    }

    // Create site settings
    console.log('[v0] Creating site settings...')
    await writeClient.create(SITE_SETTINGS_DATA)
    console.log('[v0] Created site settings')

    console.log('[v0] Seeding complete!')
    return NextResponse.json(
      { success: true, message: 'Data seeded successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Seeding error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
