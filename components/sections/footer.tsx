"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Contact Form ────────────────────────────────────────────────────────────

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

  const inputBase =
    "w-full bg-transparent border-b border-merino-white/40 pb-2 text-merino-white font-sans text-sm uppercase tracking-wider placeholder:text-merino-white/40 focus:outline-none focus:border-merino-white transition-colors duration-200"

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-serif text-merino-white text-xl md:text-2xl uppercase font-bold tracking-wide">
        Of stuur een bericht
      </h2>

      {status === "success" ? (
        <p className="font-sans text-merino-white/80 text-sm uppercase tracking-wider">
          Bericht verzonden — ik neem zo snel mogelijk contact op.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Row: Naam + E-mailadres */}
          <div className="flex flex-col sm:flex-row gap-6">
            <input
              type="text"
              placeholder="Naam"
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              required
              className={cn(inputBase, "flex-1")}
            />
            <input
              type="email"
              placeholder="E-mailadres"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cn(inputBase, "flex-1")}
            />
          </div>

          {/* Bericht */}
          <input
            type="text"
            placeholder="Bericht"
            value={boodschap}
            onChange={(e) => setBoodschap(e.target.value)}
            required
            className={inputBase}
          />

          {/* Error */}
          {status === "error" && (
            <p className="font-sans text-ruby-red text-xs uppercase tracking-wider -mt-2">
              {errorMsg}
            </p>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "inline-flex items-center gap-2 border border-merino-white rounded-full px-5 py-2",
                "font-sans text-merino-white text-sm uppercase tracking-widest font-medium",
                "transition-all duration-200 hover:bg-merino-white hover:text-rustic-red",
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

// ─── Footer ──────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-rustic-red w-full">
      {/* ── Contact info block ── */}
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 pt-20 md:pt-28">
        <div className="flex flex-col items-center text-center gap-0 leading-none">
          {/* Phone */}
          <a
            href="tel:+32476353677"
            className="font-serif text-merino-white font-bold uppercase text-balance hover:text-tea-rose transition-colors duration-200"
            style={{ fontSize: "clamp(2.2rem, 7vw, 7rem)", lineHeight: 1.05 }}
          >
            +32 476 35 36 77
          </a>

          {/* Email */}
          <a
            href="mailto:hallo@charlotteschaerlaecken.be"
            className="font-serif text-merino-white font-bold uppercase text-balance hover:text-tea-rose transition-colors duration-200"
            style={{ fontSize: "clamp(1.4rem, 4.5vw, 4.5rem)", lineHeight: 1.05 }}
          >
            hallo@charlotteschaerlaecken.be
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/c.schaerlaecken/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-merino-white font-bold uppercase text-balance hover:text-tea-rose transition-colors duration-200"
            style={{ fontSize: "clamp(1.8rem, 5.5vw, 5.5rem)", lineHeight: 1.05 }}
          >
            @c.schaerlaecken
          </a>
        </div>
      </div>

      {/* ── Camera + Contact form block ── */}
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16">
        {/* Negative margin-top pulls the camera up to overlap the last text line */}
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16 -mt-6 md:-mt-12">

          {/* Camera — rotated, overlapping */}
          <div
            className="relative flex-shrink-0 w-[260px] md:w-[340px] lg:w-[420px] self-start"
            style={{ transform: "rotate(-9deg)" }}
          >
            <Image
              src="/images/camera.png"
              alt="Sony DSC-W130 camera"
              width={420}
              height={560}
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>

          {/* Contact form — vertically centered next to camera */}
          <div className="flex-1 self-center pt-16 md:pt-24 pb-16 md:pb-24">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* ── Bottom bar — mirrors top-bar ── */}
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 py-6 border-t border-merino-white/10">
        <div className="relative flex items-center justify-between">
          {/* Left */}
          <span className="font-sans text-merino-white text-xs sm:text-sm uppercase tracking-widest">
            Charlotte Schaerlaecken
          </span>

          {/* Center — absolutely centered */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/cs-monogram.svg"
              alt="CS Monogram - Charlotte Schaerlaecken"
              width={56}
              height={56}
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </div>

          {/* Right */}
          <span className="font-sans text-merino-white text-xs sm:text-sm uppercase tracking-widest">
            &copy; {year}
          </span>
        </div>
      </div>
    </footer>
  )
}
