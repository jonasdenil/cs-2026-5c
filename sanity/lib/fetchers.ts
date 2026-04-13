import { client } from './client'
import { creativeSkillsQuery, casesQuery, caseBySlugQuery, siteSettingsQuery, contactMessagesQuery } from './queries'
import type { CreativeSkill, Case, SiteSettings, ContactMessage } from './types'

// Disable Next.js caching for Sanity fetches so changes appear immediately
const fetchOptions = {
  cache: 'no-store' as const
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

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(siteSettingsQuery, {}, fetchOptions)
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  return client.fetch(contactMessagesQuery, {}, fetchOptions)
}
