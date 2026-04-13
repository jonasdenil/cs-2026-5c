"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { revealStyle } from "@/components/sections/who-section"
import { CaseCard } from "@/components/case-card"

interface TransformedCase {
  id: string
  fileName: string
  title: string
  description?: string
  imageUrl: string
  collaboration?: string
}

interface CaseItemProps {
  caseData: TransformedCase
  delay: number
}

function CaseItem({ caseData, delay }: CaseItemProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15, delay, rootMargin: "0px 0px -12% 0px" })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={revealStyle(isVisible, delay)}
    >
      <CaseCard
        fileName={caseData.fileName}
        title={caseData.title}
        description={caseData.description}
        imageUrl={caseData.imageUrl}
        collaboration={caseData.collaboration}
      />
    </div>
  )
}

interface CasesSectionClientProps {
  cases: TransformedCase[]
  titleWords: string[]
}

export function CasesSectionClient({ cases, titleWords }: CasesSectionClientProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.2, rootMargin: "0px 0px -15% 0px" })

  return (
    <>
      {/* Centered staggered title */}
      <h2
        ref={titleRef as React.RefObject<HTMLHeadingElement>}
        className="font-serif uppercase text-center text-coral-reef leading-none"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700 }}
        aria-label="In de vitrine"
      >
        {titleWords.map((word, i) => (
          <span key={word} className="inline-block mr-[0.25em] last:mr-0" style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(28px)",
            transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 130}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 130}ms`,
          }}>
            {word}
          </span>
        ))}
      </h2>

      {/* 2×2 case grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cases.map((caseData, i) => (
          <CaseItem key={caseData.id} caseData={caseData} delay={i * 100} />
        ))}
      </div>
    </>
  )
}
