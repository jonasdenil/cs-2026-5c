"use client"

import { useEffect, useState, useRef } from "react"
import { useAnimation } from "./animation-context"
import Image from "next/image"

// How much slower the TV scrolls relative to the page (0 = no parallax, 1 = stays fixed)
const PARALLAX_FACTOR = 0.3

export function AnimatedTV() {
  const { isStepActive, isStepComplete, triggerNextStepEarly } = useAnimation()
  const [phase, setPhase] = useState<"hidden" | "moving" | "done">("hidden")
  const [parallaxY, setParallaxY] = useState(0)
  const hasStartedRef = useRef(false)
  const isActive = isStepActive("tv")
  const isDone = isStepComplete("tv")

  useEffect(() => {
    if (!isActive || hasStartedRef.current) return
    hasStartedRef.current = true

    setPhase("moving")

    const earlyTrigger = setTimeout(() => {
      triggerNextStepEarly("tv")
    }, 300)

    const doneTimer = setTimeout(() => {
      setPhase("done")
    }, 900)

    return () => {
      clearTimeout(earlyTrigger)
      clearTimeout(doneTimer)
    }
  }, [isActive])

  useEffect(() => {
    const element = document.querySelector('[data-parallax-tv]') as HTMLElement
    if (!element) return

    const handleScroll = () => {
      // Use getBoundingClientRect for better mobile compatibility
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top
      const windowHeight = window.innerHeight

      // Calculate offset based on element position in viewport
      // When element is at bottom of viewport (scrolled down), parallaxY increases
      const scrollRatio = 1 - elementTop / windowHeight
      const parallaxOffset = scrollRatio * (window.scrollY * PARALLAX_FACTOR)

      setParallaxY(parallaxOffset)
    }

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    // Also handle on mount to set initial state
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isVisible = isDone || phase !== "hidden"

  // Combine intro animation translateY with parallax offset
  const translateY = isVisible ? parallaxY : 80 + parallaxY

  return (
    <div
      className="relative z-0 w-full md:w-3/4 lg:w-1/2 mx-auto"
      data-parallax-tv
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${translateY}px) rotate(9deg)`,
        transition: phase === "done"
          ? "opacity 800ms ease-out"
          : "opacity 800ms ease-out, transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      <Image
        src="/images/tv.png"
        alt="Charlotte Schaerlaecken in een vintage televisie"
        width={1400}
        height={1050}
        priority
        className="w-full h-auto"
      />
    </div>
  )
}
