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
}

export function AnimatedElement({
  step,
  children,
  direction = "top",
  className = "",
  duration = 500,
  delay = 0,
  easing = "ease-out",
}: AnimatedElementProps) {
  const { isStepActive, isStepComplete, completeStep } = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const hasStartedRef = useRef(false)
  const isActive = isStepActive(step)
  const isDone = isStepComplete(step)

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

    const animateTimer = setTimeout(() => {
      setHasAnimated(true)
    }, delay)

    const completeTimer = setTimeout(() => {
      completeStep(step)
    }, delay + duration)

    return () => {
      clearTimeout(animateTimer)
      clearTimeout(completeTimer)
    }
  }, [isActive]) // Only re-run when isActive changes — intentionally minimal deps

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
