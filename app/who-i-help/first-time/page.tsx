import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Home Loans for First-Time Buyers, Stevie De Gala',
  description: 'Buying your first home in Texas or Colorado? I walk you through every option in plain English and find the loan that makes your first home your best financial move.',
}

const cards = [
  {
    title: 'Understanding your options',
    body: 'FHA, conventional, VA, USDA — there are more loan types than most people realize. I explain every option in plain English so you can make a confident decision, not just accept whatever one bank offers.',
  },
  {
    title: 'Finding the right loan',
    body: 'Your first home is a big financial move. The loan structure matters as much as the rate. I shop 30+ lenders to find the combination of rate, down payment, and monthly payment that works for your life.',
  },
  {
    title: 'Getting you to the closing table',
    body: 'The mortgage process can feel overwhelming the first time. I stay with you through every step — pre-approval, underwriting, and closing — so nothing catches you off guard.',
  },
]

const steps = [
  { num: '01', title: 'Free call', body: 'We talk through your situation, your goals, and what buying a home actually looks like for you. No pressure, no forms, just a real conversation.' },
  { num: '02', title: 'I review your picture', body: 'Credit, income, savings — I look at the full picture and tell you honestly what you qualify for and what loan type fits best.' },
  { num: '03', title: 'I shop the market', body: 'I go to 30+ lenders on your behalf and bring back the best options — rate, terms, and total cost — so you can compare clearly.' },
  { num: '04', title: 'You close with confidence', body: 'I stay with you through every step of closing. You always know where things stand and always have someone to call.' },
]

export default function FirstTimePage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">For First-Time Buyers</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your first home. Done right.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl">
            Buying your first home is exciting — and it is a lot. I walk you through every option, help you avoid costly mistakes, and find the financing that makes your first home your best financial move.
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
            What I help first-time buyers with.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            Most first-time buyers go straight to their bank and accept whatever they are offered. You have more options than that — and the right one can save you thousands.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card.title} className="card-hover border border-[#E0E0E0] bg-[#F8F8F8] p-8 rounded-xl">
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
              <div key={step.num} className="border border-[#E0E0E0] bg-[#F8F8F8] p-8 rounded-xl">
                <p className="text-4xl text-[#E0E0E0] mb-4 leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.num}</p>
                <h3 className="text-lg text-[#0A0A0A] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.title}</h3>
                <p className="text-[#3A3A3A] text-sm leading-relaxed">{step.body}</p>
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
            Ready to figure out what you qualify for?
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 20-minute call is all it takes to know exactly where you stand and what your path to ownership looks like.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
