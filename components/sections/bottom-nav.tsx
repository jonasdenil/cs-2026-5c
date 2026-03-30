"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useAnimation } from "@/components/animation/animation-context"
import { useEaseScroll } from "@/hooks/use-ease-scroll"

const navItems = [
  { label: "Who?", href: "#who" },
  { label: "Cases", href: "#cases" },
  { label: "Hit My Pager", href: "#contact" },
]

export function BottomNav() {
  const [open, setOpen] = useState(false)
  const { isStepActive, isStepComplete, completeStep } = useAnimation()

  const scrollTo = useEaseScroll(800)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false)
    scrollTo(e, href)
  }
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const isActive = isStepActive("main-nav")
  const isDone = isStepComplete("main-nav")

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true)
      const timer = setTimeout(() => {
        completeStep("main-nav")
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isActive, hasAnimated, completeStep])

  const isVisible = isDone || hasAnimated

  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-6 left-1/2 z-50 w-max"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateX(-50%) translateY(${isVisible ? "0" : "30px"})`,
        transition: "opacity 500ms ease-out, transform 500ms ease-out",
      }}
    >

      {/* Mobile flyout menu items — stacked above nav, appear bottom-to-top */}
      <ul className="flex flex-col items-center gap-2 mb-3 md:hidden">
        {navItems.map((item, index) => (
          <li
            key={item.label}
            className="transition-all duration-300 ease-out"
            style={{
              transitionDelay: open ? `${(navItems.length - 1 - index) * 80}ms` : `${index * 40}ms`,
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(16px)",
              pointerEvents: open ? "auto" : "none",
            }}
          >
            <a
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block px-3.5 py-1.5 bg-merino-white text-rustic-red font-sans text-base font-semibold uppercase rounded-full outline outline-1 outline-coral-reef/30 transition-colors duration-200 hover:bg-ruby-red hover:text-merino-white focus:outline-none"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 bg-merino-white rounded-full px-4 py-3 shadow-lg whitespace-nowrap outline outline-1 outline-coral-reef/30">
        {/* SC Logo — links to hero */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red rounded-sm"
          aria-label="Terug naar het begin"
        >
          <Image
            src="/images/sc-logo.svg"
            alt="SC Logo"
            width={120}
            height={40}
            className="h-9 w-auto"
          />
        </a>

        {/* Desktop nav items */}
        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-3.5 py-1.5 bg-rustic-red text-merino-white font-sans text-base font-semibold uppercase rounded-full transition-colors duration-200 ease-out hover:bg-ruby-red focus:outline-none"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? "Sluiten" : "Menu"}
          className="md:hidden flex items-center gap-2 px-3.5 py-1.5 bg-rustic-red text-merino-white font-sans text-base font-semibold uppercase rounded-full transition-colors duration-200 hover:bg-ruby-red focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
        >
          {/* Label — crossfades between Menu and Sluiten */}
          <span className="relative inline-grid">
            <span
              className="col-start-1 row-start-1 transition-all duration-200"
              style={{ opacity: open ? 0 : 1, transform: open ? "translateY(-4px)" : "translateY(0)" }}
              aria-hidden={open}
            >
              Menu
            </span>
            <span
              className="col-start-1 row-start-1 transition-all duration-200"
              style={{ opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(4px)" }}
              aria-hidden={!open}
            >
              Sluiten
            </span>
          </span>

          {/* Icon — crossfades between hamburger and close */}
          <span className="relative inline-grid w-4 h-4">
            {/* Hamburger */}
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
              className="col-start-1 row-start-1 transition-all duration-200"
              style={{ opacity: open ? 0 : 1, transform: open ? "rotate(90deg) scale(0.7)" : "rotate(0deg) scale(1)" }}
            >
              <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {/* Close */}
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
              className="col-start-1 row-start-1 transition-all duration-200"
              style={{ opacity: open ? 1 : 0, transform: open ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.7)" }}
            >
              <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </div>
    </nav>
  )
}
