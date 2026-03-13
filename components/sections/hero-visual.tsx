import Image from "next/image"
import { Phone } from "lucide-react"

export function HeroVisual() {
  return (
    <div id="hero-visual" className="pt-8">

      {/* TV + Title stacking block */}
      <div className="relative flex items-center justify-center">

        {/* TV image — behind the text */}
        <div className="relative z-0 w-full md:w-3/4 lg:w-1/2 mx-auto" style={{ transform: "rotate(9deg)" }}>
          <Image
            src="/images/tv.png"
            alt="Charlotte Schaerlaecken in een vintage televisie"
            width={1400}
            height={1050}
            priority
            className="w-full h-auto"
          />
        </div>

        {/* Title — on top of the TV */}
        <h1
          className="absolute inset-0 z-10 flex flex-col items-center justify-center font-serif text-merino-white text-center uppercase leading-none pointer-events-none"
          style={{ fontSize: "90px", fontWeight: 700 }}
        >
          <span>Creatief Strateeg</span>
          <span>All Things Social</span>
        </h1>
      </div>

      {/* Intro text + CTA */}
      <div className="flex flex-col items-center gap-5 pt-10 pb-24">
        <p
          className="font-sans text-merino-white text-center uppercase max-w-lg"
          style={{ fontSize: "18px", fontWeight: 400, lineHeight: "normal" }}
        >
          Scroll-stopping content? That&apos;s not luck, it&apos;s strategy.
          <br />
          From tone to timing — I help your brand own the feed.
        </p>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-ruby-red text-rustic-red font-sans text-base font-medium uppercase rounded-full px-3.5 py-1.5 transition-colors duration-200 hover:bg-[#c40a19] focus:outline-none focus:ring-2 focus:ring-ruby-red focus:ring-offset-2 focus:ring-offset-rustic-red"
        >
          <Phone size={16} strokeWidth={2} />
          Hit My Pager
        </a>
      </div>

    </div>
  )
}
