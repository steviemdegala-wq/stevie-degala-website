import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'DSCR Loans | Investor Financing | Northern Colorado | Stevie de Gala',
  description:
    'DSCR rental-property financing and a free portfolio cash flow review for real estate investors. Compare cash flow, leverage, reserves, and responsible growth options. NMLS# 2845865',
}

const features = [
  {
    title: 'Property Cash Flow Leads',
    body: 'DSCR programs center qualification on the property’s rental income relative to its housing payment. Personal tax-return income may not be the primary qualifying measure, though credit, reserves, property, and lender guidelines still apply.',
  },
  {
    title: 'Scale Without Bureaucracy',
    body: 'Because each property’s cash flow is central to the review, DSCR financing may provide another path when conventional debt-to-income qualification becomes restrictive. Overall credit exposure and program limits still matter.',
  },
  {
    title: 'Long-Term Fixed Options',
    body: 'Depending on current lender offerings, long-term fixed and adjustable structures may be available. Terms, prepayment provisions, and documentation requirements vary by program.',
  },
  {
    title: 'Works for Short-Term Rentals',
    body: 'Some DSCR programs accept short-term-rental history or market-rent analysis. The eligible income method, property location, licensing, and required documentation vary by lender.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a DSCR loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A DSCR loan — Debt Service Coverage Ratio loan — is an investment-property mortgage that centers qualification on the property’s eligible rental income relative to its monthly housing expense. Calculation methods and minimum ratios vary by lender and program.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who are DSCR loans designed for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DSCR loans are designed for real estate investors who want to acquire or refinance rental properties without the documentation burden of conventional investment loans. They work particularly well for self-employed borrowers with significant tax deductions, investors building portfolios beyond what conventional DTI limits allow, and medical professionals who want to invest in real estate alongside their primary career without complicating their mortgage qualification.',
      },
    },
    {
      '@type': 'Question',
      name: 'What DSCR ratio is needed to qualify?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minimum ratios vary by lender, property, leverage, credit, and other factors. A ratio of 1.0 generally means eligible rental income equals the payment used in the lender’s calculation. Some programs may consider lower ratios with different pricing or leverage. A current program review is required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What down payment is required for a DSCR loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Required equity varies by lender, credit profile, property type, occupancy, loan purpose, DSCR, and current program guidelines. A larger equity contribution may improve eligibility or pricing, but a current lender quote is needed for exact terms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use a DSCR loan for a short-term rental or Airbnb property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many DSCR programs accept short-term rental income based on STR market data (from platforms like AirDNA) or existing rental history for properties already operating as STRs. The qualifying income is typically calculated as a percentage of projected gross short-term rental revenue. Northern Colorado\'s proximity to Rocky Mountain National Park and the outdoor recreation economy supports strong STR demand in some markets.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a DSCR loan affect my personal credit or debt ratios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The DSCR loan will appear on your credit report and does count toward your overall debt picture if you apply for other credit. However, because DSCR loans qualify on property income rather than your personal income, acquiring investment properties via DSCR does not consume the DTI capacity you would need for a primary residence physician loan or VA loan. Many investors use DSCR specifically to keep their personal loan capacity available for primary residence financing.',
      },
    },
  ],
}

export default function DSCRLoanPage() {
  return (
    <main className="pt-16 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors flex items-center gap-2 mb-10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">DSCR Loan — Investor Financing</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Qualify on the property&apos;s income. Not yours.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            DSCR loans center the financing decision on the rental property’s cash flow. Credit, reserves, property eligibility, leverage, and lender guidelines remain part of the review.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Available for investment properties throughout Northern Colorado — Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Why investors use DSCR.</h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">Four structural advantages for real estate investors who want to grow a portfolio without the bottleneck of conventional qualification.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3 className="text-xl text-[#0A0A0A] mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{f.title}</h3>
                <p className="text-[#444444] text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">How It Qualifies</p>
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            The DSCR calculation — simplified.
          </h2>
          <p className="text-[#888888] leading-relaxed mb-8 max-w-2xl">
            Debt Service Coverage Ratio = Gross Monthly Rent ÷ Monthly PITIA (principal, interest, taxes, insurance, HOA)
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { ratio: '1.25+', label: 'Stronger coverage', detail: 'Rental income exceeds the payment used in the calculation. Pricing and approval still depend on the full file.' },
              { ratio: '1.0–1.25', label: 'Near coverage', detail: 'Rental income covers or modestly exceeds the payment. Program thresholds vary.' },
              { ratio: 'Below 1.0', label: 'Lower coverage', detail: 'Some programs may consider this with different leverage, reserves, or pricing.' },
            ].map((item) => (
              <div key={item.ratio} className="bg-[#111111] border border-[#2E2E2E] px-6 py-5 rounded-xl">
                <p className="text-[#F8F8F8] text-2xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{item.ratio}</p>
                <p className="text-[#7A9E5C] text-xs uppercase tracking-wide mb-2">{item.label}</p>
                <p className="text-[#888888] text-xs leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <Link href="/who-i-help/investors" className="text-[#5C8AA5] text-sm hover:underline flex items-center gap-2">
            See how I work with real estate investors →
          </Link>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-12" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Frequently asked questions.</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name} className="border-b border-[#2E2E2E] pb-6">
                <p className="text-[#F8F8F8] text-base font-medium mb-3">{item.name}</p>
                <p className="text-[#888888] text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cash-flow-review" className="bg-[#0A0A0A] py-24 px-6 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[#8FA9BD] text-xs uppercase tracking-[0.25em] mb-4">Free Portfolio Cash Flow Review</p>
            <h2 className="text-3xl md:text-5xl text-[#F8F8F8] mb-5" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              Make the portfolio work harder for your next move.
            </h2>
            <p className="text-[#C4C4C4] text-lg leading-relaxed">
              Bring your current rentals and growth goals to a free strategy call. We will review where cash flow may be getting squeezed and how much equity or borrowing capacity may be available to help you scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <div className="rounded-2xl border border-[#303030] bg-[#111111] p-7">
              <p className="text-[#8FA9BD] text-xs uppercase tracking-[0.2em] mb-3">01 · Maximize cash flow</p>
              <h3 className="text-2xl text-[#F8F8F8] mb-3" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Find the pressure points.</h3>
              <p className="text-[#A5A5A5] leading-7">Review debt payments, loan structure, rents, reserves, and upcoming expenses to identify practical opportunities to improve monthly portfolio cash flow.</p>
            </div>
            <div className="rounded-2xl border border-[#303030] bg-[#111111] p-7">
              <p className="text-[#8FA9BD] text-xs uppercase tracking-[0.2em] mb-3">02 · Access capital to scale</p>
              <h3 className="text-2xl text-[#F8F8F8] mb-3" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Measure the capital you can put to work.</h3>
              <p className="text-[#A5A5A5] leading-7">Explore refinance, equity, DSCR, and investor line-of-credit options to estimate how much capital may be available without losing sight of sustainable cash flow.</p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <BookCallButton variant="solid" label="Book My Free Portfolio Review" callType="investor-portfolio-review" />
            <p className="mx-auto mt-5 max-w-2xl text-xs leading-5 text-[#777]">This is an educational financing review, not tax, legal, or investment advice. Loan availability, proceeds, pricing, and approval depend on lender guidelines and underwriting.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
