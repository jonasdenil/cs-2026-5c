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
  // Two phases: "start" (at tag) → "open" (centred + expanded, simultaneously)
  type Phase = "start" | "open" | "closing"
  const [phase, setPhase] = useState<Phase>("start")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // One tick to paint the start position, then immediately transition to open
    const t1 = setTimeout(() => setPhase("open"), 20)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleClose = useCallback(() => {
    setPhase("closing")
    setTimeout(onClose, 400)
  }, [onClose])

  const vw = typeof window !== "undefined" ? window.innerWidth : 1200
  const vh = typeof window !== "undefined" ? window.innerHeight : 800
  const expandedW = Math.min(480, vw - 48)

  const getCardStyle = (): React.CSSProperties => {
    const easing = "cubic-bezier(0.4, 0, 0.2, 1)"
    const duration = "420ms"

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

    if (phase === "closing") {
      return {
        position: "fixed",
        top: origin.top + origin.height / 2,
        left: origin.left + origin.width / 2,
        width: origin.width,
        transform: `translate(-50%, -50%) rotate(${skill.rotation}deg)`,
        transition: `top ${duration} ${easing}, left ${duration} ${easing}, width ${duration} ${easing}, transform ${duration} ${easing}`,
        zIndex: 60,
      }
    }

    // "open" — move to centre and expand width simultaneously
    return {
      position: "fixed",
      top: vh / 2,
      left: vw / 2,
      width: expandedW,
      transform: `translate(-50%, -50%) rotate(0deg)`,
      transition: `top ${duration} ${easing}, left ${duration} ${easing}, width ${duration} ${easing}, transform ${duration} ${easing}`,
      zIndex: 60,
    }
  }

  if (!mounted) return null

  const isOpen = phase === "open"
  const isClosing = phase === "closing"

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-rustic-red/70 backdrop-blur-md",
          "transition-opacity duration-400",
          phase === "start" || isClosing ? "opacity-0" : "opacity-100"
        )}
        onClick={handleClose}
      />

      {/* Animated card */}
      <div style={getCardStyle()}>
        <div className="bg-merino-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Title row with close icon */}
          <button
            onClick={handleClose}
            aria-label="Sluiten"
            className="w-full px-7 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
          >
            <h3
              className="font-serif font-bold text-rustic-red uppercase text-lg whitespace-nowrap"
              style={{ lineHeight: 1 }}
            >
              {skill.title}
            </h3>
            <Plus
              size={24}
              strokeWidth={2.5}
              className="flex-shrink-0 text-rustic-red self-center"
              style={{
                transition: "transform 420ms cubic-bezier(0.4,0,0.2,1)",
                transform: isOpen && !isClosing ? "rotate(45deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {/* Description — slides open simultaneously with movement */}
          <div
            className="overflow-hidden"
            style={{
              maxHeight: isOpen && !isClosing ? "300px" : "0px",
              opacity: isOpen && !isClosing ? 1 : 0,
              transition: "max-height 420ms cubic-bezier(0.4,0,0.2,1), opacity 300ms ease-out",
            }}
          >
            <p className="px-7 pb-7 pt-0 font-sans text-rustic-red/80 text-base leading-relaxed">
              {skill.description}
            </p>
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
        "absolute flex items-center gap-2.5 px-5 py-3 bg-merino-white text-rustic-red font-serif font-bold",
        "text-lg uppercase rounded-2xl cursor-pointer shadow-md",
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
      <span style={{ lineHeight: 1, display: "block" }}>{skill.title}</span>
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
}: {
  skill: Skill
  isOpen: boolean
  onClick: () => void
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 60 + index * 90)
    return () => clearTimeout(t)
  }, [index])

  return (
    <div
      className="w-full bg-merino-white rounded-xl overflow-hidden shadow-sm"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 500ms cubic-bezier(0.4,0,0.2,1), transform 500ms cubic-bezier(0.4,0,0.2,1)`,
        transitionDelay: `${index * 90}ms`,
      }}
    >
      <button
        onClick={onClick}
        className={cn(
          "w-full px-5 bg-merino-white text-rustic-red font-serif font-bold text-base uppercase",
          "flex items-center justify-between gap-4",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
        )}
        style={{ paddingTop: "1.1rem", paddingBottom: "1rem" }}
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
