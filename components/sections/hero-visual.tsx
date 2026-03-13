import Image from "next/image"

export function HeroVisual() {
  return (
    /*
     * Stacking context:
     * - TV image sits at z-0 (behind the text)
     * - h1 text sits at z-10 (on top of the TV)
     * The wrapper takes the remaining viewport height after the topbar
     * so the whole block is vertically centered.
     */
    <div
      id="hero-visual"
      className="relative flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      {/* TV image — behind the text */}
      <div className="relative z-0" style={{ transform: "rotate(9deg)" }}>
        <Image
          src="/images/tv.png"
          alt="Charlotte Schaerlaecken in een vintage televisie"
          width={1400}
          height={1050}
          priority
          className="w-full md:w-3/4 lg:w-1/2 mx-auto h-auto"
        />
      </div>

      {/* Text layer — on top of the TV */}
      <h1
        className="absolute inset-0 z-10 flex flex-col items-center justify-center font-serif text-merino-white text-center uppercase leading-none pointer-events-none"
        style={{ fontSize: "90px", fontWeight: 700 }}
      >
        <span>Creatief Strateeg</span>
        <span>All Things Social</span>
      </h1>
    </div>
  )
}
