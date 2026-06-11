import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

// ─── Loan Content ─────────────────────────────────────────────────────────────

type LoanContent = {
  name: string
  tagline: string
  what: string
  goodFor: string[]
  notFor: string[]
}

const loans: Record<string, LoanContent> = {
  conventional: {
    name: 'Conventional Loan',
    tagline: 'The most common home loan. No government backing required.',
    what: 'A conventional loan is a regular home loan that is not backed by the government. It is the most common type of mortgage. Lenders have stricter rules for these loans — but if you qualify, you usually get solid terms and flexibility.',
    goodFor: [
      'Buyers putting down 5% or more',
      'People with a credit score of 620 or higher',
      'Buyers who want to stop paying mortgage insurance once they reach 20% equity',
      'Buying a primary home, a vacation home, or an investment property',
      'People with steady, easy-to-document income',
    ],
    notFor: [
      'Buyers with a credit score below 620',
      'Veterans — a VA loan usually offers better terms',
      'Buyers in rural areas — a USDA loan may be a better fit',
      'Self-employed people with complex taxes — other loan types work better',
    ],
  },

  fha: {
    name: 'FHA Loan',
    tagline: 'Backed by the government. Easier to qualify for.',
    what: 'An FHA loan is a home loan backed by the Federal Housing Administration (a government agency). Because the government backs it, lenders can say yes to more people — including first-time buyers and people with lower credit scores.',
    goodFor: [
      'First-time homebuyers',
      'People with a credit score as low as 580 (or even 500 with more down)',
      'Buyers who can only put down 3.5%',
      'People with more debt compared to their income',
      'Anyone who needs more flexible qualification rules',
    ],
    notFor: [
      'Buying an investment property or vacation home',
      'High-priced homes — FHA has loan limits by county',
      'People who want to stop paying mortgage insurance quickly (FHA keeps it longer)',
      'Veterans — a VA loan is almost always a better deal',
    ],
  },

  va: {
    name: 'VA Loan',
    tagline: 'A benefit you earned. Zero down. No mortgage insurance.',
    what: 'A VA loan is a home loan for people who served in the U.S. military — and their surviving spouses. The Department of Veterans Affairs backs it. It is one of the best loan options available to anyone who qualifies. No down payment. No private mortgage insurance.',
    goodFor: [
      'Active duty military members',
      'Veterans of any branch of the U.S. military',
      'Surviving spouses of veterans',
      'Buyers who want to purchase with zero money down',
      'People who want to avoid paying mortgage insurance',
      'Borrowers who want competitive rates backed by the government',
    ],
    notFor: [
      'People who have not served in the military',
      'Buying an investment property or vacation home (must be your primary home)',
      'Buyers who have already used their full VA entitlement and not restored it',
    ],
  },

  usda: {
    name: 'USDA Loan',
    tagline: 'Zero down. Built for rural and suburban homebuyers.',
    what: 'A USDA loan is a home loan backed by the U.S. Department of Agriculture. It is designed for people buying in rural areas or certain smaller towns. You do not need a down payment — and the rates are usually very competitive.',
    goodFor: [
      'Buying a home in a rural area or qualifying small town',
      'People who meet household income limits for their area',
      'Buyers who want to put zero money down',
      'First-time buyers looking for an affordable entry point',
      'People with decent credit who may not qualify for other no-down programs',
    ],
    notFor: [
      'Buying in a major city or dense suburb (the property must be in an eligible area)',
      'Households with income above the USDA limit for that area',
      'Buying an investment property or vacation home',
      'Veterans — a VA loan is usually a better no-down option if you qualify',
    ],
  },

  jumbo: {
    name: 'Jumbo Loan',
    tagline: 'For homes that cost more than standard loan limits allow.',
    what: 'A jumbo loan is a home loan for expensive properties. Every year, the government sets a limit on how large a "standard" home loan can be. If you need to borrow more than that limit, you need a jumbo loan. Lenders take on more risk, so the bar to qualify is higher.',
    goodFor: [
      'Loan amounts above $766,550 — the 2025 conforming loan limit (updated annually by FHFA)',
      'Buying a high-priced home or luxury property',
      'Homes in expensive markets like Denver, Salt Lake City, or parts of Texas',
      'Buyers with strong credit, solid savings, and stable income',
      'People who can put down 20% or more',
    ],
    notFor: [
      'Loans at or below $766,550 — a conventional loan is simpler and cheaper',
      'Buyers with limited savings or lower credit scores',
      'First-time buyers who need a low down payment option',
      'People with complex or hard-to-document income',
    ],
  },

  refinance: {
    name: 'Refinance',
    tagline: 'Same house. New loan. Better terms.',
    what: 'A refinance means replacing your current home loan with a brand new one. People refinance for different reasons — to get a lower payment, to pay their home off faster, or to take cash out of the equity they have built up over time.',
    goodFor: [
      'Lowering your monthly payment',
      'Getting a better interest rate than you currently have',
      'Switching from a variable rate to a fixed rate for more stability',
      'Pulling cash out of your home equity for renovations, debt payoff, or other goals',
      'Shortening your loan term to pay your home off faster',
    ],
    notFor: [
      'People who just got their current loan — closing costs may cost more than you save',
      'Homeowners planning to sell or move in the near future',
      'Borrowers with very little equity in their home',
      'People whose financial situation has gotten worse since their original loan',
    ],
  },

  heloc: {
    name: 'HELOC & Home Equity',
    tagline: 'Use the equity you have already built.',
    what: 'A HELOC (Home Equity Line of Credit) lets you borrow against the value of your home. Think of it like a credit card backed by your house. You are approved for a credit limit and you can pull from it when you need it. You only pay interest on what you actually use.',
    goodFor: [
      'Home improvements and renovations',
      'Paying off high-interest debt like credit cards',
      'Covering a big expense like a medical bill or college tuition',
      'Having a flexible backup fund for ongoing needs',
      'Homeowners who have built up significant equity',
    ],
    notFor: [
      'Homeowners with little to no equity in their home',
      'People who need a fixed, predictable monthly payment (HELOCs have variable rates)',
      'Buyers who want a lump sum instead of a flexible line of credit',
      'Anyone who may struggle with the discipline of not over-borrowing',
    ],
  },

  dscr: {
    name: 'DSCR Investor Loan',
    tagline: 'Qualify based on the property\'s income — not yours.',
    what: 'A DSCR loan stands for Debt Service Coverage Ratio. It is a loan for investment properties. Instead of looking at your personal income, the lender looks at how much rent the property generates. If the rent covers the loan payment, you are in good shape.',
    goodFor: [
      'Real estate investors buying a rental property',
      'People who want to grow a portfolio without being limited by their personal income',
      'Self-employed investors whose tax returns do not reflect their full financial picture',
      'Buyers of single-family rentals, small multifamily, or short-term rentals',
      'Properties where the rent income covers the monthly payment',
    ],
    notFor: [
      'Buying a home you plan to live in (this is for investment properties only)',
      'Properties with low or no rental income',
      'People looking for the lowest possible rate (DSCR rates are higher than conventional)',
      'Buyers who cannot put down at least 20–25%',
    ],
  },

  'bank-statement': {
    name: 'Bank Statement Loan',
    tagline: 'For self-employed borrowers. Your deposits prove your income.',
    what: 'A bank statement loan is for people who are self-employed or run their own business. Instead of using tax returns to prove income, the lender looks at 12 to 24 months of your bank deposits. This matters because many business owners write off a lot of expenses — which makes their taxable income look smaller than what they actually earn.',
    goodFor: [
      'Business owners and entrepreneurs',
      'Freelancers, consultants, and 1099 contractors',
      'People with strong cash flow but low taxable income on paper',
      'Anyone who cannot qualify using tax returns alone',
      'Buyers with consistent and growing bank deposits',
    ],
    notFor: [
      'W-2 employees with traditional income — a conventional loan will get you a better rate',
      'People with inconsistent or declining bank deposits',
      'Buyers looking for the lowest possible rate (non-QM loans cost more)',
      'Borrowers who cannot put down a larger down payment',
    ],
  },

  'bridge-construction': {
    name: 'Bridge & Construction Loan',
    tagline: 'Finance the build. Or bridge the gap between two homes.',
    what: 'There are two types here. A construction loan pays for building a new home from the ground up. A bridge loan is short-term financing that helps you buy a new home before your current one sells. Both are designed for situations with a clear timeline and exit plan.',
    goodFor: [
      'Building a brand new home from scratch',
      'Buying a new home before your current home has sold',
      'Major renovation projects that need construction financing',
      'Buyers with a clear plan and a defined timeline',
      'People with strong equity or savings to support short-term financing',
    ],
    notFor: [
      'People looking for long-term permanent financing (these are short-term loans)',
      'Buyers who need a low-cost loan option',
      'Anyone without a clear exit strategy — construction and bridge loans are not meant to last',
      'Borrowers with limited equity or financial reserves',
    ],
  },
}

// ─── Static Params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(loans).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const loan = loans[params.slug]
  if (!loan) return {}
  return {
    title: `${loan.name} — Stevie De Gala`,
    description: loan.tagline,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoanPage({ params }: { params: { slug: string } }) {
  const loan = loans[params.slug]
  if (!loan) notFound()

  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <section className="bg-[#0A0A0A] py-16 md:py-24 px-6 border-b border-[#2E2E2E]">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/find-my-loan"
            className="inline-flex items-center gap-2 text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors mb-8"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Loan Finder
          </Link>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {loan.name}
          </h1>
          <p className="text-[#888888] text-xl leading-relaxed">{loan.tagline}</p>
        </div>
      </section>

      {/* What is it */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.2em] mb-4">What is it?</p>
          <p className="text-[#C4C4C4] text-lg leading-relaxed">{loan.what}</p>
        </div>
      </section>

      {/* Good for / Not for */}
      <section className="py-10 px-6 pb-20">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Good for */}
          <div className="bg-[#111111] border border-[#2E2E2E] rounded-2xl p-8" style={{ borderLeft: '3px solid #5C8A5C' }}>
            <p className="text-[#5C8A5C] text-xs uppercase tracking-widest mb-5">Good fit when...</p>
            <ul className="space-y-3">
              {loan.goodFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#5C8A5C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#C4C4C4] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not for */}
          <div className="bg-[#111111] border border-[#2E2E2E] rounded-2xl p-8" style={{ borderLeft: '3px solid #A55C5C' }}>
            <p className="text-[#A55C5C] text-xs uppercase tracking-widest mb-5">Probably not the right fit if...</p>
            <ul className="space-y-3">
              {loan.notFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#A55C5C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-[#888888] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111111] border-t border-[#2E2E2E] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl text-[#F8F8F8] mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Not sure if this is the right loan for you?
          </h2>
          <p className="text-[#888888] text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Take the loan finder quiz or book a free call. I will look at your full picture and tell you exactly what makes sense.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <BookCallButton variant="solid" label="Book a Free Call" />
            <Link
              href="/find-my-loan"
              className="inline-flex items-center gap-2 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors group"
            >
              Take the Loan Finder
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
