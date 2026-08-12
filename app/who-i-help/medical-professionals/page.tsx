import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'
import PhysicianLoanCalculator from '@/components/PhysicianLoanCalculator'

export const metadata: Metadata = {
  title: 'Physician Loans for Medical Professionals | Northern Colorado | Stevie de Gala',
  description:
    'Physician loans for doctors, nurses, and medical professionals in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. Low or zero down, no PMI, student debt excluded from DTI. MD, DO, NP, CRNA, PA, RN, PharmD, DVM, and more. NMLS# 2845865',
}

const loanBenefits = [
  {
    title: 'Low or Zero Down Payment',
    body: 'Most physician loans allow you to purchase with 0–10% down — without the penalties that come with conventional loans at that threshold. Your career trajectory is the asset. A large down payment should not be the barrier between you and homeownership.',
  },
  {
    title: 'No Private Mortgage Insurance',
    body: 'Conventional loans require PMI when you put less than 20% down. Physician loans waive PMI entirely for qualifying medical professionals — saving you hundreds per month over the life of the loan.',
  },
  {
    title: 'Student Debt Handled Differently',
    body: 'Most lenders count your full student loan payment against your debt-to-income ratio. Physician loan programs either exclude deferred student debt entirely or use a much smaller calculation — which can dramatically increase what you qualify for.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Free 15-minute call',
    body: 'Tell me where you are in your career — resident, fellow, or attending — and what you are looking to buy. No forms, no pressure. Just an honest assessment of your options.',
  },
  {
    num: '02',
    title: 'I match you to the right program',
    body: 'Multiple lenders offer physician loan products, and the terms vary significantly. I compare them side by side and show you which program gives you the best rate, structure, and cost for your specific situation.',
  },
  {
    num: '03',
    title: 'I handle the details',
    body: 'Physician loan documentation can be nuanced — especially for residents with employment contracts instead of W-2s. I know what each lender needs and make sure your file is structured to close.',
  },
  {
    num: '04',
    title: 'You close and move forward',
    body: 'Clear terms, no surprise fees, and a real person to call throughout the process. Whether you are relocating for a residency or buying your first attending home, you always know where things stand.',
  },
]

const qualifyingProfessions = [
  { degree: 'MD', title: 'Doctor of Medicine' },
  { degree: 'DO', title: 'Doctor of Osteopathy' },
  { degree: 'DDS', title: 'Doctor of Dental Science or Surgery' },
  { degree: 'DMD', title: 'Doctor of Dental Medicine' },
  { degree: 'MD / DO', title: 'Doctor of Ophthalmology' },
  { degree: 'OD', title: 'Doctor of Optometry' },
  { degree: 'MD / DO', title: 'Doctor of Psychiatry' },
  { degree: 'PharmD', title: 'Doctor of Pharmacy' },
  { degree: 'DVM / VMD', title: 'Doctor of Veterinary Medicine' },
  { degree: 'DPM', title: 'Doctor of Podiatric Medicine' },
  { degree: 'CRNA', title: 'Certified Registered Nurse Anesthetist' },
  { degree: 'PA', title: 'Physician Assistant' },
  { degree: 'RN', title: 'Registered Nurse' },
  { degree: 'NP', title: 'Nurse Practitioner' },
  { degree: 'CNS', title: 'Clinical Nurse Specialist' },
  { degree: 'DC', title: 'Chiropractor' },
  { degree: 'Resident / Fellow', title: 'Medical Residents, Fellows & Interns with qualifying degree' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who qualifies for a physician loan in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Qualifying professions include MD, DO, DDS, DMD, OD, PharmD, DVM, DPM, CRNA, PA, RN, NP, CNS, DC, and medical residents, fellows, and interns with a qualifying degree. Physician loan programs in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance are available to all of these credential holders.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a medical resident or fellow get a physician loan before their first paycheck?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many physician loan programs accept a signed employment contract in lieu of pay stubs or W-2s. This means residents and fellows relocating to Northern Colorado can qualify and close on a home before their attending salary begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do physician loans require a down payment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most physician loan programs allow purchases with 0 to 10 percent down. Many medical professionals in Northern Colorado close with zero down payment, keeping their savings available for other needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is private mortgage insurance required on a physician loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Physician loans waive PMI entirely for qualifying medical professionals, even with a low or zero down payment. This saves hundreds of dollars per month compared to a conventional loan at the same down payment level.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does student loan debt affect my ability to qualify for a physician loan in Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Physician loan programs treat student debt differently than conventional lenders. Many programs exclude deferred student loans entirely from the debt-to-income calculation, or use your actual income-driven repayment payment rather than a calculated percentage of the balance. This significantly increases how much home you can qualify for.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I refinance out of a physician loan into a conventional loan later?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A physician loan is not a permanent commitment. Once your student debt is paid down, your savings have grown, or it makes financial sense to switch, you can refinance into a conventional loan with better long-term terms. The physician loan gets you into the home now without waiting years to meet conventional requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a physician loan and a conventional loan in Fort Collins?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A conventional loan requires 20 percent down to avoid PMI, counts your full student loan payment against your DTI, and does not account for your career trajectory. A physician loan allows zero down with no PMI, excludes or reduces student debt in the DTI calculation, and is designed specifically for the financial profile of medical professionals. On a $750,000 home in Northern Colorado, the physician loan typically results in less total cash out of pocket over five years compared to both conventional and FHA options.',
      },
    },
  ],
}

export default function MedicalProfessionalsPage() {
  return (
    <main className="pt-16 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/who-i-help" className="text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors flex items-center gap-2 mb-10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Who I Help
          </Link>
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">For Medical Professionals — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            A physician loan built for the way you actually earn.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl">
            You finished years of training, you are earning well, and you have real student debt. Standard lenders penalize that picture. Physician loan programs were built for it.
          </p>
          <p className="text-[#888888] text-sm mt-6 max-w-2xl leading-relaxed">
            Serving medical professionals across Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance — and throughout Northern Colorado.
          </p>
        </div>
      </section>

      {/* Loan Benefits */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What makes a physician loan different.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            These are not marketing points — they are structural differences that change what you qualify for and what you pay every month.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {loanBenefits.map((card) => (
              <div key={card.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3
                  className="text-xl text-[#0A0A0A] mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Comparison Table */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">By the Numbers</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            See the difference on a $750,000 home.
          </h2>
          <p className="text-[#888888] text-base leading-relaxed mb-10 max-w-2xl">
            A medical professional buying in Northern Colorado has three realistic paths. Here is what each one actually costs — the money you need upfront, what you pay every month, and how much insurance alone costs you over five years.
          </p>

          <div className="overflow-x-auto">
            <div className="min-w-[680px] rounded-2xl overflow-hidden border border-[#2E2E2E]">

              {/* Column headers */}
              <div className="grid grid-cols-4 bg-[#1A1A1A] border-b border-[#2E2E2E]">
                <div className="px-5 py-5 border-r border-[#2E2E2E]" />
                <div className="px-5 py-5 border-r border-[#2E2E2E]">
                  <p className="text-[#888888] text-xs uppercase tracking-widest">Conventional</p>
                  <p className="text-[#444444] text-xs mt-1">25% down</p>
                </div>
                <div className="px-5 py-5 border-r border-[#2E2E2E]">
                  <p className="text-[#888888] text-xs uppercase tracking-widest">FHA</p>
                  <p className="text-[#444444] text-xs mt-1">3.5% down</p>
                </div>
                <div className="px-5 py-5">
                  <p className="text-[#F8F8F8] text-xs uppercase tracking-widest">Physician Loan</p>
                  <p className="text-[#888888] text-xs mt-1">0% down</p>
                </div>
              </div>

              {[
                {
                  label: 'Money needed upfront',
                  conventional: '$187,500 (25%)',
                  fha: '$26,250 (3.5%)',
                  physician: '$0 (0%)',
                  wins: true,
                },
                {
                  label: 'One-time insurance fee added to your loan',
                  conventional: 'None',
                  fha: '$12,666',
                  physician: 'None',
                  wins: true,
                },
                {
                  label: 'Total amount you are borrowing',
                  conventional: '$562,500',
                  fha: '$736,416',
                  physician: '$750,000',
                  wins: false,
                },
                {
                  label: 'Interest rate',
                  conventional: '6.75%',
                  fha: '7.125%',
                  physician: '7.0%',
                  wins: false,
                },
                {
                  label: 'Monthly mortgage payment',
                  conventional: '$3,649',
                  fha: '$4,960',
                  physician: '$4,988',
                  wins: false,
                },
                {
                  label: 'Extra monthly insurance fee on top of that',
                  conventional: 'None',
                  fha: '$512 every month — forever',
                  physician: 'None',
                  wins: true,
                },
                {
                  label: 'What you actually write a check for each month',
                  conventional: '$3,649',
                  fha: '$5,472',
                  physician: '$4,988',
                  wins: false,
                  note: '$484 less per month than FHA',
                },
                {
                  label: 'Total money out of your pocket over 5 years',
                  conventional: '$406,440',
                  fha: '$354,570',
                  physician: '$299,280',
                  wins: true,
                  bold: true,
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-4 border-b border-[#2E2E2E] last:border-b-0 ${i % 2 === 0 ? 'bg-[#0A0A0A]' : 'bg-[#111111]'}`}
                >
                  <div className="px-5 py-4 border-r border-[#2E2E2E] flex items-center">
                    <span className={`text-xs leading-relaxed ${row.bold ? 'text-[#C4C4C4] font-medium' : 'text-[#888888]'}`}>
                      {row.label}
                    </span>
                  </div>
                  <div className="px-5 py-4 border-r border-[#2E2E2E] flex items-center">
                    <span className="text-[#444444] text-sm">{row.conventional}</span>
                  </div>
                  <div className="px-5 py-4 border-r border-[#2E2E2E] flex items-center">
                    <span className="text-[#444444] text-sm">{row.fha}</span>
                  </div>
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {row.wins && (
                        <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#5C8A5C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      <span className={`text-sm ${row.wins ? 'text-[#F8F8F8]' : 'text-[#888888]'} ${row.bold ? 'font-medium' : ''}`}>
                        {row.physician}
                      </span>
                    </div>
                    {row.note && (
                      <p className="text-[#5C8A5C] text-xs mt-1 leading-relaxed">{row.note}</p>
                    )}
                  </div>
                </div>
              ))}

            </div>
          </div>

          <p className="text-[#444444] text-xs mt-5 leading-relaxed max-w-3xl">
            These are estimates for illustration purposes only. Actual rates, fees, and payments will vary based on your credit profile, lender, and market conditions at the time of application. FHA availability at this price point depends on county loan limits. Not a commitment to lend. Stevie de Gala, NMLS# 2845865.
          </p>
          <p className="text-[#888888] text-sm mt-6 leading-relaxed max-w-3xl border-l-2 border-[#2E2E2E] pl-4">
            One more thing worth knowing: a physician loan is not a forever decision. Once your student debt is paid down, your savings have grown, or it simply makes financial sense to switch — you can refinance into a conventional loan with better long-term terms. It gets you into the home now, on your terms, without waiting years to meet a conventional lender&apos;s checklist.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <PhysicianLoanCalculator />
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Qualifying Professions</p>
              <h2
                className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Is your degree on this list?
              </h2>
              <p className="text-[#888888] text-lg leading-relaxed mb-6">
                Physician loan programs extend well beyond MDs. If you hold one of these credentials — or are currently in residency or a fellowship — you likely qualify.
              </p>
              <p className="text-[#888888] text-sm leading-relaxed">
                Not sure if your specific situation qualifies? That is what the call is for. Program rules vary by lender — I know which programs are most flexible and which give you the best terms for your career stage.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {qualifyingProfessions.map((p) => (
                <div
                  key={p.title}
                  className="bg-[#111111] border border-[#2E2E2E] px-5 py-3 rounded-lg flex items-center justify-between"
                >
                  <span className="text-[#C4C4C4] text-sm">{p.title}</span>
                  <span
                    className="text-[#555555] text-xs ml-4 flex-shrink-0 uppercase tracking-widest"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {p.degree}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resident / Fellow callout */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#5C8AA5] text-xs uppercase tracking-[0.25em] mb-4">Residents & Fellows</p>
              <h3
                className="text-2xl md:text-3xl text-[#F8F8F8] leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Still in training? You can still qualify.
              </h3>
              <p className="text-[#888888] text-sm leading-relaxed">
                Many physician loan programs accept a signed employment contract in lieu of pay stubs or W-2s — which means residents and fellows can qualify before their attending salary starts. If you are relocating to Northern Colorado for a residency or fellowship, let&apos;s talk about your options now.
              </p>
            </div>
            <div className="border border-[#2E2E2E] bg-[#0A0A0A] rounded-xl p-8 space-y-4">
              {[
                'Employment contract accepted in lieu of W-2',
                'No paycheck history required',
                'Student debt deferred — often excluded from DTI',
                'Close before your start date in many cases',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#5C8AA5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#C4C4C4] text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-12"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            How it works.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.num} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <p className="text-4xl text-[#0A0A0A] font-bold mb-4 leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.num}</p>
                <h3 className="text-lg text-[#0A0A0A] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{step.title}</h3>
                <p className="text-[#555555] text-sm leading-relaxed">{step.body}</p>
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
            Let&apos;s find out what you qualify for.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call. No forms. No pressure. Just clarity on your options.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>

    </main>
  )
}
