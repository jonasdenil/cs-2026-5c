import Image from "next/image"

export function TopBar() {
  return (
    <header
      id="top-bar"
      className="w-full bg-rustic-red py-4 px-6 md:px-12 lg:px-20"
    >
      <div className="flex items-center justify-between">
        {/* Left: Name */}
        <span className="font-serif text-merino-white text-sm md:text-base tracking-widest uppercase">
          Charlotte Schaerlaecken
        </span>

        {/* Center: CS Monogram */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/images/cs-monogram.svg"
            alt="CS Monogram - Charlotte Schaerlaecken"
            width={140}
            height={56}
            priority
            className="h-10 md:h-14 w-auto"
          />
        </div>

        {/* Right: Title */}
        <span className="font-serif text-merino-white text-sm md:text-base tracking-widest uppercase">
          Creatief Strateeg
        </span>
      </div>
    </header>
  )
}
