"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// Shared reveal style — use on any element that should fade-in from bottom
function revealStyle(isVisible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  }
}

export function WhoSection() {
  const { ref: photoRef, isVisible: photoVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: textRef, isVisible: textVisible } = useScrollReveal({ threshold: 0.2, delay: 200 })

  return (
    <section id="who" className="w-full">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 flex flex-col gap-16 md:gap-24">

        {/* Wide photo */}
        <div
          ref={photoRef as React.RefObject<HTMLDivElement>}
          className="w-full overflow-hidden"
          style={{ borderRadius: "12px", ...revealStyle(photoVisible) }}
        >
          <Image
            src="/images/who-photo.jpeg"
            alt="Charlotte Schaerlaecken leest 'Start With Why' van Simon Sinek naast een gele typemachine"
            width={2560}
            height={1440}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* 50/50 title + text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-24">

          {/* Left: Title */}
          <div
            ref={titleRef as React.RefObject<HTMLDivElement>}
            style={revealStyle(titleVisible)}
          >
            <h2
              className="font-serif text-merino-white uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700 }}
            >
              Mijn creatieve stack
            </h2>
          </div>

          {/* Right: Text */}
          <div
            ref={textRef as React.RefObject<HTMLDivElement>}
            style={revealStyle(textVisible, 200)}
          >
            <p className="font-sans text-merino-white leading-relaxed" style={{ fontSize: "1rem", fontWeight: 400 }}>
              Hi there, it&apos;s me! 26-jarige internet-raised strateeg, altijd op zoek naar het volgende aha-moment.
              <br /><br />
              Ik ontleed graag campagnes: waarom werkt het, wat zit erachter en wat kan beter? Vanuit online communities en niches haal ik inzichten die ik vertaal naar strategieën, concepten en verhalen die mensen willen blijven kijken. In omgevingen waar ideeën snel bewegen ben ik op mijn gemak. Brainstorms, workshops en samen bouwen met andere creatieven. Met een scherp oog voor trends, een neus voor onverwachte invalshoeken en een sterke organisatorische blik.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
