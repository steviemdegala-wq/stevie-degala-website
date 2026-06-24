import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export const metadata: Metadata = {
  title: 'Stevie De Gala | Mortgage Broker in Texas & Colorado',
  description: 'Licensed mortgage broker in TX & CO. Stevie De Gala helps homeowners and real estate investors get cheaper capital, better cash flow, and smarter financing. NMLS# 2845865',
  openGraph: {
    title: 'Stevie De Gala | Mortgage Broker in Texas & Colorado',
    description: 'Licensed mortgage broker in TX & CO. Stevie De Gala helps homeowners and real estate investors get cheaper capital, better cash flow, and smarter financing. NMLS# 2845865',
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
        {children}
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  )
}
