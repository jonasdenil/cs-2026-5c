"use client"

import { useEffect, useState, useRef } from "react"
import { useAnimation } from "./animation-context"
import Image from "next/image"

// How much faster the TV scrolls relative to the page (higher = disappears faster)
const PARALLAX_FACTOR = 0.8

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

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return

      // Get the natural position of the element relative to the document
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Only apply parallax while the element is still in view
      // Once it scrolls out of view (rect.bottom < 0), stop updating
      if (rect.bottom < 0 || rect.top > windowHeight) return

      // Offset relative to how far into the viewport the element has scrolled
      // This keeps the parallax local to the element, not the full page scroll
      const offset = (windowHeight - rect.top) * PARALLAX_FACTOR * -0.3

      setParallaxY(offset)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isVisible = isDone || phase !== "hidden"

  // Combine intro animation translateY with parallax offset
  const translateY = isVisible ? parallaxY : 80 + parallaxY

  return (
    <div
      ref={containerRef}
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
