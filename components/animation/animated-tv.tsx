"use client"

import { useEffect, useState, useRef } from "react"
import { useAnimation } from "./animation-context"
import Image from "next/image"

export function AnimatedTV() {
  const { isStepActive, isStepComplete, completeStep } = useAnimation()
  const [phase, setPhase] = useState<"hidden" | "moving" | "rotating" | "done">("hidden")
  const hasStartedRef = useRef(false)
  const isActive = isStepActive("tv")
  const isDone = isStepComplete("tv")

  useEffect(() => {
    if (!isActive || hasStartedRef.current) return
    hasStartedRef.current = true

    // Start move-in animation
    setPhase("moving")

    // After move-in, start rotation
    const rotateTimer = setTimeout(() => {
      setPhase("rotating")
    }, 800)

    // After rotation, mark as done
    const doneTimer = setTimeout(() => {
      setPhase("done")
      completeStep("tv")
    }, 1300)

    return () => {
      clearTimeout(rotateTimer)
      clearTimeout(doneTimer)
    }
  }, [isActive]) // Only re-run when isActive changes — intentionally minimal deps

  const isVisible = isDone || phase !== "hidden"
  const hasRotation = isDone || phase === "rotating" || phase === "done"

  return (
    <div
      className="relative z-0 w-full md:w-3/4 lg:w-1/2 mx-auto"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? "0" : "80px"}) rotate(${hasRotation ? "9deg" : "0deg"})`,
        transition: phase === "moving"
          ? "opacity 800ms ease-out, transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "transform 500ms ease-out",
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
