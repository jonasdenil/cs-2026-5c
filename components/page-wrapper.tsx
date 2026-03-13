"use client"

import { useState, useCallback } from "react"
import { PageLoader } from "./page-loader"

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  const handleComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <PageLoader onComplete={handleComplete} />}
      <div
        className="transition-opacity duration-500"
        style={{ opacity: loading ? 0 : 1 }}
      >
        {children}
      </div>
    </>
  )
}
