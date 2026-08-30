import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Home Loan Programs | Northern Colorado | Stevie de Gala',
  description:
    'Physician loans, VA loans, FHA, conventional, jumbo, DSCR, HELOC, refinance, bank statement, USDA, and bridge loans in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. NMLS# 2845865',
  openGraph: {
    title: 'Home Loan Programs | Northern Colorado | Stevie de Gala',
    description:
      'Every loan program available in Northern Colorado — with a specialty in physician loans and VA loans. Fort Collins, Greeley, Loveland, Timnath, Windsor, Severance.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mortgagestevie.com' },
    { '@type': 'ListItem', position: 2, name: 'Loans', item: 'https://www.mortgagestevie.com/loans' },
  ],
}

const specialtyLoans = [
  {
    href: '/loans/doctor-loan',
    label: 'Physician Loan',
    description:
      'Zero down, no PMI, student debt excluded from DTI. Built for MD, DO, DDS, NP, PA, CRNA, PharmD, and more. Available up to $2M with no down payment.',
  },
  {
    href: '/loans/va',
    label: 'VA Loan',
    description:
      'Zero down, no PMI, competitive government-backed rates. Available to veterans, active duty, National Guard, Reserves, and eligible surviving spouses.',
  },
  {
    href: '/loans/investor-loc',
    label: 'Investor Line of Credit',
    description:
      'Revolving credit lines for real estate investors. Access capital quickly for acquisitions, renovations, or bridging gaps between deals — without refinancing your existing portfolio.',
  },
]

const otherLoans = [
  {
    href: '/loans/fha',
    label: 'FHA Loan',
    description: '3.5% down with credit scores as low as 580. The stepping-stone program for buyers building toward stronger financing.',
  },
  {
    href: '/loans/conventional',
    label: 'Conventional Loan',
    description: 'The standard mortgage for buyers with solid credit and documented income. Works for primary homes, second homes, and investment properties.',
  },
  {
    href: '/loans/jumbo',
    label: 'Jumbo Loan',
    description: 'Financing above conforming loan limits for high-value properties. Rates and qualifications vary — competitive for strong profiles.',
  },
  {
    href: '/loans/dscr',
    label: 'DSCR Loan',
    description: 'Debt-service coverage ratio loans for investment properties. Qualify on rental income, not personal income. No W-2 or tax returns required.',
  },
  {
    href: '/loans/refinance',
    label: 'Refinance',
    description: 'Rate-and-term, cash-out, and VA IRRRL streamline refinances. Break-even analysis included so you know when it actually makes sense.',
  },
  {
    href: '/loans/heloc',
    label: 'HELOC',
    description: 'Home equity line of credit. Access your equity as a revolving credit line. Useful for renovations, debt paydown, or investment.',
  },
  {
    href: '/loans/bank-statement',
    label: 'Bank Statement Loan',
    description: '12–24 months of deposits in lieu of tax returns. Built for self-employed borrowers, locum tenens physicians, and business owners.',
  },
  {
    href: '/loans/usda',
    label: 'USDA Loan',
    description: 'Zero-down financing for eligible rural and semi-rural properties. Some Northern Colorado areas qualify — including parts of Weld County.',
  },
  {
    href: '/loans/bridge-construction',
    label: 'Bridge & Construction',
    description: 'Bridge loans for buying before your current home sells. Construction loans for building new. Both are short-term products with specific use cases.',
  },
]

export default function LoansPage() {
  return (
    <main className="pt-16 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors flex items-center gap-2 mb-10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">Loan Programs — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Every loan program available. Two that I specialize in.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            Physician loans and VA loans are where most of my clients start — and where I have the deepest expertise. Every other program below is available when the situation calls for it.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Serving Fort Collins, Greeley, Loveland, Timnath, Windsor, Severance, and throughout Northern Colorado.
          </p>
        </div>
      </section>

      {/* Specialty Loans */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Where I Specialize</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Physician loans and VA loans.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            These two programs have the most nuance — and the most upside when structured correctly. Most of my clients are medical professionals or veterans.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {specialtyLoans.map((loan) => (
              <Link
                key={loan.href}
                href={loan.href}
                className="group block bg-white border border-[#E5E5E5] p-8 rounded-xl hover:border-[#0A0A0A] transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#7A9E5C] text-base leading-none">★</span>
                  <h3
                    className="text-xl text-[#0A0A0A] group-hover:text-[#0A0A0A]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {loan.label}
                  </h3>
                </div>
                <p className="text-[#444444] text-sm leading-relaxed mb-4">{loan.description}</p>
                <span className="text-[#0A0A0A] text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Loan Programs */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">All Programs</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            More loan programs.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            When a physician loan or VA loan is not the right fit, there is almost always another path. These programs cover a wide range of borrower profiles and property types.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {otherLoans.map((loan) => (
              <Link
                key={loan.href}
                href={loan.href}
                className="group block bg-[#111111] border border-[#2E2E2E] p-6 rounded-xl hover:border-[#555555] transition-all"
              >
                <h3
                  className="text-lg text-[#F8F8F8] mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {loan.label}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed mb-4">{loan.description}</p>
                <span className="text-[#555555] text-sm flex items-center gap-1 group-hover:text-[#F8F8F8] group-hover:gap-2 transition-all">
                  Learn more <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Find My Loan CTA */}
      <section className="bg-[#111111] border-t border-[#2E2E2E] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Not sure which program fits?
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            Answer a few questions and get a recommendation in under two minutes. No account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/find-my-loan"
              className="border border-[#F8F8F8] text-[#F8F8F8] px-6 py-3 rounded-full text-sm hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all tracking-wide"
            >
              Find My Loan
            </Link>
            <BookCallButton variant="solid" />
          </div>
        </div>
      </section>
    </main>
  )
}
