import { TopBar } from "@/components/sections/top-bar"
import { HeroVisual } from "@/components/sections/hero-visual"

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-rustic-red">
      {/* Shared max-width container for topbar + hero */}
      <div className="mx-auto w-full max-w-screen-2xl">

        {/* Hero Section */}
        <section id="hero" className="relative flex flex-col">
          <TopBar />

          {/* Hero visual area */}
          <div className="relative flex items-center justify-center py-8 md:py-12 overflow-visible">
            {/* TV container: responsive widths */}
            <div className="w-full sm:w-[75%] md:w-[60%] xl:w-[50%]">
              <HeroVisual />
            </div>
          </div>
        </section>

      </div>

      {/* Additional sections will be added below */}
    </main>
  )
}
