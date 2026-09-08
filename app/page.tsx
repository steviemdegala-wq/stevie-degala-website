import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import BookCallButton from '@/components/BookCallButton'
import RateAlertForm from '@/components/RateAlertForm'
import FAQ from '@/components/FAQ'
import MedicalProfessionsTicker from '@/components/MedicalProfessionsTicker'
import { Building2, Stethoscope } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevie de Gala | Physician Loans & Investor Funding — Northern Colorado',
  description:
    "Physician loans and investor lines of credit for Northern Colorado — Fort Collins, Timnath, Windsor, Loveland, Greeley. Zero down for doctors. Revolving capital for real estate investors. NMLS# 2845865",
  openGraph: {
    title: 'Stevie de Gala | Physician Loans & Investor Funding — Northern Colorado',
    description:
      "Physician loans and investor lines of credit for Northern Colorado — Fort Collins, Timnath, Windsor, Loveland, Greeley. Zero down for doctors. Revolving capital for real estate investors. NMLS# 2845865",
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['FinancialService', 'LocalBusiness'],
  '@id': 'https://www.mortgagestevie.com/#business',
  name: 'Stevie de Gala — Physician Loans & Investor Funding',
  alternateName: 'Mortgage Stevie',
  description:
    "Northern Colorado mortgage broker specializing in medical professional loans and investor lines of credit for real estate investors. Serving Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. NMLS# 2845865.",
  url: 'https://www.mortgagestevie.com',
  logo: 'https://www.mortgagestevie.com/opengraph-image',
  image: 'https://www.mortgagestevie.com/opengraph-image',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Timnath',
    addressRegion: 'CO',
    postalCode: '80547',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.52170,
    longitude: -104.98110,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
  ],
  areaServed: [
    { '@type': 'City', name: 'Fort Collins', sameAs: 'https://en.wikipedia.org/wiki/Fort_Collins,_Colorado' },
    { '@type': 'City', name: 'Greeley', sameAs: 'https://en.wikipedia.org/wiki/Greeley,_Colorado' },
    { '@type': 'City', name: 'Loveland', sameAs: 'https://en.wikipedia.org/wiki/Loveland,_Colorado' },
    { '@type': 'City', name: 'Timnath', sameAs: 'https://en.wikipedia.org/wiki/Timnath,_Colorado' },
    { '@type': 'City', name: 'Windsor', sameAs: 'https://en.wikipedia.org/wiki/Windsor,_Colorado' },
    { '@type': 'City', name: 'Severance', sameAs: 'https://en.wikipedia.org/wiki/Severance,_Colorado' },
  ],
  telephone: '+18065082666',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+18065082666',
    contactType: 'customer service',
    url: 'https://www.mortgagestevie.com/find-my-loan',
    areaServed: 'US',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/2845865',
    'https://www.facebook.com/stevie.degala/',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mortgage Loan Programs',
    itemListElement: [
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Medical Professional Loan', url: 'https://www.mortgagestevie.com/loans/doctor-loan' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Fix & Flip Line of Credit', url: 'https://www.mortgagestevie.com/loans/fix-and-flip' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Investor Line of Credit', url: 'https://www.mortgagestevie.com/loans/investor-line-of-credit' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'DSCR Loan', url: 'https://www.mortgagestevie.com/loans/dscr' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'FHA Loan', url: 'https://www.mortgagestevie.com/loans/fha' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Conventional Loan', url: 'https://www.mortgagestevie.com/loans/conventional' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Jumbo Loan', url: 'https://www.mortgagestevie.com/loans/jumbo' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'USDA Loan', url: 'https://www.mortgagestevie.com/loans/usda' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Refinance', url: 'https://www.mortgagestevie.com/loans/refinance' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'HELOC', url: 'https://www.mortgagestevie.com/loans/heloc' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Bank Statement Loan', url: 'https://www.mortgagestevie.com/loans/bank-statement' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Bridge & Construction Loan', url: 'https://www.mortgagestevie.com/loans/bridge-construction' } },
    ],
  },
  knowsAbout: [
    'Medical professional loans',
    'Physician loans',
    'Doctor loans',
    'Fix and flip financing',
    'Investor line of credit',
    'Hard money lending',
    'DSCR loans',
    'FHA loans',
    'Conventional loans',
    'Jumbo loans',
    'USDA loans',
    'Mortgage refinancing',
    'HELOC',
    'Bank statement loans',
    'Northern Colorado real estate',
    'Fort Collins mortgage',
    'Greeley mortgage',
    'Loveland mortgage',
    'Timnath mortgage',
    'Windsor mortgage',
  ],
  founder: {
    '@type': 'Person',
    name: 'Stevie de Gala',
    jobTitle: 'Mortgage Loan Consultant',
    hasCredential: 'NMLS# 2845865',
    url: 'https://www.mortgagestevie.com/about',
    worksFor: {
      '@type': 'Organization',
      name: 'Stevie de Gala — Physician Loans & Investor Funding',
    },
  },
  priceRange: '$$',
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stevie de Gala',
  jobTitle: 'Mortgage Loan Consultant',
  description:
    'Northern Colorado mortgage broker specializing in medical professional loans and investor lines of credit for real estate investors. Based in Timnath, CO. NMLS# 2845865.',
  url: 'https://www.mortgagestevie.com/about',
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'license',
    name: 'NMLS# 2845865',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Nationwide Multistate Licensing System',
    },
  },
  knowsAbout: [
    'Medical professional loans',
    'Physician loans',
    'Fix and flip financing',
    'Investor line of credit',
    'DSCR loans for investors',
    'Northern Colorado real estate market',
  ],
  telephone: '+18065082666',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Timnath',
    addressRegion: 'CO',
    addressCountry: 'US',
  },
}


export default function HomePage() {
  return (
    <main>
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Hero */}
      <section className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex items-center pt-20">
        {/* Photo — right half, full section height, no border */}
        <div className="hidden md:block absolute right-0 inset-y-0 w-1/2 pointer-events-none">
          <Image
            src="/headshot.jpg"
            alt="Stevie de Gala, physician loan consultant serving Northern Colorado — Fort Collins, Greeley, Loveland, Timnath"
            fill
            sizes="50vw"
            className="object-cover object-top grayscale"
            quality={90}
            priority
          />
          {/* Fade photo into dark background on the left */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0A0A0A 0%, #0A0A0A 5%, transparent 45%)' }} />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }} />
        </div>

        {/* Text — left side */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16 md:py-28">
          <div className="max-w-xl">
            <p className="text-[#555555] text-xs uppercase tracking-[0.3em] mb-7 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#555555] inline-block" />
              Northern Colorado
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-[4.5rem] text-[#F8F8F8] leading-[1.05] mb-6"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Medical Professional Loans & Investor Funding.
            </h1>
            <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
              Medical professional loan specialist and investor line of credit broker serving Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance, Northern Colorado. Physician loans, nurse loans, dentist loans. NMLS# 2845865
            </span>
            <p className="text-[#888888] text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Zero down loans for doctors, nurses, dentists, NPs, and many licensed healthcare professionals. Revolving investor lines of credit up to $10M for Northern Colorado real estate investors.
            </p>
            <div className="flex flex-col items-start gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://prod.lendingpad.com/nexa/f4ccb1fc-693a-4398-9bc4-77bbd6cdc8c8/pos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3.5 text-sm font-medium transition-all rounded-full bg-[#F8F8F8] text-[#0A0A0A] hover:bg-[#DCDCDC]"
                >
                  Get Pre-Qualified
                </a>
                <BookCallButton variant="outline" label="Get in Touch" />
              </div>
              <Link
                href="/find-my-loan"
                className="inline-flex items-center gap-2 text-[#555555] text-sm hover:text-[#F8F8F8] transition-colors group"
              >
                Not sure which loan fits?
                <span className="group-hover:translate-x-1 transition-transform">Find out →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile photo */}
        <div className="md:hidden absolute inset-0 pointer-events-none">
          <Image
            src="/headshot.jpg"
            alt="Stevie de Gala"
            fill
            sizes="100vw"
            className="object-cover object-top grayscale opacity-20"
            quality={80}
            priority
          />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[#888888] text-xs uppercase tracking-[0.25em]">
            Fort Collins &nbsp;&bull;&nbsp; Greeley &nbsp;&bull;&nbsp; Loveland &nbsp;&bull;&nbsp; Timnath &nbsp;&bull;&nbsp; Windsor &nbsp;&bull;&nbsp; Severance &nbsp;&bull;&nbsp; Northern Colorado
          </p>
        </div>
      </section>


      {/* Who I Help */}
      <section className="bg-[#0A0A0A] py-20 px-6 border-t border-[#1A1A1A]">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[#444444] text-xs uppercase tracking-[0.25em] mb-4">Who I Help</p>
          <h2
            className="text-center text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-12"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Built for your specific situation.
          </h2>
          <div className="grid md:grid-cols-2 gap-4">

            {/* Medical Professional */}
            <div className="rounded-2xl overflow-hidden border border-[#303030]" style={{ background: 'linear-gradient(160deg, #2E2E2E 0%, #181818 40%, #0A0A0A 100%)' }}>
              <div className="px-8 pt-10 pb-8">
                <div className="flex items-center gap-2 mb-6">
                  <Stethoscope size={14} className="text-[#888888]" />
                  <span className="text-[#888888] text-xs uppercase tracking-[0.2em]">Medical Professional</span>
                </div>
                <h3
                  className="text-3xl text-[#F8F8F8] leading-tight mb-4"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Medical Professional Home Loans
                </h3>
                <p className="text-[#555555] text-sm leading-relaxed mb-6 max-w-sm">
                  Built for MDs, DOs, NPs, RNs, PAs, dentists, pharmacists, CRNAs, and more. Zero down, no PMI, student loan debt excluded from DTI.
                </p>
                <Link
                  href="/who-i-help/medical-professionals"
                  className="inline-block border border-[#F8F8F8] text-[#F8F8F8] px-7 py-3 text-sm tracking-wide hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all rounded-full"
                >
                  Learn More
                </Link>
              </div>
              <div className="mx-8 mb-8 bg-[#0E0E0E] border border-[#1E1E1E] rounded-xl p-5">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    { label: 'Down Payment', val: '0%' },
                    { label: 'PMI Required', val: 'None' },
                    { label: 'Student Debt in DTI', val: 'Excluded' },
                    { label: 'Max Loan Size', val: '$2M+' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[#444444] text-xs mb-1">{item.label}</p>
                      <p className="text-[#C4C4C4] text-sm font-medium">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Real Estate Investor */}
            <div className="rounded-2xl overflow-hidden border border-[#303030]" style={{ background: 'linear-gradient(160deg, #0A0A0A 0%, #141414 40%, #262626 100%)' }}>
              <div className="px-8 pt-10 pb-8">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 size={14} className="text-[#888888]" />
                  <span className="text-[#888888] text-xs uppercase tracking-[0.2em]">Real Estate Investor</span>
                </div>
                <h3
                  className="text-3xl text-[#F8F8F8] leading-tight mb-4"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Investor Funding
                </h3>
                <p className="text-[#555555] text-sm leading-relaxed mb-6 max-w-sm">
                  Pre-approved capital for Northern Colorado real estate investors. Draw, close, repay, repeat — no new loan approval required.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    { label: 'Fix & Flip Line of Credit' },
                    { label: 'Hard Money / Private Funding' },
                    { label: 'DSCR Loan' },
                  ].map((p) => (
                    <Link
                      key={p.label}
                      href="/loans/fix-and-flip"
                      className="text-xs border border-[#333333] text-[#888888] px-3 py-1.5 rounded-full hover:border-[#555555] hover:text-[#C4C4C4] transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/who-i-help/investors"
                  className="inline-block border border-[#F8F8F8] text-[#F8F8F8] px-7 py-3 text-sm tracking-wide hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all rounded-full"
                >
                  Learn More
                </Link>
              </div>
              <div className="mx-8 mb-8 bg-[#0E0E0E] border border-[#1E1E1E] rounded-xl p-5">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    { label: 'Loan Size', val: 'Up to $10M' },
                    { label: 'Close Time', val: '~10 Days' },
                    { label: 'Max ARV', val: 'Up to 70%' },
                    { label: 'Rate', val: 'High 8s–9%' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[#444444] text-xs mb-1">{item.label}</p>
                      <p className="text-[#C4C4C4] text-sm font-medium">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Broker vs Bank */}
      <section className="bg-[#0A0A0A] py-24 px-6 border-t border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[#444444] text-xs uppercase tracking-[0.25em] mb-4">Why a Broker</p>
            <h2
              className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-4"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              The bank is not shopping for you.
            </h2>
            <p className="text-[#555555] text-base max-w-xl mx-auto leading-relaxed">
              When you go to a bank, you get one offer — theirs. A broker shops 250+ lenders and brings you the best one.
            </p>
          </div>

          {/* 3-column comparison table */}
          <div className="rounded-2xl overflow-hidden border border-[#1E1E1E]">
            {/* Header */}
            <div className="grid grid-cols-[1fr_140px_190px]">
              <div className="px-6 py-4 bg-[#111111] border-b border-r border-[#1E1E1E]">
                <p className="text-[#888888] text-xs uppercase tracking-widest">Feature</p>
              </div>
              <div className="py-4 bg-[#111111] border-b border-r border-[#1E1E1E] flex items-center justify-center">
                <p className="text-[#888888] text-xs uppercase tracking-widest">A Bank</p>
              </div>
              <div className="py-5 bg-[#F8F8F8] border-b border-[#F8F8F8] flex items-center justify-center">
                <p className="text-[#0A0A0A] text-xs uppercase tracking-widest font-medium whitespace-nowrap">Working with Stevie</p>
              </div>
            </div>

            {[
              { feature: 'Lenders accessed',          bank: '1',     broker: '250+' },
              { feature: 'Rate shopping',              bank: '✕',     broker: '✓' },
              { feature: 'Wholesale pricing',          bank: '✕',     broker: '✓' },
              { feature: 'Physician loan programs',    bank: 'Rare',  broker: '✓' },
              { feature: 'DSCR & investor products',   bank: 'Rare',  broker: '✓' },
              { feature: 'Closing cost competition',   bank: 'Rare',  broker: '✓' },
              { feature: 'Works for you',              bank: '✕',     broker: '✓' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_140px_190px] border-b border-[#1A1A1A] last:border-b-0">
                <div className="px-6 py-4 bg-[#111111] border-r border-[#1A1A1A] flex items-center">
                  <span className="text-[#888888] text-sm">{row.feature}</span>
                </div>
                <div className="py-4 bg-[#111111] border-r border-[#1A1A1A] flex items-center justify-center">
                  <span className={`text-sm ${row.bank === '✓' ? 'text-[#C4C4C4]' : row.bank === '✕' ? 'text-[#2E2E2E]' : 'text-[#444444]'}`}>
                    {row.bank}
                  </span>
                </div>
                <div className="py-4 bg-[#1C1C1C] flex items-center justify-center">
                  <span className="text-sm text-[#E8E8E8] font-medium">{row.broker}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[220px_1fr] gap-16 items-start">
            <div className="md:sticky md:top-32">
              <h2
                className="text-[3.5rem] md:text-[4.5rem] leading-none text-[#F8F8F8] font-normal"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                FAQ
              </h2>
            </div>
            <div className="border-t border-[#2E2E2E] pt-2">
              <FAQ />
            </div>
          </div>
        </div>
      </section>


      {/* Is This You? — Physician Loans */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Primary: Medical Professional Loans */}
          <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
            {/* Left — copy */}
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Medical Professional Loans</p>
              <h2
                className="text-4xl md:text-5xl text-[#F8F8F8] leading-tight mb-5"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Is This You?
              </h2>
              <p className="text-[#888888] text-lg leading-relaxed mb-7">
                If you are in one of these professions, you likely qualify for a medical professional loan — zero down, no PMI, and student debt excluded from your DTI, because your earning potential is the asset, not your savings account.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'Low or zero down payment',
                  'No private mortgage insurance (PMI)',
                  'Student loan debt excluded from DTI',
                  'Available to residents and fellows',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-[#C4C4C4] text-sm">
                    <svg className="w-4 h-4 flex-shrink-0 text-[#888888]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link
                href="/loans/doctor-loan"
                className="inline-flex items-center gap-3 border border-[#F8F8F8] text-[#F8F8F8] px-7 py-3.5 text-sm tracking-wide hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all group rounded-full"
              >
                See If You Qualify
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Right — professions ticker */}
            <MedicalProfessionsTicker />
          </div>

          {/* Looking for Another Loan? */}
          <div className="mt-20 pt-14 border-t border-[#1A1A1A]">
            <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-6">Looking for Another Loan?</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { label: 'Fix & Flip Line of Credit', slug: 'fix-and-flip' },
                { label: 'DSCR Investor', slug: 'dscr' },
                { label: 'Conventional', slug: 'conventional' },
                { label: 'FHA', slug: 'fha' },
                { label: 'USDA', slug: 'usda' },
                { label: 'Jumbo', slug: 'jumbo' },
                { label: 'Refinance', slug: 'refinance' },
                { label: 'HELOC / Home Equity', slug: 'heloc' },
                { label: 'Bank Statement', slug: 'bank-statement' },
                { label: 'Bridge / Construction', slug: 'bridge-construction' },
              ].map((loan) => (
                <Link
                  key={loan.slug}
                  href={`/loans/${loan.slug}`}
                  className="group bg-[#111111] border border-[#2E2E2E] px-5 py-4 rounded-lg hover:border-[#555555] hover:bg-[#1A1A1A] transition-all flex items-center justify-between"
                >
                  <span className="text-[#888888] text-sm group-hover:text-[#F8F8F8] transition-colors">{loan.label}</span>
                  <span className="text-[#555555] text-xs group-hover:text-[#888888] group-hover:translate-x-0.5 transition-all">→</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Rate Alert */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-3">Rate Watch</p>
              <h2
                className="text-2xl md:text-3xl text-[#F8F8F8] leading-tight mb-3"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Rates change daily. Know when they drop.
              </h2>
              <p className="text-[#888888] text-sm leading-relaxed">
                Drop your email and I will reach out personally when rates make a meaningful move — so you are ready to act, not reacting late.
              </p>
            </div>
            <div>
              <RateAlertForm />
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA Strip */}
      <section className="bg-[#F8F8F8] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl text-[#0A0A0A] mb-4 leading-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Better financing starts with one conversation.
          </h2>
          <p className="text-[#1A1A1A] text-lg mb-10 leading-relaxed">
            A free 15-minute call is all it takes to find out whether a physician loan, investor line of credit, fix and flip line, or another structure gives you the best financial outcome.
          </p>
          <BookCallButton variant="light" />
        </div>
      </section>

    </main>
  )
}
