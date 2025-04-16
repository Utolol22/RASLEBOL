import './globals.css'
import type { Metadata } from 'next'
import { Anton, Barlow } from 'next/font/google'

const anton = Anton({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton'
})

const barlow = Barlow({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow'
})

export const metadata: Metadata = {
  title: 'Coach en Sobriété | Provoque ton déclic',
  description: 'Accompagnement personnalisé pour retrouver une relation saine avec l\'alcool. Prenez rendez-vous pour un entretien de découverte.',
  keywords: 'coach sobriété, addiction alcool, arrêter de boire, alcoolisme, libération, accompagnement, dépendance, sobriété heureuse',
  authors: [{ name: 'Pierre Arsaut', url: 'https://www.coachensobriete.fr' }],
  creator: 'Pierre Arsaut',
  publisher: 'Coach en Sobriété',
  metadataBase: new URL('https://www.coachensobriete.fr'),
  openGraph: {
    title: 'Coach en Sobriété | Provoque ton déclic',
    description: 'Accompagnement personnalisé pour retrouver une relation saine avec l\'alcool. Prenez rendez-vous pour un entretien de découverte.',
    url: 'https://www.coachensobriete.fr',
    siteName: 'Coach en Sobriété',
    images: [
      {
        url: '/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Coach en Sobriété - Accompagnement personnalisé',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coach en Sobriété | Provoque ton déclic',
    description: 'Accompagnement personnalisé pour retrouver une relation saine avec l\'alcool.',
    images: ['/img/twitter-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${anton.variable} ${barlow.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://www.coachensobriete.fr" />
      </head>
      <body className="scroll-smooth">
        {children}
      </body>
    </html>
  )
}