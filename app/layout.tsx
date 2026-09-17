import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-barlow-condensed',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'PlayPal — Pakistan\u2019s First Football Ecosystem',
  description:
    'Challenge clubs head to head, book arenas and grounds by the hour, enter tournaments, buy custom kit and stream live matches. PlayPal is Pakistan\u2019s football ecosystem.',
  generator: 'v0.app',
  keywords: [
    'football Pakistan',
    'book football ground Karachi',
    'futsal arena Lahore',
    'head to head football match',
    'football tournament Pakistan',
  ],
  openGraph: {
    title: 'PlayPal — Challenge. Book. Dominate.',
    description:
      'Pakistan\u2019s first football ecosystem: head-to-head matches, open challenges, arena booking, tournaments, store and live streams.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-16%20at%204.03.27%20PM-MBMNx0lgmknKc60LrytdlR7wiECRLD.jpeg',
        type: 'image/jpeg',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${barlowCondensed.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
