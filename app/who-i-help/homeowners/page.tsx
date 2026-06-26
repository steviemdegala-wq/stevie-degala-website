import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Home Loans and Refinancing for Homeowners, Stevie De Gala',
  description: 'First-time home loans, refinancing, and cash-out refinance in Texas and Colorado. I shop dozens of lenders so you get the best rate available.',
}

const cards = [
  {
    title: 'Buying your first home',
    body: 'First-time buyers in Texas and Colorado get a broker who walks you through every step in plain English. No jargon, no pressure, no surprises at closing.',
  },
  {
    title: 'Refinancing to lower your payment',
    body: 'If your rate is not competitive, a refinance could free up hundreds of dollars every single month. I run the numbers honestly and tell you whether it actually makes sense for your situation.',
  },
  {
    title: 'Cash-out refinance',
    body: 'Your home equity is an asset. A cash-out refinance lets you put that equity to work — paying off high-interest debt, covering college costs, or funding whatever matters next. Done right, your monthly cash flow improves while your debt gets cheaper.',
  },
]

const steps = [
  { num: '01', title: 'Free call', body: 'We talk through your situation, your goals, and what good financing actually looks like for you. No forms, no commitment, just a real conversation.' },
  { num: '02', title: 'I review your picture', body: 'I look at your full financial picture and identify the best loan structures available for your specific situation.' },
  { num: '03', title: 'I shop the market', body: 'As a broker, I am not limited to one lender. I go to the market on your behalf and bring back the best options available.' },
  { num: '04', title: 'You close', body: 'I stay with you through every step of closing. You always know where things stand and you always have someone to call.' },
]

export default function HomeownersPage() {
  return (
    <main className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/who-i-help" className="text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors flex items-center gap-2 mb-10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Who I Help
          </Link>
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">For Homeowners</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your home is sitting on capital. Let&apos;s put it to work.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl">
            Most homeowners accept the first number they are given. I shop the market across dozens of lenders so you get the best rate and structure available — not whatever one bank decides to offer.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What I help homeowners with.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            Your home is probably your biggest financial commitment. Getting the wrong loan structure costs you thousands over time and most people never realize it.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3
                  className="text-xl text-[#F8F8F8] mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-[#C4C4C4] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#0A0A0A] py-20 px-6">
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
                <p className="text-4xl text-[#D0D0D0] mb-4 leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.num}</p>
                <h3 className="text-lg text-[#F8F8F8] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{step.body}</p>
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
            Let&apos;s find out what your home can do for you.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 20-minute call costs nothing and could save you thousands.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
