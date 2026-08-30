import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Fix and Flip Line of Credit | Northern Colorado | Stevie de Gala',
  description:
    'Fix and flip lines of credit for real estate investors in Fort Collins, Greeley, Loveland, Windsor, and Northern Colorado. Make faster offers, skip financing contingencies, and close before bank-dependent buyers can respond. NMLS# 2845865',
  openGraph: {
    title: 'Fix and Flip Line of Credit | Northern Colorado | Stevie de Gala',
    description:
      'A revolving fix and flip credit line means your next offer does not wait on a bank. Move fast, win deals, close with confidence.',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a fix and flip line of credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A fix and flip line of credit is a revolving credit facility designed for real estate investors who buy, renovate, and resell properties. Unlike a single-use loan that requires a new underwriting process for every deal, a line of credit stays open and available. You draw funds when you need them — for the purchase, the renovation, or both — and repay when the property sells. Then the line resets and you do it again.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a fix and flip line of credit help me make stronger offers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When you have an approved line of credit, you can make non-contingent or fast-close offers — the kind sellers prefer. Buyers who depend on bank financing at the time of the offer typically need 30-45 days and include financing contingencies. With a line of credit already in place, you can offer a 10-14 day close with no financing contingency, which makes your offer structurally stronger regardless of price. Across Northern Colorado — Fort Collins, Greeley, Loveland, Windsor — that speed advantage wins deals.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a fix and flip line of credit and hard money?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hard money loans are single-use, asset-based loans that go through full underwriting for each deal — higher rates (typically 10-15%+), origination points, and a new process every time. A fix and flip line of credit is underwritten once and then revolves: draw, repay, and draw again without starting over. Over time, a line is typically cheaper and faster than stacking hard money loans deal after deal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I need to qualify for a fix and flip line of credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Qualification is primarily based on your real estate experience and portfolio strength — not your W-2 income. Most lenders want to see a track record of completed flips or rental acquisitions, a minimum credit score (typically 650+), and existing real estate equity to collateralize the line. First-time flippers typically start with a single-deal bridge or hard money loan to build a track record before graduating to a revolving line.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use a fix and flip line of credit in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Northern Colorado is active for fix and flip investing. Fort Collins has strong buyer demand for renovated properties near CSU and along the I-25 corridor. Greeley offers lower acquisition costs with consistent rental demand tied to UNC and local employment. Windsor and Loveland have growing pools of value-add inventory as the region expands. I work with investors across Northern Colorado and can structure a line around your specific deal flow.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can I access funds once the line is approved?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Once your line is established, draws are typically available within 24-72 hours — sometimes same-day depending on the lender and draw amount. This is the core advantage: the underwriting work is done upfront, so draws are operational rather than analytical. Compare that to a new loan, which restarts the full approval process each time.',
      },
    },
  ],
}

const advantages = [
  {
    title: 'No new approval for each deal',
    body: 'The line is underwritten once. Every subsequent draw is operational — not a new loan application. You identify the deal, draw the funds, and close.',
  },
  {
    title: 'Make non-contingent offers',
    body: 'A financing contingency signals uncertainty to sellers. With a line already in place, you remove it. That structurally stronger offer wins deals at the same price — or lower.',
  },
  {
    title: 'Close in 10-14 days',
    body: 'Sellers choose fast closes when they can. Bank-financed buyers take 30-45 days. Your line of credit makes a 10-14 day close routine, not exceptional.',
  },
  {
    title: 'Cover purchase and renovation',
    body: 'Draw for the acquisition, draw again as renovation milestones are hit. One facility, one approval, total flexibility across the deal lifecycle.',
  },
  {
    title: 'Revolves as you repay',
    body: 'When the property sells and you repay the draw, the full amount becomes available again immediately. No wait. No reapplication. Your capacity resets.',
  },
  {
    title: 'Cheaper than stacking hard money',
    body: 'Hard money origination points add up deal after deal. A revolving line pays those costs once. For investors doing 3+ flips per year, the savings are significant.',
  },
]

const comparison = [
  {
    scenario: 'Traditional bank financing',
    timeline: '30–45 days',
    contingency: 'Required',
    reuse: 'New application each deal',
    cost: 'Lower rate, high time cost',
  },
  {
    scenario: 'Hard money loan',
    timeline: '7–14 days',
    contingency: 'Usually removed',
    reuse: 'New loan each deal',
    cost: '10–15%+ rate + 2–4 points',
  },
  {
    scenario: 'Fix & Flip Line of Credit',
    timeline: '24–72 hours after approval',
    contingency: 'Removed',
    reuse: 'Revolves — draw and repay',
    cost: 'One-time underwriting, competitive draws',
  },
]

export default function FixAndFlipPage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">Fix &amp; Flip Line of Credit</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Stop waiting on a bank. Make the offer. Win the deal.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-8">
            A fix and flip line of credit means your next offer is not contingent on financing approval. The capital is already in place. You identify the deal, draw the funds, and close — while bank-dependent buyers are still filling out applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <BookCallButton variant="solid" label="Talk About Your Next Flip" />
            <Link
              href="/loans/investor-line-of-credit"
              className="inline-flex items-center gap-2 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors group"
            >
              Also: Investor Line of Credit
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Speed Advantage — The Core Argument */}
      <section className="bg-[#111111] border-b border-[#2E2E2E] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">The Speed Advantage</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sellers do not wait. Bank buyers lose.
          </h2>
          <p className="text-[#C4C4C4] text-lg leading-relaxed mb-12 max-w-3xl">
            Across Northern Colorado — Fort Collins, Greeley, Loveland, Windsor — well-priced distressed and value-add properties move fast. The investors who consistently win are not the ones with the highest offer — they are the ones with committed capital who can close in two weeks and remove the financing contingency. A fix and flip line of credit is how you become that buyer.
          </p>

          {/* Comparison table */}
          <div className="rounded-2xl overflow-hidden border border-[#2E2E2E]">
            <div className="grid grid-cols-4 bg-[#1A1A1A] border-b border-[#2E2E2E]">
              <div className="px-5 py-3 border-r border-[#2E2E2E]">
                <p className="text-[#888888] text-xs uppercase tracking-widest">Financing Type</p>
              </div>
              <div className="px-5 py-3 border-r border-[#2E2E2E]">
                <p className="text-[#888888] text-xs uppercase tracking-widest">Time to Close</p>
              </div>
              <div className="px-5 py-3 border-r border-[#2E2E2E]">
                <p className="text-[#888888] text-xs uppercase tracking-widest">Contingency</p>
              </div>
              <div className="px-5 py-3">
                <p className="text-[#888888] text-xs uppercase tracking-widest">Reusability</p>
              </div>
            </div>
            {comparison.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 border-b border-[#2E2E2E] last:border-b-0 ${i === 2 ? 'bg-[#0F1A0F]' : i % 2 === 0 ? 'bg-[#0A0A0A]' : 'bg-[#111111]'}`}
              >
                <div className="px-5 py-4 border-r border-[#2E2E2E]">
                  <span className={`text-sm font-medium ${i === 2 ? 'text-[#7A9E5C]' : 'text-[#888888]'}`}>{row.scenario}</span>
                </div>
                <div className="px-5 py-4 border-r border-[#2E2E2E]">
                  <span className={`text-sm ${i === 2 ? 'text-[#F8F8F8]' : 'text-[#888888]'}`}>{row.timeline}</span>
                </div>
                <div className="px-5 py-4 border-r border-[#2E2E2E]">
                  <span className={`text-sm ${i === 2 ? 'text-[#F8F8F8]' : 'text-[#888888]'}`}>{row.contingency}</span>
                </div>
                <div className="px-5 py-4">
                  <span className={`text-sm ${i === 2 ? 'text-[#F8F8F8]' : 'text-[#888888]'}`}>{row.reuse}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Why a Line of Credit</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-12 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            How a revolving line changes the math on every deal.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((item) => (
              <div key={item.title} className="border border-[#2E2E2E] bg-[#111111] p-8 rounded-xl">
                <h3
                  className="text-[#F8F8F8] text-lg mb-3 leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Markets */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Northern Colorado Markets</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-10 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Northern Colorado rewards speed. Here is why.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0A0A0A] border border-[#2E2E2E] p-8 rounded-xl">
              <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">Fort Collins</p>
              <p className="text-[#C4C4C4] text-sm leading-relaxed">
                Fort Collins has a deep pool of 1960s–1990s single-family and small multifamily inventory that trades at a discount to updated properties. CSU-driven rental demand means renovated units rent quickly and sell at a premium. Investors with fast capital consistently acquire at better prices — sellers know the difference between a real offer and a contingent one.
              </p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#2E2E2E] p-8 rounded-xl">
              <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">Greeley, Windsor &amp; Loveland</p>
              <p className="text-[#C4C4C4] text-sm leading-relaxed">
                Greeley offers lower acquisition costs with consistent rental demand from UNC and local industry — making it one of the strongest cash-flow markets in Northern Colorado. Windsor and Loveland have growing value-add inventory as the region expands east and south. In all three markets, fast-close offers with no financing contingency structurally outperform bank-dependent bids regardless of price.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Common Questions</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-10 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            How fix and flip lines actually work.
          </h2>
          <div className="divide-y divide-[#2E2E2E]">
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name} className="py-6">
                <h3
                  className="text-[#F8F8F8] text-base mb-3 leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.name}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related: Investor Line of Credit */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">Related Product</p>
              <h2
                className="text-2xl md:text-3xl text-[#F8F8F8] leading-tight mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Holding multifamily or commercial? You want an investor line of credit instead.
              </h2>
              <p className="text-[#888888] text-sm leading-relaxed">
                Fix and flip lines are optimized for short-term acquisitions and renovation. For buy-and-hold multifamily and commercial acquisitions across Northern Colorado, an investor line of credit is the right tool — secured by your portfolio equity and sized for long-term deployment.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link
                href="/loans/investor-line-of-credit"
                className="inline-flex items-center gap-3 border border-[#F8F8F8] text-[#F8F8F8] px-7 py-3.5 text-sm tracking-wide hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all group rounded-full"
              >
                Investor Line of Credit
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Let&apos;s set up your line before the next deal comes around.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            The best time to get a line of credit approved is before you need it. A free 15-minute call is all it takes to find out what you qualify for and what the line could look like for your deal flow.
          </p>
          <BookCallButton variant="solid" label="Book a Free Call" />
        </div>
      </section>
    </main>
  )
}
