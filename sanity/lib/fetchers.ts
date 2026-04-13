import { client } from './client'
import { creativeSkillsQuery, casesQuery, caseBySlugQuery } from './queries'
import type { CreativeSkill, Case } from './types'

// Disable Next.js caching for Sanity fetches so changes appear immediately
const fetchOptions = {
  next: { revalidate: 0 }
}

export async function getCreativeSkills(): Promise<CreativeSkill[]> {
  return client.fetch(creativeSkillsQuery, {}, fetchOptions)
}

export async function getCases(): Promise<Case[]> {
  return client.fetch(casesQuery, {}, fetchOptions)
}

export async function getCaseBySlug(slug: string): Promise<Case | null> {
  return client.fetch(caseBySlugQuery, { slug }, fetchOptions)
}
