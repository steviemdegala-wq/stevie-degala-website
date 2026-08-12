import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'VA Home Loans for Veterans in Northern Colorado | Stevie de Gala',
  description:
    'VA loans for veterans and active duty military in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. Zero down, no PMI, competitive rates. VA purchase, cash-out refinance, and IRRRL. NMLS# 2845865',
}

const vaPrograms = [
  {
    title: 'VA Purchase Loan',
    body: 'Buy a home with zero down payment and no private mortgage insurance. VA purchase loans are backed by the U.S. Department of Veterans Affairs, which means lenders can offer competitive rates even without a large down payment or PMI.',
  },
  {
    title: 'VA Cash-Out Refinance',
    body: 'Access your home equity — up to 100% of your home\'s value in many cases. Whether you want to pay off high-interest debt, fund a renovation, or free up cash for another goal, a VA cash-out refi lets you leverage what you have built.',
  },
  {
    title: 'VA IRRRL — Streamline Refinance',
    body: 'The Interest Rate Reduction Refinance Loan is one of the fastest refinance options available. If you already have a VA loan and rates have dropped, an IRRRL can lower your payment with minimal paperwork and no appraisal in most cases.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Confirm eligibility',
    body: 'Most veterans, active duty service members, and surviving spouses qualify. I help you pull your Certificate of Eligibility (COE) — the process is straightforward and I handle it.',
  },
  {
    num: '02',
    title: 'I review your full picture',
    body: 'Income, credit, entitlement remaining — I look at everything and tell you exactly what you qualify for and which VA program fits your goal.',
  },
  {
    num: '03',
    title: 'I shop VA lenders',
    body: 'VA loan rates vary between lenders even for the same borrower profile. I compare multiple lenders and bring you the most competitive option — not just the first one that says yes.',
  },
  {
    num: '04',
    title: 'You close with confidence',
    body: 'I stay with you through to closing. VA loans have specific requirements around appraisals and the MPR process — I make sure nothing slows you down.',
  },
]

const eligibilityGroups = [
  { group: 'Veterans', detail: 'Discharged under conditions other than dishonorable after minimum service requirements' },
  { group: 'Active Duty', detail: 'Currently serving with minimum days of continuous active duty service' },
  { group: 'National Guard & Reserves', detail: 'With at least 6 years of service or called to active duty under Title 10 or Title 32' },
  { group: 'Surviving Spouses', detail: 'Unremarried spouses of veterans who died in service or from a service-connected disability' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is eligible for a VA loan in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VA loan eligibility extends to veterans discharged under other than dishonorable conditions, active duty service members, National Guard and Reserve members with at least six years of service or those called to active duty, and surviving spouses of veterans who died in service or from a service-connected disability. Veterans purchasing homes in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance may all qualify.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a down payment required for a VA loan in Fort Collins or Timnath?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Eligible veterans and active duty service members can purchase a home in Northern Colorado with zero down payment using a VA loan. There is no PMI requirement either, making the VA loan one of the most cost-effective financing options available.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the VA funding fee and when is it waived?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The VA funding fee is a one-time fee that helps sustain the VA loan program. For a first-time VA loan buyer with no down payment, it is currently 2.15 percent of the loan amount and can be rolled into the loan balance. The fee is waived entirely for veterans with a service-connected disability rating of 10 percent or greater, and for surviving spouses of veterans who died in service or from a service-connected disability.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use my VA loan benefit more than once?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. VA loan benefits can be used multiple times throughout your lifetime. As long as you have remaining entitlement — or you sell a previous home and restore your entitlement — you can use a VA loan again for a new purchase or refinance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a loan limit on VA loans in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For veterans with full entitlement, there is no official cap on how much you can borrow with a VA loan in Larimer or Weld County, as long as your income supports the payment and the lender approves the file. Loan limits only apply if you have remaining entitlement from a prior VA loan that was not paid off.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a veteran use a VA loan for new construction in Windsor or Timnath?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. VA loans can be used for new construction in Windsor, Timnath, and other Northern Colorado communities. New construction VA loans require a VA-approved appraisal and typically a one-year builder warranty. The process has a few additional steps compared to an existing home purchase, but it is a common path for veterans buying in Northern Colorado\'s growing communities.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a VA IRRRL streamline refinance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The VA Interest Rate Reduction Refinance Loan, or IRRRL, is a streamlined refinance available to homeowners who already have a VA loan. It is designed to lower your interest rate and monthly payment with minimal paperwork, no appraisal in most cases, and no income verification. If you have an existing VA loan in Northern Colorado and rates have dropped, an IRRRL can reduce your payment quickly.',
      },
    },
  ],
}

export default function VeteransPage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">For Veterans & Active Duty — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            You earned this benefit. Let&apos;s make sure you actually use it.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl">
            The VA loan is the most powerful home financing benefit in the country — zero down, no PMI, and rates that compete with anything in the market. Too many veterans never fully use it.
          </p>
          <p className="text-[#888888] text-sm mt-6 max-w-2xl leading-relaxed">
            Serving veterans and active duty military across Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance — and throughout Northern Colorado.
          </p>
        </div>
      </section>

      {/* VA Programs */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            VA loan programs I work with.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            Whether you are buying your first home, your next home, or looking to tap equity you have built — there is a VA program for it.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {vaPrograms.map((card) => (
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

      {/* Key VA Benefits */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Why VA</p>
              <h2
                className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                No down payment. No PMI. No comparison.
              </h2>
              <p className="text-[#888888] text-lg leading-relaxed mb-8">
                Run the numbers against any conventional loan and the VA benefit wins — especially in Northern Colorado&apos;s market where home prices make PMI a significant monthly cost.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Down payment', va: 'Zero required', conv: 'Typically 5–20%' },
                  { label: 'PMI', va: 'None', conv: 'Required under 20% down' },
                  { label: 'Rates', va: 'Highly competitive', conv: 'Varies by lender' },
                  { label: 'VA funding fee', va: 'Waived for 10%+ disability', conv: 'N/A' },
                ].map((row) => (
                  <div key={row.label} className="grid grid-cols-3 gap-4 border-b border-[#2E2E2E] pb-4">
                    <span className="text-[#888888] text-xs uppercase tracking-wide">{row.label}</span>
                    <span className="text-[#7A9E5C] text-sm font-medium">{row.va}</span>
                    <span className="text-[#555555] text-sm">{row.conv}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 pt-1">
                <span className="text-[#555555] text-xs"></span>
                <span className="text-[#7A9E5C] text-xs uppercase tracking-wide">VA Loan</span>
                <span className="text-[#555555] text-xs uppercase tracking-wide">Conventional</span>
              </div>
            </div>

            {/* Eligibility */}
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Who Qualifies</p>
              <h2
                className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Who is eligible for a VA loan?
              </h2>
              <div className="space-y-3 mb-8">
                {eligibilityGroups.map((item) => (
                  <div key={item.group} className="bg-[#111111] border border-[#2E2E2E] px-6 py-4 rounded-xl">
                    <p className="text-[#F8F8F8] text-sm font-medium mb-1">{item.group}</p>
                    <p className="text-[#888888] text-xs leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#555555] text-xs leading-relaxed">
                Not sure if you qualify? I pull your Certificate of Eligibility directly — if it is there, we will find it. Service requirements vary by era. A quick call confirms everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Fee Note */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#7A9E5C]/40 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#7A9E5C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[#F8F8F8] text-sm font-medium mb-2">VA Funding Fee — and when it is waived</p>
              <p className="text-[#888888] text-sm leading-relaxed max-w-2xl">
                VA loans include a one-time funding fee (typically 1.25–3.3% of the loan amount depending on down payment and usage). However, veterans with a service-connected disability rating of 10% or greater have the funding fee waived entirely. Surviving spouses of veterans who died in service or from a service-connected disability are also exempt. I will confirm your status early in the process so you know exactly what to expect.
              </p>
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
            Your VA benefit does not expire. But the right market window does.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to confirm eligibility, walk through your options, and find out what you can buy today.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>

    </main>
  )
}
