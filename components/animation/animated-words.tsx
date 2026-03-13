"use client"

import { useEffect, useState } from "react"
import { useAnimation, AnimationStep } from "./animation-context"

interface AnimatedWordsProps {
  text: string
  step: AnimationStep
  direction?: "top" | "bottom"
  className?: string
  as?: "span" | "div" | "h1" | "p"
  delayBetweenWords?: number
}

export function AnimatedWords({
  text,
  step,
  direction = "top",
  className = "",
  as: Component = "span",
  delayBetweenWords = 80,
}: AnimatedWordsProps) {
  const { isStepActive, isStepComplete, completeStep } = useAnimation()
  const [animatedCount, setAnimatedCount] = useState(0)
  const words = text.split(" ")
  const isActive = isStepActive(step)
  const isDone = isStepComplete(step)

  useEffect(() => {
    if (isActive && animatedCount < words.length) {
      const timer = setTimeout(() => {
        setAnimatedCount((prev) => prev + 1)
      }, delayBetweenWords)
      return () => clearTimeout(timer)
    } else if (isActive && animatedCount >= words.length) {
      // All words animated, signal completion after last word finishes
      const timer = setTimeout(() => {
        completeStep(step)
      }, 300) // Wait for last word's animation to finish
      return () => clearTimeout(timer)
    }
  }, [isActive, animatedCount, words.length, completeStep, step, delayBetweenWords])

  const translateY = direction === "top" ? "-20px" : "20px"

  return (
    <Component className={className}>
      {words.map((word, index) => {
        const isWordVisible = isDone || (isActive && index < animatedCount)
        return (
          <span
            key={index}
            className="inline-block transition-all duration-300 ease-out"
            style={{
              opacity: isWordVisible ? 1 : 0,
              transform: isWordVisible ? "translateY(0)" : `translateY(${translateY})`,
            }}
          >
            {word}
            {index < words.length - 1 && "\u00A0"}
          </span>
        )
      })}
    </Component>
  )
}
