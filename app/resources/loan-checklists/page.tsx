import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Loan Checklists — Stevie De Gala',
  description: 'Download loan checklists for Conventional and FHA mortgages. Know exactly what documents you need before you apply.',
}

const checklists = [
  {
    title: 'Conventional & FHA Loan Checklist',
    description: 'Everything you need to gather before applying for a Conventional or FHA loan — income documents, asset statements, ID, and more.',
    href: '/checklists/conventional-and-fha-checklist.pdf',
    label: 'Checklist',
  },
  {
    title: 'VA Loan Prequalification Checklist',
    description: 'Documents veterans and active-duty service members need to prequalify for a VA loan — service records, income verification, and more.',
    href: '/checklists/va-loan-prequalification-checklist.pdf',
    label: 'Checklist',
  },
]

export default function LoanChecklistsPage() {
  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <section className="py-16 md:py-24 px-6 border-b border-[#2E2E2E]">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors mb-8"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Resources
          </Link>
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Document Prep</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Loan Checklists
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl">
            Know exactly what to bring before you apply. These checklists take the guesswork out of document prep so your loan moves faster.
          </p>
        </div>
      </section>

      {/* Checklist cards + PDF viewers */}
      <section className="bg-[#111111] border-b border-[#2E2E2E] py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {checklists.map((item) => (
            <div key={item.href}>
              <div className="mb-6">
                <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">{item.label}</p>
                <h2
                  className="text-2xl md:text-3xl text-[#F8F8F8] mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.title}
                </h2>
                <p className="text-[#C4C4C4] text-sm leading-relaxed mb-5">{item.description}</p>
                <a
                  href={item.href}
                  download
                  className="inline-flex items-center gap-2 border border-[#F8F8F8] text-[#F8F8F8] px-5 py-2 rounded-full text-sm hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all tracking-wide"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </a>
              </div>
              <div className="border border-[#2E2E2E] rounded-xl overflow-hidden bg-[#0A0A0A]">
                <iframe
                  src={item.href}
                  className="w-full"
                  style={{ height: '780px' }}
                  title={item.title}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ready to start the process?
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            Gather your documents, then book a free call. I will walk you through what comes next and make sure nothing falls through the cracks.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
