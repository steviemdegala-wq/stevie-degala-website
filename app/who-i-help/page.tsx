import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'
import { Stethoscope, Shield, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Who I Help | Stevie de Gala — Medical Professionals, Veterans & Investors',
  description:
    'Physician loans for medical professionals, VA loans for veterans, and investment financing for real estate investors in Northern Colorado. Fort Collins, Greeley, Loveland, Timnath, Windsor, Severance.',
}

export default function WhoIHelpPage() {
  return (
    <main className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The right financing changes everything. I am here to find it.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            I specialize in three groups that standard lenders consistently underserve — medical professionals, veterans, and real estate investors.
          </p>
        </div>
      </section>

      {/* Three path cards */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">

            {/* Medical Professionals */}
            <Link
              href="/who-i-help/medical-professionals"
              className="card-white card-hover group border border-[#E5E5E5] bg-white px-10 py-14 flex flex-col justify-between min-h-[360px] hover:bg-[#F5F5F5] transition-colors rounded-xl"
              style={{ borderLeft: '3px solid #5C8AA5' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-7">
                  <Stethoscope size={18} className="text-[#5C8AA5]" />
                  <span className="text-[#555555] font-medium tracking-[0.15em]" style={{ fontSize: '1.1rem' }}>Medical Professionals</span>
                </div>
                <h2
                  className="text-[#0A0A0A] leading-tight mb-5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)' }}
                >
                  The loan built for your career.
                </h2>
                <p className="text-[#555555] text-sm leading-relaxed">
                  Physician loans offer low or no down payment, no PMI, and student loan debt excluded from your DTI. Designed for MD, DO, DDS, NP, CRNA, PA, RN, and more — including residents and fellows.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-[#888888] text-sm group-hover:text-[#0A0A0A] transition-colors mt-10">
                Learn more
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Veterans */}
            <Link
              href="/who-i-help/veterans"
              className="card-white card-hover group border border-[#E5E5E5] bg-white px-10 py-14 flex flex-col justify-between min-h-[360px] hover:bg-[#F5F5F5] transition-colors rounded-xl"
              style={{ borderLeft: '3px solid #7A9E5C' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-7">
                  <Shield size={18} className="text-[#7A9E5C]" />
                  <span className="text-[#555555] font-medium tracking-[0.15em]" style={{ fontSize: '1.1rem' }}>Veterans</span>
                </div>
                <h2
                  className="text-[#0A0A0A] leading-tight mb-5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)' }}
                >
                  You earned zero down. Let&apos;s use it.
                </h2>
                <p className="text-[#555555] text-sm leading-relaxed">
                  VA loans give eligible service members and veterans the most powerful home buying benefit available — zero down, no PMI, and competitive rates backed by the U.S. government.
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
