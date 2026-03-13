"use client"

import { useEffect, useState, ReactNode } from "react"
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
  const isActive = isStepActive(step)
  const isDone = isStepComplete(step)

  useEffect(() => {
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
