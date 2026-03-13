"use client"

import { useEffect, useState, ReactNode, useRef } from "react"
import { useAnimation, AnimationStep } from "./animation-context"

interface AnimatedLinesProps {
  step: AnimationStep
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delayBetweenLines?: number
  earlyTriggerAfter?: number
}

export function AnimatedLines({
  step,
  lines,
  className = "",
  lineClassName = "",
  delayBetweenLines = 150,
  earlyTriggerAfter,
}: AnimatedLinesProps) {
  const { isStepActive, isStepComplete, completeStep, triggerNextStepEarly } = useAnimation()
  const [animatedCount, setAnimatedCount] = useState(0)
  const hasStartedRef = useRef(false)
  const isActive = isStepActive(step)
  const isDone = isStepComplete(step)

  useEffect(() => {
    if (!isActive || hasStartedRef.current) return
    hasStartedRef.current = true

    // Early trigger for overlapping animations
    let earlyTriggerTimer: NodeJS.Timeout | undefined
    if (earlyTriggerAfter !== undefined) {
      earlyTriggerTimer = setTimeout(() => {
        triggerNextStepEarly(step)
      }, earlyTriggerAfter)
    }

    let count = 0
    const interval = setInterval(() => {
      count++
      setAnimatedCount(count)
      if (count >= lines.length) {
        clearInterval(interval)
        if (earlyTriggerAfter === undefined) {
          setTimeout(() => {
            completeStep(step)
          }, 300)
        }
      }
    }, delayBetweenLines)

    return () => {
      clearInterval(interval)
      if (earlyTriggerTimer) clearTimeout(earlyTriggerTimer)
    }
  }, [isActive]) // Only re-run when isActive changes — intentionally minimal deps

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
