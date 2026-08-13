import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Bank Statement Loans | Self-Employed Borrowers | Northern Colorado | Stevie de Gala',
  description:
    'Bank statement loans for self-employed borrowers, business owners, and 1099 contractors in Northern Colorado. Qualify on deposits, not tax returns. Fort Collins, Greeley, Loveland, Timnath, Windsor. NMLS# 2845865',
}

const features = [
  {
    title: 'No Tax Returns Required',
    body: 'Bank statement loans use 12 to 24 months of personal or business bank statements to document income — not Schedule Cs or 1040s. For borrowers who write off significant expenses, this produces a much higher qualifying income than tax returns would show.',
  },
  {
    title: 'Personal or Business Statements',
    body: 'Lenders accept either personal bank statements (100% of deposits counted) or business statements (with an expense factor applied). The right choice depends on how your income flows and how your business accounts are structured.',
  },
  {
    title: 'Primary, Second Home, and Investment',
    body: 'Bank statement loans are available for primary residences, second homes, and investment properties. They are not limited to purchase — refinances and cash-out options are also available.',
  },
  {
    title: 'Competitive Rates for Strong Profiles',
    body: 'Bank statement loan rates are higher than conventional rates due to the non-QM classification, but strong credit scores, significant down payments, and healthy deposit history compress the premium significantly.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a bank statement loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A bank statement loan is a non-QM mortgage that uses 12 to 24 months of bank statements as proof of income instead of traditional W-2s and tax returns. It is designed for self-employed borrowers, business owners, and independent contractors whose tax returns significantly understate their actual income due to deductions and write-offs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who benefits most from a bank statement loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bank statement loans are most valuable for borrowers whose reported taxable income — after legitimate business deductions — is significantly lower than their actual cash flow. This includes business owners, self-employed professionals, real estate investors with large depreciation deductions, and 1099 contractors. Medical professionals working locum tenens, running their own practice, or earning 1099 income often fall into this category.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does income get calculated on a bank statement loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For personal bank statements, lenders typically count 100% of average monthly deposits over the statement period. For business bank statements, an expense factor is applied — usually 50% to 75% of deposits are counted as income, depending on the industry and the lender\'s guidelines. The higher your consistent monthly deposit volume, the stronger your qualifying income.',
      },
    },
    {
      '@type': 'Question',
      name: 'What credit score is needed for a bank statement loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most bank statement loan programs require a minimum credit score of 620 to 680, with the best rates available at 720 and above. Down payment requirements also affect rate — typically 10 to 20% down depending on the lender and loan amount. Stronger credit and larger down payments significantly compress the rate premium compared to conventional products.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a locum tenens physician use a bank statement loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Locum tenens physicians often earn 1099 income with significant variability and expense deductions, which can make conventional or physician loan qualification difficult. A bank statement loan evaluates the actual deposits over the past 12 to 24 months, which typically reflects a stronger income picture than what appears on a tax return after deductions. It is worth comparing against physician loan programs to see which produces better terms for your specific income structure.',
      },
    },
  ],
}

export default function BankStatementLoanPage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">Bank Statement Loan — Self-Employed</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Your tax return is not the whole story. We know that.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            If you are self-employed or work 1099, your tax returns likely show far less income than you actually earn — because deductions exist for a reason. A bank statement loan qualifies you on deposits, not what&apos;s left after write-offs.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Available for self-employed borrowers, business owners, and 1099 contractors throughout Northern Colorado.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>How bank statement loans work.</h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">Income documentation built around cash flow — not taxable income.</p>
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
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">For Medical Professionals</p>
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Locum tenens, private practice, and 1099 earners.
          </h2>
          <p className="text-[#888888] leading-relaxed mb-6 max-w-2xl">
            Medical professionals who earn locum tenens income, run their own practice, or work as independent contractors often face the same documentation challenge as any self-employed borrower. A bank statement loan is worth comparing against physician loan programs — depending on your income structure, it may produce meaningfully better qualifying numbers.
          </p>
          <Link href="/loans/doctor-loan" className="text-[#5C8AA5] text-sm hover:underline flex items-center gap-2">
            Compare: Physician loan →
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
            Let&apos;s see what your deposits actually qualify for.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to review your income structure, run the bank statement calculation, and compare it against other programs available to you.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
