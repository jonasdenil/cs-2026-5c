"use client"

import { useEffect, useState, ReactNode, useRef, useCallback } from "react"
import { useAnimation, AnimationStep } from "./animation-context"

interface AnimatedElementProps {
  step: AnimationStep
  children: ReactNode
  direction?: "top" | "bottom"
  className?: string
  duration?: number
  delay?: number
  easing?: string
  earlyTriggerAfter?: number
}

export function AnimatedElement({
  step,
  children,
  direction = "top",
  className = "",
  duration = 500,
  delay = 0,
  easing = "ease-out",
  earlyTriggerAfter,
}: AnimatedElementProps) {
  const { isStepActive, isStepComplete, completeStep, triggerNextStepEarly } = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const hasStartedRef = useRef(false)
  
  // Store props in refs
  const propsRef = useRef({ delay, duration, earlyTriggerAfter, step })
  propsRef.current = { delay, duration, earlyTriggerAfter, step }
  
  const isActive = isStepActive(step)
  const isDone = isStepComplete(step)

  const checkVisibility = useCallback(() => {
    if (!elementRef.current) return false
    return window.getComputedStyle(elementRef.current).display === "none"
  }, [])

  useEffect(() => {
    if (!isActive || hasStartedRef.current) return
    hasStartedRef.current = true

    const { delay, duration, earlyTriggerAfter, step } = propsRef.current

    if (checkVisibility()) {
      setSkipped(true)
      completeStep(step)
      return
    }

    const timers: NodeJS.Timeout[] = []

    if (earlyTriggerAfter !== undefined) {
      const earlyTimer = setTimeout(() => {
        triggerNextStepEarly(step)
      }, earlyTriggerAfter)
      timers.push(earlyTimer)
    }

    const animateTimer = setTimeout(() => {
      setHasAnimated(true)
    }, delay)
    timers.push(animateTimer)

    if (earlyTriggerAfter === undefined) {
      const completeTimer = setTimeout(() => {
        completeStep(step)
      }, delay + duration)
      timers.push(completeTimer)
    }

    return () => {
      timers.forEach(t => clearTimeout(t))
    }
  }, [isActive, checkVisibility, completeStep, triggerNextStepEarly])

  const isVisible = isDone || hasAnimated || skipped
  const translateY = direction === "top" ? "-30px" : "30px"

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${translateY})`,
        transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
      }}
    >
      {children}
    </div>
  )
}
