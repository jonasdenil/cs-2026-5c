"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"

// Define the animation sequence steps
// Change this array to easily reorder animations
export const ANIMATION_SEQUENCE = [
  "topbar-name",        // 1. Charlotte Schaerlaecken
  "topbar-title",       // 2. Creatief Strateeg
  "topbar-monogram",    // 3. C*S monogram
  "tv",                 // 4. TV
  "main-title",         // 5. Main title
  "intro-text",         // 6. Intro text
  "cta",                // 7. CTA button
  "main-nav",           // 8. Main navigation
] as const

export type AnimationStep = (typeof ANIMATION_SEQUENCE)[number]

interface AnimationContextType {
  currentStep: number
  isStepActive: (step: AnimationStep) => boolean
  isStepComplete: (step: AnimationStep) => boolean
  completeStep: (step: AnimationStep) => void
  loaderComplete: boolean
  setLoaderComplete: (complete: boolean) => void
}

const AnimationContext = createContext<AnimationContextType | null>(null)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(-1) // -1 = waiting for loader
  const [loaderComplete, setLoaderComplete] = useState(false)

  const isStepActive = useCallback(
    (step: AnimationStep) => {
      if (!loaderComplete) return false
      const stepIndex = ANIMATION_SEQUENCE.indexOf(step)
      return stepIndex === currentStep
    },
    [currentStep, loaderComplete]
  )

  const isStepComplete = useCallback(
    (step: AnimationStep) => {
      const stepIndex = ANIMATION_SEQUENCE.indexOf(step)
      return stepIndex < currentStep
    },
    [currentStep]
  )

  const completeStep = useCallback(
    (step: AnimationStep) => {
      const stepIndex = ANIMATION_SEQUENCE.indexOf(step)
      if (stepIndex === currentStep) {
        setCurrentStep((prev) => prev + 1)
      }
    },
    [currentStep]
  )

  // Start sequence when loader completes
  const handleLoaderComplete = useCallback((complete: boolean) => {
    setLoaderComplete(complete)
    if (complete) {
      setCurrentStep(0)
    }
  }, [])

  return (
    <AnimationContext.Provider
      value={{
        currentStep,
        isStepActive,
        isStepComplete,
        completeStep,
        loaderComplete,
        setLoaderComplete: handleLoaderComplete,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error("useAnimation must be used within AnimationProvider")
  }
  return context
}
