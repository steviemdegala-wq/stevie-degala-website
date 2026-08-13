import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'VA Home Loans | Northern Colorado Veterans | Stevie de Gala',
  description:
    'VA loans for veterans and active duty military in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. Zero down, no PMI, competitive rates. VA purchase, cash-out refinance, IRRRL streamline. NMLS# 2845865',
}

const benefits = [
  {
    title: 'Zero Down Payment',
    body: 'Eligible veterans and active duty service members can purchase a home with no down payment. No 3%, no 5%, no 20% — nothing required at closing beyond normal closing costs.',
  },
  {
    title: 'No Private Mortgage Insurance',
    body: 'Conventional loans charge PMI when you put less than 20% down. VA loans have no PMI requirement — ever. On a $600,000 home in Fort Collins, that is $200–$325 per month saved.',
  },
  {
    title: 'Competitive Interest Rates',
    body: 'Because the VA guarantees a portion of the loan, lenders take on less risk. That reduced risk consistently translates to rates among the most competitive available to any borrower.',
  },
  {
    title: 'Funding Fee Waived for Disabled Veterans',
    body: 'Veterans with a service-connected disability rating of 10% or greater have the VA funding fee waived entirely. Surviving spouses of veterans who died in service are also exempt.',
  },
]

const programs = [
  {
    title: 'VA Purchase Loan',
    body: 'Buy a home with zero down, no PMI, and a government-backed rate. Works for single-family homes, townhomes, approved condos, and new construction with some additional steps.',
  },
  {
    title: 'VA Cash-Out Refinance',
    body: 'Access up to 100% of your home\'s appraised value in many cases. Pay off high-interest debt, fund a renovation, or convert a non-VA loan into a VA loan to access VA benefits going forward.',
  },
  {
    title: 'VA IRRRL — Streamline Refinance',
    body: 'Already have a VA loan? If rates have dropped, the Interest Rate Reduction Refinance Loan lowers your rate with minimal paperwork, no appraisal in most cases, and no income verification.',
  },
]

const eligibility = [
  { group: 'Veterans', detail: 'Discharged under other than dishonorable conditions after meeting minimum service requirements' },
  { group: 'Active Duty', detail: '90+ consecutive days during wartime or 181+ days during peacetime' },
  { group: 'National Guard & Reserves', detail: '6+ years of service, or called to active duty under Title 10 or Title 32' },
  { group: 'Surviving Spouses', detail: 'Unmarried spouses of veterans who died in service or from a service-connected disability' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a VA loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A VA loan is a mortgage backed by the U.S. Department of Veterans Affairs. The VA does not lend money directly — instead, they guarantee a portion of the loan, which allows private lenders to offer favorable terms including zero down payment and no private mortgage insurance. The program has been active since 1944 and has helped more than 28 million veterans and service members purchase homes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a down payment for a VA loan in Northern Colorado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Eligible veterans and active duty service members with full VA entitlement can purchase a home anywhere in Northern Colorado — Fort Collins, Greeley, Loveland, Timnath, Windsor, or Severance — with zero down payment. There is no minimum down payment requirement and no PMI.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the VA funding fee and when is it waived?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The VA funding fee is a one-time fee that helps sustain the VA loan program. For a first-time VA loan buyer with no down payment, it is currently 2.15% of the loan amount. It can be rolled into the loan balance so no cash is required at closing. The fee is waived entirely for veterans with a service-connected disability rating of 10% or greater, and for surviving spouses of veterans who died in service or from a service-connected disability.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a loan limit on VA loans in Larimer or Weld County?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For veterans with full VA entitlement, there is no official loan limit. Since the Blue Water Navy Vietnam Veterans Act of 2020, full-entitlement borrowers can finance any amount the lender approves without a cap. Loan limits only apply if you have remaining — but not full — entitlement from a prior VA loan that was not paid off.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use my VA benefit more than once?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. VA loan benefits can be used multiple times throughout your lifetime. Your entitlement is restored when you sell a previous home and pay off the prior VA loan. Even if you currently have a VA loan, you may have remaining entitlement available for a second purchase depending on your loan balance and the county loan limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a VA IRRRL streamline refinance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The VA Interest Rate Reduction Refinance Loan (IRRRL) is a streamlined refinance available to homeowners who already have a VA loan. It is designed to lower your interest rate and monthly payment with minimal documentation, no appraisal in most cases, and no income verification required. If you have a VA loan in Northern Colorado and rates have dropped, an IRRRL is typically the fastest path to a lower payment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a veteran use a VA loan for new construction in Timnath or Windsor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. VA loans can be used for new construction in Timnath, Windsor, Severance, and other Northern Colorado communities. New construction VA loans require a VA-approved appraisal and typically a one-year builder warranty. The process involves a few additional steps compared to purchasing an existing home, but it is a common path for veterans buying in Northern Colorado\'s growing communities along the I-25 corridor.',
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
    { '@type': 'ListItem', position: 3, name: 'VA Loan', item: 'https://mortgagestevie.com/loans/va' },
  ],
}

export default function VALoanPage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">VA Loan — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The most powerful home buying benefit available. You already earned it.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            Zero down payment. No PMI. Competitive rates backed by the U.S. government. The VA loan has been available to veterans since 1944 — and too many never fully use it.
          </p>
          <p className="text-[#888888] text-sm max-w-2xl leading-relaxed">
            Serving veterans and active duty military across Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance — and throughout Northern Colorado.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Four benefits no conventional loan can match.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            The VA loan is not just a zero-down product. Every feature is designed to reduce what you pay — at closing and every month after.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3
                  className="text-xl text-[#0A0A0A] mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {b.title}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            VA loan programs available to you.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            Whether you are buying your first home, tapping equity, or looking to lower a rate you already have — there is a VA program for it.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((p) => (
              <div key={p.title} className="card-white card-hover border border-[#E5E5E5] bg-white p-8 rounded-xl">
                <h3
                  className="text-xl text-[#0A0A0A] mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Who Qualifies</p>
              <h2
                className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Eligibility is broader than most veterans realize.
              </h2>
              <div className="space-y-3 mb-8">
                {eligibility.map((item) => (
                  <div key={item.group} className="bg-[#0A0A0A] border border-[#2E2E2E] px-6 py-4 rounded-xl">
                    <p className="text-[#F8F8F8] text-sm font-medium mb-1">{item.group}</p>
                    <p className="text-[#888888] text-xs leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#555555] text-xs leading-relaxed">
                Not sure if you qualify? I pull Certificates of Eligibility directly through VA systems — in most cases within minutes. If the entitlement is there, we will find it.
              </p>
            </div>

            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Disability Rating</p>
              <h2
                className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                A disability rating changes your cost picture.
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  { pct: '10%+', benefit: 'VA funding fee waived entirely — saving you thousands at closing' },
                  { pct: '50%+', benefit: 'May qualify for Colorado property tax exemption, reducing monthly carrying cost further' },
                  { pct: '100%', benefit: 'Full exemption on both funding fee and typically the full property tax exemption in Colorado' },
                ].map((item) => (
                  <div key={item.pct} className="flex items-start gap-4 border-b border-[#2E2E2E] pb-4">
                    <span className="text-[#7A9E5C] text-sm font-medium w-12 flex-shrink-0">{item.pct}</span>
                    <span className="text-[#888888] text-sm leading-relaxed">{item.benefit}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/who-i-help/veterans"
                className="text-[#7A9E5C] text-sm hover:underline flex items-center gap-2"
              >
                See how I work with veterans
                <span>→</span>
              </Link>
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
            Your VA benefit does not expire. But the right market window does.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            A free 15-minute call to confirm your eligibility, pull your COE, and show you exactly what you qualify for in today&apos;s Northern Colorado market.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
