"use client"

import { useEffect, useState, useRef } from "react"
import { useAnimation } from "./animation-context"
import Image from "next/image"

export function AnimatedTV() {
  const { isStepActive, isStepComplete, triggerNextStepEarly } = useAnimation()
  const [phase, setPhase] = useState<"hidden" | "moving" | "done">("hidden")
  const hasStartedRef = useRef(false)
  const isActive = isStepActive("tv")
  const isDone = isStepComplete("tv")

  useEffect(() => {
    if (!isActive || hasStartedRef.current) return
    hasStartedRef.current = true

    // Start move-in animation (already rotated at 9deg)
    setPhase("moving")

    // Trigger next step early (after 400ms, halfway through TV animation)
    // This allows the main-title to start while TV is still animating
    const earlyTrigger = setTimeout(() => {
      triggerNextStepEarly("tv")
    }, 400)

    // Mark TV as done after full animation
    const doneTimer = setTimeout(() => {
      setPhase("done")
    }, 900)

    return () => {
      clearTimeout(earlyTrigger)
      clearTimeout(doneTimer)
    }
  }, [isActive]) // Only re-run when isActive changes — intentionally minimal deps

  const isVisible = isDone || phase !== "hidden"

  return (
    <div
      className="relative z-0 w-full md:w-3/4 lg:w-1/2 mx-auto"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? "0" : "80px"}) rotate(9deg)`,
        transition: "opacity 800ms ease-out, transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
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
