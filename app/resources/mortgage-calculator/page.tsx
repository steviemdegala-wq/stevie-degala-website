import type { Metadata } from 'next'
import MortgageCalculator from '@/components/MortgageCalculator'
import BookCallButton from '@/components/BookCallButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mortgage Payment Calculator, Stevie De Gala',
  description: 'Calculate your estimated monthly mortgage payment based on loan amount, interest rate, and term.',
}

export default function MortgageCalculatorPage() {
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
            Mortgage Payment Calculator
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            Enter your loan amount, interest rate, and term to see your estimated monthly payment. A good starting point before we talk through the full picture together.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <MortgageCalculator />
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Want to see what a lower rate looks like?
          </h2>
          <p className="text-[#C4C4C4] mb-10 leading-relaxed">
            I shop dozens of lenders on your behalf. A free call is all it takes to find out what your actual payment could look like.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
