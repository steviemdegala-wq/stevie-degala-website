import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Investor Line of Credit — Fort Collins & Denver | Stevie de Gala',
  description: 'Investor lines of credit, DSCR loans, and multifamily financing for real estate investors in Fort Collins and Denver, Colorado. A broker who has been in the deal.',
}

const cards = [
  {
    title: 'Investor Line of Credit',
    body: 'A revolving line of credit gives you standing buying power in fast-moving markets like Fort Collins and Denver. When a multifamily unit or commercial property comes available, you move — without waiting on a new loan approval. Draw, repay, and draw again as your portfolio grows.',
  },
  {
    title: 'DSCR Loans',
    body: 'A Debt Service Coverage Ratio loan qualifies based on the income the property generates, not yours. I help investors across the Front Range access DSCR financing to grow their portfolios without being limited by personal income documentation.',
  },
  {
    title: 'Multifamily & Commercial Financing',
    body: 'From duplexes to 20-unit apartment buildings, from mixed-use commercial to stand-alone retail — the right capital structure changes the math on every deal. I shop across 30+ lenders to find the financing that fits your specific property and strategy.',
  },
]

const marketHighlights = [
  {
    market: 'Fort Collins',
    body: 'Northern Colorado\'s rental market remains one of the strongest in the state. CSU-driven rental demand, limited multifamily inventory, and strong long-term appreciation make Fort Collins a compelling market for buy-and-hold investors. An investor line of credit gives you the speed to compete on properties before they go to multiple offers.',
  },
  {
    market: 'Denver Metro',
    body: 'Denver\'s commercial and multifamily sectors continue to attract institutional capital. For individual investors competing in this market, a pre-established line of credit is a decisive advantage — you arrive at the table with committed capital rather than a pending application.',
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
            Investor Lines of Credit. Multifamily &amp; Commercial Financing. Fort Collins and Denver.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl">
            I help real estate investors in Fort Collins and Denver access flexible lines of credit and deal-specific financing for multifamily and commercial acquisitions. I have developed property from the ground up — you get a broker who understands the deal, not just the application.
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
              <div key={card.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3
                  className="text-xl text-[#0A0A0A] mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fort Collins & Denver Market Section */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Local Markets</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Why an investor line of credit matters in these markets.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            Fort Collins and Denver move fast. Properties — especially multifamily and commercial — routinely go under contract in days. A pre-established investor line of credit means you show up with capital, not a contingency.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {marketHighlights.map((item) => (
              <div key={item.market} className="border border-[#2E2E2E] bg-[#111111] p-8 rounded-xl">
                <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">{item.market}</p>
                <p className="text-[#C4C4C4] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/loans/investor-line-of-credit"
              className="inline-flex items-center gap-2 border border-[#F8F8F8] text-[#F8F8F8] px-7 py-3.5 text-sm tracking-wide hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all group rounded-full"
            >
              Learn about investor lines of credit
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
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
                <p className="text-4xl text-[#0A0A0A] font-bold mb-4 leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.num}</p>
                <h3 className="text-lg text-[#0A0A0A] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.title}</h3>
                <p className="text-[#555555] text-sm leading-relaxed">{step.body}</p>
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
            A free 15-minute call is all it takes to find out what better capital could do for your portfolio.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
