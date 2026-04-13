import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CMS | Charlotte Schaerlaecken",
  description: "Content Management System voor Charlotte Schaerlaecken",
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
