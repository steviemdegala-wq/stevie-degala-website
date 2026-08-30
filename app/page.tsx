import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import BookCallButton from '@/components/BookCallButton'
import RateAlertForm from '@/components/RateAlertForm'
import FAQ from '@/components/FAQ'
import { Trophy, Building2, GraduationCap, BadgeCheck, Stethoscope, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevie de Gala | Northern Colorado Medical Professional Loan Consultant',
  description:
    "Northern Colorado's premier medical professional loan consultant. Physician loans, VA loans, and specialized mortgage solutions for doctors, nurses, and healthcare professionals in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. NMLS# 2845865",
  openGraph: {
    title: 'Stevie de Gala | Northern Colorado Medical Professional Loan Consultant',
    description:
      "Northern Colorado's premier medical professional loan consultant. Physician loans, VA loans, and specialized mortgage solutions for doctors, nurses, and healthcare professionals in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. NMLS# 2845865",
    type: 'website',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['FinancialService', 'LocalBusiness'],
  name: 'Stevie de Gala — Medical Professional Loan Consultant',
  alternateName: 'Mortgage Stevie',
  description:
    "Northern Colorado's premier physician loan and VA loan specialist. Serving medical professionals, veterans, and real estate investors across Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. NMLS# 2845865.",
  url: 'https://mortgagestevie.com',
  logo: 'https://mortgagestevie.com/opengraph-image',
  image: 'https://mortgagestevie.com/opengraph-image',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Timnath',
    addressRegion: 'CO',
    postalCode: '80547',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.5217,
    longitude: -104.9811,
  },
  areaServed: [
    { '@type': 'City', name: 'Fort Collins', containedInPlace: { '@type': 'State', name: 'Colorado' } },
    { '@type': 'City', name: 'Greeley', containedInPlace: { '@type': 'State', name: 'Colorado' } },
    { '@type': 'City', name: 'Loveland', containedInPlace: { '@type': 'State', name: 'Colorado' } },
    { '@type': 'City', name: 'Timnath', containedInPlace: { '@type': 'State', name: 'Colorado' } },
    { '@type': 'City', name: 'Windsor', containedInPlace: { '@type': 'State', name: 'Colorado' } },
    { '@type': 'City', name: 'Severance', containedInPlace: { '@type': 'State', name: 'Colorado' } },
  ],
  telephone: '+18065082666',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+18065082666',
    contactType: 'customer service',
    url: 'https://mortgagestevie.com/find-my-loan',
    areaServed: 'US',
    availableLanguage: 'English',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mortgage Loan Programs',
    itemListElement: [
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Physician Loan', url: 'https://mortgagestevie.com/loans/doctor-loan' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Investor Line of Credit', url: 'https://mortgagestevie.com/loans/investor-line-of-credit' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'FHA Loan', url: 'https://mortgagestevie.com/loans/fha' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Conventional Loan', url: 'https://mortgagestevie.com/loans/conventional' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Jumbo Loan', url: 'https://mortgagestevie.com/loans/jumbo' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'USDA Loan', url: 'https://mortgagestevie.com/loans/usda' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Refinance', url: 'https://mortgagestevie.com/loans/refinance' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'HELOC', url: 'https://mortgagestevie.com/loans/heloc' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'DSCR Loan', url: 'https://mortgagestevie.com/loans/dscr' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Bank Statement Loan', url: 'https://mortgagestevie.com/loans/bank-statement' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', name: 'Bridge & Construction Loan', url: 'https://mortgagestevie.com/loans/bridge-construction' } },
    ],
  },
  knowsAbout: [
    'Physician loans',
    'Doctor loans',
    'VA home loans',
    'DSCR loans',
    'FHA loans',
    'Conventional loans',
    'Jumbo loans',
    'USDA loans',
    'Mortgage refinancing',
    'HELOC',
    'Bank statement loans',
    'Medical professional mortgages',
    'Northern Colorado real estate',
    'Fort Collins mortgage',
    'Greeley mortgage',
    'Loveland mortgage',
  ],
  founder: {
    '@type': 'Person',
    name: 'Stevie de Gala',
    jobTitle: 'Mortgage Loan Consultant',
    hasCredential: 'NMLS# 2845865',
    url: 'https://mortgagestevie.com/about',
    worksFor: {
      '@type': 'Organization',
      name: 'Stevie de Gala — Medical Professional Loan Consultant',
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
    'Northern Colorado mortgage broker specializing in physician loans and VA loans for medical professionals and veterans. Based in Timnath, CO. NMLS# 2845865.',
  url: 'https://mortgagestevie.com/about',
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
    'Physician loans',
    'VA home loans',
    'Medical professional mortgages',
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

const MEDICAL_PROFESSIONS = [
  'Doctor of Medicine (MD)',
  'Doctor of Osteopathy (DO)',
  'Doctor of Dental Science or Surgery (DDS)',
  'Doctor of Dental Medicine (DMD)',
  'Doctor of Ophthalmology (MD or DO)',
  'Doctor of Optometry (OD)',
  'Doctor of Psychiatry (MD or DO)',
  'Doctor of Pharmacy (PharmD)',
  'Doctor of Veterinary Medicine (DVM or VMD)',
  'Doctor of Podiatric Medicine (DPM)',
  'Certified Registered Nurse Anesthetist (CRNA)',
  'Physician Assistant (PA)',
  'Registered Nurse (RN)',
  'Nurse Practitioner (NP)',
  'Clinical Nurse Specialist (CNS)',
  'Chiropractor (DC)',
  'Medical Residents, Fellows & Interns',
]

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
      <section className="min-h-screen bg-[#0A0A0A] flex items-center pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text */}
            <div className="order-2 md:order-1 py-12 md:py-0">
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-5">Northern Colorado</p>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Northern Colorado&apos;s Medical Professional Loan Consultant.
              </h1>
              <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
                Physician loan specialist serving Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. VA loans and medical professional loans. NMLS# 2845865
              </span>
              <p className="text-[#C4C4C4] text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                I specialize in physician loans and VA loans — mortgage solutions built around the unique financial profile of medical professionals and veterans in Northern Colorado.
              </p>
              <div className="flex flex-col items-start gap-5">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://prod.lendingpad.com/nexa/f4ccb1fc-693a-4398-9bc4-77bbd6cdc8c8/pos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 text-sm uppercase tracking-widest font-medium transition-all rounded-full bg-[#F8F8F8] text-[#0A0A0A] border border-[#F8F8F8] hover:bg-[#0A0A0A] hover:text-[#F8F8F8]"
                  >
                    Get Pre-Qualified
                  </a>
                  <BookCallButton variant="outline" label="Book a Free Call" />
                </div>
                <Link
                  href="/find-my-loan"
                  className="inline-flex items-center gap-2 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors group"
                >
                  Not sure which loan fits?
                  <span className="group-hover:translate-x-1 transition-transform">Find out →</span>
                </Link>
              </div>
            </div>

            {/* Photo */}
            <div className="order-1 md:order-2 flex justify-end">
              <div className="relative w-full max-w-sm md:max-w-none overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/headshot.jpg"
                  alt="Stevie de Gala, physician loan consultant serving Northern Colorado — Fort Collins, Greeley, Loveland, Timnath"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top grayscale"
                  quality={90}
                  priority
                />
              </div>
            </div>
          </div>
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

      {/* How It Works */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">The Process</p>
            <h2
              className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Simple. Transparent. On your side.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Free call',
                body: 'A free 15-minute call — no forms beforehand, no pressure. Just an honest conversation about where you are and where you want to go.',
              },
              {
                step: '02',
                title: 'I review your picture',
                body: 'Credit, income, savings — I look at the full picture and tell you honestly what you qualify for and which loan type fits best.',
              },
              {
                step: '03',
                title: 'I shop the market',
                body: 'I compare rates and structures across 30+ lenders on your behalf. You get options, not a take-it-or-leave-it offer from a single bank.',
              },
              {
                step: '04',
                title: 'You close with confidence',
                body: 'Clear terms, no surprises, and a real person you can call throughout the process. You always know where things stand.',
              },
            ].map((item) => (
              <div key={item.step} className="border border-white/40 bg-white backdrop-blur-sm p-8 rounded-xl">
                <p className="text-[#0A0A0A] text-5xl font-bold mb-6 leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {item.step}
                </p>
                <h3
                  className="text-[#0A0A0A] text-xl mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#3A3A3A] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-Track Value Block */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[#C4C4C4] mb-20 leading-relaxed mx-auto max-w-2xl" style={{ fontSize: '1.3rem' }}>
            Most lenders don&apos;t understand your financial picture. High student debt, a career just starting, or a real estate portfolio that moves faster than a bank can underwrite — I specialize in the loans built for exactly where you are.
          </p>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Card A — Doctor Loans */}
            <div
              className="card-hover bg-white px-10 py-14 flex flex-col justify-between min-h-[380px] rounded-xl"
              style={{ border: '1px solid #E5E5E5', borderLeft: '3px solid #5C8AA5' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-7">
                  <Stethoscope size={18} className="text-[#5C8AA5]" />
                  <span className="text-[#555555] font-medium tracking-[0.15em]" style={{ fontSize: '1.1rem' }}>Doctor Loans</span>
                </div>
                <h3
                  className="text-[#0A0A0A] leading-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}
                >
                  The loan built for your career.
                </h3>
                <p className="text-[#3A3A3A] text-sm leading-relaxed">
                  Physician loans offer low or no down payment, no PMI, and student loan debt excluded from your DTI — because your earning potential is the asset, not your savings account.
                </p>
              </div>
              <Link
                href="/who-i-help/medical-professionals"
                className="inline-flex items-center gap-2 text-[#555555] text-sm hover:text-[#0A0A0A] transition-colors mt-10 group"
              >
                See what&apos;s possible
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Card B — Investor Funding */}
            <div
              className="card-hover bg-white px-10 py-14 flex flex-col justify-between min-h-[380px] rounded-xl"
              style={{ border: '1px solid #E5E5E5', borderLeft: '3px solid #4A7FA5' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-7">
                  <Building2 size={18} className="text-[#4A7FA5]" />
                  <span className="text-[#555555] font-medium tracking-[0.15em]" style={{ fontSize: '1.1rem' }}>Investor Funding</span>
                </div>
                <h3
                  className="text-[#0A0A0A] leading-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}
                >
                  Capital ready when the deal is.
                </h3>
                <p className="text-[#3A3A3A] text-sm leading-relaxed">
                  Investor lines of credit give you revolving access to capital for multifamily and commercial acquisitions in Fort Collins and Denver — draw, close, repay, repeat. No new loan approval each time.
                </p>
              </div>
              <Link
                href="/who-i-help/investors"
                className="inline-flex items-center gap-2 text-[#555555] text-sm hover:text-[#0A0A0A] transition-colors mt-10 group"
              >
                See what&apos;s possible
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Card C — Fix & Flip */}
            <div
              className="card-hover bg-white px-10 py-14 flex flex-col justify-between min-h-[380px] rounded-xl"
              style={{ border: '1px solid #E5E5E5', borderLeft: '3px solid #B8860B' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-7">
                  <Trophy size={18} className="text-[#B8860B]" />
                  <span className="text-[#555555] font-medium tracking-[0.15em]" style={{ fontSize: '1.1rem' }}>Fix &amp; Flip</span>
                </div>
                <h3
                  className="text-[#0A0A0A] leading-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}
                >
                  Move fast. Make offers. Win deals.
                </h3>
                <p className="text-[#3A3A3A] text-sm leading-relaxed">
                  A fix and flip line of credit means your next offer is not contingent on financing approval. You make the call, draw the funds, and close — while bank-dependent buyers are still waiting.
                </p>
              </div>
              <Link
                href="/loans/fix-and-flip"
                className="inline-flex items-center gap-2 text-[#555555] text-sm hover:text-[#0A0A0A] transition-colors mt-10 group"
              >
                See what&apos;s possible
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors group"
            >
              Why physician loans and VA loans are personal to me
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Broker vs Bank */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Why a Broker</p>
            <h2
              className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Your bank is not shopping for you.
            </h2>
            <p className="text-[#888888] text-lg max-w-2xl mx-auto leading-relaxed">
              When you go directly to a bank, you get one offer. A broker shops the entire market on your behalf and brings you the best option available.
            </p>
          </div>

          {/* Comparison table */}
          <div className="rounded-2xl overflow-hidden border border-[#2E2E2E]">
            {/* Column headers */}
            <div className="grid grid-cols-2 bg-[#1A1A1A] border-b border-[#2E2E2E]">
              <div className="px-7 py-4 border-r border-[#2E2E2E]">
                <p className="text-[#888888] text-xs uppercase tracking-widest">Going Direct to a Bank</p>
              </div>
              <div className="px-7 py-4">
                <p className="text-[#F8F8F8] text-xs uppercase tracking-widest">Working with Stevie</p>
              </div>
            </div>

            {[
              {
                bank: 'One lender. One set of products. One offer.',
                broker: '30+ lenders compared side by side on your behalf.',
              },
              {
                bank: 'Retail pricing — set by the bank for the bank.',
                broker: 'Wholesale pricing — more competitive than retail.',
              },
              {
                bank: 'Limited loan types — mostly what they sell in-house.',
                broker: 'Every loan type: FHA, VA, USDA, Jumbo, DSCR, Non-QM, and more.',
              },
              {
                bank: 'Physician loans? Usually only one option if any.',
                broker: 'Multiple physician loan programs compared — best terms win.',
              },
              {
                bank: 'Closing costs are what they are.',
                broker: 'Multiple lenders compete — best total cost wins.',
              },
              {
                bank: 'Their loan officer works for the bank.',
                broker: 'I work for you. Not the lender. Not the bank.',
              },
              {
                bank: 'You do the shopping. Alone.',
                broker: 'You relax. I do the shopping.',
              },
            ].map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 border-b border-[#2E2E2E] last:border-b-0 ${i % 2 === 0 ? 'bg-[#0A0A0A]' : 'bg-[#111111]'}`}
              >
                <div className="px-7 py-5 border-r border-[#2E2E2E] flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#555555]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-[#888888] text-sm leading-relaxed">{row.bank}</span>
                </div>
                <div className="px-7 py-5 flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#5C8A5C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#C4C4C4] text-sm leading-relaxed">{row.broker}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[#888888] text-xs mt-6 text-center">
            Broker compensation is paid by the lender — not by you. My job is to find you the best deal, not the one that pays me the most.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Common Questions</p>
            <h2
              className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Questions people ask before they call.
            </h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Credibility Stats */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                stat: 'Ironman Finisher',
                sub: 'When the process gets hard, I know how to push through.',
                icon: <Trophy size={28} className="text-[#555555] mb-5" />,
              },
              {
                stat: 'Ground-Up Developer',
                sub: 'I built a self-storage facility from scratch as a senior in college.',
                icon: <Building2 size={28} className="text-[#555555] mb-5" />,
              },
              {
                stat: 'BYU Entrepreneurial Management',
                sub: 'My degree was built around building things, not just studying them.',
                icon: <GraduationCap size={28} className="text-[#555555] mb-5" />,
              },
              {
                stat: 'Licensed in TX and CO',
                sub: 'Primary market: Northern Colorado. Also licensed in East Texas.',
                icon: <BadgeCheck size={28} className="text-[#555555] mb-5" />,
              },
            ].map((item) => (
              <div key={item.stat} className="bg-white backdrop-blur-sm border border-white/40 p-8 md:p-10 rounded-xl">
                {item.icon}
                <h4
                  className="text-[#0A0A0A] text-xl mb-3 leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.stat}
                </h4>
                <p className="text-[#3A3A3A] text-sm leading-relaxed">{item.sub}</p>
              </div>
            ))}
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
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Physician Loans</p>
              <h2
                className="text-4xl md:text-5xl text-[#F8F8F8] leading-tight mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Is This You?
              </h2>
              <p className="text-[#888888] text-lg leading-relaxed mb-7">
                If you are in one of these professions, you likely qualify for a physician loan — a mortgage built specifically for your situation: high earning potential, significant student debt, and limited time to save a down payment.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'Low or zero down payment',
                  'No private mortgage insurance (PMI)',
                  'Student loan debt excluded from DTI',
                  'Available to residents and fellows',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-[#C4C4C4] text-sm">
                    <svg className="w-4 h-4 flex-shrink-0 text-[#5C8AA5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                Learn About Physician Loans
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Right — professions list */}
            <div className="grid grid-cols-1 gap-2">
              {MEDICAL_PROFESSIONS.map((profession) => (
                <div
                  key={profession}
                  className="bg-[#111111] border border-[#2E2E2E] px-5 py-3 rounded-lg flex items-center gap-3"
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#5C8AA5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#C4C4C4] text-sm">{profession}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Investor Line of Credit highlight */}
          <div className="border border-[#4A7FA5]/30 bg-[#111111] rounded-2xl px-8 md:px-12 py-10 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-[#4A7FA5] text-xs uppercase tracking-[0.25em] mb-4">Also an Investor?</p>
                <h3
                  className="text-2xl md:text-3xl text-[#F8F8F8] leading-tight mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Many physicians invest in real estate. An investor line of credit is how they fund it.
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">
                  A revolving investor line of credit gives you standing capital to acquire multifamily and commercial properties in Fort Collins and Denver — without refinancing your primary home or waiting on a new loan each time.
                </p>
              </div>
              <div className="flex md:justify-end">
                <Link
                  href="/loans/investor-line-of-credit"
                  className="inline-flex items-center gap-3 border border-[#4A7FA5] text-[#4A7FA5] px-7 py-3.5 text-sm tracking-wide hover:bg-[#4A7FA5] hover:text-[#0A0A0A] transition-all group rounded-full"
                >
                  Explore Investor Lines of Credit
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Looking for Another Loan? */}
          <div>
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
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
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
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
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
