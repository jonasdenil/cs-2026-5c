"use client"

import type { ReactNode } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { SkillTags } from "@/components/skill-tags"
import { revealStyle } from "./who-section"
import type { CreativeSkill } from "@/sanity/lib/types"

interface WhoSectionClientProps {
  skills: CreativeSkill[]
  children: ReactNode
}

export function WhoSectionClient({ skills, children }: WhoSectionClientProps) {
  const { ref: photoRef, isVisible: photoVisible } = useScrollReveal({ 
    threshold: 0.15, 
    rootMargin: "0px 0px -20% 0px" 
  })

  return (
    <div
      ref={photoRef as React.RefObject<HTMLDivElement>}
      className="w-full overflow-hidden relative"
      style={{ borderRadius: "12px", ...revealStyle(photoVisible) }}
    >
      {children}
      {/* Interactive skill tags overlay */}
      <SkillTags skills={skills} />
    </div>
  )
}
