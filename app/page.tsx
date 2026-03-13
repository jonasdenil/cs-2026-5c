import { TopBar } from "@/components/sections/top-bar"

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative">
        <TopBar />
        
        {/* Hero content will be added here */}
        <div className="h-[80vh] flex items-center justify-center">
          <p className="text-merino-white/50 font-sans text-sm tracking-wide uppercase">
            Hero content coming soon
          </p>
        </div>
      </section>

      {/* Additional sections will be added below */}
    </main>
  )
}
