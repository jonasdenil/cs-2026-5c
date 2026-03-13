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
  earlyTriggerAfter?: number
  startDelay?: number
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
  
  // Store props in refs to avoid dependency issues
  const propsRef = useRef({ delayBetweenWords, earlyTriggerAfter, startDelay, step })
  propsRef.current = { delayBetweenWords, earlyTriggerAfter, startDelay, step }
  
  const words = text.split(" ")
  const wordsLengthRef = useRef(words.length)
  wordsLengthRef.current = words.length
  
  const isActive = isStepActive(step)

  const checkVisibility = useCallback(() => {
    if (!elementRef.current) return false
    return window.getComputedStyle(elementRef.current).display === "none"
  }, [])

  useEffect(() => {
    if (!isActive || hasStartedRef.current) return
    hasStartedRef.current = true

    const { delayBetweenWords, earlyTriggerAfter, startDelay, step } = propsRef.current

    if (checkVisibility()) {
      setSkipped(true)
      completeStep(step)
      return
    }

    const timers: NodeJS.Timeout[] = []

    const startTimer = setTimeout(() => {
      if (earlyTriggerAfter !== undefined) {
        const earlyTimer = setTimeout(() => {
          triggerNextStepEarly(step)
        }, earlyTriggerAfter)
        timers.push(earlyTimer)
      }

      let count = 0
      const interval = setInterval(() => {
        count++
        setAnimatedCount(count)
        if (count >= wordsLengthRef.current) {
          clearInterval(interval)
          const completeTimer = setTimeout(() => {
            setAnimationComplete(true)
            if (earlyTriggerAfter === undefined) {
              completeStep(step)
            }
          }, 300)
          timers.push(completeTimer)
        }
      }, delayBetweenWords)
      timers.push(interval as unknown as NodeJS.Timeout)
    }, startDelay)
    timers.push(startTimer)

    return () => {
      timers.forEach(t => clearTimeout(t))
    }
  }, [isActive, checkVisibility, completeStep, triggerNextStepEarly])

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
