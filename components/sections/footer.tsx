"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Floating Label Field ─────────────────────────────────────────────────────

function FloatingField({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  return (
    <div className="relative w-full">
      {/* Floating label */}
      <label
        className={cn(
          "absolute left-0 font-sans uppercase tracking-widest text-merino-white/60 pointer-events-none",
          "transition-all duration-200 ease-in-out",
          lifted
            ? "text-[10px] top-0 text-merino-white/80"
            : "text-xs top-[18px]"
        )}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full bg-transparent border-b pb-2 pt-5 font-sans text-sm uppercase tracking-wider text-merino-white",
          "focus:outline-none transition-colors duration-200",
          focused ? "border-merino-white" : "border-merino-white/30"
        )}
      />
    </div>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

type FormStatus = "idle" | "loading" | "success" | "error"

function ContactForm() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naam, email, boodschap }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || "Er liep iets mis.")
        setStatus("error")
        return
      }

      setStatus("success")
      setNaam("")
      setEmail("")
      setBoodschap("")
    } catch {
      setErrorMsg("Er liep iets mis. Probeer het opnieuw.")
      setStatus("error")
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Form heading — Bolota, as per design spec */}
      <h3
        className="font-serif text-merino-white text-center"
        style={{ fontSize: "38px", fontWeight: 240, lineHeight: "normal" }}
      >
        Or hit my pager
      </h3>

      {status === "success" ? (
        <p className="font-sans text-merino-white/70 text-xs uppercase tracking-widest">
          Bericht verzonden — ik neem zo snel mogelijk contact op.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Row: Naam + E-mailadres */}
          <div className="flex flex-col sm:flex-row gap-6">
            <FloatingField
              label="Naam"
              value={naam}
              onChange={setNaam}
              required
            />
            <FloatingField
              label="E-mailadres"
              type="email"
              value={email}
              onChange={setEmail}
              required
            />
          </div>

          {/* Boodschap */}
          <FloatingField
            label="Bericht"
            value={boodschap}
            onChange={setBoodschap}
            required
          />

          {/* Error */}
          {status === "error" && (
            <p className="font-sans text-ruby-red text-xs uppercase tracking-widest -mt-2">
              {errorMsg}
            </p>
          )}

          {/* Submit — same rounded-full CTA as used elsewhere in the site */}
          <div>
            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "inline-flex items-center gap-2 bg-merino-white text-rustic-red rounded-full px-5 py-2",
                "font-sans text-xs sm:text-sm uppercase tracking-widest font-medium",
                "transition-colors duration-200 hover:bg-tea-rose",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {status === "loading" ? "Versturen..." : "Versturen"}
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-rustic-red w-full">

      {/* ── Contact info block ── */}
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 pt-20 md:pt-28">
        <div className="flex flex-col items-center text-center leading-none">
          <a
            href="tel:+32476353677"
            className="font-serif text-merino-white font-bold uppercase text-balance hover:text-tea-rose transition-colors duration-200"
            style={{ fontSize: "clamp(1.2rem, 3.8vw, 3.8rem)", lineHeight: 1.05 }}
          >
            +32 476 35 36 77
          </a>
          <a
            href="mailto:hallo@charlotteschaerlaecken.be"
            className="font-serif text-merino-white font-bold uppercase text-balance hover:text-tea-rose transition-colors duration-200"
            style={{ fontSize: "clamp(1.2rem, 3.8vw, 3.8rem)", lineHeight: 1.05 }}
          >
            hallo@charlotteschaerlaecken.be
          </a>
          <a
            href="https://www.instagram.com/c.schaerlaecken/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-merino-white font-bold uppercase text-balance hover:text-tea-rose transition-colors duration-200"
            style={{ fontSize: "clamp(1.2rem, 3.8vw, 3.8rem)", lineHeight: 1.05 }}
          >
            @c.schaerlaecken
          </a>
        </div>
      </div>

      {/* ── Camera + Contact form block ── */}
      {/*
        50/50 grid: left col = camera, right col = form.
        Camera overlaps the contact-info block above via negative top margin.
        The right column aligns with the second half of the max-w-screen-xl container.
      */}
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 items-start">

          {/* Left col — camera, overlapping up */}
          <div className="flex justify-center md:justify-start -mt-20 md:-mt-40 z-10">
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

          {/* Right col — form, starts at second column */}
          <div className="pt-12 md:pt-28 pb-8">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* ── Bottom bar — mirrors top-bar exactly ── */}
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 pt-20 md:pt-32 py-6 pb-32">
        <div className="relative flex items-center justify-between">
          {/* Left */}
          <span className="font-sans text-merino-white text-xs sm:text-sm md:text-base font-medium uppercase">
            Charlotte Schaerlaecken
          </span>

          {/* Center — absolutely positioned, same as top-bar */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/cs-monogram.svg"
              alt="CS Monogram - Charlotte Schaerlaecken"
              width={140}
              height={56}
              className="h-8 sm:h-10 md:h-14 w-auto"
            />
          </div>

          {/* Right */}
          <span className="font-sans text-merino-white text-xs sm:text-sm md:text-base font-medium uppercase">
            &copy; {year}
          </span>
        </div>
      </div>

    </footer>
  )
}
