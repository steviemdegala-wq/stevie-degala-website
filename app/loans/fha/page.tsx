import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'FHA Loans | Northern Colorado | Stevie de Gala',
  description:
    'FHA loans in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. Low down payment, flexible credit requirements starting at 580. A strong option while building toward a physician or conventional loan. NMLS# 2845865',
}

const features = [
  {
    title: '3.5% Down Payment',
    body: 'FHA loans require as little as 3.5% down for borrowers with a credit score of 580 or above. That is one of the lowest entry points available in the conventional mortgage market.',
  },
  {
    title: 'Flexible Credit Requirements',
    body: 'FHA allows credit scores as low as 580 with 3.5% down — and in some cases down to 500 with 10% down. It is one of the most accessible loan programs for borrowers rebuilding or establishing credit.',
  },
  {
    title: 'Higher DTI Tolerance',
    body: 'FHA guidelines are generally more flexible on debt-to-income ratios than conventional loans, which can help borrowers with significant monthly obligations still qualify for a home.',
  },
  {
    title: 'Competitive Rates',
    body: 'FHA loans are government-backed, which typically means rates are competitive — often lower than conventional loans at the same credit tier, partially offsetting the MIP cost.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an FHA loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An FHA loan is a mortgage insured by the Federal Housing Administration. The FHA does not lend money directly — they insure the loan, which reduces the lender\'s risk and allows more flexible qualification standards including lower credit score minimums and smaller down payments. FHA loans are a strong option for first-time buyers, those rebuilding credit, or anyone who does not yet qualify for conventional or physician loan programs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What credit score do I need for an FHA loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FHA loans are available with credit scores as low as 580 with 3.5% down. Borrowers with scores between 500 and 579 may still qualify with a 10% down payment, depending on the lender. Most physician loan and conventional loan programs require a minimum of 680, so FHA is often the best path for borrowers who are working toward that threshold.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is MIP on an FHA loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MIP — Mortgage Insurance Premium — is the FHA equivalent of PMI. FHA loans require both an upfront MIP (currently 1.75% of the loan amount, which can be rolled into the loan) and an annual MIP paid monthly. For loans with less than 10% down, MIP remains for the life of the loan. For loans with 10% or more down, MIP can be removed after 11 years. MIP is one of the primary reasons borrowers refinance out of FHA into a conventional or physician loan once their credit and equity improve.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is an FHA loan a long-term solution or a stepping stone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Often both — but for many borrowers it is a strategic stepping stone. An FHA loan gets you into a home while you build equity and improve your credit. Once your score reaches 680 or above and you have enough equity, refinancing into a conventional loan removes the MIP requirement and typically lowers your rate. For medical professionals specifically, refinancing into a physician loan once your score qualifies can be a significant financial improvement.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the FHA loan limits in Larimer and Weld County?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FHA loan limits vary by county and are updated annually by HUD. In Larimer and Weld counties, the limits are generally consistent with the Colorado Front Range standard and are sufficient for many home purchases in Fort Collins, Greeley, Loveland, and surrounding areas. High-value properties may exceed FHA limits, in which case a conventional or jumbo product would be the right structure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a medical professional use an FHA loan if they do not yet qualify for a physician loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If your credit score is below the 680 minimum that most physician loan programs require, an FHA loan can get you into a home now. Once your score crosses the 680 threshold, refinancing into a physician loan eliminates MIP and improves your overall loan structure significantly. A short-term plan to improve your credit can sometimes close that gap in 60 to 90 days — making a future refinance a realistic near-term goal.',
      },
    },
  ],
}

export default function FHALoanPage() {
  return (
    <main className="pt-16 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors flex items-center gap-2 mb-10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">FHA Loan — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            A path into homeownership while you build toward better terms.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            FHA loans offer one of the lowest credit score floors in the market — 580 with 3.5% down. For borrowers who are not yet at the 680 threshold that physician and conventional programs require, FHA is often the right move now with a clear refinance plan for later.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Serving buyers across Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance — and throughout Northern Colorado.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What FHA offers.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            Government-backed with flexible qualification standards — FHA is designed to make homeownership accessible to more buyers.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3
                  className="text-xl text-[#0A0A0A] mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MIP Note + Stepping Stone */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* MIP explanation */}
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">The Cost to Know</p>
              <h2
                className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Mortgage Insurance Premium (MIP).
              </h2>
              <p className="text-[#888888] leading-relaxed mb-6">
                FHA loans require MIP — the government equivalent of PMI. There are two components:
              </p>
              <div className="space-y-4 mb-6">
                {[
                  { label: 'Upfront MIP', detail: '1.75% of the loan amount at closing — typically rolled into the loan balance' },
                  { label: 'Annual MIP', detail: 'Paid monthly, usually 0.55% of the loan balance per year for most borrowers' },
                  { label: 'Duration', detail: 'With less than 10% down, MIP stays for the life of the loan — a key reason to have a refinance plan' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#111111] border border-[#2E2E2E] px-6 py-4 rounded-xl">
                    <p className="text-[#F8F8F8] text-sm font-medium mb-1">{item.label}</p>
                    <p className="text-[#888888] text-xs leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#555555] text-xs leading-relaxed">
                MIP does not have to be permanent. Once your credit hits 680 and you have equity in the home, refinancing into a conventional or physician loan removes MIP and often reduces your rate.
              </p>
            </div>

            {/* Stepping stone */}
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">The Plan</p>
              <h2
                className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                FHA now. Better loan later.
              </h2>
              <p className="text-[#888888] leading-relaxed mb-8">
                For medical professionals who are close to the 680 threshold, FHA can be the right move with a clear exit strategy built in from day one.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { step: '01', heading: 'Get into the home on FHA terms', body: 'Stop paying rent, start building equity. The market does not wait.' },
                  { step: '02', heading: 'Work toward 680+', body: 'Credit scores can often be improved in 60–90 days with targeted steps. I can tell you exactly what would move your number.' },
                  { step: '03', heading: 'Refinance into a physician loan', body: 'Once you hit 680, a physician loan eliminates MIP and may offer better rate structure than FHA — especially with student debt in the picture.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-5">
                    <span
                      className="text-3xl text-[#2E2E2E] font-bold leading-none flex-shrink-0"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {item.step}
                    </span>
                    <div>
                      <p className="text-[#F8F8F8] text-sm font-medium mb-1">{item.heading}</p>
                      <p className="text-[#888888] text-xs leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/loans/doctor-loan"
                className="text-[#5C8AA5] text-sm hover:underline flex items-center gap-2"
              >
                Learn about physician loans
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-12"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Frequently asked questions.
          </h2>
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

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Let&apos;s figure out the right loan — and the right plan.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            Whether FHA is your best move now or a bridge to something better — a free 15-minute call gets you a clear picture of where you stand and what comes next.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
