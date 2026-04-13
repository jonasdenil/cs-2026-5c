'use client'

import Image from "next/image"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { revealStyle } from "@/components/sections/who-section"
import type { SiteSettings } from "@/sanity/lib/types"

// Default fallback values when Sanity settings aren't available yet
const defaultFooter = {
  phone: '+32 476 35 36 77',
  email: 'hallo@charlotteschaerlaecken.be',
  instagram: '@c.schaerlaecken',
  formTitle: 'Or hit my pager',
  submitButtonText: 'Versturen',
}

function FloatingField({
  label,
  type = "text",
  value,
  onChange,
  required,
  rows,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  rows?: number
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0
  const isTextarea = type === "textarea"

  return (
    <div className="relative w-full">
      <label
        className={cn(
          "absolute left-0 font-sans uppercase tracking-widest text-merino-white/60 pointer-events-none",
          "transition-all duration-200 ease-in-out",
          lifted ? "text-[10px] top-0 text-merino-white/80" : "text-xs top-[18px]"
        )}
      >
        {label}
      </label>

      {isTextarea ? (
        <textarea
          value={value}
          required={required}
          rows={rows || 4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full bg-transparent border-b pb-2 pt-5 font-sans text-sm font-medium uppercase tracking-wider text-merino-white resize-none",
            "focus:outline-none transition-colors duration-200",
            focused ? "border-merino-white" : "border-merino-white/30"
          )}
        />
      ) : (
        <input
          type={type}
          value={value}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full bg-transparent border-b pb-2 pt-5 font-sans text-sm font-medium uppercase tracking-wider text-merino-white",
            "focus:outline-none transition-colors duration-200",
            focused ? "border-merino-white" : "border-merino-white/30"
          )}
        />
      )}
    </div>
  )
}

type FormStatus = "idle" | "loading" | "success" | "error"

function ContactForm({ settings }: { settings: SiteSettings | null }) {
  const [naam, setNaam] = useState("")
  const [email, setEmail] = useState("")
  const [boodschap, setBoodschap] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      if (!accessKey) {
        setErrorMsg("Web3Forms key is not configured.")
        setStatus("error")
        return
      }

      const formData = new FormData()
      formData.append("access_key", accessKey)
      formData.append("name", naam)
      formData.append("email", email)
      formData.append("message", boodschap)
      formData.append("from_email", email)
      formData.append("to_email", "charlotte.schaerlaecken@gmail.com")
      formData.append("from_name", naam)
      formData.append("subject", `New message from ${naam}`)
      formData.append("redirect", "https://charlotteschaerlaecken.be")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!data.success) {
        setErrorMsg(data.message || "Er liep iets mis.")
        setStatus("error")
        return
      }

      // Also save to Sanity
      try {
        await fetch("/api/contact-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ naam, email, boodschap }),
        })
      } catch (err) {
        console.error("[v0] Failed to save to Sanity:", err)
      }

      setStatus("success")
      setNaam("")
      setEmail("")
      setBoodschap("")
      setTimeout(() => setStatus("idle"), 3000)
    } catch (err) {
      setErrorMsg("Er liep iets mis. Probeer het opnieuw.")
      setStatus("error")
    }
  }

  const footer = settings?.footer ?? defaultFooter

  return (
    <div className="flex flex-col gap-8">
      <h3
        className="font-serif text-merino-white text-center md:text-left"
        style={{ fontSize: "clamp(1.2rem, 3.8vw, 2.4rem)", fontWeight: 240, lineHeight: "normal" }}
      >
        {footer.formTitle}
      </h3>

      {status === "success" ? (
        <p className="font-sans text-merino-white/70 text-xs uppercase tracking-widest">
          Bericht verzonden — ik neem zo snel mogelijk contact op.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <FloatingField label="Naam" value={naam} onChange={setNaam} required />
            <FloatingField label="E-mailadres" type="email" value={email} onChange={setEmail} required />
          </div>
          <FloatingField label="Bericht" type="textarea" value={boodschap} onChange={setBoodschap} required rows={4} />
          {status === "error" && (
            <p className="font-sans text-ruby-red text-xs uppercase tracking-widest -mt-2">{errorMsg}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "inline-flex items-center gap-2 bg-merino-white text-rustic-red rounded-full px-3.5 py-1.5",
                "font-sans text-base font-semibold uppercase whitespace-nowrap",
                "transition-colors duration-200 hover:bg-ruby-red hover:text-merino-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ruby-red",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {status === "loading" ? "Versturen..." : footer.submitButtonText}
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

function CameraImage({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={style}>
      <div style={{ transform: "rotate(81deg)" }}>
        <Image
          src="/images/camera.png"
          alt="Sony DSC-W130 camera"
          width={570}
          height={760}
          className="w-[360px] md:w-[480px] lg:w-[570px] h-auto drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  )
}

export function FooterWrapper({ settings }: { settings: SiteSettings | null }) {
  const year = new Date().getFullYear()
  const footer = settings?.footer ?? defaultFooter

  const { ref: ref0, isVisible: vis0 } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -5% 0px" })
  const { ref: ref1, isVisible: vis1 } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -5% 0px" })
  const { ref: ref2, isVisible: vis2 } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -5% 0px" })
  const { ref: cameraRef, isVisible: cameraVisible } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -5% 0px" })
  const { ref: formRef, isVisible: formVisible } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -5% 0px" })
  const { ref: mobileCameraRef, isVisible: mobileCameraVisible } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -5% 0px" })
  const { ref: copyrightRef, isVisible: copyrightVisible } = useScrollReveal({ threshold: 0.1, rootMargin: "0px 0px -5% 0px" })

  const contactRefs = [ref0, ref1, ref2]
  const contactVisibility = [vis0, vis1, vis2]

  const contactLinks = [
    { href: `tel:${footer.phone.replace(/\s+/g, "")}`, label: footer.phone, external: false },
    { href: `mailto:${footer.email}`, label: footer.email, external: false },
    { href: `https://www.instagram.com/${footer.instagram.replace("@", "")}/`, label: footer.instagram, external: true },
  ]

  return (
    <footer id="contact" className="bg-rustic-red w-full">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 pt-20 md:pt-28">
        <div className="flex flex-col items-center text-center leading-none gap-1">
          {contactLinks.map((link, i) => {
            const reveal = revealStyle(contactVisibility[i], i * 120)
            const mergedTransition = reveal.transition
              ? `${reveal.transition}, color 500ms cubic-bezier(0.4, 0, 0.2, 1)`
              : "color 500ms cubic-bezier(0.4, 0, 0.2, 1)"

            return (
              <a
                key={link.href}
                ref={contactRefs[i] as React.RefObject<HTMLAnchorElement>}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="font-serif text-merino-white font-bold uppercase text-balance hover:text-coral-reef"
                style={{
                  fontSize: "clamp(1.1rem, 3.8vw, 3.8rem)",
                  lineHeight: 1.05,
                  ...reveal,
                  transition: mergedTransition,
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-12 md:gap-20 lg:gap-28">
          <CameraImage
            className="hidden md:flex justify-start mt-[81px] z-10"
            style={revealStyle(cameraVisible)}
          />
          <div
            ref={cameraRef as React.RefObject<HTMLDivElement>}
            className="hidden md:block absolute pointer-events-none"
            aria-hidden="true"
          />

          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className="pt-12 md:pt-28 pb-8"
            style={revealStyle(formVisible)}
          >
            <ContactForm settings={settings} />
          </div>
        </div>
      </div>

      <div
        ref={mobileCameraRef as React.RefObject<HTMLDivElement>}
        className="md:hidden flex justify-center mt-16 px-6"
        style={revealStyle(mobileCameraVisible)}
      >
        <CameraImage className="flex justify-center" />
      </div>

      <div
        ref={copyrightRef as React.RefObject<HTMLDivElement>}
        className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 pt-20 md:pt-32 py-6 pb-32"
      >
        <div className="relative flex items-center justify-between">
          <span
            className="font-sans text-merino-white text-xs sm:text-sm md:text-base font-medium uppercase max-w-[30%] md:max-w-none leading-tight"
            style={revealStyle(copyrightVisible, 0)}
          >
            Charlotte<br className="md:hidden" /> Schaerlaecken
          </span>

          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={revealStyle(copyrightVisible, 150)}
          >
            <Image
              src="/images/cs-monogram.svg"
              alt="CS Monogram - Charlotte Schaerlaecken"
              width={140}
              height={56}
              className="h-8 sm:h-10 md:h-14 w-auto"
            />
          </div>

          <span
            className="font-sans text-merino-white text-xs sm:text-sm md:text-base font-medium uppercase"
            style={revealStyle(copyrightVisible, 300)}
          >
            &copy; {year}
          </span>
        </div>
      </div>
    </footer>
  )
}
