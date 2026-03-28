"use client"

import Image from "next/image"

export function WhoSection() {
  return (
    <section id="who" className="w-full">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16">
        <div className="w-full overflow-hidden" style={{ borderRadius: "12px" }}>
          <Image
            src="/images/who-photo.jpeg"
            alt="Charlotte Schaerlaecken leest 'Start With Why' van Simon Sinek naast een gele typemachine"
            width={2560}
            height={1440}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}
