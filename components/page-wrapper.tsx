"use client"

import { useCallback } from "react"
import { PageLoader } from "./page-loader"
import { AnimationProvider, useAnimation } from "./animation/animation-context"

function PageContent({ children }: { children: React.ReactNode }) {
  const { loaderComplete, setLoaderComplete } = useAnimation()

  const handleComplete = useCallback(() => {
    setLoaderComplete(true)
  }, [setLoaderComplete])

  return (
    <>
      {!loaderComplete && <PageLoader onComplete={handleComplete} />}
      <div
        className="transition-opacity duration-500"
        style={{ opacity: loaderComplete ? 1 : 0 }}
      >
        {children}
      </div>
    </>
  )
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AnimationProvider>
      <PageContent>{children}</PageContent>
    </AnimationProvider>
  )
}
