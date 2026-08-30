import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Bridge & Construction Loans | Northern Colorado | Stevie de Gala',
  description:
    'Bridge loans and construction financing in Northern Colorado. Buy your next home before selling, or finance a new build from ground up. Fort Collins, Greeley, Loveland, Timnath, Windsor, Severance. NMLS# 2845865',
}

const bridgeFeatures = [
  {
    title: 'Buy Before You Sell',
    body: 'A bridge loan uses the equity in your current home to fund the down payment on your next one — so you can move on your timeline, not the market\'s. No contingency offers. No waiting.',
  },
  {
    title: 'Short-Term Structure',
    body: 'Bridge loans are designed for 6 to 12 months. You close on the new home, list and sell the old one, then pay off the bridge. Once the sale closes, the bridge loan is retired.',
  },
  {
    title: 'Avoids the Disruption of Two Moves',
    body: 'Without a bridge loan, most buyers have to sell first, find temporary housing, and then buy — two moves, a storage unit, and months of disruption. A bridge loan collapses that into a single transition.',
  },
]

const constructionFeatures = [
  {
    title: 'Ground-Up Construction Financing',
    body: 'Construction loans fund the build in draws as work is completed — not all at once upfront. You pay interest only on what has been drawn during the build phase.',
  },
  {
    title: 'Construction-to-Permanent',
    body: 'One-time close construction loans convert automatically to a permanent mortgage when the build is complete. One application, one closing, one set of closing costs — then a standard long-term payment.',
  },
  {
    title: 'New Construction Communities',
    body: 'Timnath, Windsor, and Severance are growing rapidly with spec and custom builds. I work regularly with buyers financing new construction in these communities and understand the builder and lender timelines involved.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a bridge loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A bridge loan is a short-term loan — typically 6 to 12 months — that uses the equity in your current home to fund the purchase of your next one. It bridges the gap between buying and selling, allowing you to move into your new home before your old one has sold. Once the old home sells, the proceeds pay off the bridge loan. Bridge loans allow buyers to make non-contingent offers, which is a significant advantage in competitive markets like Fort Collins and Loveland.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a bridge loan work in a competitive Northern Colorado market?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In competitive markets, contingent offers — where your purchase depends on your existing home selling first — are often rejected or significantly disadvantaged against non-contingent buyers. A bridge loan allows you to make a clean, non-contingent offer on your next home using equity from your current one, without requiring the sale to close first. This can be the difference between securing the property you want and losing it to a cleaner offer.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a construction loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A construction loan is short-term financing that funds the building of a new home. Funds are disbursed in stages — called draws — as construction milestones are completed and inspected. During the build, you typically pay interest only on the amount that has been drawn. At completion, the construction loan either converts to a permanent mortgage (one-time close) or is refinanced into a new permanent loan (two-time close).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a one-time close construction loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A one-time close — or construction-to-permanent — loan combines the construction financing and the long-term mortgage into a single loan with one closing. You lock your permanent rate at the beginning, pay interest-only during the build, and the loan automatically converts to a 30-year fixed mortgage at completion. This avoids the cost and uncertainty of a second closing and rate lock after the build.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a VA loan be used for new construction in Timnath or Windsor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. VA loans can be used for new construction purchases in Timnath, Windsor, Severance, and other Northern Colorado communities. VA new construction loans require a VA-approved appraisal and a one-year builder warranty. The process involves additional steps compared to an existing home purchase, but I work through new construction VA transactions regularly and can coordinate with the builder\'s team.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a construction loan take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Construction loan timelines depend on the build. A custom home may take 9 to 18 months from closing to completion. Spec homes in active communities like Windsor or Timnath are often faster — some builders have homes ready in 4 to 8 months. During construction, the lender conducts regular inspections to release draws. I stay engaged through the process so draws happen without delays and the conversion to permanent financing is smooth.',
      },
    },
  ],
}

export default function BridgeConstructionPage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">Bridge & Construction — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Move on your timeline. Build on your terms.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            Bridge loans let you buy before you sell — no contingencies, no two moves. Construction loans fund a new build from the ground up and convert to permanent financing at completion. Two different tools for the same goal: getting into the right home.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Serving buyers and builders throughout Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance.
          </p>
        </div>
      </section>

      {/* Bridge */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Bridge Loans</p>
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Buy the next home. Then sell the old one.</h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">Short-term financing that uses your current home&apos;s equity to fund the next purchase — without a sale contingency.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {bridgeFeatures.map((f) => (
              <div key={f.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3 className="text-xl text-[#0A0A0A] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{f.title}</h3>
                <p className="text-[#444444] text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Construction Loans</p>
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Finance the build. Convert to permanent.</h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">From ground up to move-in — construction financing that works alongside your builder and converts to a long-term mortgage at completion.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {constructionFeatures.map((f) => (
              <div key={f.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3 className="text-xl text-[#0A0A0A] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{f.title}</h3>
                <p className="text-[#444444] text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
          <p className="text-[#555555] text-xs leading-relaxed max-w-2xl">
            Veterans building in Timnath, Windsor, or Severance: VA loans can be used for new construction purchases. <Link href="/loans/va" className="text-[#7A9E5C] hover:underline">See VA loan details →</Link>
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-12" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Frequently asked questions.</h2>
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

      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Bridge, build, or both — let&apos;s map out the financing.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to walk through your situation — whether you are moving up, building from scratch, or navigating the timing between the two.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
