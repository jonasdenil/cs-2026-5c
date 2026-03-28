"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { revealStyle } from "@/components/sections/who-section"

const CASES = [
  { id: 1, label: "Case 01" },
  { id: 2, label: "Case 02" },
  { id: 3, label: "Case 03" },
  { id: 4, label: "Case 04" },
]

function CasePlaceholder({ label, delay }: { label: string; delay: number }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15, delay, rootMargin: "0px 0px -12% 0px" })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={revealStyle(isVisible, delay)}
      className="rounded-xl bg-coral-reef/20 border border-coral-reef/30 aspect-[4/3] flex items-end p-6"
    >
      <span
        className="font-serif uppercase text-coral-reef text-sm tracking-widest"
        style={{ fontWeight: 700 }}
      >
        {label}
      </span>
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
          {CASES.map((c, i) => (
            <CasePlaceholder key={c.id} label={c.label} delay={i * 100} />
          ))}
        </div>

      </div>
    </section>
  )
}
