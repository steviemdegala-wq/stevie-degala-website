import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import BookCallButton from '@/components/BookCallButton'
import RateAlertForm from '@/components/RateAlertForm'
import FAQ from '@/components/FAQ'
import { Trophy, Building2, GraduationCap, BadgeCheck, Home, Key } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stevie De Gala | Mortgage Broker in Texas & Colorado',
  description: 'Licensed mortgage broker in TX & CO. Stevie De Gala helps homeowners and real estate investors get cheaper capital, better cash flow, and smarter financing. NMLS# 2845865',
  openGraph: {
    title: 'Stevie De Gala | Mortgage Broker in Texas & Colorado',
    description: 'Licensed mortgage broker in TX & CO. Stevie De Gala helps homeowners and real estate investors get cheaper capital, better cash flow, and smarter financing. NMLS# 2845865',
    type: 'website',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Stevie De Gala — Mortgage Broker',
  description: 'Licensed mortgage broker helping homeowners and real estate investors in Texas and Colorado get better financing and stronger cash flow.',
  url: 'https://steviedegala.com',
  areaServed: ['Texas', 'Colorado'],
  hasCredential: 'NMLS# 2845865',
  sameAs: [],
}

export default function HomePage() {
  return (
    <main>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Hero */}
      <section className="min-h-screen bg-[#0A0A0A] flex items-center pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text */}
            <div className="order-2 md:order-1 py-12 md:py-0">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                I&apos;m Stevie. Your Mortgage Consultant.
              </h1>
              <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
                Mortgage Broker serving Texas and Colorado — Home loans, refinancing, DSCR loans, and cash-out refinance. NMLS# 2845865
              </span>
              <p className="text-[#C4C4C4] text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                First-time buyers get into a home the right way. Homeowners leverage their mortgage to free up cash. Investors find financing that makes their deals work. I make all three happen — across Texas and Colorado.
              </p>
              <div className="flex flex-col items-start gap-5">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://prod.lendingpad.com/nexa/f4ccb1fc-693a-4398-9bc4-77bbd6cdc8c8/pos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 text-sm uppercase tracking-widest font-medium transition-all rounded-full bg-[#F8F8F8] text-[#0A0A0A] border border-[#F8F8F8] hover:bg-[#0A0A0A] hover:text-[#F8F8F8]"
                  >
                    Get Pre-Approved
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
                  alt="Stevie De Gala, licensed mortgage broker in Texas and Colorado"
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
            Licensed in Texas &nbsp;&bull;&nbsp; Colorado
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
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Tell me your goals',
                body: 'A free 20-minute call — no forms to fill out beforehand, no pressure. Just an honest conversation about where you are and where you want to go.',
              },
              {
                step: '02',
                title: 'I shop the market',
                body: 'I compare rates and structures across 30+ lenders on your behalf. You get options, not a take-it-or-leave-it offer from a single bank.',
              },
              {
                step: '03',
                title: 'You close with confidence',
                body: 'Clear terms, no surprises, and a real person you can call throughout the process. Better financing — and you understand exactly why.',
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
            Most people leave money on the table because nobody ever sat down and showed them a better option. I am here to be that person.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card A — First-Time Buyers */}
            <div
              className="card-hover bg-[#111111] px-10 py-14 flex flex-col justify-between min-h-[380px] rounded-xl"
              style={{ border: '1px solid #2E2E2E', borderLeft: '3px solid #7A9E5C' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-7">
                  <Key size={18} className="text-[#7A9E5C]" />
                  <span className="text-[#C4C4C4] font-medium tracking-[0.15em]" style={{ fontSize: '1.1rem' }}>First-Time Buyers</span>
                </div>
                <h3
                  className="text-[#F8F8F8] leading-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}
                >
                  Your first home. Done right.
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">
                  FHA, conventional, VA, USDA — there are more options than most people realize. I explain every one in plain English and find the loan that makes your first home your best financial move.
                </p>
              </div>
              <Link
                href="/who-i-help/first-time"
                className="inline-flex items-center gap-2 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors mt-10 group"
              >
                See what&apos;s possible
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Card B — Homeowners */}
            <div
              className="card-hover bg-[#111111] px-10 py-14 flex flex-col justify-between min-h-[380px] rounded-xl"
              style={{ border: '1px solid #2E2E2E', borderLeft: '3px solid #B8860B' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-7">
                  <Home size={18} className="text-[#B8860B]" />
                  <span className="text-[#C4C4C4] font-medium tracking-[0.15em]" style={{ fontSize: '1.1rem' }}>Homeowners</span>
                </div>
                <h3
                  className="text-[#F8F8F8] leading-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}
                >
                  Your home is sitting on capital.
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">
                  Most homeowners don&apos;t realize how much equity they&apos;re leaving idle. The right refinance can pay off high-interest debt, cover college, or free up cash for whatever matters next.
                </p>
              </div>
              <Link
                href="/who-i-help/homeowners"
                className="inline-flex items-center gap-2 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors mt-10 group"
              >
                See what&apos;s possible
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Card C — Investors */}
            <div
              className="card-hover bg-[#111111] px-10 py-14 flex flex-col justify-between min-h-[380px] rounded-xl"
              style={{ border: '1px solid #2E2E2E', borderLeft: '3px solid #4A7FA5' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-7">
                  <Building2 size={18} className="text-[#4A7FA5]" />
                  <span className="text-[#C4C4C4] font-medium tracking-[0.15em]" style={{ fontSize: '1.1rem' }}>Investors</span>
                </div>
                <h3
                  className="text-[#F8F8F8] leading-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)' }}
                >
                  More options. Better terms.
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">
                  Local lenders give you a handful of choices. I compare dozens — DSCR loans, portfolio products, and creative structures built around your strategy, not a bank&apos;s checklist.
                </p>
              </div>
              <Link
                href="/who-i-help/investors"
                className="inline-flex items-center gap-2 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors mt-10 group"
              >
                See what&apos;s possible
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
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
                bank: 'Self-employed? Often a difficult conversation.',
                broker: 'Self-employed? Bank statement loans and Non-QM options available.',
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
                sub: 'Two states, two communities, one consistent standard of service.',
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

      {/* Loan Finder Callout */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Loan Finder</p>
              <h2
                className="text-4xl md:text-5xl text-[#F8F8F8] leading-tight mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Not sure which loan is right for you?
              </h2>
              <p className="text-[#888888] text-lg leading-relaxed mb-10">
                Answer a few questions and I will show you which loan options match your situation — with pros, cons, and a clear explanation of why.
              </p>
              <Link
                href="/find-my-loan"
                className="inline-flex items-center gap-3 border border-[#F8F8F8] text-[#F8F8F8] px-7 py-3.5 text-sm tracking-wide hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all group rounded-full"
              >
                Find My Loan
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Right — loan type grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Conventional', slug: 'conventional' },
                { label: 'FHA', slug: 'fha' },
                { label: 'VA Loan', slug: 'va' },
                { label: 'USDA', slug: 'usda' },
                { label: 'Jumbo', slug: 'jumbo' },
                { label: 'Refinance', slug: 'refinance' },
                { label: 'HELOC / Home Equity', slug: 'heloc' },
                { label: 'DSCR Investor', slug: 'dscr' },
                { label: 'Bank Statement', slug: 'bank-statement' },
                { label: 'Bridge / Construction', slug: 'bridge-construction' },
                { label: 'Doctor Loan', slug: 'doctor-loan' },
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

      {/* Mid-Page CTA Strip — High contrast white */}
      <section className="bg-[#F8F8F8] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl text-[#0A0A0A] mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Better financing starts with one conversation.
          </h2>
          <p className="text-[#1A1A1A] text-lg mb-10 leading-relaxed">
            A free 20-minute call is all it takes to find out whether smarter capital can change your financial picture.
          </p>
          <BookCallButton variant="light" />
        </div>
      </section>

    </main>
  )
}
