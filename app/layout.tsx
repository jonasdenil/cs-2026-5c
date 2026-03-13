import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Charlotte Schaerlaecken | Creatief Strateeg',
  description: 'Charlotte Schaerlaecken is een Belgische creatief strateeg gespecialiseerd in social media strategie en content creatie.',
  keywords: ['creatief strateeg', 'social media', 'content strategie', 'België', 'Charlotte Schaerlaecken'],
  authors: [{ name: 'Charlotte Schaerlaecken' }],
  creator: 'Charlotte Schaerlaecken',
  openGraph: {
    title: 'Charlotte Schaerlaecken | Creatief Strateeg',
    description: 'Belgische creatief strateeg gespecialiseerd in social media strategie.',
    url: 'https://charlotteschaerlaecken.be',
    siteName: 'Charlotte Schaerlaecken',
    locale: 'nl_BE',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#551104',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <body className="font-sans antialiased bg-rustic-red text-merino-white">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
