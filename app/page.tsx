import { TopBar } from "@/components/sections/top-bar"
import { HeroVisual } from "@/components/sections/hero-visual"

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative flex flex-col">
        <TopBar />

        {/* Hero visual: TV centered in remaining viewport height */}
        <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden">
          <HeroVisual />
        </div>
      </section>

      {/* Additional sections will be added below */}
    </main>
  )
}
