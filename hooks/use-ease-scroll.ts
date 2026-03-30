"use client"

import { useCallback } from "react"

/**
 * Returns a click handler that smoothly scrolls to an anchor target
 * using an ease-out-cubic curve (fast → slow).
 */
export function useEaseScroll(duration = 800) {
  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const target = document.querySelector(href)
      if (!target) return

      const targetPosition = target.getBoundingClientRect().top + window.scrollY
      const startPosition = window.scrollY
      const distance = targetPosition - startPosition
      let startTime: number | null = null

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

      const scroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        window.scrollTo(0, startPosition + distance * easeOutCubic(progress))
        if (progress < 1) requestAnimationFrame(scroll)
      }

      requestAnimationFrame(scroll)
    },
    [duration]
  )
}
