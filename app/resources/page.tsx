import type { Metadata } from 'next'
import Link from 'next/link'
import { CALLS } from '@/lib/booking'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Mortgage Rates, Calculators, and Tools, Stevie de Gala',
  description: 'Mortgage payment calculator, DTI calculator, qualification estimator, and current rates for Texas and Colorado.',
  alternates: {
    canonical: '/resources',
  },
}

const cards = [
  { href: '/fix-and-flip-calculator', label: 'Investor tool', headline: 'Fix & Flip Calculator', body: 'See whether your next flip pencils out. Estimate profit, cash needed, and financing costs before making your move.' },
  { href: '/refinance-calculator', label: 'Homeowner tool', headline: 'Refinance Calculator', body: 'See whether refinancing makes sense. Compare cash-out options, closing costs, payment changes, and payment break-even.' },
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
  {
    href: '/resources/loan-checklists',
    label: 'Checklist',
    headline: 'Loan Checklists',
    body: 'Know exactly what documents to gather before you apply. Conventional and FHA checklists ready to download.',
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
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            The more you know, the better your decisions.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            I put these tools together because informed clients make smarter moves. Run your numbers, understand your options, and when you are ready to talk, I am here.
          </p>
        </div>
      </section>

      <section id="calls" className="scroll-mt-24 bg-[#111111] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-serif text-3xl text-white md:text-4xl">Book a Call</h2>
          <p className="mb-10 max-w-2xl text-lg text-[#C4C4C4]">New here? Start with a conversation about your goals and next steps.</p>
          <article className="flex flex-col gap-8 rounded-xl bg-white p-8 text-[#111111] md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="mb-4 font-serif text-2xl">{CALLS.discoverycall.title}</h3>
              <p className="text-sm leading-relaxed text-[#555555]">{CALLS.discoverycall.description}</p>
            </div>
            <BookCallButton callType="discoverycall" label="Book Discovery Call" variant="light" className="shrink-0" />
          </article>
        </div>
      </section>

      {/* Tool cards */}
      <section id="calculators" className="scroll-mt-24 bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-4 font-serif text-3xl text-white md:text-4xl">Calculators &amp; Tools</h2>
          <p className="mb-10 text-lg text-[#C4C4C4]">Run your numbers, explore rates, and prepare for your next move.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="card-white group border border-[#E5E5E5] bg-white p-8 flex flex-col justify-between min-h-[220px] hover:bg-[#F5F5F5] transition-colors rounded-xl"
              >
                <div>
                  <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">{card.label}</p>
                  <h3
                    className="text-xl text-[#0A0A0A] mb-4 leading-snug"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    {card.headline}
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed">{card.body}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-[#888888] group-hover:text-[#0A0A0A] transition-colors text-sm">
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
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            A few things worth understanding.
          </h2>
          <p className="text-[#888888] mb-12">Before you make any big financing decisions.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {educationCards.map((card) => (
              <div key={card.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3
                  className="text-xl text-[#0A0A0A] mb-4"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24 border-t border-[#2E2E2E] bg-[#111111] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-serif text-3xl text-white md:text-4xl">Mortgage &amp; Portfolio Reviews</h2>
          <p className="mb-10 max-w-2xl text-lg text-[#C4C4C4]">Already own a home or investment properties? Choose a focused review of your current financing and future plans.</p>
          <div className="grid gap-4 md:grid-cols-2">
            {(['investor-portfolio-review', 'homeowner-mortgage-review'] as const).map((callType) => {
              const call = CALLS[callType]
              return (
                <article key={callType} className="flex min-w-0 flex-col rounded-xl bg-white p-8 text-[#111111]">
                  <p className="mb-3 text-xs uppercase tracking-widest text-[#666666]">{call.audience}</p>
                  <h3 className="mb-4 font-serif text-2xl">{call.title}</h3>
                  <p className="mb-8 flex-1 text-sm leading-relaxed text-[#555555]">{call.description}</p>
                  <BookCallButton callType={callType} label={`Book ${call.title}`} variant="light" className="w-full px-4 text-xs" />
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
