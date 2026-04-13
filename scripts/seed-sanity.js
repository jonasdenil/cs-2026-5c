const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

console.log('[v0] projectId:', projectId)
console.log('[v0] dataset:', dataset)
console.log('[v0] token:', token ? 'SET' : 'NOT SET')

if (!projectId) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  process.exit(1)
}

if (!token) {
  console.error('❌ Missing SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Existing skills data from the website
const skills = [
  {
    _type: 'creativeSkill',
    _id: 'skill-social',
    title: 'Social Strateeg',
    description: 'Sterke online content begint met een sterk idee. Ik vertaal strategie naar creatieve concepten, formats en campagnes die mensen echt willen zien en delen.',
    desktopPosition: { top: 72, left: 58 },
    rotation: 8,
    orderRank: 'a0',
  },
  {
    _type: 'creativeSkill',
    _id: 'skill-merk',
    title: 'Merkstrateeg',
    description: 'Ik help merken en de mensen erachter hun stem vinden, zodat hun verhaal online even sterk klinkt als in het echt.',
    desktopPosition: { top: 52, left: 8 },
    rotation: -6,
    orderRank: 'a1',
  },
  {
    _type: 'creativeSkill',
    _id: 'skill-sparpartner',
    title: 'Sparpartner',
    description: 'Tijdens brainstorms schuif ik mee aan tafel met een frisse strategische blik en help ik nieuwe inzichten bovenhalen. En ook aan de zijlijn denk ik mee, via mail, telefoon of gewoon fysiek op kantoor.',
    desktopPosition: { top: 68, left: 28 },
    rotation: -10,
    orderRank: 'a2',
  },
  {
    _type: 'creativeSkill',
    _id: 'skill-workshop',
    title: 'Workshop Facilitator',
    description: 'De beste ideeën zitten vaak al in het team. Ik faciliteer workshops die inzichten bovenhalen en ideeën vertalen naar een duidelijke richting.',
    desktopPosition: { top: 20, left: 62 },
    rotation: 4,
    orderRank: 'a3',
  },
]

// Existing cases data from the website
const cases = [
  {
    _type: 'case',
    _id: 'case-stico',
    title: 'STICO',
    slug: { _type: 'slug', current: 'stico' },
    fileName: 'stico_merkstrategie_2026_v6',
    shortIntro: 'De fundering voor STICO gelegd met een merk- en socialstrategie, aangevuld met een volledig uitgewerkt launchconcept.',
    collaboration: null,
    orderRank: 'a0',
  },
  {
    _type: 'case',
    _id: 'case-aiki',
    title: 'AIKI',
    slug: { _type: 'slug', current: 'aiki' },
    fileName: 'aiki_socialplaybook_FINAL',
    shortIntro: 'Een strategische vertaling gemaakt van hoe Aïki een jongere doelgroep moet bereiken op TikTok en zo zich diep in de noodle-cultuur kan nestelen.',
    collaboration: 'CHOOCHOO',
    orderRank: 'a1',
  },
  {
    _type: 'case',
    _id: 'case-flanders',
    title: 'Flanders@work',
    slug: { _type: 'slug', current: 'flanders-at-work' },
    fileName: 'together@work_socialstrat_v2',
    shortIntro: 'Via een strategische workshop een nieuwe merkoefening gedaan met een video-first social strategie op Instagram en personal branding strategie op LinkedIn als eindresultaat.',
    collaboration: 'Enjoy Digital',
    orderRank: 'a2',
  },
  {
    _type: 'case',
    _id: 'case-bednet',
    title: 'Bednet Pyjamadag 2026',
    slug: { _type: 'slug', current: 'bednet-pyjamadag-2026' },
    fileName: 'bednet_pyjamadag_video10_v12',
    shortIntro: 'De editie van Bednet Pyjamadag 2026 in de kijker gezet met creatieve creators & content op de social kanalen.',
    collaboration: 'CHOOCHOO & Amy De Blick',
    orderRank: 'a3',
  },
]

async function seed() {
  console.log('\n🌱 Starting Sanity seed...')
  console.log(`Project: ${projectId}, Dataset: ${dataset}`)

  // Create a transaction for atomic operations
  const transaction = client.transaction()

  // Add skills
  console.log('\n📝 Seeding creative skills...')
  for (const skill of skills) {
    transaction.createOrReplace(skill)
    console.log(`  ✓ ${skill.title}`)
  }

  // Add cases (without images - those need to be uploaded via Sanity Studio)
  console.log('\n📝 Seeding cases...')
  for (const caseData of cases) {
    transaction.createOrReplace(caseData)
    console.log(`  ✓ ${caseData.title}`)
  }

  // Commit all changes
  console.log('\n💾 Committing changes...')
  await transaction.commit()

  console.log('\n✅ Seed completed successfully!')
  console.log('\nℹ️  Next steps:')
  console.log('1. Visit /studio to see your data')
  console.log('2. Upload case images via the Sanity Studio')
  console.log('3. Images are in /public/images/cases/')
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error.message)
  process.exit(1)
})
