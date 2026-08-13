import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'DSCR Loans | Investor Financing | Northern Colorado | Stevie de Gala',
  description:
    'DSCR loans for real estate investors in Northern Colorado. Qualify on rental income, not your personal income or tax returns. Fort Collins, Greeley, Loveland, Timnath, Windsor, Severance. NMLS# 2845865',
}

const features = [
  {
    title: 'No Personal Income Verification',
    body: 'DSCR loans qualify based on the rental income the property generates — not your W-2s, tax returns, or employment history. This makes them ideal for self-employed investors, those with complex tax situations, or anyone with significant write-offs.',
  },
  {
    title: 'Scale Without Bureaucracy',
    body: 'Traditional investment property loans add each property\'s debt to your personal DTI, which caps how many you can acquire. DSCR loans are evaluated property by property — making it easier to build a portfolio without hitting a conventional loan ceiling.',
  },
  {
    title: 'Long-Term Fixed Options',
    body: 'DSCR loans are available as 30-year fixed products — not just short-term bridge financing. This gives investors the stability of a locked rate on a rental property without the documentation requirements of a conventional investor loan.',
  },
  {
    title: 'Works for Short-Term Rentals',
    body: 'Many DSCR programs accept short-term rental income projections (based on market data or existing STR history) in addition to traditional long-term lease income. Ideal for Airbnb or VRBO-style investment properties.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a DSCR loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A DSCR loan — Debt Service Coverage Ratio loan — is an investment property mortgage that qualifies based on the property\'s rental income rather than the borrower\'s personal income. The DSCR is calculated by dividing the property\'s gross monthly rental income by the monthly loan payment (principal, interest, taxes, insurance, and HOA if applicable). A DSCR of 1.0 means the rental income exactly covers the payment; most lenders want to see 1.1 to 1.25 or higher for the best terms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who are DSCR loans designed for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DSCR loans are designed for real estate investors who want to acquire or refinance rental properties without the documentation burden of conventional investment loans. They work particularly well for self-employed borrowers with significant tax deductions, investors building portfolios beyond what conventional DTI limits allow, and medical professionals who want to invest in real estate alongside their primary career without complicating their mortgage qualification.',
      },
    },
    {
      '@type': 'Question',
      name: 'What DSCR ratio is needed to qualify?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most DSCR lenders require a minimum ratio of 1.0 to 1.25. A ratio of 1.0 means the rental income exactly covers the full PITIA payment. Some programs allow ratios below 1.0 (called "no ratio" or "sub-1.0 DSCR") with higher down payments or stronger credit profiles. The higher the ratio, the better the rate and terms typically available. I calculate the projected DSCR for any property you are evaluating before we go further.',
      },
    },
    {
      '@type': 'Question',
      name: 'What down payment is required for a DSCR loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most DSCR loan programs require 20–25% down for single-family investment properties. Some programs allow as little as 15% down for stronger borrower profiles. Multi-unit properties typically require 25% or more. Rates and terms improve with larger down payments, and some lenders offer lower rates for borrowers with 30–35% down.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use a DSCR loan for a short-term rental or Airbnb property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many DSCR programs accept short-term rental income based on STR market data (from platforms like AirDNA) or existing rental history for properties already operating as STRs. The qualifying income is typically calculated as a percentage of projected gross short-term rental revenue. Northern Colorado\'s proximity to Rocky Mountain National Park and the outdoor recreation economy supports strong STR demand in some markets.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a DSCR loan affect my personal credit or debt ratios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The DSCR loan will appear on your credit report and does count toward your overall debt picture if you apply for other credit. However, because DSCR loans qualify on property income rather than your personal income, acquiring investment properties via DSCR does not consume the DTI capacity you would need for a primary residence physician loan or VA loan. Many investors use DSCR specifically to keep their personal loan capacity available for primary residence financing.',
      },
    },
  ],
}

export default function DSCRLoanPage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">DSCR Loan — Investor Financing</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Qualify on the property&apos;s income. Not yours.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            DSCR loans are the investor tool that conventional lenders do not want to talk about. No W-2s. No tax returns. No personal income verification. If the rent covers the payment, the loan qualifies.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Available for investment properties throughout Northern Colorado — Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Why investors use DSCR.</h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">Four structural advantages for real estate investors who want to grow a portfolio without the bottleneck of conventional qualification.</p>
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
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">How It Qualifies</p>
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            The DSCR calculation — simplified.
          </h2>
          <p className="text-[#888888] leading-relaxed mb-8 max-w-2xl">
            Debt Service Coverage Ratio = Gross Monthly Rent ÷ Monthly PITIA (principal, interest, taxes, insurance, HOA)
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { ratio: '1.25+', label: 'Strong', detail: 'Best rates and terms. Rental income meaningfully exceeds the full payment.' },
              { ratio: '1.0–1.25', label: 'Standard', detail: 'Qualifies at most lenders. Rental income covers the payment with some cushion.' },
              { ratio: 'Below 1.0', label: 'Sub-ratio', detail: 'Some lenders allow this with larger down payments and stronger credit. Higher rate.' },
            ].map((item) => (
              <div key={item.ratio} className="bg-[#111111] border border-[#2E2E2E] px-6 py-5 rounded-xl">
                <p className="text-[#F8F8F8] text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.ratio}</p>
                <p className="text-[#7A9E5C] text-xs uppercase tracking-wide mb-2">{item.label}</p>
                <p className="text-[#888888] text-xs leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <Link href="/who-i-help/investors" className="text-[#5C8AA5] text-sm hover:underline flex items-center gap-2">
            See how I work with real estate investors →
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
            Run the DSCR on a property you are evaluating.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to calculate the DSCR, compare programs across lenders, and see if the deal qualifies — before you make an offer.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
