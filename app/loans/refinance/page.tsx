import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Refinance | Lower Your Rate or Access Equity | Northern Colorado | Stevie de Gala',
  description:
    'Rate and term refinance, cash-out refinance, and VA IRRRL in Northern Colorado. Lower your monthly payment, access home equity, or remove PMI. Fort Collins, Greeley, Loveland, Timnath, Windsor. NMLS# 2845865',
}

const types = [
  {
    title: 'Rate & Term Refinance',
    body: 'Replace your existing mortgage with a new one at a lower rate, shorter term, or both. The primary goal is reducing your interest cost or monthly payment — no cash is taken out.',
  },
  {
    title: 'Cash-Out Refinance',
    body: 'Refinance into a larger loan than your current balance and take the difference as cash. A common tool for home improvements, debt consolidation, investment purchases, or accessing equity you have built.',
  },
  {
    title: 'VA IRRRL — Streamline Refinance',
    body: 'If you have a VA loan and rates have dropped, the Interest Rate Reduction Refinance Loan lets you lower your rate with minimal documentation, no appraisal in most cases, and no income verification.',
  },
  {
    title: 'FHA to Conventional Refinance',
    body: 'If you are currently on an FHA loan with MIP, refinancing into a conventional loan once you have enough equity eliminates the mortgage insurance and often lowers your rate. A meaningful monthly savings.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When does it make sense to refinance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Refinancing makes sense when the monthly savings outweigh the closing costs within a timeframe you plan to stay in the home — the break-even point. As a general rule, if you can lower your rate by 0.5% or more and you plan to stay in the home at least 2–3 years, a refinance often pencils out. I run the break-even calculation for your specific loan so you can make the decision with actual numbers, not a rule of thumb.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to refinance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Refinance closing costs typically run 2–3% of the loan amount, though this varies significantly by lender, loan type, and whether costs are rolled into the loan. Some programs offer no-closing-cost refinances with a slightly higher rate. I compare both structures — paying costs upfront versus rolling them in — so you can see which produces better long-term economics for your situation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I refinance to remove PMI from my current conventional loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You may not need to refinance to remove PMI. Conventional PMI automatically cancels at 78% LTV, and you can request removal at 80% based on the original home value. If your home has appreciated and you believe you are at or below 80% LTV based on current value, a new appraisal — not a full refinance — may be sufficient to remove PMI. I can walk you through the fastest path to PMI removal based on your current loan terms.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a cash-out refinance and when does it make sense?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cash-out refinance replaces your current mortgage with a larger one, and you receive the difference in cash. It makes sense when you need access to a significant amount of capital — for a home renovation, debt payoff, investment property down payment, or other large goal — and your home has enough equity to support the larger loan. Rates on cash-out refinances are typically slightly higher than rate-and-term refinances. A HELOC is sometimes a better alternative for smaller or flexible draw amounts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a refinance take to close?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most refinances close in 30–45 days, though VA IRRRLs and streamline programs can close faster. The timeline depends on how quickly documentation is gathered, whether an appraisal is required, and the lender\'s current volume. I flag any potential delays early and keep the process moving so there are no last-minute surprises.',
      },
    },
  ],
}

export default function RefinancePage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">Refinance — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Lower your payment, access your equity, or both.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            A refinance is not always the right move — but when it is, timing and program selection matter. I run the break-even analysis before you commit, so you know the actual numbers before signing anything.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Serving homeowners across Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance — and throughout Northern Colorado.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Refinance options available to you.</h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">Four distinct refinance structures — each with a different goal and cost profile.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {types.map((t) => (
              <div key={t.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3 className="text-xl text-[#0A0A0A] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{t.title}</h3>
                <p className="text-[#444444] text-sm leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">The Only Number That Matters</p>
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Break-even analysis before anything else.
          </h2>
          <p className="text-[#888888] leading-relaxed mb-8 max-w-2xl">
            A refinance only makes sense if you will stay in the home long enough to recoup the closing costs through monthly savings. That point — the break-even — is specific to your loan balance, the rate difference, and your closing costs. I calculate it for your actual situation before recommending anything.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Monthly savings', detail: 'What your new payment is versus your current one' },
              { label: 'Total closing costs', detail: 'All-in cost of the refinance, rolled in or paid upfront' },
              { label: 'Break-even month', detail: 'When the savings exceed the cost — if you plan to stay past that point, the refinance makes sense' },
            ].map((item) => (
              <div key={item.label} className="bg-[#111111] border border-[#2E2E2E] px-6 py-5 rounded-xl">
                <p className="text-[#F8F8F8] text-sm font-medium mb-1">{item.label}</p>
                <p className="text-[#888888] text-xs leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-[#555555] text-xs mt-6 leading-relaxed">
            Veterans with an existing VA loan: the IRRRL streamline is often the fastest path — no appraisal, minimal documentation, and no income verification in most cases. <Link href="/loans/va" className="text-[#7A9E5C] hover:underline">See VA loan details →</Link>
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
            Find out if a refinance makes sense for your situation.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to review your current loan, run the break-even, and compare programs side by side.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
