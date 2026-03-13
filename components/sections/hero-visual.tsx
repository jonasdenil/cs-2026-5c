"use client"

import { Phone } from "lucide-react"
import { AnimatedTV } from "@/components/animation/animated-tv"
import { AnimatedWords } from "@/components/animation/animated-words"
import { AnimatedLines } from "@/components/animation/animated-lines"
import { AnimatedElement } from "@/components/animation/animated-element"

export function HeroVisual() {
  return (
    <div id="hero-visual" className="pt-24">

      {/* TV + Title stacking block */}
      <div className="relative flex items-center justify-center">

        {/* TV image — behind the text */}
        <AnimatedTV />

        {/* Title — on top of the TV */}
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center font-serif text-merino-white text-center uppercase leading-none pointer-events-none text-[clamp(2.5rem,8vw,5.625rem)]"
          style={{ fontWeight: 700, maxWidth: "90vw" }}
        >
          <AnimatedWords
            text="Creatief Strateeg All Things Social"
            step="main-title"
            direction="bottom"
            delayBetweenWords={150}
            earlyTriggerAfter={300}
          />
        </div>
      </div>

      {/* Intro text + CTA */}
      <div className="flex flex-col items-center gap-5 pt-24 pb-24">
        <AnimatedLines
          step="intro-text"
          lines={[
            <span key="line1">If it stops the scroll, there&apos;s strategy behind it.</span>,
            <span key="line2">From tone to timing, I help your brand own the feed.</span>,
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
            className="inline-flex items-center gap-2 bg-ruby-red text-rustic-red font-sans text-base font-medium uppercase rounded-full px-3.5 py-1.5 transition-colors duration-200 hover:bg-[#c40a19] focus:outline-none focus:ring-2 focus:ring-ruby-red focus:ring-offset-2 focus:ring-offset-rustic-red"
          >
            <Phone size={16} strokeWidth={2} />
            Hit My Pager
          </a>
        </AnimatedElement>
      </div>

    </div>
  )
}
