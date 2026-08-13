import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Conventional Loans | Northern Colorado | Stevie de Gala',
  description:
    'Conventional loans in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. 3–20% down, competitive rates, no MIP. Best terms for well-qualified buyers. NMLS# 2845865',
}

const features = [
  {
    title: 'No Upfront Mortgage Insurance',
    body: 'Unlike FHA, conventional loans have no upfront mortgage insurance premium. With 20% down, there is no PMI at all — and with less than 20% down, PMI cancels automatically once you reach 20% equity.',
  },
  {
    title: 'Flexible Down Payment Options',
    body: 'Conventional loans start at 3% down for first-time buyers and 5% for repeat buyers. Putting 20% down eliminates PMI entirely and typically gets you the most competitive rate the program offers.',
  },
  {
    title: 'Best Rates for Strong Profiles',
    body: 'Borrowers with 740+ credit scores, solid income documentation, and 20% down consistently get the most competitive rates available in the market on conventional products.',
  },
  {
    title: 'PMI That Goes Away',
    body: 'Unlike FHA MIP which can last the life of the loan, conventional PMI automatically cancels at 78% LTV — and you can request removal at 80%. Once it is gone, your payment drops permanently.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a conventional loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A conventional loan is a standard mortgage not backed by a government agency. Most conventional loans are sold to Fannie Mae or Freddie Mac after origination, which means they follow those agencies\' underwriting guidelines. Conventional loans are available to any qualified borrower and are the most common mortgage product in the U.S. market.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum down payment on a conventional loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'First-time homebuyers can put as little as 3% down on a conventional loan. Repeat buyers typically need a minimum of 5%. Putting 20% down eliminates PMI entirely, which is often a meaningful monthly savings. In Northern Colorado markets where home prices are elevated, the difference between 5% and 20% down can be significant — worth running the numbers on.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does conventional PMI compare to FHA MIP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Conventional PMI is generally preferable to FHA MIP for one key reason: it goes away. Once your loan balance reaches 80% of the original home value, you can request PMI removal. At 78%, it cancels automatically. FHA MIP on loans with less than 10% down stays for the life of the loan — making conventional the better long-term choice for most borrowers who qualify.',
      },
    },
    {
      '@type': 'Question',
      name: 'When does a conventional loan make more sense than a physician loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you have 20% down payment saved, a conventional loan removes PMI from the equation and typically offers a slightly lower rate than a physician loan. If your student debt is paid down and your DTI calculates cleanly under conventional guidelines, you may find conventional gives you better overall terms. Physician loans are most valuable when you lack a large down payment or have significant student debt affecting your qualifying income.',
      },
    },
    {
      '@type': 'Question',
      name: 'What credit score do I need for a conventional loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Conventional loans require a minimum credit score of 620, though rates improve significantly at 680, 720, and 740+. For the best conventional rates in Northern Colorado, a score of 740 or above with 20% down puts you in the most competitive tier. Below 680, FHA may offer a better combination of rate and qualification flexibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the conforming loan limit for conventional loans in Larimer and Weld County?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The conforming loan limit for conventional loans is set annually by the FHFA. In Larimer and Weld counties, the limit follows the standard Colorado conforming limit. Loan amounts above that limit require a jumbo loan, which has different qualification requirements. I confirm current limits as part of every loan analysis — they change each January.',
      },
    },
  ],
}

export default function ConventionalLoanPage() {
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-6">Conventional Loan — Northern Colorado</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The standard — and when it is actually the right answer.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-2xl mb-6">
            Conventional loans offer the best rates for well-qualified buyers with strong credit and meaningful down payments. Not every borrower needs a specialized program — and for the right profile, conventional is hard to beat.
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
            What conventional does well.
          </h2>
          <p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">
            For borrowers with strong credit and sufficient down payment, the conventional product is often the cleanest and most cost-effective structure available.
          </p>
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

      {/* When it makes sense */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">When to Choose Conventional</p>
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Conventional wins when the profile fits.
          </h2>
          <div className="space-y-4 mb-10">
            {[
              { label: '20% down available', detail: 'PMI disappears entirely and you get the best rate the program offers. The most cost-efficient conventional structure.' },
              { label: 'Credit score 740+', detail: 'The rate improvement from 680 to 740+ on a conventional loan is meaningful over 30 years. If you are in this tier, conventional is usually competitive with or better than alternatives.' },
              { label: 'Student debt is paid down', detail: 'If your DTI calculates cleanly under Fannie/Freddie guidelines, you lose nothing by going conventional — and often gain on rate.' },
              { label: 'Investment property or second home', detail: 'Physician and VA loans are for primary residences. Conventional is the standard path for second homes and some investment properties.' },
            ].map((item) => (
              <div key={item.label} className="border-b border-[#2E2E2E] pb-4 grid md:grid-cols-3 gap-4">
                <span className="text-[#F8F8F8] text-sm font-medium">{item.label}</span>
                <span className="text-[#888888] text-sm leading-relaxed md:col-span-2">{item.detail}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link href="/loans/doctor-loan" className="text-[#5C8AA5] text-sm hover:underline">Compare: Physician loan →</Link>
            <Link href="/loans/fha" className="text-[#5C8AA5] text-sm hover:underline">Compare: FHA loan →</Link>
            <Link href="/loans/jumbo" className="text-[#5C8AA5] text-sm hover:underline">Compare: Jumbo loan →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Not sure if conventional is the right fit?
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            I run conventional against physician, FHA, and jumbo side by side with your actual numbers — so you can see the real cost difference before committing.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
