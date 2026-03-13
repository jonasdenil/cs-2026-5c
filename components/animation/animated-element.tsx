"use client"

import { useEffect, useState, ReactNode, useRef } from "react"
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
  const elementRef = useRef<HTMLDivElement>(null)
  const isActive = isStepActive(step)
  const isDone = isStepComplete(step)

  useEffect(() => {
    // Check if element is visible (not hidden via CSS)
    if (isActive && elementRef.current) {
      const isHidden = window.getComputedStyle(elementRef.current).display === "none"
      if (isHidden) {
        // Skip this step immediately if element is hidden
        completeStep(step)
        return
      }
    }

    if (isActive && !hasAnimated) {
      // Start animation
      const animateTimer = setTimeout(() => {
        setHasAnimated(true)
      }, delay)

      // Complete step after animation
      const completeTimer = setTimeout(() => {
        completeStep(step)
      }, delay + duration)

      return () => {
        clearTimeout(animateTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [isActive, hasAnimated, completeStep, step, duration, delay])

  const isVisible = isDone || hasAnimated
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
