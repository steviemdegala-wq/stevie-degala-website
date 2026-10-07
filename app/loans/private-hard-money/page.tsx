import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Private / Hard Money Loans | Northern Colorado | Stevie de Gala',
  description:
    'Private and hard money financing for real estate acquisitions, renovations, bridge needs, and time-sensitive investor projects in Colorado, Texas, and eligible lender markets. NMLS# 2845865.',
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
        text: 'A private or hard money loan is a business-purpose loan secured by real estate. Lenders commonly emphasize the property, project budget, borrower contribution, experience, liquidity, credit, and exit plan. Requirements vary by lender and deal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the typical rates and fees on a private hard money loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rates, points, lender fees, draw fees, third-party costs, term, and extension options vary by program and can change. The useful comparison is total borrowing cost against the project timeline and exit plan, not the note rate alone.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can a private hard money loan close?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Private-money programs can be faster than conventional financing when the deal package, title, appraisal or valuation, insurance, entity documents, and borrower information are ready. The actual closing date depends on the property, lender, documentation, and any issues discovered during review.',
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
        text: 'Hard money is usually deal-specific. Multi-deal programs may be true revolving facilities or an upfront financing preapproval followed by separate property-level loans. Each structure has different underwriting, collateral, fees, and draw mechanics, so the program documents should determine the label.',
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
            Short-term capital built around the property and the plan.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-8">
            Private and hard money can support acquisitions, renovation budgets, bridge needs, and properties that are not ready for permanent financing. Stevie compares the deal against configured lender programs and explains the cost, cash requirement, draw process, and exit considerations.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/fix-and-flip-calculator" className="rounded-full bg-[#F8F8F8] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A]">Run the Fix &amp; Flip Calculator</Link>
            <Link
              href="/find-my-loan"
              className="inline-flex items-center gap-2 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors group"
            >
              Find My Loan
            </Link>
          </div>

          {/* Loan terms snapshot */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[#2E2E2E] rounded-xl overflow-hidden">
            {[
              { label: 'Use', value: 'Business purpose' },
              { label: 'Structure', value: 'Short term' },
              { label: 'Renovation', value: 'Draws may apply' },
              { label: 'Decision', value: 'Lender review' },
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
              { term: 'Rate and points', detail: 'Confirmed from current lender pricing after the deal and borrower profile are reviewed' },
              { term: 'Loan term', detail: 'Short-term and tied to a realistic renovation, sale, refinance, or stabilization plan' },
              { term: 'Loan amount', detail: 'Usually limited by more than one measure, such as cost, as-is value, after-repair value, and program maximums' },
              { term: 'Renovation funds', detail: 'May be held back and reimbursed through draws rather than delivered entirely at closing' },
              { term: 'Liquidity', detail: 'Borrower contribution, closing costs, reserves, contingency, and unfunded costs may be required' },
              { term: 'Timing', detail: 'Depends on a complete file, property review, valuation, title, insurance, and lender capacity' },
              { term: 'Property types', detail: 'Eligibility varies; unusual, rural, manufactured, mixed-use, or heavily damaged properties need confirmation' },
              { term: 'Geography', detail: 'Stevie is licensed in Colorado and Texas; business-purpose program coverage elsewhere depends on the lender and applicable requirements' },
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
            Hard money vs. an investor line of credit.
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[#444444]" role="region" aria-label="Financing comparison" tabIndex={0}>
            <table className="w-full min-w-[540px] table-fixed text-center text-base leading-relaxed text-[#E8E8E8]">
              <caption className="sr-only">Hard money compared with an investor line or hybrid line of credit</caption>
              <thead className="bg-[#242424] text-[#F8F8F8]">
                <tr>
                  {['Feature', 'Hard Money', 'Line / Hybrid LOC'].map((heading) => (
                    <th key={heading} scope="col" className="border-b border-[#444444] px-4 py-5 text-center text-sm font-semibold uppercase tracking-wider sm:px-6">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
            {[
              { feature: 'Approval process',       hard: 'Property-level',      line: 'Upfront review plus deal review' },
              { feature: 'Structure',               hard: 'Separate loan',       line: 'Revolving or hybrid line' },
              { feature: 'Fees',                    hard: 'Per-loan terms',       line: 'Program-specific terms' },
              { feature: 'Reusability',             hard: 'New loan each deal',  line: 'Reusable, subject to terms' },
              { feature: 'Best for',                hard: 'A specific opportunity', line: 'Repeat or overlapping projects' },
              { feature: 'Timing',                  hard: 'Deal dependent',       line: 'Deal dependent' },
            ].map((row) => (
                <tr key={row.feature} className="border-b border-[#383838] last:border-b-0 odd:bg-[#151515] even:bg-[#202020]">
                  <th scope="row" className="px-4 py-5 text-center font-medium text-[#F8F8F8] sm:px-6">{row.feature}</th>
                  <td className="border-l border-[#383838] px-4 py-5 sm:px-6">{row.hard}</td>
                  <td className="border-l border-[#383838] px-4 py-5 sm:px-6">{row.line}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-sm text-[#C4C4C4] sm:hidden">Swipe across to compare both options.</p>
          <div className="mt-6 flex gap-4">
            <Link
              href="/loans/investor-line-of-credit"
              className="inline-flex items-center gap-2 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors group"
            >
              Explore Investor Lines of Credit
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
