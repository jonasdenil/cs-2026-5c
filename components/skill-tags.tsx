"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Skill {
  id: string
  title: string
  description: string
  position: { top: string; left: string }
  rotation: number
}

const skills: Skill[] = [
  {
    id: "social",
    title: "Social Strateeg",
    description:
      "Sterke online content begint met een sterk idee. Ik vertaal strategie naar creatieve concepten, formats en campagnes die mensen echt willen zien en delen.",
    position: { top: "72%", left: "58%" },
    rotation: 8,
  },
  {
    id: "merk",
    title: "Merkstrateeg",
    description:
      "Ik help merken en de mensen erachter hun stem vinden, zodat hun verhaal online even sterk klinkt als in het echt.",
    position: { top: "52%", left: "8%" },
    rotation: -6,
  },
  {
    id: "sparpartner",
    title: "Sparpartner",
    description:
      "Tijdens brainstorms schuif ik mee aan tafel met een frisse strategische blik en help ik nieuwe inzichten bovenhalen. En ook aan de zijlijn denk ik mee, via mail, telefoon of gewoon fysiek op kantoor.",
    position: { top: "68%", left: "28%" },
    rotation: -10,
  },
  {
    id: "workshop",
    title: "Workshop Facilitator",
    description:
      "De beste ideeën zitten vaak al in het team. Ik faciliteer workshops die inzichten bovenhalen en ideeën vertalen naar een duidelijke richting.",
    position: { top: "20%", left: "62%" },
    rotation: 4,
  },
]

// ─── Types ────────────────────────────────────────────────────────────────────

interface OriginRect {
  top: number
  left: number
  width: number
  height: number
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
  // Three animation phases: "start" → "moving" → "expanded"
  type Phase = "start" | "moving" | "expanded"
  const [phase, setPhase] = useState<Phase>("start")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Mount → next tick → start → move → expand
    setMounted(true)
    const t1 = setTimeout(() => setPhase("moving"), 20)
    const t2 = setTimeout(() => setPhase("expanded"), 450)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleClose = useCallback(() => {
    setPhase("moving")
    setTimeout(() => {
      setPhase("start")
      setTimeout(onClose, 350)
    }, 50)
  }, [onClose])

  // The card starts at the tag's bounding rect, centred to viewport during "moving/expanded"
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200
  const vh = typeof window !== "undefined" ? window.innerHeight : 800

  // Card dimensions (approximate collapsed pill size vs expanded)
  const cardW = phase === "expanded" ? Math.min(480, vw - 48) : origin.width
  const cardH = phase === "expanded" ? "auto" : origin.height

  const getStyle = (): React.CSSProperties => {
    if (phase === "start") {
      return {
        position: "fixed",
        top: origin.top,
        left: origin.left,
        width: origin.width,
        transform: `rotate(${skill.rotation}deg)`,
        transition: "none",
        zIndex: 60,
      }
    }
    if (phase === "moving") {
      return {
        position: "fixed",
        top: vh / 2,
        left: vw / 2,
        width: origin.width,
        transform: `translate(-50%, -50%) rotate(0deg)`,
        transition:
          "top 380ms cubic-bezier(0.4, 0, 0.2, 1), left 380ms cubic-bezier(0.4, 0, 0.2, 1), transform 380ms cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 60,
      }
    }
    // expanded
    return {
      position: "fixed",
      top: vh / 2,
      left: vw / 2,
      width: Math.min(480, vw - 48),
      transform: `translate(-50%, -50%) rotate(0deg)`,
      transition:
        "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: 60,
    }
  }

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-rustic-red/70 backdrop-blur-md",
          "transition-opacity duration-300",
          phase === "start" ? "opacity-0" : "opacity-100"
        )}
        onClick={handleClose}
      />

      {/* Animated card */}
      <div style={getStyle()}>
        <div
          className={cn(
            "bg-merino-white rounded-xl overflow-hidden",
            "shadow-2xl"
          )}
        >
          {/* Title row — always visible */}
          <div className="px-6 py-4">
            <h3 className="font-serif font-bold text-rustic-red uppercase text-xl md:text-2xl leading-tight">
              {skill.title}
            </h3>
          </div>

          {/* Description — only in expanded phase */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              phase === "expanded" ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <p className="px-6 pb-6 font-sans text-rustic-red/80 text-sm md:text-base leading-relaxed">
              {skill.description}
            </p>
          </div>
        </div>
      </div>

      {/* Close button — appears after expansion */}
      <button
        onClick={handleClose}
        aria-label="Sluiten"
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-[61]",
          "w-12 h-12 rounded-full border-2 border-merino-white",
          "flex items-center justify-center text-merino-white",
          "transition-all duration-300 ease-out",
          "hover:bg-merino-white hover:text-rustic-red",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red",
          phase === "expanded"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
        style={{
          // Position it below the centred card — approximate card height
          top: "calc(50% + 160px)",
          transitionDelay: phase === "expanded" ? "100ms" : "0ms",
        }}
      >
        <X size={22} strokeWidth={2} />
      </button>
    </div>,
    document.body
  )
}

// ─── Desktop skill tag (positioned on image) ──────────────────────────────

function SkillTag({
  skill,
  onOpen,
  index,
}: {
  skill: Skill
  onOpen: (rect: OriginRect) => void
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 120 + index * 110)
    return () => clearTimeout(t)
  }, [index])

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
        "absolute px-4 py-2 bg-merino-white text-rustic-red font-serif font-bold",
        "text-sm md:text-base uppercase rounded-xl cursor-pointer",
        "shadow-md hover:shadow-xl",
        "transition-all duration-200 hover:scale-105",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
      )}
      style={{
        top: skill.position.top,
        left: skill.position.left,
        rotate: `${skill.rotation}deg`,
        opacity: isVisible ? 1 : 0,
        translate: isVisible ? "0 0" : "0 16px",
        transition: `opacity 500ms ease-out, translate 500ms ease-out`,
      }}
    >
      {skill.title}
    </button>
  )
}

// ─── Mobile accordion item ────────────────────────────────────────────────

function MobileSkillItem({
  skill,
  isOpen,
  onClick,
  index,
}: {
  skill: Skill
  isOpen: boolean
  onClick: () => void
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 60 + index * 80)
    return () => clearTimeout(t)
  }, [index])

  return (
    <div
      className={cn(
        "w-full transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <button
        onClick={onClick}
        className={cn(
          "w-full px-5 py-4 bg-merino-white text-rustic-red font-serif font-bold text-base uppercase",
          "flex items-center justify-between",
          "transition-colors duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red",
          isOpen ? "rounded-t-xl" : "rounded-xl"
        )}
      >
        {skill.title}
        <Plus
          size={20}
          strokeWidth={2.5}
          className={cn(
            "flex-shrink-0 transition-transform duration-300",
            isOpen && "rotate-45"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-350 ease-out bg-merino-white rounded-b-xl",
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="px-5 pb-5 pt-1 font-sans text-rustic-red/80 text-sm leading-relaxed">
          {skill.description}
        </p>
      </div>
    </div>
  )
}

// ─── Mobile full-screen modal (portal) ───────────────────────────────────

function MobileModal({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const [openSkill, setOpenSkill] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 20)
    document.body.style.overflow = "hidden"
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ""
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center p-6",
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-rustic-red/90 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Skills list */}
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
          />
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        aria-label="Sluiten"
        className={cn(
          "relative z-10 mt-8 w-12 h-12 rounded-full border-2 border-merino-white",
          "flex items-center justify-center text-merino-white",
          "transition-all duration-500 ease-out",
          "hover:bg-merino-white hover:text-rustic-red",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: `${skills.length * 80 + 120}ms` }}
      >
        <X size={22} strokeWidth={2} />
      </button>
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
        "px-5 py-3 bg-merino-white text-rustic-red font-serif font-bold text-sm uppercase rounded-full",
        "flex items-center gap-2 shadow-lg",
        "transition-all duration-200 hover:scale-105",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
      )}
    >
      Mijn creatieve stack
      <Plus size={18} strokeWidth={2.5} />
    </button>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────

export function SkillTags() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [origin, setOrigin] = useState<OriginRect | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleTagOpen = useCallback((skill: Skill, rect: OriginRect) => {
    setOrigin(rect)
    setSelectedSkill(skill)
  }, [])

  return (
    <>
      {/* Desktop tags — positioned on the image */}
      <div className="hidden md:block absolute inset-0">
        {skills.map((skill, index) => (
          <SkillTag
            key={skill.id}
            skill={skill}
            index={index}
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
      {mobileOpen && <MobileModal onClose={() => setMobileOpen(false)} />}
    </>
  )
}
