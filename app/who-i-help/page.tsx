import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'
import { Home, Building2, Key } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Who I Help, Stevie de Gala',
  description: 'Whether you are buying your first home or building your real estate portfolio, I shop the market on your behalf to find the best financing available.',
}

export default function WhoIHelpPage() {
  return (
    <main className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The right financing changes everything. I am here to find it.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            Most people accept the first number they are given. You don&apos;t have to.
          </p>
        </div>
      </section>

      {/* Three path cards */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">

            {/* First-Time Buyers */}
            <Link
              href="/who-i-help/first-time"
              className="card-white card-hover group border border-[#E5E5E5] bg-white px-10 py-14 flex flex-col justify-between min-h-[360px] hover:bg-[#F5F5F5] transition-colors rounded-xl"
              style={{ borderLeft: '3px solid #7A9E5C' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-7">
                  <Key size={18} className="text-[#7A9E5C]" />
                  <span className="text-[#555555] font-medium tracking-[0.15em]" style={{ fontSize: '1.1rem' }}>First-Time Buyers</span>
                </div>
                <h2
                  className="text-[#0A0A0A] leading-tight mb-5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)' }}
                >
                  Your first home. Done right.
                </h2>
                <p className="text-[#555555] text-sm leading-relaxed">
                  Buying for the first time is exciting and overwhelming. I walk you through every option, help you avoid costly mistakes, and find the loan that makes your first home your best financial move.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-[#888888] text-sm group-hover:text-[#0A0A0A] transition-colors mt-10">
                Learn more
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Homeowners */}
            <Link
              href="/who-i-help/homeowners"
              className="card-white card-hover group border border-[#E5E5E5] bg-white px-10 py-14 flex flex-col justify-between min-h-[360px] hover:bg-[#F5F5F5] transition-colors rounded-xl"
              style={{ borderLeft: '3px solid #B8860B' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-7">
                  <Home size={18} className="text-[#B8860B]" />
                  <span className="text-[#555555] font-medium tracking-[0.15em]" style={{ fontSize: '1.1rem' }}>Homeowners</span>
                </div>
                <h2
                  className="text-[#0A0A0A] leading-tight mb-5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)' }}
                >
                  Your home is sitting on capital.
                </h2>
                <p className="text-[#555555] text-sm leading-relaxed">
                  Refinances and cash-out refinances. I shop dozens of lenders so you get the best rate and structure — and free up cash that was just sitting there.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-[#888888] text-sm group-hover:text-[#0A0A0A] transition-colors mt-10">
                Learn more
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Investors */}
            <Link
              href="/who-i-help/investors"
              className="card-white card-hover group border border-[#E5E5E5] bg-white px-10 py-14 flex flex-col justify-between min-h-[360px] hover:bg-[#F5F5F5] transition-colors rounded-xl"
              style={{ borderLeft: '3px solid #4A7FA5' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-7">
                  <Building2 size={18} className="text-[#4A7FA5]" />
                  <span className="text-[#555555] font-medium tracking-[0.15em]" style={{ fontSize: '1.1rem' }}>Investors</span>
                </div>
                <h2
                  className="text-[#0A0A0A] leading-tight mb-5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)' }}
                >
                  More options. Better terms.
                </h2>
                <p className="text-[#555555] text-sm leading-relaxed">
                  DSCR loans, portfolio products, and creative structures built around your strategy. A broker who has been in the deal, not just behind a desk.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-[#888888] text-sm group-hover:text-[#0A0A0A] transition-colors mt-10">
                Learn more
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

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
            Not sure which path fits you?
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            Book a free call and we will figure it out together.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
