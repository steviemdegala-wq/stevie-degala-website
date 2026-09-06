import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import LeadCapturePopup from '@/components/LeadCapturePopup'

export const metadata: Metadata = {
  metadataBase: new URL('https://mortgagestevie.com'),
  title: 'Stevie de Gala | Physician Loans & Investor Funding — Northern Colorado',
  description: 'Physician loans and investor lines of credit for Northern Colorado — Fort Collins, Timnath, Windsor, Loveland, Greeley. Licensed mortgage broker. NMLS# 2845865',
  openGraph: {
    title: 'Stevie de Gala | Physician Loans & Investor Funding — Northern Colorado',
    description: 'Physician loans and investor lines of credit for Northern Colorado — Fort Collins, Timnath, Windsor, Loveland, Greeley. Licensed mortgage broker. NMLS# 2845865',
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
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
