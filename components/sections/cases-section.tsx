"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { revealStyle } from "@/components/sections/who-section"
import { CaseCard } from "@/components/case-card"

// CMS-ready case data structure - will be populated from CMS in the future
const CASES = [
  {
    id: 1,
    fileName: "Bednet_Final_ReallyFinal_v3",
    title: "Bednet",
    description: "some short description of the project to give people an idea on what the project is about",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    id: 2,
    fileName: "Project_Draft_v2",
    title: "Case 02",
    description: "another project description that explains the work done for this client",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: 3,
    fileName: "Campaign_2024_Final",
    title: "Case 03",
    description: "creative campaign work showcasing strategic thinking and execution",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  },
  {
    id: 4,
    fileName: "Brand_Identity_v1",
    title: "Case 04",
    description: "brand identity project demonstrating visual and strategic alignment",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
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
