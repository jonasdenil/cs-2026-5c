import { TopBar } from "@/components/sections/top-bar"
import { HeroVisual } from "@/components/sections/hero-visual"
import { BottomNav } from "@/components/sections/bottom-nav"

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-rustic-red">
      {/* Shared container: max-width, centered, full-width padding */}
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16">

        {/* Hero Section */}
        <section id="hero">
          <TopBar />
          <HeroVisual />
        </section>

      </div>

      {/* Sticky bottom navigation */}
      <BottomNav />

      {/* Additional sections will be added below */}
    </main>
  )
}
