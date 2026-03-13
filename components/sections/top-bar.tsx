import Image from "next/image"

export function TopBar() {
  return (
    <header id="top-bar" className="relative pt-10 pb-6">
      <div className="flex items-center justify-between">
        {/* Left: Name — hidden on mobile */}
        <span className="hidden md:block font-sans text-merino-white text-xs sm:text-sm md:text-base font-medium uppercase">
          Charlotte Schaerlaecken
        </span>

        {/* Center: CS Monogram — absolutely centered within the header */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/images/cs-monogram.svg"
            alt="CS Monogram - Charlotte Schaerlaecken"
            width={140}
            height={56}
            priority
            className="h-8 sm:h-10 md:h-14 w-auto"
          />
        </div>

        {/* Right: Title — hidden on mobile */}
        <span className="hidden md:block font-sans text-merino-white text-xs sm:text-sm md:text-base font-medium uppercase text-right">
          Creatief Strateeg
        </span>
      </div>
    </header>
  )
}
