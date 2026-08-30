import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Jumbo Loans | Northern Colorado | Stevie de Gala',
  description:
    'Jumbo loans for high-value home purchases in Fort Collins, Loveland, and Northern Colorado. Loan amounts above the conforming limit with competitive rates for strong borrower profiles. NMLS# 2845865',
}

const features = [
  {
    title: 'Above Conforming Limits',
    body: 'Jumbo loans cover purchase prices above the Fannie Mae / Freddie Mac conforming loan limit — currently set annually by the FHFA. In Northern Colorado\'s upper market, jumbo financing is often required for luxury and custom homes.',
  },
  {
    title: 'Competitive Rates for Strong Profiles',
    body: 'Jumbo rates are set by individual lenders rather than agency guidelines. For borrowers with 720+ credit, significant reserves, and clean income documentation, jumbo rates can be highly competitive — sometimes matching or beating conforming products.',
  },
  {
    title: 'Flexible Structures',
    body: 'Jumbo loans are portfolio products — lenders keep them on their own books — which means more flexibility in structure. Fixed and adjustable rate options, interest-only periods, and customized terms are more accessible at the jumbo level than in conforming programs.',
  },
  {
    title: 'Multiple Lender Comparison',
    body: 'As a broker, I compare jumbo programs across multiple lenders. Jumbo pricing varies more than conforming because each lender sets their own risk appetite. Comparing programs saves meaningful money on a high-balance loan.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a jumbo loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A jumbo loan is any mortgage that exceeds the conforming loan limit set annually by the Federal Housing Finance Agency. Loans above this limit cannot be purchased by Fannie Mae or Freddie Mac, so lenders keep them on their own balance sheets. This means jumbo loans have their own qualification standards — typically stricter credit, income, and reserve requirements than conforming loans.',
      },
    },
    {
      '@type': 'Question',
      name: 'What credit score is needed for a jumbo loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most jumbo lenders require a minimum credit score of 700 to 720, with the best rates typically available at 740 and above. Reserve requirements are also higher — lenders often want to see 12 months of mortgage payments in liquid or semi-liquid assets after closing. Strong income documentation is essential.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are jumbo loan rates higher than conforming rates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not necessarily. Jumbo rates depend on the lender\'s balance sheet and risk appetite. In many market environments, jumbo rates have been comparable to or even slightly below conforming rates for strong borrower profiles. The spread varies significantly between lenders, which is why comparing multiple programs — rather than going directly to one bank — often results in meaningfully better pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much down payment is required for a jumbo loan in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most jumbo lenders require 10 to 20% down depending on the loan amount and borrower profile. Some programs allow as little as 10% down for well-qualified borrowers at lower jumbo loan amounts. The higher the loan balance, the more stringent down payment requirements typically become. I compare programs across lenders to find the lowest down payment option that still delivers competitive pricing for your situation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a physician use a physician loan instead of a jumbo loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Often yes. Many physician loan programs offer maximum loan amounts of $2M to $3M — which covers a significant portion of Northern Colorado\'s upper market without triggering traditional jumbo requirements. If your loan amount falls within physician program limits, a physician loan may offer better terms: lower or zero down payment and no PMI. Above those limits, a jumbo product is the right structure. I compare both for borrowers in this range.',
      },
    },
  ],
}

export default function JumboLoanPage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">Jumbo Loan — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            High-value financing for Northern Colorado&apos;s upper market.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            When the purchase price exceeds the conforming loan limit, you need a lender who shops the jumbo market — not just one who has a single in-house product. Jumbo pricing varies significantly between lenders, and the difference matters on a large loan balance.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Serving buyers in Fort Collins, Loveland, and throughout Northern Colorado&apos;s higher-value markets.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>What jumbo loans offer.</h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">Portfolio products with more structural flexibility and competitive pricing for well-qualified borrowers.</p>
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
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Note for Medical Professionals</p>
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Physician loan or jumbo? Sometimes it&apos;s both.
          </h2>
          <p className="text-[#888888] leading-relaxed mb-6">
            Many physician loan programs cap out at $2M to $3M. If your loan amount falls within those limits, a physician loan often beats jumbo on down payment flexibility and rate structure. Above those limits, jumbo is the right path — and I compare multiple lenders to find the most competitive option for the balance.
          </p>
          <Link href="/loans/doctor-loan" className="text-[#5C8AA5] text-sm hover:underline flex items-center gap-2">
            Learn about physician loans →
          </Link>
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
            Let&apos;s find the most competitive jumbo structure for your purchase.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to review your loan amount, credit profile, and compare jumbo programs across multiple lenders.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
