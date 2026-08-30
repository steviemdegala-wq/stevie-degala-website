import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Investor Line of Credit | Northern Colorado Real Estate | Stevie de Gala',
  description:
    'Revolving lines of credit for real estate investors in Fort Collins, Timnath, Windsor, Loveland, and Greeley. Access capital for acquisitions, renovations, and deal flow without refinancing. NMLS# 2845865',
  openGraph: {
    title: 'Investor Line of Credit | Northern Colorado Real Estate | Stevie de Gala',
    description:
      'Revolving investor credit lines for Northern Colorado real estate. Move fast on deals without tying up your portfolio.',
  },
}

const features = [
  {
    title: 'Revolving Access to Capital',
    body: 'Draw, repay, and redraw as deals come and go. Unlike a term loan, a line of credit stays available — so you can move quickly on acquisitions without waiting on a new approval each time.',
  },
  {
    title: 'No Need to Refinance Your Portfolio',
    body: 'Tapping a line of credit lets you access capital without touching the rates or terms on your existing properties. Your long-term debt structure stays intact while you fund short-term needs.',
  },
  {
    title: 'Qualification Based on Portfolio Strength',
    body: 'Investor lines are typically underwritten on the value and cash flow of your real estate portfolio — not just your personal income. Strong equity and rental income are your primary assets here.',
  },
  {
    title: 'Flexible Use of Funds',
    body: 'Use the line for a down payment on a new acquisition, to fund a renovation before refinancing, to cover holding costs between deals, or to bridge a gap in a 1031 exchange timeline.',
  },
]

const useCases = [
  {
    title: 'Acquisition Bridge',
    body: 'Spot a deal but your capital is deployed elsewhere. Draw on the line to close quickly, then refinance or sell to pay it back.',
  },
  {
    title: 'BRRRR Renovations',
    body: 'Fund the rehab phase of a Buy-Rehab-Rent-Refinance-Repeat cycle without a new hard money loan each time.',
  },
  {
    title: '1031 Exchange Timing',
    body: 'Cover the gap between selling one property and closing on a replacement to protect your exchange timeline.',
  },
  {
    title: 'Portfolio Scaling',
    body: 'Use the line as a consistent source of down payment capital as you grow, without liquidating positions.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an investor line of credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An investor line of credit is a revolving credit facility secured by real estate assets or portfolio equity. Unlike a term loan, you draw funds as needed, repay them, and draw again — making it a flexible capital tool for active real estate investors. It functions similarly to a HELOC but is structured for investment purposes rather than personal home equity.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does an investor line of credit differ from a HELOC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A HELOC is secured by your primary residence and used for personal needs. An investor line of credit is secured by investment property equity or your broader portfolio and is used for real estate investing activities. The qualification process, loan-to-value limits, and use of funds differ meaningfully between the two products.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I access with an investor line of credit in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lines go up to $10 million depending on your experience and portfolio strength. Credit limits are determined by your portfolio equity, cash flow, credit profile, and investment track record. Fort Collins, Timnath, and Windsor properties have appreciated significantly, meaning many Northern Colorado investors have more available equity than they realize. More experienced investors with documented deal history typically qualify for larger lines at better rates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to refinance my properties to get an investor line of credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. One of the key advantages of an investor line is that it does not require refinancing your existing properties. You preserve the rates and terms on your current loans while unlocking access to the equity you have built. This is particularly valuable for investors who locked in low rates and do not want to disturb them.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use an investor line of credit for a down payment on a new rental property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Using a line of credit for a down payment on an investment property is one of the most common applications. The draw comes from your line, you close on the new property, then you repay the line from cash flow or a refinance once the property is stabilized. It is one of the primary tools active investors use to scale without waiting to accumulate down payments from scratch.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of real estate investors use this product in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Investor lines of credit are most common among active investors with existing portfolios — BRRRR investors, fix-and-flip operators scaling to rental holds, and physicians or professionals who use real estate as a wealth-building vehicle alongside their career income. Windsor, Severance, Timnath, and the broader Weld and Larimer County markets offer strong opportunities given the active new construction and sustained rental demand.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is an investor line of credit different from a fix and flip line?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An investor line of credit is typically designed for buy-and-hold investors who want revolving capital to acquire or reposition rental properties. A fix and flip line is optimized for short-term acquisition and renovation with a defined exit. The structures overlap in some cases, but the underwriting focus and draw terms differ. I help investors identify which product fits their specific deal flow.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mortgagestevie.com' },
    { '@type': 'ListItem', position: 2, name: 'Loans', item: 'https://www.mortgagestevie.com/loans' },
    { '@type': 'ListItem', position: 3, name: 'Investor Line of Credit', item: 'https://www.mortgagestevie.com/loans/investor-line-of-credit' },
  ],
}

export default function InvestorLineOfCreditPage() {
  return (
    <main className="pt-16 md:pt-20">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/loans" className="text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors flex items-center gap-2 mb-10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Loans
          </Link>
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">Investor Line of Credit — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Capital that moves as fast as your deals do.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            A revolving line of credit backed by your portfolio equity. Draw when you need it, repay when you can, and keep your long-term debt structure exactly where you want it.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed mb-10">
            Serving real estate investors across Fort Collins, Greeley, Loveland, Timnath, Windsor, Severance, and throughout Northern Colorado.
          </p>
          {/* Loan terms snapshot */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[#2E2E2E] rounded-xl overflow-hidden">
            {[
              { label: 'Line Size', value: 'Up to $10M' },
              { label: 'Close Timeline', value: '~10 days' },
              { label: 'Current Rate', value: 'High 8s–9%' },
              { label: 'Structure', value: 'Pre-approved revolving' },
            ].map((item) => (
              <div key={item.label} className="bg-[#111111] px-6 py-5">
                <p className="text-[#555555] text-[10px] uppercase tracking-[0.2em] mb-1">{item.label}</p>
                <p className="text-[#F8F8F8] text-lg font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-[#555555] text-xs mt-3">Rate varies by experience and deal profile. Terms subject to lender approval. NMLS# 2845865.</p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Why investors use a line of credit.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            The investors who scale fastest are not the ones with the most cash — they are the ones who have access to capital exactly when they need it.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3 className="text-xl text-[#0A0A0A] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{f.title}</h3>
                <p className="text-[#444444] text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">How Investors Use It</p>
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Four common applications.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            Every investor's situation is different — but most of the use cases fall into one of these categories.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((u) => (
              <div key={u.title} className="border border-[#2E2E2E] bg-[#111111] p-8 rounded-xl">
                <h3 className="text-lg text-[#F8F8F8] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{u.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Who It&apos;s For</p>
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Best fit for active investors with an existing portfolio.
          </h2>
          <div className="space-y-4 mb-10">
            {[
              { label: 'Existing equity', detail: 'The line is secured by portfolio equity. The more you have built across Fort Collins, Timnath, Windsor, and Northern Colorado, the more capital is available to you.' },
              { label: 'Active deal flow', detail: 'If you are acquiring, renovating, or repositioning properties consistently, the revolving structure earns its keep — you are not resetting approval each time.' },
              { label: 'Long-term hold strategy', detail: 'Investors who plan to hold properties and build passive income use the line to grow without disrupting existing loans or the rates locked on current properties.' },
              { label: 'Physicians and professionals with investment portfolios', detail: 'High-income professionals who invest alongside their career often have significant equity but limited liquid capital. A line bridges that gap efficiently.' },
            ].map((item) => (
              <div key={item.label} className="border-b border-[#2E2E2E] pb-4 grid md:grid-cols-3 gap-4">
                <span className="text-[#F8F8F8] text-sm font-medium">{item.label}</span>
                <span className="text-[#888888] text-sm leading-relaxed md:col-span-2">{item.detail}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link href="/loans/dscr" className="text-[#5C8AA5] text-sm hover:underline">Compare: DSCR loan →</Link>
            <Link href="/loans/fix-and-flip" className="text-[#5C8AA5] text-sm hover:underline">Compare: Fix &amp; Flip line →</Link>
            <Link href="/loans/heloc" className="text-[#5C8AA5] text-sm hover:underline">Compare: HELOC →</Link>
            <Link href="/who-i-help/investors" className="text-[#5C8AA5] text-sm hover:underline">How I work with investors →</Link>
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
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Ready to put your portfolio equity to work?
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to look at your portfolio, calculate available equity, and structure a line that matches how you actually invest.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
