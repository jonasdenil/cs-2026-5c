"use client"

import { useEffect, useRef, useState } from "react"

interface UseScrollRevealOptions {
  threshold?: number   // 0–1, how much of element must be visible to trigger
  delay?: number       // ms delay before reveal starts
  once?: boolean       // only trigger once (default true)
  rootMargin?: string  // IntersectionObserver rootMargin (negative = element must be further into viewport)
}

export function useScrollReveal({
  threshold = 0.15,
  delay = 0,
  once = true,
  rootMargin = "0px 0px -10% 0px", // trigger when element is at least 10% past the bottom edge
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, delay, once, rootMargin])

  return { ref, isVisible }
}
