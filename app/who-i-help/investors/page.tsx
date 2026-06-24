import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Investment Property Financing and DSCR Loans, Stevie De Gala',
  description: 'DSCR loans, investment property financing, and portfolio strategy in Texas and Colorado. A broker who has been in the deal, not just behind a desk.',
}

const cards = [
  {
    title: 'DSCR Loans',
    body: 'A Debt Service Coverage Ratio loan qualifies based on the income the property generates, not yours. I help investors in Texas and Colorado access DSCR financing to grow their portfolios without being limited by personal income documentation.',
  },
  {
    title: 'Investment Property Financing',
    body: 'Whether you are acquiring your first rental or adding to an existing portfolio, cheap capital is the foundation. I shop the market for the lowest cost financing available for your specific deal.',
  },
  {
    title: 'Portfolio Strategy',
    body: 'Great investors think about financing before they think about the property. I help you structure your financing to maximize cash flow, preserve capital, and keep your options open for the next acquisition.',
  },
]

const steps = [
  { num: '01', title: 'Free call', body: 'We talk through your deal, your portfolio, and what the right financing structure actually looks like. No forms, no commitment.' },
  { num: '02', title: 'I review the numbers', body: 'I look at the deal and identify the best loan structures — DSCR, portfolio products, or creative structures that fit your strategy.' },
  { num: '03', title: 'I shop the market', body: 'I am not limited to one lender. I go to the market and bring back the most competitive options available for your specific deal.' },
  { num: '04', title: 'You close and move', body: 'I stay with you through closing. You always know where things stand so you can focus on the next acquisition.' },
]

export default function InvestorsPage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">For Investors</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            More options. Better terms. A broker who has been in the deal.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl">
            I have developed property from the ground up, invested in multifamily, and spent years inside commercial real estate underwriting. You get a broker who understands the deal, not just the application.
          </p>
          <p className="text-[#888888] text-sm mt-6 italic max-w-2xl">
            The self-storage facility I developed in Gilmer, Texas started as a senior capstone project. Completing it from scratch is what turned real estate from a career into a calling.
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
            What I help investors with.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            Local lenders give you a handful of choices. I compare dozens — products and structures built around your strategy, not a bank&apos;s checklist.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card.title} className="card-hover border border-[#E0E0E0] bg-[#F8F8F8] p-8">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E0E0E0]">
            {steps.map((step) => (
              <div key={step.num} className="bg-[#F8F8F8] p-8">
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
            Let&apos;s talk about your next deal.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 20-minute call is all it takes to find out what better capital could do for your portfolio.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
