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
  earlyTriggerAfter?: number // ms after start to trigger next step (allows overlap)
  lineBreakAfter?: number    // insert a <br> after the nth word (1-indexed)
}

export function AnimatedWords({
  text,
  step,
  direction = "top",
  className = "",
  as: Component = "span",
  delayBetweenWords = 80,
  earlyTriggerAfter,
  lineBreakAfter,
}: AnimatedWordsProps) {
  const { isStepActive, completeStep, triggerNextStepEarly } = useAnimation()
  const [animatedCount, setAnimatedCount] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const elementRef = useRef<HTMLElement>(null)
  const hasStartedRef = useRef(false)
  const words = text.split(" ")
  const isActive = isStepActive(step)

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

    // Early trigger for overlapping animations
    let earlyTriggerTimer: NodeJS.Timeout | undefined
    if (earlyTriggerAfter !== undefined) {
      earlyTriggerTimer = setTimeout(() => {
        triggerNextStepEarly(step)
      }, earlyTriggerAfter)
    }

    // Animate words one by one
    let count = 0
    const interval = setInterval(() => {
      count++
      setAnimatedCount(count)
      if (count >= words.length) {
        clearInterval(interval)
        // Mark this component's animation as internally complete
        setTimeout(() => {
          setAnimationComplete(true)
          // Only call completeStep if we didn't use earlyTrigger
          if (earlyTriggerAfter === undefined) {
            completeStep(step)
          }
        }, 300)
      }
    }, delayBetweenWords)

    return () => {
      clearInterval(interval)
      if (earlyTriggerTimer) clearTimeout(earlyTriggerTimer)
    }
  }, [isActive]) // Only re-run when isActive changes — intentionally minimal deps

  const translateY = direction === "top" ? "-20px" : "20px"

  return (
    <Component ref={elementRef as React.RefObject<HTMLSpanElement>} className={className}>
      {words.map((word, index) => {
        const isWordVisible = animationComplete || skipped || (isActive && index < animatedCount)
        return (
          <span key={index}>
            <span
              className="inline-block transition-all duration-300 ease-out"
              style={{
                opacity: isWordVisible ? 1 : 0,
                transform: isWordVisible ? "translateY(0)" : `translateY(${translateY})`,
              }}
            >
              {word}
            </span>
            {/* Space or line break after word */}
            {lineBreakAfter && index === lineBreakAfter - 1
              ? <br />
              : index < words.length - 1 && "\u00A0"
            }
          </span>
        )
      })}
    </Component>
  )
}
