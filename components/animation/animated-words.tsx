"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useAnimation, AnimationStep } from "./animation-context"

interface AnimatedWordsProps {
  text: string
  step: AnimationStep
  direction?: "top" | "bottom"
  className?: string
  as?: "span" | "div" | "h1" | "p"
  delayBetweenWords?: number
}

export function AnimatedWords({
  text,
  step,
  direction = "top",
  className = "",
  as: Component = "span",
  delayBetweenWords = 80,
}: AnimatedWordsProps) {
  const { isStepActive, isStepComplete, completeStep } = useAnimation()
  const [animatedCount, setAnimatedCount] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const elementRef = useRef<HTMLElement>(null)
  const hasStartedRef = useRef(false)
  const words = text.split(" ")
  const isActive = isStepActive(step)
  const isDone = isStepComplete(step)

  // Check visibility once when the step becomes active
  const checkVisibility = useCallback(() => {
    if (!elementRef.current) return false
    return window.getComputedStyle(elementRef.current).display === "none"
  }, [])

  useEffect(() => {
    if (!isActive || hasStartedRef.current) return
    hasStartedRef.current = true

    // If element is hidden, skip immediately
    if (checkVisibility()) {
      setSkipped(true)
      completeStep(step)
      return
    }

    // Animate words one by one
    let count = 0
    const interval = setInterval(() => {
      count++
      setAnimatedCount(count)
      if (count >= words.length) {
        clearInterval(interval)
        // Complete after last word finishes its CSS transition (300ms)
        setTimeout(() => {
          completeStep(step)
        }, 300)
      }
    }, delayBetweenWords)

    return () => clearInterval(interval)
  }, [isActive]) // Only re-run when isActive changes — intentionally minimal deps

  const translateY = direction === "top" ? "-20px" : "20px"

  return (
    <Component ref={elementRef as React.RefObject<HTMLSpanElement>} className={className}>
      {words.map((word, index) => {
        const isWordVisible = isDone || skipped || (isActive && index < animatedCount)
        return (
          <span
            key={index}
            className="inline-block transition-all duration-300 ease-out"
            style={{
              opacity: isWordVisible ? 1 : 0,
              transform: isWordVisible ? "translateY(0)" : `translateY(${translateY})`,
            }}
          >
            {word}
            {index < words.length - 1 && "\u00A0"}
          </span>
        )
      })}
    </Component>
  )
}
