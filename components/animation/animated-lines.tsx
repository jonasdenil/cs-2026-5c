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
  
  // Store props in refs
  const propsRef = useRef({ delayBetweenLines, earlyTriggerAfter, step })
  propsRef.current = { delayBetweenLines, earlyTriggerAfter, step }
  
  const linesLengthRef = useRef(lines.length)
  linesLengthRef.current = lines.length
  
  const isActive = isStepActive(step)
  const isDone = isStepComplete(step)

  useEffect(() => {
    if (!isActive || hasStartedRef.current) return
    hasStartedRef.current = true

    const { delayBetweenLines, earlyTriggerAfter, step } = propsRef.current
    const timers: NodeJS.Timeout[] = []

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
      if (count >= linesLengthRef.current) {
        clearInterval(interval)
        if (earlyTriggerAfter === undefined) {
          const completeTimer = setTimeout(() => {
            completeStep(step)
          }, 300)
          timers.push(completeTimer)
        }
      }
    }, delayBetweenLines)
    timers.push(interval as unknown as NodeJS.Timeout)

    return () => {
      timers.forEach(t => clearTimeout(t))
    }
  }, [isActive, completeStep, triggerNextStepEarly])

  return (
    <div className={className}>
      {lines.map((line, index) => {
        const isLineVisible = isDone || index < animatedCount
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
