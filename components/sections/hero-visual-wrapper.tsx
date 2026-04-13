'use client'

import { Phone } from "lucide-react"
import { AnimatedTV } from "@/components/animation/animated-tv"
import { AnimatedWords } from "@/components/animation/animated-words"
import { AnimatedLines } from "@/components/animation/animated-lines"
import { AnimatedElement } from "@/components/animation/animated-element"
import { useEaseScroll } from "@/hooks/use-ease-scroll"
import type { SiteSettings } from "@/sanity/lib/types"

export function HeroVisualWrapper({ settings }: { settings: SiteSettings | null }) {
  const scrollTo = useEaseScroll(800)
  const hero = settings?.hero

  if (!hero) return null

  return (
    <div id="hero-visual" className="pt-24">
      <div className="relative flex items-center justify-center">
        <AnimatedTV />

        <h1
          className="absolute inset-0 z-10 flex flex-col items-center justify-center font-serif text-merino-white text-center uppercase leading-none pointer-events-none text-[clamp(2.5rem,8vw,5.625rem)]"
          style={{ fontWeight: 700 }}
        >
          <AnimatedWords
            text={hero.titleLine1}
            step="main-title"
            direction="bottom"
            delayBetweenWords={150}
            earlyTriggerAfter={99999}
          />
          <AnimatedWords
            text={hero.titleLine2}
            step="main-title"
            direction="bottom"
            delayBetweenWords={150}
            startDelay={450}
            earlyTriggerAfter={600}
          />
        </h1>
      </div>

      <div className="flex flex-col items-center gap-5 pt-24 pb-24">
        <AnimatedLines
          step="intro-text"
          lines={[
            <span key="line1">{hero.introLine1}</span>,
            <span key="line2">{hero.introLine2}</span>,
          ]}
          className="font-sans text-merino-white text-center uppercase max-w-2xl"
          lineClassName="text-lg"
          delayBetweenLines={200}
          earlyTriggerAfter={300}
        />

        <AnimatedElement
          step="cta"
          direction="bottom"
          duration={400}
          earlyTriggerAfter={200}
        >
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="inline-flex items-center gap-2 bg-ruby-red text-rustic-red font-sans text-base font-semibold uppercase rounded-full px-3.5 py-1.5 transition-colors duration-200 hover:bg-[#c40a19] focus:outline-none focus:ring-2 focus:ring-ruby-red focus:ring-offset-2 focus:ring-offset-rustic-red"
          >
            <Phone size={16} strokeWidth={2} />
            {hero.ctaButtonText}
          </a>
        </AnimatedElement>
      </div>
    </div>
  )
}
