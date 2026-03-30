"use client"

import Image from "next/image"

// CMS-ready interface - these props will be populated from CMS in the future
interface CaseCardProps {
  /** Filename displayed in the MacOS-style title bar (will come from CMS) */
  fileName?: string
  /** Title of the case displayed on the image (will come from CMS) */
  title?: string
  /** Short description of the case (will come from CMS) */
  description?: string
  /** Background image URL (will come from CMS) */
  imageUrl?: string
}

export function CaseCard({
  fileName = "Bednet_Final_ReallyFinal_v3",
  title = "Bednet",
  description = "some short description of the project to give people an idea on what the project is about",
  imageUrl = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
}: CaseCardProps) {
  return (
    <div className="rounded-md overflow-hidden flex flex-col">
      {/* MacOS-style title bar */}
      <div
        className="relative flex items-center h-10 px-3"
        style={{
          backgroundImage: "url('/images/case-body.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Three MacOS window buttons */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/bolletje.svg"
            alt=""
            width={14}
            height={14}
            className="w-5 h-5"
          />
          <Image
            src="/images/bolletje.svg"
            alt=""
            width={14}
            height={14}
            className="w-5 h-5"
          />
          <Image
            src="/images/bolletje.svg"
            alt=""
            width={14}
            height={14}
            className="w-5 h-5"
          />
        </div>

        {/* Centered filename */}
        <span
          className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
          style={{
            color: "#333",
            fontFamily: '"Lucida Grande", sans-serif',
            fontSize: "clamp(10px, 1.8vw, 14px)",
            fontWeight: 500,
          }}
        >
          {fileName}
        </span>
      </div>

      {/* Image section with overlay and content */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Background image */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />

        {/* 40% black overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          {/* Case title */}
          <h3
            className="font-serif text-merino-white text-center"
            style={{
              fontSize: "clamp(2rem, 6vw, 55px)",
              fontWeight: 240,
              lineHeight: 1,
            }}
          >
            {title}
          </h3>

          {/* Short description */}
          <p
            className="mt-4 text-merino-white text-center uppercase max-w-md"
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: "clamp(12px, 2vw, 18px)",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
        </div>

        {/* Collaboration info — bottom center */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center">
          <p
            className="text-merino-white text-center uppercase"
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: "clamp(8px, 1.2vw, 12px)",
              fontWeight: 400,
              letterSpacing: "0.05em",
              lineHeight: 1.2,
            }}
          >
            in samenwerking met
          </p>
          <h4
            className="font-serif text-merino-white text-center mt-1"
            style={{
              fontSize: "clamp(16px, 2.5vw, 28px)",
              fontWeight: 240,
              lineHeight: 1,
            }}
          >
            CHOOCHOO
          </h4>
        </div>
      </div>
    </div>
  )
}
