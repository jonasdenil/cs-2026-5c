import { getCases, urlFor } from "@/sanity/lib"
import { CasesSectionClient } from "./cases-section-client"

const VITRINE_WORDS = ["In", "de", "vitrine"]

export async function CasesSection() {
  // Fetch cases from Sanity
  const cases = await getCases()
  
  // Transform Sanity cases to the format expected by CaseCard
  const transformedCases = cases.map((caseData) => ({
    id: caseData._id,
    fileName: caseData.fileName,
    title: caseData.title,
    description: caseData.shortIntro,
    imageUrl: caseData.previewImage ? urlFor(caseData.previewImage).width(800).quality(80).url() : "/images/cases/placeholder.jpg",
    collaboration: caseData.collaboration,
  }))

  return (
    <section id="cases" className="w-full bg-merino-white">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16 py-24 md:py-32 flex flex-col gap-14">
        <CasesSectionClient cases={transformedCases} titleWords={VITRINE_WORDS} />
      </div>
    </section>
  )
}
