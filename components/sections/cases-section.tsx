"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { revealStyle } from "@/components/sections/who-section"
import { CaseCard } from "@/components/case-card"

// CMS-ready case data structure - will be populated from CMS in the future
const CASES = [
  {
    id: 1,
    fileName: "stico_merkstrategie_2026_v6",
    title: "STICO",
    description: "De fundering voor STICO gelegd met een merk- en socialstrategie, aangevuld met een volledig uitgewerkt launchconcept.",
    imageUrl: "/images/cases/stico.jpg",
    collaboration: undefined, // No collaboration for STICO
  },
  {
    id: 2,
    fileName: "aiki_socialplaybook_FINAL",
    title: "AIKI",
    description: "Een strategische vertaling gemaakt van hoe Aïki een jongere doelgroep moet bereiken op TikTok en zo zich diep in de noodle-cultuur kan nestelen.",
    imageUrl: "/images/cases/aiki.jpg",
    collaboration: "CHOOCHOO",
  },
  {
    id: 3,
    fileName: "together@work_socialstrat_v2",
    title: "Flanders@work",
    description: "Via een strategische workshop een nieuwe merkoefening gedaan met een video-first social strategie op Instagram en personal branding strategie op LinkedIn als eindresultaat.",
    imageUrl: "/images/cases/flanders-at-work.jpg",
    collaboration: "Enjoy Digital",
  },
  {
    id: 4,
    fileName: "bednet_pyjamadag_video10_v12",
    title: "Bednet Pyjamadag 2025",
    description: "De editie van Bednet Pyjamadag 2025 in de kijker gezet met creatieve creators & content op de social kanalen.",
    imageUrl: "/images/cases/bednet.jpg",
    collaboration: "CHOOCHOO & Amy De Blick",
  },
]

interface CaseItemProps {
  caseData: typeof CASES[number]
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

const VITRINE_WORDS = ["In", "de", "vitrine"]

export function CasesSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.2, rootMargin: "0px 0px -15% 0px" })

  return (
    <section id="cases" className="w-full bg-merino-white">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 py-24 md:py-32 flex flex-col gap-14">

        {/* Centered staggered title */}
        <h2
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className="font-serif uppercase text-center text-coral-reef leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700 }}
          aria-label="In de vitrine"
        >
          {VITRINE_WORDS.map((word, i) => (
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
          {CASES.map((caseData, i) => (
            <CaseItem key={caseData.id} caseData={caseData} delay={i * 100} />
          ))}
        </div>

      </div>
    </section>
  )
}
