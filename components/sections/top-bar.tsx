"use client"

import Image from "next/image"
import { AnimatedWords } from "@/components/animation/animated-words"
import { AnimatedElement } from "@/components/animation/animated-element"

export function TopBar() {
  return (
    <header id="top-bar" className="relative pt-10 pb-6">
      <div className="flex items-center justify-between">
        {/* Left: Name — hidden on mobile */}
        <AnimatedWords
          text="Charlotte Schaerlaecken"
          step="topbar-name"
          direction="top"
          className="hidden md:block font-sans text-merino-white text-xs sm:text-sm md:text-base font-medium uppercase"
          delayBetweenWords={60}
          earlyTriggerAfter={120}
        />

        {/* Center: CS Monogram — absolutely centered within the header */}
        <AnimatedElement
          step="topbar-monogram"
          direction="top"
          className="absolute left-1/2 -translate-x-1/2"
          duration={400}
          earlyTriggerAfter={250}
        >
          <Image
            src="/images/cs-monogram.svg"
            alt="CS Monogram - Charlotte Schaerlaecken"
            width={140}
            height={56}
            priority
            className="h-8 sm:h-10 md:h-14 w-auto"
          />
        </AnimatedElement>

        {/* Right: Title — hidden on mobile */}
        <AnimatedWords
          text="Creatief Strateeg"
          step="topbar-title"
          direction="top"
          className="hidden md:block font-sans text-merino-white text-xs sm:text-sm md:text-base font-medium uppercase text-right"
          delayBetweenWords={60}
          earlyTriggerAfter={180}
        />
      </div>
    </header>
  )
}
