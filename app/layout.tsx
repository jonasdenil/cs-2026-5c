import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://charlotteschaerlaecken.be'),
  title: {
    default: 'Charlotte Schaerlaecken | Creatief Strateeg',
    template: '%s | Charlotte Schaerlaecken',
  },
  description: 'Charlotte Schaerlaecken is een Belgische creatief strateeg gespecialiseerd in social media strategie en content creatie.',
  keywords: ['creatief strateeg', 'social media', 'content strategie', 'België', 'Charlotte Schaerlaecken', 'branding', 'marketing', 'creative strategy'],
  authors: [{ name: 'Charlotte Schaerlaecken', url: 'https://charlotteschaerlaecken.be' }],
  creator: 'Charlotte Schaerlaecken',
  publisher: 'Charlotte Schaerlaecken',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Charlotte Schaerlaecken | Creatief Strateeg',
    description: 'Belgische creatief strateeg gespecialiseerd in social media strategie en content creatie.',
    url: 'https://charlotteschaerlaecken.be',
    siteName: 'Charlotte Schaerlaecken',
    locale: 'nl_BE',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Charlotte Schaerlaecken - Creatief Strateeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlotte Schaerlaecken | Creatief Strateeg',
    description: 'Belgische creatief strateeg gespecialiseerd in social media strategie en content creatie.',
    images: ['/images/og-image.png'],
    creator: '@c.schaerlaecken',
  },
  alternates: {
    canonical: 'https://charlotteschaerlaecken.be',
  },
  category: 'creative services',
}

export const viewport: Viewport = {
  themeColor: '#A31918',
  userScalable: true,
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
