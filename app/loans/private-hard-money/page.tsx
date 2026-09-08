import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Private / Hard Money Loans | Northern Colorado | Stevie de Gala',
  description:
    'Private and hard money loans for real estate investors in Fort Collins, Greeley, Loveland, Windsor, and Northern Colorado. Asset-based lending — no income verification. Close in 7–14 days. NMLS# 2845865',
  openGraph: {
    title: 'Private / Hard Money Loans | Northern Colorado | Stevie de Gala',
    description:
      'Asset-based private lending for real estate investors who need speed, flexibility, and capital that moves on your timeline — not a bank\'s.',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a private or hard money loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A private or hard money loan is an asset-based loan secured primarily by the value of the real estate — not your income, employment history, or credit score. Approval is based on the property\'s value and your equity position. This makes private lending ideal for investors who are self-employed, have complex income, or need to move faster than conventional financing allows.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the typical rates and fees on a private hard money loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rates on private hard money loans typically range from 10–12% depending on the deal, your experience level, the property type, and the loan-to-value ratio. Origination fees are typically around 2%, though this can vary by situation. Terms are short — usually 12 to 24 months — and structured for acquisition, renovation, or bridge situations where conventional financing is not available or too slow.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can a private hard money loan close?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Private hard money loans can close in as little as 7–14 days once the property is identified and underwritten. Because approval is asset-based rather than income-based, the process is streamlined. This speed advantage is the primary reason investors use private lending — it allows non-contingent offers and competitive positioning against bank-dependent buyers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who qualifies for a private hard money loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Private hard money loans are designed for real estate investors, not owner-occupants. Qualification is primarily based on the property\'s value and your equity or down payment — typically 25–35% of the purchase price. W-2 income is not required. Self-employed investors, flippers, landlords, and developers commonly use private lending when conventional options are unavailable, too slow, or when the property does not meet conventional guidelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between hard money and a fix and flip line of credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hard money loans are single-use, deal-specific loans — every acquisition requires a new application, new underwriting, and new origination fees. A fix and flip line of credit is underwritten once and then revolves: draw, repay, and draw again without reapplying. For investors doing multiple deals per year, a revolving line is significantly more cost-efficient. Hard money is the right tool for one-off deals, first-time investors, or situations that do not fit line-of-credit criteria.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use private hard money financing in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Northern Colorado — Fort Collins, Greeley, Loveland, Windsor, Timnath — is an active market for private lending. Fix-and-flip investors, bridge buyers, and developers all use private capital to move faster than conventional buyers. I work with investors across Northern Colorado to structure private loans around specific deal timelines and property types.',
      },
    },
  ],
}

const useCases = [
  {
    title: 'Fix-and-flip acquisitions',
    body: 'Buy below market, renovate, and sell — with capital that moves on your timeline. Private lending closes fast enough to win competitive deals and bridge the renovation period.',
  },
  {
    title: 'Bridge financing',
    body: 'Buying a new property before your existing one sells? A bridge loan gives you the capital to move without waiting — and exits cleanly when your sale closes.',
  },
  {
    title: 'Properties that don\'t meet conventional criteria',
    body: 'Distressed properties, non-warrantable units, raw land, commercial-residential mixed use — private lending is underwritten on the asset, not the property\'s conforming status.',
  },
  {
    title: 'Self-employed and complex income investors',
    body: 'Two years of consistent W-2s is not the reality for every investor. Private lending evaluates the deal, not your tax returns — making it accessible to entrepreneurs and business owners.',
  },
  {
    title: 'Time-sensitive opportunities',
    body: 'Off-market deals, estate sales, and foreclosures move fast. Private capital that can close in 7–14 days positions you to compete with cash buyers — and sometimes win at a lower price.',
  },
  {
    title: 'First-time investors building a track record',
    body: 'Before you qualify for a revolving line of credit, you need a deal history. A private hard money loan on your first flip is how that track record starts.',
  },
]

export default function PrivateHardMoneyPage() {
  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-[#0A0A0A]">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6 border-b border-[#2E2E2E]">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/who-i-help/investors"
            className="inline-flex items-center gap-2 text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors mb-10"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Investor Funding
          </Link>
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">Private / Hard Money</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Asset-based capital. No income verification. Close in days.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-8">
            Private hard money lending is underwritten on the property — not your W-2. If the deal makes sense and the numbers work, you can close in 7–14 days, compete with cash buyers, and move before conventional financing can even respond.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <BookCallButton variant="solid" label="Talk About Your Deal" />
            <Link
              href="/loans/fix-and-flip"
              className="inline-flex items-center gap-2 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors group"
            >
              Also: Fix &amp; Flip Line of Credit
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Loan terms snapshot */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[#2E2E2E] rounded-xl overflow-hidden">
            {[
              { label: 'Interest Rate', value: '10–12%' },
              { label: 'Origination Fee', value: '~2%' },
              { label: 'Close Timeline', value: '7–14 days' },
              { label: 'Loan Basis', value: 'Asset-based' },
            ].map((item) => (
              <div key={item.label} className="bg-[#111111] px-6 py-5">
                <p className="text-[#555555] text-[10px] uppercase tracking-[0.2em] mb-1">{item.label}</p>
                <p className="text-[#F8F8F8] text-lg font-medium" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-[#555555] text-xs mt-3">Rate and fee vary by deal profile, LTV, and borrower experience. Terms subject to lender approval. NMLS# 2845865.</p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-[#111111] border-b border-[#2E2E2E] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Who It&apos;s For</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-6 leading-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            When conventional financing is not an option.
          </h2>
          <p className="text-[#C4C4C4] text-lg leading-relaxed mb-12 max-w-3xl">
            Private hard money is not for everyone — it carries a higher rate than conventional financing. But for deals that need speed, properties that don&apos;t conform, or investors with complex income, it is often the only tool that actually works.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((item) => (
              <div key={item.title} className="border border-[#2E2E2E] bg-[#0A0A0A] p-8 rounded-xl">
                <h3
                  className="text-[#F8F8F8] text-base mb-3 leading-snug"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Breakdown */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Loan Structure</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-10 leading-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            What the numbers actually look like.
          </h2>
          <div className="rounded-2xl overflow-hidden border border-[#1E1E1E] bg-[#111111]">
            {[
              { term: 'Interest Rate', detail: '10–12% depending on deal, LTV, and experience' },
              { term: 'Origination Fee', detail: 'Approximately 2% — varies by lender and deal profile' },
              { term: 'Loan Term', detail: '12–24 months — structured for short-term acquisition and renovation' },
              { term: 'Loan-to-Value', detail: 'Typically up to 65–75% of as-is value or ARV' },
              { term: 'Income Verification', detail: 'Not required — approval based on property value and equity' },
              { term: 'Close Timeline', detail: '7–14 days from deal identification to funding' },
              { term: 'Property Types', detail: 'Single-family, small multifamily, mixed-use, commercial, land' },
              { term: 'Geographic Focus', detail: 'Northern Colorado — Fort Collins, Greeley, Loveland, Windsor, Timnath' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-[180px_1fr] md:grid-cols-[220px_1fr] border-b border-[#1A1A1A] last:border-b-0">
                <div className="px-6 py-4 border-r border-[#1A1A1A]">
                  <span className="text-[#888888] text-sm">{row.term}</span>
                </div>
                <div className="px-6 py-4">
                  <span className="text-[#C4C4C4] text-sm">{row.detail}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[#555555] text-xs mt-4 leading-relaxed">
            All terms are estimates based on typical deal profiles. Actual rate, fee, and structure depend on the specific property, borrower profile, and lender. Contact me for a deal-specific quote. NMLS# 2845865.
          </p>
        </div>
      </section>

      {/* Hard Money vs Fix & Flip Line */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Choosing the Right Tool</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-10 leading-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Hard money vs. Fix &amp; Flip Line of Credit.
          </h2>
          <div className="rounded-2xl overflow-hidden border border-[#1E1E1E]">
            <div className="grid grid-cols-[1fr_140px_160px] border-b border-[#1E1E1E] bg-[#0A0A0A]">
              <div className="px-6 py-4">
                <p className="text-[#444444] text-xs uppercase tracking-widest">Feature</p>
              </div>
              <div className="py-4 border-l border-[#1E1E1E] flex items-center justify-center">
                <p className="text-[#444444] text-xs uppercase tracking-widest">Hard Money</p>
              </div>
              <div className="py-4 border-l border-[#1E1E1E] flex items-center justify-center">
                <p className="text-[#C4C4C4] text-xs uppercase tracking-widest">Fix &amp; Flip Line</p>
              </div>
            </div>
            {[
              { feature: 'Approval process',       hard: 'Per deal',      line: 'Once' },
              { feature: 'Rate',                    hard: '10–12%',        line: 'High 8s–9%' },
              { feature: 'Origination fee',         hard: '~2% per deal',  line: 'Paid once' },
              { feature: 'Reusability',             hard: 'New loan each deal', line: 'Draw & repay' },
              { feature: 'Best for',                hard: 'First deal or one-off', line: '3+ deals/year' },
              { feature: 'Close time',              hard: '7–14 days',     line: '~10 days' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_140px_160px] border-b border-[#1A1A1A] last:border-b-0 bg-[#111111]">
                <div className="px-6 py-4 flex items-center">
                  <span className="text-[#888888] text-sm">{row.feature}</span>
                </div>
                <div className="py-4 border-l border-[#1A1A1A] flex items-center justify-center">
                  <span className="text-sm text-[#555555]">{row.hard}</span>
                </div>
                <div className="py-4 border-l border-[#1A1A1A] flex items-center justify-center">
                  <span className="text-sm text-[#E0E0E0]">{row.line}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <Link
              href="/loans/fix-and-flip"
              className="inline-flex items-center gap-2 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors group"
            >
              Learn about the Fix &amp; Flip Line of Credit
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Common Questions</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-10 leading-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            How private lending actually works.
          </h2>
          <div className="divide-y divide-[#2E2E2E]">
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name} className="py-6">
                <h3
                  className="text-[#F8F8F8] text-base mb-3 leading-snug"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {item.name}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111111] border-t border-[#2E2E2E] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Have a deal? Let&apos;s see if private lending is the right fit.
          </h2>
          <p className="text-[#888888] text-lg mb-10 leading-relaxed">
            Bring me the property, the purchase price, and your exit strategy. A 15-minute call is all it takes to know whether private hard money makes sense for your deal — and what the structure would look like.
          </p>
          <BookCallButton variant="solid" label="Talk About Your Deal" />
        </div>
      </section>
    </main>
  )
}
