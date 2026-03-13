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
  startDelay?: number        // ms to wait before starting word animation
}

export function AnimatedWords({
  text,
  step,
  direction = "top",
  className = "",
  as: Component = "span",
  delayBetweenWords = 80,
  earlyTriggerAfter,
  startDelay = 0,
}: AnimatedWordsProps) {
  const { isStepActive, isStepComplete, completeStep, triggerNextStepEarly } = useAnimation()
  const [animatedCount, setAnimatedCount] = useState(0)
  const [skipped, setSkipped] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const elementRef = useRef<HTMLElement>(null)
  const hasStartedRef = useRef(false)
  const words = text.split(" ")
  const isActive = isStepActive(step)
  // isStepComplete becomes true when the step advances — we use animationComplete
  // as a local latch so words stay visible even after currentStep moves on

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

    let startTimer: NodeJS.Timeout | undefined
    let earlyTriggerTimer: NodeJS.Timeout | undefined
    let interval: NodeJS.Timeout | undefined
    let completeTimer: NodeJS.Timeout | undefined

    // Wait for startDelay before beginning animation
    startTimer = setTimeout(() => {
      // Early trigger for overlapping animations
      if (earlyTriggerAfter !== undefined) {
        earlyTriggerTimer = setTimeout(() => {
          triggerNextStepEarly(step)
        }, earlyTriggerAfter)
      }

      // Animate words one by one
      let count = 0
      interval = setInterval(() => {
        count++
        setAnimatedCount(count)
        if (count >= words.length) {
          if (interval) clearInterval(interval)
          completeTimer = setTimeout(() => {
            setAnimationComplete(true)
            if (earlyTriggerAfter === undefined) {
              completeStep(step)
            }
          }, 300)
        }
      }, delayBetweenWords)
    }, startDelay)

    return () => {
      if (startTimer) clearTimeout(startTimer)
      if (earlyTriggerTimer) clearTimeout(earlyTriggerTimer)
      if (interval) clearInterval(interval)
      if (completeTimer) clearTimeout(completeTimer)
    }
  }, [isActive, checkVisibility, completeStep, delayBetweenWords, earlyTriggerAfter, startDelay, step, triggerNextStepEarly, words.length])

  const translateY = direction === "top" ? "-20px" : "20px"

  return (
    <Component ref={elementRef as React.RefObject<HTMLSpanElement>} className={className}>
      {words.map((word, index) => {
        const isWordVisible = animationComplete || skipped || index < animatedCount
        return (
          <span
            key={index}
            className="inline-block transition-all duration-300 ease-out"
            style={{
              opacity: isWordVisible ? 1 : 0,
              transform: isWordVisible ? "translateY(0)" : `translateY(${translateY})`,
              marginRight: index < words.length - 1 ? "0.25em" : 0,
            }}
          >
            {word}
          </span>
        )
      })}
    </Component>
  )
}
