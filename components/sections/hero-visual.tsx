import Image from "next/image"

export function HeroVisual() {
  return (
    /*
     * Stacking context:
     * - h1 text sits at z-0 (behind the TV)
     * - TV image sits at z-10 (on top of the text)
     * The wrapper is relative so the TV can be centered via flex,
     * and the h1 is absolute to fill the same space.
     */
    <div id="hero-visual" className="relative flex items-center justify-center pb-8">

      {/* Background text layer — full container width, behind TV */}
      <h1
        className="absolute inset-0 z-0 flex flex-col items-center justify-center font-serif text-merino-white text-center uppercase leading-none w-full"
        style={{
          fontSize: "clamp(3rem, 10vw, 9rem)",
          fontWeight: 700,
        }}
      >
        <span>Creatief Strateeg</span>
        <span>All Things Social</span>
      </h1>

      {/* TV image — on top of the text */}
      <div className="relative z-10" style={{ transform: "rotate(9deg)" }}>
        <Image
          src="/images/tv.png"
          alt="Charlotte Schaerlaecken in een vintage televisie"
          width={1400}
          height={1050}
          priority
          className="w-full md:w-3/4 lg:w-1/2 mx-auto h-auto"
        />
      </div>

    </div>
  )
}
