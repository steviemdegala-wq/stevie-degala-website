import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Investment Property Financing | Northern Colorado Investors | Stevie de Gala',
  description:
    'DSCR loans, investor lines of credit, bank statement loans, and portfolio financing for real estate investors in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. A broker who has been in the deal. NMLS# 2845865',
  openGraph: {
    title: 'Investment Property Financing | Northern Colorado Real Estate Investors',
    description:
      'DSCR loans, investor credit lines, and portfolio financing for real estate investors across the Northern Colorado Front Range.',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What loan programs are available for investment properties in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The primary programs for investors in Northern Colorado are DSCR loans (which qualify based on rental income rather than personal income), investor lines of credit (revolving access to portfolio equity), bank statement loans (for self-employed investors), conventional investment property loans, and bridge loans for acquiring properties before your current home sells or before a stabilization refi. Each has a different use case — I run the numbers on all of them against your specific deal before recommending.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a DSCR loan and how does it work for Northern Colorado investors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A DSCR (Debt Service Coverage Ratio) loan qualifies based on the rental income the investment property generates — not on your personal W-2 or tax returns. If the monthly rent covers the loan payment (typically a DSCR of 1.0 or above), you can qualify regardless of your personal income situation. Northern Colorado has strong rental demand across Fort Collins, Greeley, Windsor, and Loveland — making DSCR viable for most stabilized rental acquisitions in this market.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use my existing home equity to fund an investment property purchase in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. An investor line of credit secured by your existing portfolio equity — or a HELOC on your primary residence — gives you revolving access to capital for acquisitions, renovations, or bridging gaps between deals. This approach lets you move quickly on new investments without refinancing your existing properties or waiting to accumulate a full down payment from scratch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to show personal income to qualify for an investment property loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Not necessarily. DSCR loans require no personal income documentation — the property's rent covers the qualification. Bank statement loans use 12–24 months of deposit history instead of tax returns. For investors whose reported taxable income does not reflect their actual financial picture, these products are often the most practical path.",
      },
    },
    {
      '@type': 'Question',
      name: 'What markets in Northern Colorado are best for investment properties right now?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Windsor, Severance, and Timnath have active new construction markets with strong rental demand from professionals commuting along the I-25 corridor. Greeley offers lower acquisition costs and consistent rental demand tied to the University of Northern Colorado and the broader industrial/agricultural employment base. Fort Collins has strong long-term appreciation but higher entry prices. The right market depends on your strategy — cash flow versus appreciation, single-family versus multifamily.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a physician or high-income professional use investor loan products in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Physicians and other high-income professionals who invest in real estate alongside their career income often benefit from DSCR loans (which keep investment property qualification separate from their primary residence financing) and investor lines of credit (which allow portfolio growth without disturbing existing loan structures). Many of my physician loan clients also end up as real estate investors — both strategies work well together.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgagestevie.com' },
    { '@type': 'ListItem', position: 2, name: 'Who I Help', item: 'https://mortgagestevie.com/who-i-help' },
    { '@type': 'ListItem', position: 3, name: 'Investors', item: 'https://mortgagestevie.com/who-i-help/investors' },
  ],
}

const loanProducts = [
  {
    href: '/loans/dscr',
    label: 'DSCR Loan',
    description: 'Qualify on the property\'s rental income — not your personal income. No W-2 or tax returns required. The core product for scaling a rental portfolio.',
  },
  {
    href: '/loans/investor-loc',
    label: 'Investor Line of Credit',
    description: 'Revolving credit secured by portfolio equity. Draw for acquisitions, pay back, draw again. No need to refinance existing loans to access capital.',
  },
  {
    href: '/loans/bank-statement',
    label: 'Bank Statement Loan',
    description: '12–24 months of deposits in lieu of tax returns. For self-employed investors whose taxable income understates their actual cash position.',
  },
  {
    href: '/loans/bridge-construction',
    label: 'Bridge & Construction',
    description: 'Short-term capital to acquire before you sell, or to fund a build-to-rent. Designed for investors with a defined exit plan.',
  },
  {
    href: '/loans/heloc',
    label: 'HELOC',
    description: 'Tap equity from your primary residence or existing investment property as a flexible credit line. Useful for renovation funding and deal bridging.',
  },
  {
    href: '/loans/conventional',
    label: 'Conventional Investment',
    description: 'Standard financing for investment properties for well-qualified borrowers. Requires 15–25% down and documented personal income.',
  },
]

const steps = [
  { num: '01', title: 'Free call', body: 'We talk through your deal, your portfolio, and what the right financing structure actually looks like. No forms, no commitment.' },
  { num: '02', title: 'I review the numbers', body: 'I look at the deal and identify the best loan structures — DSCR, portfolio products, or creative structures that fit your strategy.' },
  { num: '03', title: 'I shop the market', body: 'I am not limited to one lender. I go to the market and bring back the most competitive options available for your specific deal.' },
  { num: '04', title: 'You close and move', body: 'I stay with you through closing. You always know where things stand so you can focus on the next acquisition.' },
]

export default function InvestorsPage() {
  return (
    <main className="pt-16 md:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/who-i-help" className="text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors flex items-center gap-2 mb-10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Who I Help
          </Link>
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">For Investors — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            More options. Better terms. A broker who has been in the deal.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            I have developed property from the ground up, invested in multifamily, and spent years inside commercial real estate underwriting. You get a broker who understands the deal — not just the application.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Serving real estate investors across Fort Collins, Greeley, Loveland, Timnath, Windsor, Severance, and throughout Northern Colorado and East Texas.
          </p>
        </div>
      </section>

      {/* Loan Products */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Financing Options</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The right product depends on the deal.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            Local lenders give you one or two options. I compare every structure available for your specific situation — and recommend the one that actually fits your strategy.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {loanProducts.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group block card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl"
              >
                <h3
                  className="text-lg text-[#0A0A0A] mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {product.label}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed mb-4">{product.description}</p>
                <span className="text-[#0A0A0A] text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Why Work With Me</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            I have been on the investor side of this.
          </h2>
          <div className="space-y-4 mb-10">
            {[
              { label: 'Ground-up development', detail: 'My senior capstone at BYU was a self-storage facility I developed from scratch in Gilmer, Texas. Permitting, financing, construction, lease-up — I ran it.' },
              { label: 'Commercial RE underwriting background', detail: 'Before mortgage brokering, I worked at a commercial real estate AI underwriting software company. I understand how deals are analyzed, not just how loans are processed.' },
              { label: 'Multifamily investment experience', detail: 'I have invested in multifamily properties personally. When I talk about cash flow, DSCR ratios, and portfolio strategy, it is not from a textbook.' },
              { label: 'Not limited to one lender', detail: 'As a broker, I access dozens of lenders — including portfolio lenders who hold DSCR and investor LOC products that bank-affiliated loan officers cannot offer.' },
            ].map((item) => (
              <div key={item.label} className="border-b border-[#2E2E2E] pb-4 grid md:grid-cols-3 gap-4">
                <span className="text-[#F8F8F8] text-sm font-medium">{item.label}</span>
                <span className="text-[#888888] text-sm leading-relaxed md:col-span-2">{item.detail}</span>
              </div>
            ))}
          </div>
          <p className="text-[#555555] text-xs italic leading-relaxed">
            The self-storage facility I developed in Gilmer, Texas started as a senior capstone project. Completing it from scratch is what turned real estate from a career into a calling.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-12"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The process is simple. The results are not.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.num} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <p className="text-4xl text-[#0A0A0A] font-bold mb-4 leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.num}</p>
                <h3 className="text-lg text-[#0A0A0A] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.title}</h3>
                <p className="text-[#555555] text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-12" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Frequently asked questions.
          </h2>
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

      {/* CTA */}
      <section className="bg-[#111111] border-t border-[#2E2E2E] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Let&apos;s talk about your next deal.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call is all it takes to find out what better capital could do for your portfolio.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
