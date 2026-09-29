import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import LeadCapturePopup from '@/components/LeadCapturePopup'

export const metadata: Metadata = {
  metadataBase: new URL('https://mortgagestevie.com'),
  title: 'Investor Funding & DSCR Loans | Mortgage Stevie',
  description: 'Hard money, private money, DSCR loans, investor lines of credit, and medical professional home loans with Colorado and Texas mortgage broker Stevie de Gala. NMLS# 2845865.',
  openGraph: {
    title: 'Investor Funding & DSCR Loans | Mortgage Stevie',
    description: 'Financing for acquisitions, renovations, rentals, construction, repeat deal flow, and medical professional home purchases.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="pb-[72px] md:pb-0">
        <Navigation />
        <Modal />
        <LeadCapturePopup />
        {children}
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  )
}
