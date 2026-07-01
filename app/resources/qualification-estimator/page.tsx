import type { Metadata } from 'next'
import QualificationEstimator from '@/components/QualificationEstimator'
import BookCallButton from '@/components/BookCallButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Qualification Estimator, Stevie de Gala',
  description: 'Get a rough estimate of your home purchase range based on your annual income.',
}

export default function QualificationEstimatorPage() {
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
            Qualification Estimator
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            This is a starting point, not a guarantee. Enter your annual income to get a rough estimate of your purchase range. Your full picture matters, and that is exactly what we look at together on a call.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <QualificationEstimator />
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ready to find out exactly what you qualify for?
          </h2>
          <p className="text-[#C4C4C4] mb-10 leading-relaxed">
            The estimator gives you a range. A free call gives you the real number.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
