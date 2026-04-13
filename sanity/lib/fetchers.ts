import { client } from './client'
import { creativeSkillsQuery, casesQuery, caseBySlugQuery } from './queries'
import type { CreativeSkill, Case } from './types'

export async function getCreativeSkills(): Promise<CreativeSkill[]> {
  return client.fetch(creativeSkillsQuery)
}

export async function getCases(): Promise<Case[]> {
  return client.fetch(casesQuery)
}

export async function getCaseBySlug(slug: string): Promise<Case | null> {
  return client.fetch(caseBySlugQuery, { slug })
}
