import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Mortgage Rates, Calculators, and Tools, Stevie De Gala',
  description: 'Mortgage payment calculator, DTI calculator, qualification estimator, and current rates for Texas and Colorado.',
}

const cards = [
  {
    href: '/resources/rates',
    label: 'Current Rates',
    headline: 'Conventional & DSCR',
    body: 'Current rate estimates for conventional and investor loans. Updated regularly. Your actual rate depends on your full picture.',
  },
  {
    href: '/resources/mortgage-calculator',
    label: 'Calculator',
    headline: 'Mortgage Payment',
    body: 'Enter your loan amount, rate, and term to see your estimated monthly payment.',
  },
  {
    href: '/resources/dti-calculator',
    label: 'Calculator',
    headline: 'DTI Calculator',
    body: 'Your debt-to-income ratio is one of the first things lenders look at. See where you stand.',
  },
  {
    href: '/resources/qualification-estimator',
    label: 'Estimator',
    headline: 'Qualification Range',
    body: 'A starting point. Enter your annual income to get a rough estimate of your purchase range.',
  },
]

const educationCards = [
  {
    title: 'What is a DSCR loan?',
    body: 'A Debt Service Coverage Ratio loan qualifies you based on the income the property generates, not your personal income. For investors, this opens doors that traditional loans keep closed.',
  },
  {
    title: 'When does refinancing make sense?',
    body: 'Refinancing makes sense when your current rate is meaningfully higher than what is available today, when you need to access equity, or when your financial situation has changed.',
  },
  {
    title: 'Broker vs bank, what is the difference?',
    body: 'A bank offers you their products. A broker shops the entire market on your behalf. My job is to find the best option available for your situation.',
  },
  {
    title: 'Cash flow basics for homeowners',
    body: 'Your mortgage is not just a payment. It is a lever. A refinance at the right time can lower your monthly obligation, free up cash, and put you in a stronger financial position.',
  },
]

export default function ResourcesPage() {
  return (
    <main className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The more you know, the better your decisions.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            I put these tools together because informed clients make smarter moves. Run your numbers, understand your options, and when you are ready to talk, I am here.
          </p>
        </div>
      </section>

      {/* Tool cards */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group border border-white/40 bg-white/90 backdrop-blur-sm p-8 flex flex-col justify-between min-h-[220px] hover:bg-white/95 transition-colors rounded-xl"
              >
                <div>
                  <p className="text-[#555555] text-xs uppercase tracking-widest mb-3">{card.label}</p>
                  <h3
                    className="text-xl text-[#0A0A0A] mb-4 leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {card.headline}
                  </h3>
                  <p className="text-[#3A3A3A] text-sm leading-relaxed">{card.body}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-[#555555] group-hover:text-[#0A0A0A] transition-colors text-sm">
                  Open
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Education Cards */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            A few things worth understanding.
          </h2>
          <p className="text-[#888888] mb-12">Before you make any big financing decisions.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {educationCards.map((card) => (
              <div key={card.title} className="card-hover border border-white/40 bg-white/90 backdrop-blur-sm p-8 rounded-xl">
                <h3
                  className="text-xl text-[#0A0A0A] mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-[#3A3A3A] text-sm leading-relaxed">{card.body}</p>
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
            Have questions about your situation?
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            Run the numbers, then let&apos;s talk. A free 20-minute call is all it takes to turn a rough estimate into a real plan.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
