import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'HELOC | Home Equity Line of Credit | Northern Colorado | Stevie de Gala',
  description:
    'Home equity lines of credit (HELOC) in Northern Colorado. Access your equity without refinancing your first mortgage. Flexible draw and repayment for homeowners in Fort Collins, Greeley, Loveland, and Timnath. NMLS# 2845865',
}

const features = [
  {
    title: 'Access Equity Without Refinancing',
    body: 'A HELOC lets you tap your home equity without replacing your existing first mortgage. If your current rate is competitive, a HELOC preserves it while still giving you access to capital.',
  },
  {
    title: 'Draw on Demand',
    body: 'Unlike a lump-sum cash-out refinance, a HELOC is a revolving line. Draw what you need, when you need it, during the draw period — typically 5 to 10 years. You only pay interest on what you actually use.',
  },
  {
    title: 'Variable Rate Structure',
    body: 'Most HELOCs carry a variable rate tied to the prime rate. Rates move with the market, which means they can decrease as well as increase. Some programs offer fixed-rate conversion options for draws you want to lock in.',
  },
  {
    title: 'Useful for Investors and Homeowners',
    body: 'A HELOC on a primary residence is commonly used to fund investment property down payments, renovations, or other capital needs — without selling the asset or disrupting the first mortgage.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a HELOC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A HELOC — Home Equity Line of Credit — is a revolving line of credit secured by your home. It works similarly to a credit card: you have a credit limit based on your available equity, you draw from it as needed during the draw period, and you repay what you use. Interest accrues only on the outstanding balance, not the full credit limit.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I borrow on a HELOC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The amount available on a HELOC depends on your home\'s current value, your existing mortgage balance, and the lender\'s combined loan-to-value (CLTV) limit. Most lenders allow up to 80–90% CLTV. For example, if your home is worth $600,000, your existing mortgage is $350,000, and the lender allows 85% CLTV, your maximum HELOC line would be $160,000. Actual limits depend on your credit and income as well.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a HELOC and a cash-out refinance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cash-out refinance replaces your entire first mortgage with a new, larger loan. A HELOC sits on top of your existing mortgage as a second lien. If your current first mortgage has a favorable rate, a HELOC preserves it. A cash-out refinance is usually better when you need a large lump sum and want a fixed rate. A HELOC is often better when you need flexible access to capital over time or want to avoid refinancing an existing low-rate first mortgage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use a HELOC to fund an investment property down payment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Using a HELOC on your primary residence to fund a down payment on a rental or investment property is a common investor strategy. The HELOC gives you access to capital you have already built without requiring a sale or a full refinance. The investment property would then be financed separately through a DSCR loan, conventional investor product, or other structure appropriate to the acquisition.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does HELOC repayment work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HELOCs have two phases: a draw period and a repayment period. During the draw period (typically 5–10 years), you can borrow from the line and are usually required to make interest-only payments on the outstanding balance. When the draw period ends, the line closes and the repayment period begins — typically 10–20 years — during which you repay the outstanding principal plus interest. Monthly payments increase significantly during repayment, so planning ahead is important.',
      },
    },
  ],
}

export default function HELOCPage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">HELOC — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Access your equity without touching your first mortgage.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            If your current mortgage has a rate you do not want to give up, a HELOC lets you access the equity you have built — on demand — without refinancing. Draw what you need, repay it, draw again.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Available to homeowners throughout Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>How a HELOC works for you.</h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">Flexible access to capital secured by your home — without disturbing your existing loan structure.</p>
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

      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">HELOC vs Cash-Out Refi</p>
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Which structure fits your goal?</h2>
          <div className="space-y-4 mb-8">
            {[
              { scenario: 'You want flexible draw access over time', answer: 'HELOC — draw as needed, pay interest only on what you use' },
              { scenario: 'You want a large lump sum at a fixed rate', answer: 'Cash-out refinance — full amount at close, fixed payment' },
              { scenario: 'Your current mortgage has a low rate', answer: 'HELOC — preserves your first mortgage rate' },
              { scenario: 'You want to fund an investment property down payment', answer: 'HELOC — common strategy for real estate investors' },
            ].map((item) => (
              <div key={item.scenario} className="grid md:grid-cols-2 gap-4 border-b border-[#2E2E2E] pb-4">
                <span className="text-[#888888] text-sm leading-relaxed">{item.scenario}</span>
                <span className="text-[#F8F8F8] text-sm leading-relaxed">{item.answer}</span>
              </div>
            ))}
          </div>
          <Link href="/loans/refinance" className="text-[#5C8AA5] text-sm hover:underline flex items-center gap-2">
            Learn about cash-out refinance →
          </Link>
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
            Find out how much equity you can access.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to review your home value, existing loan balance, and HELOC options — including whether a cash-out refinance would serve you better.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
