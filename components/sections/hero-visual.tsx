import Image from "next/image"

export function HeroVisual() {
  return (
    <div id="hero-visual" className="relative w-full flex items-center justify-center">

      {/* H1 title — behind the TV, full container width, not rotated */}
      <h1
        className="absolute inset-x-0 font-serif text-merino-white text-center uppercase w-full z-0 leading-none"
        style={{
          fontSize: "clamp(48px, 10vw, 118px)",
          fontWeight: 240,
        }}
      >
        creatief strateeg<br />
        all things social
      </h1>

      {/* TV — rotated 9deg, sits on top of text */}
      <div
        className="relative z-10 pointer-events-none"
        style={{ transform: "rotate(9deg)" }}
      >
        <Image
          src="/images/tv.png"
          alt="Charlotte Schaerlaecken in een vintage televisie"
          width={1400}
          height={1050}
          priority
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}
