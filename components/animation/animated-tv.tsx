"use client"

import { useEffect, useState } from "react"
import { useAnimation } from "./animation-context"
import Image from "next/image"

export function AnimatedTV() {
  const { isStepActive, isStepComplete, completeStep } = useAnimation()
  const [phase, setPhase] = useState<"hidden" | "moving" | "rotating" | "done">("hidden")
  const isActive = isStepActive("tv")
  const isDone = isStepComplete("tv")

  useEffect(() => {
    if (isActive && phase === "hidden") {
      // Start move-in animation
      setPhase("moving")

      // After move-in, start rotation
      const rotateTimer = setTimeout(() => {
        setPhase("rotating")
      }, 800) // Move-in takes 800ms

      // After rotation, mark as done
      const doneTimer = setTimeout(() => {
        setPhase("done")
        completeStep("tv")
      }, 1300) // 800ms move + 500ms rotate

      return () => {
        clearTimeout(rotateTimer)
        clearTimeout(doneTimer)
      }
    }
  }, [isActive, phase, completeStep])

  const isVisible = isDone || phase !== "hidden"
  const hasRotation = isDone || phase === "rotating" || phase === "done"

  return (
    <div
      className="relative z-0 w-full md:w-3/4 lg:w-1/2 mx-auto"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? "0" : "80px"}) rotate(${hasRotation ? "9deg" : "0deg"})`,
        // Easing: cubic-bezier for "starts slow, speeds up" effect on translateY
        transition: phase === "moving" || phase === "hidden"
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
