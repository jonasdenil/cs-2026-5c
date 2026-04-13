import { TopBar } from "@/components/sections/top-bar"
import { HeroVisualWrapper } from "@/components/sections/hero-visual-wrapper"
import { WhoSection } from "@/components/sections/who-section"
import { CasesSection } from "@/components/sections/cases-section"
import { FooterWrapper } from "@/components/sections/footer-wrapper"
import { BottomNavWrapper } from "@/components/sections/bottom-nav-wrapper"
import { PageWrapper } from "@/components/page-wrapper"
import { getSiteSettings } from "@/sanity/lib/fetchers"

// Force dynamic rendering so Sanity changes appear immediately
export const dynamic = 'force-dynamic'

export default async function Home() {
  const settings = await getSiteSettings()

  return (
    <PageWrapper>
      <main id="main-content" className="min-h-screen bg-rustic-red">
        {/* Shared container: max-width, centered, full-width padding */}
        <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16">

          {/* Hero Section */}
          <section id="hero">
            <TopBar />
            <HeroVisualWrapper settings={settings} />
          </section>

        </div>

        {/* Who Section - renders with Sanity skills data */}
        <WhoSection />

        {/* Cases Section - renders with Sanity cases data */}
        <CasesSection />

        {/* Footer - renders with Sanity settings data */}
        <FooterWrapper settings={settings} />

        {/* Sticky bottom navigation - renders with Sanity settings data */}
        <BottomNavWrapper settings={settings} />
      </main>
    </PageWrapper>
  )
}
