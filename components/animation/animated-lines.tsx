"use client"

import { useEffect, useState, ReactNode } from "react"
import { useAnimation, AnimationStep } from "./animation-context"

interface AnimatedLinesProps {
  step: AnimationStep
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delayBetweenLines?: number
}

export function AnimatedLines({
  step,
  lines,
  className = "",
  lineClassName = "",
  delayBetweenLines = 150,
}: AnimatedLinesProps) {
  const { isStepActive, isStepComplete, completeStep } = useAnimation()
  const [animatedCount, setAnimatedCount] = useState(0)
  const isActive = isStepActive(step)
  const isDone = isStepComplete(step)

  useEffect(() => {
    if (isActive && animatedCount < lines.length) {
      const timer = setTimeout(() => {
        setAnimatedCount((prev) => prev + 1)
      }, delayBetweenLines)
      return () => clearTimeout(timer)
    } else if (isActive && animatedCount >= lines.length) {
      const timer = setTimeout(() => {
        completeStep(step)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isActive, animatedCount, lines.length, completeStep, step, delayBetweenLines])

  return (
    <div className={className}>
      {lines.map((line, index) => {
        const isLineVisible = isDone || (isActive && index < animatedCount)
        return (
          <div
            key={index}
            className={`transition-all duration-300 ease-out ${lineClassName}`}
            style={{
              opacity: isLineVisible ? 1 : 0,
              transform: isLineVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {line}
          </div>
        )
      })}
    </div>
  )
}
