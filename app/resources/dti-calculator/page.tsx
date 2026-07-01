import type { Metadata } from 'next'
import DTICalculator from '@/components/DTICalculator'
import BookCallButton from '@/components/BookCallButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DTI Calculator, Stevie de Gala',
  description: 'Calculate your debt-to-income ratio to see where you stand with lenders.',
}

export default function DTICalculatorPage() {
  return (
    <main className="pt-16 md:pt-20">
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors flex items-center gap-2 mb-10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Resources
          </Link>
          <h1
            className="text-4xl md:text-5xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            DTI Calculator
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            Your debt-to-income ratio is one of the first things lenders look at. Enter your monthly income and your existing monthly debt payments to see where you stand.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <DTICalculator />
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Not sure what your DTI means for your options?
          </h2>
          <p className="text-[#C4C4C4] mb-10 leading-relaxed">
            Whether you are in great shape or need a strategy, I can walk you through exactly what is available for your situation.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
