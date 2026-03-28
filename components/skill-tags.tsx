"use client"

import { useState, useEffect } from "react"
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
    description: "Sterke online content begint met een sterk idee. Ik vertaal strategie naar creatieve concepten, formats en campagnes die mensen echt willen zien en delen.",
    position: { top: "72%", left: "58%" },
    rotation: 8,
  },
  {
    id: "merk",
    title: "Merkstrateeg",
    description: "Ik help merken en de mensen erachter hun stem vinden, zodat hun verhaal online even sterk klinkt als in het echt.",
    position: { top: "52%", left: "8%" },
    rotation: -6,
  },
  {
    id: "sparpartner",
    title: "Sparpartner",
    description: "Tijdens brainstorms schuif ik mee aan tafel met een frisse strategische blik en help ik nieuwe inzichten bovenhalen. En ook aan de zijlijn denk ik mee, via mail, telefoon of gewoon fysiek op kantoor.",
    position: { top: "68%", left: "28%" },
    rotation: -10,
  },
  {
    id: "workshop",
    title: "Workshop Facilitator",
    description: "De beste ideeën zitten vaak al in het team. Ik faciliteer workshops die inzichten bovenhalen en ideeën vertalen naar een duidelijke richting.",
    position: { top: "28%", left: "68%" },
    rotation: 4,
  },
]

// Desktop: Tag on the image
function SkillTag({ 
  skill, 
  onClick, 
  index 
}: { 
  skill: Skill
  onClick: () => void
  index: number 
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100 + index * 100)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute px-4 py-2 bg-merino-white text-rustic-red font-serif font-bold text-sm md:text-base uppercase rounded-sm cursor-pointer",
        "transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
      )}
      style={{
        top: skill.position.top,
        left: skill.position.left,
        transform: `rotate(${skill.rotation}deg) translateY(${isVisible ? 0 : 20}px)`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {skill.title}
    </button>
  )
}

// Desktop: Modal when a skill is clicked
function SkillModal({ 
  skill, 
  onClose 
}: { 
  skill: Skill
  onClose: () => void 
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-6",
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-rustic-red/80 backdrop-blur-md" />
      
      {/* Content */}
      <div 
        className={cn(
          "relative z-10 flex flex-col items-center gap-6 max-w-md text-center",
          "transition-all duration-300",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-merino-white text-3xl md:text-4xl font-bold uppercase">
          {skill.title}
        </h3>
        <p className="font-sans text-merino-white text-base md:text-lg leading-relaxed">
          {skill.description}
        </p>
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className={cn(
            "mt-4 w-12 h-12 rounded-full border-2 border-merino-white flex items-center justify-center",
            "text-merino-white transition-all duration-200",
            "hover:bg-merino-white hover:text-rustic-red",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red"
          )}
          aria-label="Sluiten"
        >
          <X size={24} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

// Mobile: Accordion item
function MobileSkillItem({ 
  skill, 
  isOpen, 
  onClick,
  index 
}: { 
  skill: Skill
  isOpen: boolean
  onClick: () => void
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50 + index * 80)
    return () => clearTimeout(timer)
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
          "w-full px-5 py-4 bg-merino-white text-rustic-red font-serif font-bold text-lg uppercase rounded-lg",
          "flex items-center justify-between",
          "transition-all duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red",
          isOpen && "rounded-b-none"
        )}
      >
        {skill.title}
        <Plus 
          size={20} 
          strokeWidth={2.5} 
          className={cn(
            "transition-transform duration-300",
            isOpen && "rotate-45"
          )}
        />
      </button>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out bg-merino-white rounded-b-lg",
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="px-5 pb-4 pt-0 font-sans text-rustic-red text-sm leading-relaxed">
          {skill.description}
        </p>
      </div>
    </div>
  )
}

// Mobile: Full modal with accordion
function MobileSkillsModal({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const [openSkill, setOpenSkill] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
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
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-sm flex flex-col gap-3">
        {skills.map((skill, index) => (
          <MobileSkillItem
            key={skill.id}
            skill={skill}
            isOpen={openSkill === skill.id}
            onClick={() => setOpenSkill(openSkill === skill.id ? null : skill.id)}
            index={index}
          />
        ))}
      </div>
      
      {/* Close button */}
      <button
        onClick={handleClose}
        className={cn(
          "relative z-10 mt-8 w-12 h-12 rounded-full border-2 border-merino-white flex items-center justify-center",
          "text-merino-white transition-all duration-200",
          "hover:bg-merino-white hover:text-rustic-red",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red",
          "transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: `${skills.length * 80 + 100}ms` }}
        aria-label="Sluiten"
      >
        <X size={24} strokeWidth={2} />
      </button>
    </div>
  )
}

// Mobile: Button that triggers the modal
function MobileSkillsButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden",
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

// Main export: container with desktop tags and mobile button
export function SkillTags() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [mobileModalOpen, setMobileModalOpen] = useState(false)

  return (
    <>
      {/* Desktop: Tags on the image */}
      <div className="hidden md:block">
        {skills.map((skill, index) => (
          <SkillTag
            key={skill.id}
            skill={skill}
            onClick={() => setSelectedSkill(skill)}
            index={index}
          />
        ))}
      </div>

      {/* Mobile: Single button */}
      <MobileSkillsButton onClick={() => setMobileModalOpen(true)} />

      {/* Desktop modal */}
      {selectedSkill && (
        <SkillModal 
          skill={selectedSkill} 
          onClose={() => setSelectedSkill(null)} 
        />
      )}

      {/* Mobile modal */}
      {mobileModalOpen && (
        <MobileSkillsModal onClose={() => setMobileModalOpen(false)} />
      )}
    </>
  )
}
