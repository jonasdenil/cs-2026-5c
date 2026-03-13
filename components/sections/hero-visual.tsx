import Image from "next/image"

export function HeroVisual() {
  return (
    <div
      id="hero-visual"
      className="relative flex items-center justify-center"
      style={{ transform: "rotate(9deg)" }}
    >
      <Image
        src="/images/tv.png"
        alt="Charlotte Schaerlaecken in een vintage televisie"
        width={1400}
        height={1050}
        priority
        className="w-[50vw] h-auto"
      />

      {/* Overlay title - not rotated */}
      <h1
        className="absolute font-serif text-merino-white text-center"
        style={{
          fontSize: "118px",
          fontWeight: 240,
          transform: "rotate(-9deg)",
          lineHeight: "1.2",
          maxWidth: "90%",
        }}
      >
        creatief strateeg<br />
        all things social
      </h1>
    </div>
  )
}
