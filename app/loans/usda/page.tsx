import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'USDA Loans | Northern Colorado Rural Areas | Stevie de Gala',
  description:
    'USDA rural development loans for eligible areas in and around Northern Colorado. Zero down payment, competitive rates, and income-based eligibility. NMLS# 2845865',
}

const features = [
  {
    title: 'Zero Down Payment',
    body: 'USDA loans require no down payment for eligible borrowers in qualifying rural and suburban areas. Combined with competitive rates, this makes USDA one of the most affordable entry points into homeownership available.',
  },
  {
    title: 'No PMI — Lower Annual Fee',
    body: 'USDA loans do not require private mortgage insurance. Instead, they carry an annual guarantee fee (currently 0.35% of the loan balance) that is significantly lower than FHA MIP or conventional PMI on a low-down-payment loan.',
  },
  {
    title: 'Competitive Interest Rates',
    body: 'Because the USDA guarantees a portion of the loan, lenders can offer competitive rates. USDA rates are typically comparable to FHA and sometimes conventional rates for the same borrower profile.',
  },
  {
    title: 'Flexible Credit Guidelines',
    body: 'USDA guidelines are generally more flexible than conventional programs. Most lenders look for a minimum score around 640, though I work with programs that can go lower depending on the full file.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a USDA loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A USDA loan is a mortgage guaranteed by the U.S. Department of Agriculture\'s Rural Development program. It is designed to help low-to-moderate income borrowers purchase homes in eligible rural and suburban areas. USDA loans offer zero down payment, competitive rates, and more flexible credit standards than conventional loans. The program is available in many areas outside of major urban centers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do USDA loans work in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'USDA loan eligibility is determined by property location and household income. Some areas in and around Northern Colorado may qualify depending on their rural designation — particularly smaller communities and areas on the outskirts of major cities. Eligibility changes periodically as the USDA updates its maps. I confirm current property eligibility as part of every USDA inquiry.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there income limits for USDA loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. USDA loans are designed for low-to-moderate income households. Income limits vary by county and household size, and are based on the area median income. For Northern Colorado, the limits are updated annually. If your household income exceeds the limit for your area and family size, USDA may not be available — but conventional, FHA, or physician loan programs typically are.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there mortgage insurance on a USDA loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'USDA loans do not have traditional PMI. Instead, they have two fees: an upfront guarantee fee (currently 1% of the loan amount, which can be rolled into the loan) and an annual guarantee fee (currently 0.35% of the loan balance, paid monthly). These fees are significantly lower than FHA MIP and often lower than conventional PMI for comparable borrower profiles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use a USDA loan for new construction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. USDA loans can be used for new construction in eligible areas, though the process involves some additional steps. The property must meet USDA site and construction standards, and inspections are required at specific stages of the build. I work through USDA new construction transactions and can explain the timeline and requirements for your specific situation.',
      },
    },
  ],
}

export default function USDALoanPage() {
  return (
    <main className="pt-16 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors flex items-center gap-2 mb-10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">USDA Loan — Rural Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Zero down for eligible rural and suburban properties.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            The USDA Rural Development loan is one of the few remaining zero-down mortgage programs available — and many borrowers in and around Northern Colorado do not realize their property may qualify.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Property eligibility and income limits apply. I confirm both as the first step in every USDA inquiry.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>What USDA offers eligible borrowers.</h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">Government-backed with zero down — one of the most affordable entry points into homeownership for qualifying borrowers and properties.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3 className="text-xl text-[#0A0A0A] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{f.title}</h3>
                <p className="text-[#444444] text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Two Requirements to Know</p>
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Property location and household income both matter.
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                heading: 'Property must be in an eligible area',
                body: 'USDA maps designate which properties qualify as "rural" for program purposes. Areas on the outskirts of Fort Collins, Greeley, and Loveland — and smaller Northern Colorado communities — often qualify. I verify property eligibility before we go further.',
              },
              {
                heading: 'Household income must be within limits',
                body: 'USDA income limits are based on county and household size, updated annually. The limits are set to serve low-to-moderate income households. I confirm your eligibility against current limits as part of the initial review.',
              },
            ].map((item) => (
              <div key={item.heading} className="bg-[#111111] border border-[#2E2E2E] px-6 py-6 rounded-xl">
                <p className="text-[#F8F8F8] text-sm font-medium mb-2">{item.heading}</p>
                <p className="text-[#888888] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-[#555555] text-xs leading-relaxed">
            If your income or property does not qualify for USDA, FHA and conventional options are available with comparable or lower entry barriers for most borrowers.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-12" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Frequently asked questions.</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name} className="border-b border-[#2E2E2E] pb-6">
                <p className="text-[#F8F8F8] text-base font-medium mb-3">{item.name}</p>
                <p className="text-[#888888] text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Find out if your property and income qualify.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to confirm property eligibility, income limits, and whether USDA is the right structure — or whether a different zero-down option fits better.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
