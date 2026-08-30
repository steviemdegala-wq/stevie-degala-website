import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Investor Line of Credit | Fix & Flip Financing | Northern Colorado | Stevie de Gala',
  description:
    'Pre-approved revolving lines of credit for fix and flip investors in Fort Collins, Timnath, Windsor, Loveland, and Greeley. Close in ~10 days. Up to $10M. NMLS# 2845865',
  openGraph: {
    title: 'Investor Line of Credit | Fix & Flip Financing | Northern Colorado | Stevie de Gala',
    description:
      'Pre-approved revolving credit for fix and flip investors in Northern Colorado. Draw, flip, repay, repeat. Up to $10M.',
  },
}

const features = [
  {
    title: 'Pre-Approved and Ready to Draw',
    body: 'Get approved once for a line up to $10M. When a deal comes in, you draw — no new application, no underwriting delay. That speed is what makes your offer competitive against all-cash buyers.',
  },
  {
    title: 'Non-Contingent Offers',
    body: 'Because the capital is pre-approved and available, you can write non-contingent offers on distressed properties. In a market where speed is leverage, that is a structural advantage most buyers cannot match.',
  },
  {
    title: 'Covers Acquisition and Renovation',
    body: 'One draw funds the purchase. A second covers the rehab. You are not juggling multiple loan products or waiting on a new approval mid-project — the line handles the full deal cycle.',
  },
  {
    title: 'Draw, Flip, Repay, Repeat',
    body: 'Close, renovate, sell, pay back the line, and move to the next deal — all without reapplying. The revolving structure is designed for investors who do this consistently, not once.',
  },
]

const useCases = [
  {
    title: 'Distressed Property Acquisitions',
    body: 'Draw on the line to close quickly on undervalued properties before they hit the open market or go to the next buyer in line.',
  },
  {
    title: 'Acquisition + Full Rehab',
    body: 'Fund both the purchase and the renovation from a single pre-approved line. No separate hard money loan. No mid-project financing gaps.',
  },
  {
    title: 'BRRRR Path',
    body: 'Use the line for Buy-Rehab. Once the property is stabilized and rented, refinance with a DSCR loan and pay the line back down — ready for the next project.',
  },
  {
    title: 'Running Multiple Projects',
    body: 'If your line is large enough, you can fund more than one deal at a time. Draw for project A while project B is still under rehab — without waiting on either to close.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an investor line of credit for fix and flip?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An investor line of credit for fix and flip is a pre-approved revolving credit facility that lets you draw capital for property acquisitions and renovations, then repay it when you sell — and draw again on the next deal. Unlike a single-project hard money loan, the line stays open and available, so you are not reapplying every time. You get approved once and execute repeatedly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I access with a fix and flip line of credit in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lines go up to $10 million depending on your experience and deal history. More experienced investors with a documented track record of completed flips typically qualify for larger lines at better rates. Fort Collins, Timnath, Windsor, and Loveland offer strong deal flow and strong ARVs — both factors that support higher line approvals.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the current rates on a fix and flip line of credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Current rates are in the high 8s to 9% range depending on experience and deal profile. That is meaningfully lower than traditional hard money, which typically runs 10–15% or higher. The revolving structure also means you are only paying interest on what you have drawn, not on the full line.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can I close with a fix and flip line of credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typically around 10 days once a deal is under contract. Because the line is pre-approved, there is no new underwriting for each transaction — the lender is reviewing the specific deal, not re-qualifying you as a borrower. That speed lets you write non-contingent offers and compete with cash buyers on distressed properties.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a fix and flip line of credit compare to hard money?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hard money loans are single-project: you apply, close, execute, repay, and start over for the next deal. A revolving line of credit is pre-approved — you draw and repay repeatedly without reapplying. Hard money rates typically run 10–15%+. The line runs in the high 8s–9%. For investors doing consistent volume, the line is faster, cheaper, and less administratively burdensome.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use the line for both acquisition and renovation costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can draw for the purchase and draw again for the renovation — or structure a single draw that covers both. The line is designed to handle the full fix and flip cycle, not just one piece of it.',
      },
    },
    {
      '@type': 'Question',
      name: 'What fix and flip markets in Northern Colorado does this cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I work with investors across Fort Collins, Timnath, Windsor, Loveland, Greeley, and Severance. Each market has a different mix of distressed inventory, ARV ceiling, and buyer demand. Fort Collins has the strongest ARVs driven by CSU and employment density. Windsor and Timnath have active appreciation from new construction adjacency. Greeley and Loveland offer lower acquisition costs with solid rental and resale demand.',
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">Investor Line of Credit — Fix &amp; Flip — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Capital that moves as fast as your deals do.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            A pre-approved revolving line of credit for fix and flip investors. Get approved once, draw on each deal, repay when you sell, and move to the next one — without reapplying every time.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed mb-10">
            Serving fix and flip investors across Fort Collins, Greeley, Loveland, Timnath, Windsor, Severance, and Northern Colorado.
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
            Why fix and flip investors use a line of credit.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            The investors who close more deals are not the ones with the most cash — they are the ones with capital already approved and ready to deploy when the deal shows up.
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
            Built for investors doing consistent deal volume.
          </h2>
          <div className="space-y-4 mb-10">
            {[
              { label: 'Active fix and flip operators', detail: 'If you are closing multiple projects per year in Fort Collins, Timnath, Windsor, or the broader Northern Colorado market, the revolving structure means you are not starting from zero on capital every time.' },
              { label: 'Investors transitioning from hard money', detail: 'If you have completed several deals and want to stop paying 10–15%+ on single-project hard money loans, a pre-approved line at high 8s–9% is the next step.' },
              { label: 'BRRRR operators', detail: 'Use the line for the buy-and-rehab phase, then refinance into a DSCR loan once the property is stabilized and rented. Pay the line back down and repeat.' },
              { label: 'Physicians and high-income professionals flipping on the side', detail: 'High income gives you the qualification strength. A pre-approved line lets you act when deals show up without pulling capital from your practice or primary home.' },
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
            Ready to stop reapplying on every deal?
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to look at your deal history, determine your line size, and get you set up to close your next flip in 10 days.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
