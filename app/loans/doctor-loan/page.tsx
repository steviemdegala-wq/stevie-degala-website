import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Medical Professional Loan | Physician Loan | Northern Colorado | Stevie de Gala',
  description:
    'Medical professional loans for MD, DO, NP, RN, PA, DDS, PharmD, CRNA, and more in Northern Colorado. Zero down, no PMI, student debt excluded from DTI. Fort Collins, Greeley, Loveland, Timnath, Windsor. NMLS# 2845865',
}

const features = [
  {
    title: 'Zero to Low Down Payment',
    body: 'Most physician loan programs allow 0% down up to $2M and 5% down beyond that — with no PMI at any down payment level. You keep capital liquid instead of locking it into equity.',
  },
  {
    title: 'No Private Mortgage Insurance',
    body: 'PMI is waived entirely, regardless of down payment percentage. On a $650,000 home, that saves $200–$350 per month compared to a conventional loan under 20% down.',
  },
  {
    title: 'Student Debt Treated Differently',
    body: 'Most programs exclude deferred student loans from your debt-to-income calculation. Others use your actual IBR payment rather than the inflated figure conventional lenders apply.',
  },
  {
    title: 'Employment Contract Accepted',
    body: 'Residents, fellows, and new attendings can close before their first paycheck using a signed employment contract. Conventional lenders require W-2s — physician programs do not.',
  },
]

const professions = [
  { degree: 'MD', label: 'Doctor of Medicine' },
  { degree: 'DO', label: 'Doctor of Osteopathy' },
  { degree: 'DDS', label: 'Doctor of Dental Science' },
  { degree: 'DMD', label: 'Doctor of Dental Medicine' },
  { degree: 'OD', label: 'Doctor of Optometry' },
  { degree: 'PharmD', label: 'Doctor of Pharmacy' },
  { degree: 'DVM', label: 'Doctor of Veterinary Medicine' },
  { degree: 'DPM', label: 'Doctor of Podiatric Medicine' },
  { degree: 'CRNA', label: 'Certified Registered Nurse Anesthetist' },
  { degree: 'PA', label: 'Physician Assistant' },
  { degree: 'NP', label: 'Nurse Practitioner' },
  { degree: 'RN', label: 'Registered Nurse' },
  { degree: 'CNS', label: 'Clinical Nurse Specialist' },
  { degree: 'DC', label: 'Doctor of Chiropractic' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a medical professional loan (physician loan)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A medical professional loan — commonly called a physician loan or doctor loan — is a portfolio mortgage product designed specifically for licensed healthcare professionals. Unlike conventional loans, these programs allow zero or low down payments with no PMI, treat student loan debt more favorably in the DTI calculation, and often accept a signed employment contract as income documentation. They are available to MDs, DOs, dentists, pharmacists, nurses, NPs, PAs, CRNAs, and many other qualifying healthcare professionals.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do physician loans require a down payment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most physician loan programs allow 0% down up to $2 million. Some programs allow 0% down up to higher loan amounts. Above those thresholds, a small down payment (typically 5–10%) may be required. No program requires PMI regardless of down payment amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do physician loans handle student loan debt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Physician loan programs treat student debt more favorably than conventional loan guidelines. Many programs exclude student loans that are in deferment entirely from the DTI calculation. Others use your actual income-driven repayment (IBR) payment rather than a calculated percentage of the total balance. This means medical professionals with large student loan balances can often qualify for significantly more home than a conventional loan would allow.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a resident or fellow use a physician loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many physician loan programs accept a signed employment contract as documentation of income, which means a resident or fellow who has accepted an attending position can close on a home before their first paycheck. This is one of the most valuable aspects of physician loans for medical professionals in training or transitioning to a new role in Northern Colorado.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are physician loan rates higher than conventional rates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Physician loan rates are typically slightly higher than the best conventional rates — usually 0.125% to 0.5% higher depending on the lender and market conditions. For most borrowers, this small premium is more than offset by the absence of PMI. On a $650,000 loan, eliminating $250/month in PMI often costs less over time than the rate difference would add to the payment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What credit score is needed for a physician loan in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most physician loan programs in Northern Colorado require a minimum credit score of 680, with the best terms available at 700 and above. Credit score is one of the first things I review so there are no surprises. If your score is below 680, we can discuss what would move it to the qualifying threshold and whether an alternative loan structure makes sense in the meantime.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a physician loan be used for new construction in Timnath or Windsor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Physician loans can be used for new construction in Timnath, Windsor, Severance, and other Northern Colorado communities. New construction physician loans require a purchase agreement and may have additional documentation steps depending on the builder. I work through new construction transactions regularly in these markets.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgagestevie.com' },
    { '@type': 'ListItem', position: 2, name: 'Loans', item: 'https://mortgagestevie.com/loans' },
    { '@type': 'ListItem', position: 3, name: 'Medical Professional Loan', item: 'https://mortgagestevie.com/loans/doctor-loan' },
  ],
}

export default function DoctorLoanPage() {
  return (
    <main className="pt-16 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">Medical Professional Loan — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The mortgage built for how medical professionals actually earn.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            Zero down. No PMI. Student debt excluded from your DTI. Physician loans exist because conventional guidelines were not built for your financial profile — high earning potential, significant training debt, and often limited time to build savings.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Serving medical professionals across Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance — and throughout Northern Colorado.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What makes a medical professional loan different.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            Four structural advantages that a conventional loan does not offer — regardless of your credit or income.
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

      {/* Who Qualifies */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Qualifying Credentials</p>
              <h2
                className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Who qualifies for a medical professional loan?
              </h2>
              <p className="text-[#888888] leading-relaxed mb-8">
                The product covers far more than physicians. Any of the following credentials qualify — along with residents, fellows, and interns with a qualifying degree in progress.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {professions.map((p) => (
                  <div key={p.degree} className="flex items-baseline gap-3">
                    <span
                      className="text-[#555555] text-xs uppercase tracking-widest flex-shrink-0"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {p.degree}
                    </span>
                    <span className="text-[#888888] text-xs leading-relaxed">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Residents & Fellows</p>
              <h2
                className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                You do not have to wait until you are attending.
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  { heading: 'Employment contract accepted', body: 'A fully executed offer letter or employment contract replaces W-2s and pay stubs. You can close before your start date.' },
                  { heading: 'Deferred student loans excluded', body: 'Loans in deferment during residency are excluded from DTI on most programs, dramatically improving your qualifying income.' },
                  { heading: 'Buy on the way in', body: 'If you are relocating to Northern Colorado for a residency at UCHealth, Banner Health, or another system, you do not have to rent while you wait.' },
                ].map((item) => (
                  <div key={item.heading} className="bg-[#111111] border border-[#2E2E2E] px-6 py-4 rounded-xl">
                    <p className="text-[#F8F8F8] text-sm font-medium mb-1">{item.heading}</p>
                    <p className="text-[#888888] text-xs leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/who-i-help/medical-professionals"
                className="text-[#5C8AA5] text-sm hover:underline flex items-center gap-2"
              >
                See how I work with medical professionals
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rate Note */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#5C8AA5]/40 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#5C8AA5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[#F8F8F8] text-sm font-medium mb-2">On physician loan rates</p>
              <p className="text-[#888888] text-sm leading-relaxed max-w-2xl">
                Physician loan rates run slightly higher than the best conventional rates — typically 0.125% to 0.5% depending on the lender and program. For most borrowers without 20% down, that small premium is more than offset by the elimination of PMI. A physician loan is also not a forever decision — once your equity grows or it makes sense to switch, refinancing into a conventional structure is straightforward. I run both scenarios side by side before you commit to anything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0A0A0A] py-20 px-6">
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
      <section className="bg-[#111111] border-t border-[#2E2E2E] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            See which medical professional loan program fits your situation.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to review your credentials, credit, and loan size — and compare medical professional loan options against conventional side by side.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
