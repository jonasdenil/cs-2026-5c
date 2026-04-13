"use client"

import { useState, useEffect, useRef, useCallback, type RefObject } from "react"
import { createPortal } from "react-dom"
import { X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import type { CreativeSkill } from "@/sanity/lib/types"

// Transform Sanity skill to internal format
interface Skill {
  id: string
  title: string
  description: string
  position: { top: string; left: string }
  rotation: number
}

function transformSkill(sanitySkill: CreativeSkill): Skill {
  return {
    id: sanitySkill._id,
    title: sanitySkill.title,
    description: sanitySkill.description,
    position: {
      top: `${sanitySkill.desktopPosition?.top ?? 50}%`,
      left: `${sanitySkill.desktopPosition?.left ?? 50}%`,
    },
    rotation: sanitySkill.rotation ?? 0,
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface OriginRect {
  top: number
  left: number
  width: number
  height: number
}

interface SkillTagsProps {
  skills: CreativeSkill[]
}

// ─── Desktop modal (portal) ────────────────────────────────────────────────

function DesktopModal({
  skill,
  origin,
  onClose,
}: {
  skill: Skill
  origin: OriginRect
  onClose: () => void
}) {
  // "start" = at tag position, "open" = centred + expanded, "closing" = fade-out in place
  type Phase = "start" | "open" | "closing"
  const [phase, setPhase] = useState<Phase>("start")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setPhase("open"), 20)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const handleClose = useCallback(() => {
    setPhase("closing")
    setTimeout(onClose, 380)
  }, [onClose])

  const vw = typeof window !== "undefined" ? window.innerWidth : 1200
  const vh = typeof window !== "undefined" ? window.innerHeight : 800
  const expandedW = Math.min(500, vw - 48)
  const easing = "cubic-bezier(0.4, 0, 0.2, 1)"

  // Card wrapper style: only handles position + size + rotation
  const getCardStyle = (): React.CSSProperties => {
    if (phase === "start") {
      return {
        position: "fixed",
        top: origin.top + origin.height / 2,
        left: origin.left + origin.width / 2,
        width: origin.width,
        transform: `translate(-50%, -50%) rotate(${skill.rotation}deg)`,
        transition: "none",
        zIndex: 60,
      }
    }
    // Both "open" and "closing" share the same centred position — no jump possible
    return {
      position: "fixed",
      top: vh / 2,
      left: vw / 2,
      width: expandedW,
      transform: `translate(-50%, -50%) rotate(0deg)`,
      transition: phase === "open"
        ? `top 440ms ${easing}, left 440ms ${easing}, width 440ms ${easing}, transform 440ms ${easing}`
        : "none",
      zIndex: 60,
    }
  }

  if (!mounted) return null

  const isOpen = phase === "open"
  const isClosing = phase === "closing"

  // The entire modal (backdrop + card) fades as one unit when closing
  const wrapperOpacity = isClosing ? 0 : 1

  return createPortal(
    <div
      className="fixed inset-0 z-50"
      style={{
        opacity: wrapperOpacity,
        transition: isClosing ? `opacity 360ms ${easing}` : undefined,
      }}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-rustic-red/70 backdrop-blur-md",
          "transition-opacity duration-[440ms]",
          phase === "start" ? "opacity-0" : "opacity-100"
        )}
        onClick={handleClose}
      />

      {/* Animated card */}
      <div style={getCardStyle()}>
        <div className="bg-merino-white rounded-xl overflow-hidden shadow-2xl">
          {/* Title row */}
          <button
            onClick={handleClose}
            aria-label="Sluiten"
            className="w-full px-6 pt-3.5 pb-3.5 flex items-center justify-between gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
          >
            <h3
              className="font-serif font-bold text-rustic-red uppercase text-xl whitespace-nowrap"
              style={{ lineHeight: 1, paddingTop: "6px" }}
            >
              {skill.title}
            </h3>
            <Plus
              size={26}
              strokeWidth={2.5}
              className="flex-shrink-0 text-rustic-red"
              style={{
                transition: "transform 440ms cubic-bezier(0.4,0,0.2,1)",
                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {/* Description */}
          <div
            className="grid"
            style={{
              gridTemplateRows: isOpen ? "1fr" : "0fr",
              transition: `grid-template-rows 440ms ${easing}`,
            }}
          >
            <div className="overflow-hidden">
              <p
                className="px-6 pb-3.5 pt-0 font-sans text-rustic-red/80 text-base leading-relaxed"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transition: `opacity 300ms ${easing}`,
                  transitionDelay: isOpen ? "80ms" : "0ms",
                }}
              >
                {skill.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── Desktop skill tag (positioned on image) ──────────────────────────────

function SkillTag({
  skill,
  onOpen,
  index,
  sectionVisible,
}: {
  skill: Skill
  onOpen: (rect: OriginRect) => void
  index: number
  sectionVisible: boolean
}) {
  const [isVisible, setIsVisible] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!sectionVisible) return
    const t = setTimeout(() => setIsVisible(true), 120 + index * 130)
    return () => clearTimeout(t)
  }, [sectionVisible, index])

  const handleClick = () => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    onOpen({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    })
  }

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={cn(
        "absolute flex items-center gap-3 px-6 py-3.5 bg-merino-white text-rustic-red font-serif font-bold",
        "text-xl uppercase rounded-xl cursor-pointer shadow-md",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
      )}
      style={{
        top: skill.position.top,
        left: skill.position.left,
        rotate: `${skill.rotation}deg`,
        opacity: isVisible ? 1 : 0,
        translate: isVisible ? "0 0" : "0 16px",
        transition: `opacity 500ms ease-out, translate 500ms ease-out, transform 350ms cubic-bezier(0.4,0,0.2,1)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)"
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"
      }}
    >
      <span style={{ lineHeight: 1, display: "block", paddingTop: "6px" }}>{skill.title}</span>
      <Plus size={18} strokeWidth={2.5} className="flex-shrink-0 self-center" />
    </button>
  )
}

// ─── Mobile accordion item ────────────────────────────────────────────────

function MobileSkillItem({
  skill,
  isOpen,
  onClick,
  index,
  parentVisible,
}: {
  skill: Skill
  isOpen: boolean
  onClick: () => void
  index: number
  parentVisible: boolean
}) {
  return (
    <div
      className="w-full bg-merino-white rounded-lg overflow-hidden shadow-sm"
      style={{
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 500ms cubic-bezier(0.4,0,0.2,1), transform 500ms cubic-bezier(0.4,0,0.2,1)`,
        transitionDelay: `${60 + index * 90}ms`,
      }}
    >
      <button
        onClick={onClick}
        className={cn(
          "w-full px-6 bg-merino-white text-rustic-red font-serif font-bold text-lg uppercase",
          "flex items-center justify-between gap-4",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
        )}
        style={{ paddingTop: "1.25rem", paddingBottom: "1.15rem" }}
      >
        <span style={{ lineHeight: 1, display: "block" }}>{skill.title}</span>
        <Plus
          size={20}
          strokeWidth={2.5}
          className="flex-shrink-0"
          style={{
            transition: "transform 500ms cubic-bezier(0.4,0,0.2,1)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {/* Grid trick for smooth height animation */}
      <div
        className="grid"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 550ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="overflow-hidden">
          <p
            className="px-5 pb-5 pt-1 font-sans text-rustic-red/80 text-sm leading-relaxed"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: "opacity 400ms cubic-bezier(0.4,0,0.2,1)",
              transitionDelay: isOpen ? "120ms" : "0ms",
            }}
          >
            {skill.description}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Mobile full-screen modal (portal) ───────────────────────────────────

function MobileModal({ skills, onClose }: { skills: Skill[], onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [openSkill, setOpenSkill] = useState<string | null>(null)

  // Total stagger duration: last item delay (60 + skills.length * 90) + animation duration (500ms)
  const staggerTotal = 60 + skills.length * 90 + 500

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 20)
    document.body.style.overflow = "hidden"
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ""
    }
  }, [])

  const handleClose = () => {
    // First fade out all items, then fade out backdrop
    setIsVisible(false)
    setIsClosing(true)
    setTimeout(onClose, staggerTotal)
  }

  // Backdrop fades in immediately on open, but on close waits for stagger to finish
  const backdropStyle: React.CSSProperties = isClosing
    ? {
        opacity: 0,
        transition: `opacity 400ms cubic-bezier(0.4,0,0.2,1) ${staggerTotal - 400}ms`,
      }
    : {
        opacity: isVisible ? 1 : 0,
        transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1)",
      }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
    >
      {/* Backdrop — fades in immediately, fades out after stagger completes */}
      <div
        className="absolute inset-0 bg-rustic-red/70 backdrop-blur-md"
        style={backdropStyle}
        onClick={handleClose}
      />

      {/* Skills list + close button — same gap throughout */}
      <div className="relative z-10 w-full max-w-sm flex flex-col gap-3">
        {skills.map((skill, index) => (
          <MobileSkillItem
            key={skill.id}
            skill={skill}
            isOpen={openSkill === skill.id}
            onClick={() =>
              setOpenSkill(openSkill === skill.id ? null : skill.id)
            }
            index={index}
            parentVisible={isVisible}
          />
        ))}

        {/* Close button — last in stagger: delay after final skill item */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 500ms cubic-bezier(0.4,0,0.2,1), transform 500ms cubic-bezier(0.4,0,0.2,1)`,
            transitionDelay: `${60 + skills.length * 90}ms`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleClose}
            aria-label="Sluiten"
            className={cn(
              "inline-flex items-center gap-2 bg-merino-white text-rustic-red font-sans text-base font-semibold uppercase rounded-full px-3.5 py-1.5 whitespace-nowrap",
              "transition-colors duration-200 hover:bg-ruby-red hover:text-merino-white",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
            )}
          >
            Sluiten
            <X size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── Mobile trigger button ────────────────────────────────────────────────

function MobileButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute bottom-5 left-1/2 -translate-x-1/2 md:hidden",
        "inline-flex items-center gap-2 bg-merino-white text-rustic-red font-sans text-base font-semibold uppercase rounded-full px-3.5 py-1.5 whitespace-nowrap",
        "transition-colors duration-200 hover:bg-ruby-red hover:text-merino-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
      )}
    >
      Creatieve stack
      <Plus size={16} strokeWidth={2} />
    </button>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────

export function SkillTags({ skills: sanitySkills }: SkillTagsProps) {
  const skills = sanitySkills.map(transformSkill)
  
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [origin, setOrigin] = useState<OriginRect | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal({
    threshold: 0.15,
    rootMargin: "0px 0px -5% 0px",
    once: true,
  })

  const handleTagOpen = useCallback((skill: Skill, rect: OriginRect) => {
    setOrigin(rect)
    setSelectedSkill(skill)
  }, [])

  return (
    <>
      {/* Desktop tags — positioned on the image */}
      <div ref={sectionRef as RefObject<HTMLDivElement>} className="hidden md:block absolute inset-0">
        {skills.map((skill, index) => (
          <SkillTag
            key={skill.id}
            skill={skill}
            index={index}
            sectionVisible={sectionVisible}
            onOpen={(rect) => handleTagOpen(skill, rect)}
          />
        ))}
      </div>

      {/* Mobile trigger */}
      <MobileButton onClick={() => setMobileOpen(true)} />

      {/* Desktop modal — renders in document.body via portal */}
      {selectedSkill && origin && (
        <DesktopModal
          skill={selectedSkill}
          origin={origin}
          onClose={() => {
            setSelectedSkill(null)
            setOrigin(null)
          }}
        />
      )}

      {/* Mobile modal — renders in document.body via portal */}
      {mobileOpen && <MobileModal skills={skills} onClose={() => setMobileOpen(false)} />}
    </>
  )
}
