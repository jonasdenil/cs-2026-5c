import { TopBar } from "@/components/sections/top-bar"
import { HeroVisual } from "@/components/sections/hero-visual"
import { WhoSection } from "@/components/sections/who-section"
import { CasesSection } from "@/components/sections/cases-section"
import { Footer } from "@/components/sections/footer"
import { BottomNav } from "@/components/sections/bottom-nav"
import { PageWrapper } from "@/components/page-wrapper"

export default function Home() {
  return (
    <PageWrapper>
      <main id="main-content" className="min-h-screen bg-rustic-red">
        {/* Shared container: max-width, centered, full-width padding */}
        <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16">

          {/* Hero Section */}
          <section id="hero">
            <TopBar />
            <HeroVisual />
          </section>

        </div>

        {/* Who Section - renders with Sanity skills data */}
        <WhoSection />

        {/* Cases Section - renders with Sanity cases data */}
        <CasesSection />

        {/* Footer */}
        <Footer />

        {/* Sticky bottom navigation */}
        <BottomNav />
      </main>
    </PageWrapper>
  )
}
