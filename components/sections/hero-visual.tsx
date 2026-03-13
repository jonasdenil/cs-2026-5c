import Image from "next/image"

export function HeroVisual() {
  return (
    <div
      id="hero-visual"
      className="flex items-center justify-center"
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
    </div>
  )
}
