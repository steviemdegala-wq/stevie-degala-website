import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Building2, Hammer, Home, Layers3, Stethoscope } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Investor Funding & DSCR Loans | Mortgage Stevie',
  description: 'Hard money, private money, DSCR loans, and multi-deal financing for real estate investors. Work with Stevie de Gala, a Colorado and Texas mortgage broker with firsthand investing and underwriting experience. NMLS# 2845865.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Investor Funding & DSCR Loans | Mortgage Stevie',
    description: 'Financing for acquisitions, renovations, rental properties, construction, and repeat deal flow—with a broker who understands the deal.',
    type: 'website',
  },
}

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': ['FinancialService', 'LocalBusiness'],
  '@id': 'https://mortgagestevie.com/#business',
  name: 'Mortgage Stevie',
  founder: { '@type': 'Person', name: 'Stevie de Gala', jobTitle: 'Mortgage Broker', hasCredential: 'NMLS# 2845865' },
  description: 'Investor financing and medical professional home loans from a mortgage broker licensed in Colorado and Texas.',
  url: 'https://mortgagestevie.com',
  telephone: '+18065082666',
  email: 'SDegala@BarrettFinancial.com',
  parentOrganization: { '@type': 'Organization', name: 'Barrett Financial', identifier: { '@type': 'PropertyValue', name: 'NMLS', value: '181106' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Timnath', addressRegion: 'CO', addressCountry: 'US' },
  areaServed: [{ '@type': 'State', name: 'Colorado' }, { '@type': 'State', name: 'Texas' }],
  sameAs: ['https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/2845865', 'https://www.facebook.com/stevie.degala/'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mortgage and investor financing programs',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hard Money and Private Money', url: 'https://mortgagestevie.com/loans/private-hard-money' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'DSCR Loans', url: 'https://mortgagestevie.com/loans/dscr' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Investor Line of Credit', url: 'https://mortgagestevie.com/loans/investor-line-of-credit' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medical Professional Home Loans', url: 'https://mortgagestevie.com/who-i-help/medical-professionals' } },
    ],
  },
}

const coreProducts = [
  { number: '01', title: 'Hard Money / Private Money', body: 'Deal-specific financing for acquisitions, renovations, bridge needs, and properties that are not ready for permanent financing. Speed and flexibility can help, but the shorter term and higher cost need to fit the exit plan.', href: '/loans/private-hard-money', link: 'Explore private money' },
  { number: '02', title: 'DSCR Loans', body: 'Longer-term financing for eligible rental purchases and refinances. The property’s rental income plays a central role, while credit, reserves, value, and program rules still matter.', href: '/loans/dscr', link: 'Explore DSCR loans' },
  { number: '03', title: 'Investor Line of Credit', body: 'For investors planning several acquisitions or overlapping renovations. Depending on the program, the structure may be a true revolving line or a hybrid line with property-level review.', href: '/loans/investor-line-of-credit', link: 'Explore lines of credit' },
]

const faqItems = [
  ['Does Stevie fund every loan directly?', 'No. Stevie is a mortgage broker and financing resource. He compares relevant lender programs and helps structure the request; the selected lender makes the final underwriting and funding decision.'],
  ['Can a first-time investor use private money?', 'Potentially. Some programs allow newer investors, while pricing, leverage, liquidity, property condition, and the exit plan can change the available structure.'],
  ['What does a DSCR lender review?', 'Lenders typically review the property’s rental income and expenses, value, credit, reserves, entity and documentation, along with current program requirements. Rental income alone does not guarantee approval.'],
  ['When should I discuss financing for several deals?', 'Before the projects overlap. A planning conversation can compare deal-by-deal loans, a lender preapproval, or a true revolving facility where available.'],
  ['Where can Stevie help?', 'Stevie is based in Northern Colorado and licensed in Colorado and Texas. Business-purpose private-money availability outside those states depends on the lender, property location, and applicable requirements.'],
]

export default function HomePage() {
  return (
    <main>
      <Script id="schema-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />

      <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-[#0A0A0A] px-6 pb-20 pt-28">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block">
          <Image src="/headshot.jpg" alt="Stevie de Gala, mortgage broker and real estate investor" fill priority sizes="46vw" className="object-cover object-top grayscale" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0A0A0A_0%,transparent_50%),linear-gradient(0deg,#0A0A0A_0%,transparent_35%)]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[.25em] text-[#8FA9BD]">Real Estate Investor Funding</p>
            <h1 className="max-w-[14ch] font-serif text-5xl leading-[.96] tracking-[-.04em] text-[#F8F8F8] sm:text-6xl lg:text-7xl">Financing for your next deal and the ones after</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#B8B8B8]">Hard money, private money, DSCR loans, and investor lines of credit for investors growing their real estate portfolios. Work with a broker who brings firsthand investing and underwriting experience to the financing discussion.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/find-my-loan" className="rounded-full bg-[#F8F8F8] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition hover:bg-white">Find My Loan</Link>
              <Link href="/who-i-help/investors" className="rounded-full border border-[#666] px-7 py-3.5 text-sm font-semibold text-[#F8F8F8] transition hover:border-white">Explore Investor Financing</Link>
            </div>
            <Link href="/who-i-help/medical-professionals" className="mt-7 inline-flex items-center gap-2 text-sm text-[#9C9C9C] underline decoration-[#555] underline-offset-4 hover:text-white"><Stethoscope size={15} />Buying a home as a medical professional?</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#2E2E2E] bg-[#111] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8FA9BD]">Core investor financing</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-[#F8F8F8]">Start with the strategy. Then choose the capital.</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {coreProducts.map((product) => (
              <article key={product.title} className="flex flex-col rounded-2xl border border-[#303030] bg-[#0A0A0A] p-7">
                <p className="text-xs font-semibold tracking-[.18em] text-[#6F879A]">{product.number}</p>
                <h3 className="mt-5 font-serif text-3xl text-white">{product.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-[#A7A7A7]">{product.body}</p>
                <Link href={product.href} className="mt-7 w-max border-b border-[#777] pb-1 text-sm font-semibold text-white">{product.link}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] px-6 py-20">
        <div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8FA9BD]">Strategies supported</p><h2 className="mt-4 font-serif text-4xl text-white">Match the financing to the business plan.</h2><p className="mt-5 max-w-lg leading-7 text-[#999]">Acquisition price, renovation scope, rental income, financing cost, timing, and exit strategy all change which structure deserves a closer look.</p></div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Hammer, title: 'Fix and flip', body: 'Acquire, renovate, and sell with a clear budget, timeline, and resale plan.', href: '/fix-and-flip-calculator', link: 'Run a deal analysis' },
              { icon: Home, title: 'Rental portfolio', body: 'Purchase, refinance, and review the portfolio for stronger cash flow and responsible ways to access capital for growth.', href: '/loans/dscr#cash-flow-review', link: 'Get a free portfolio review' },
              { icon: Building2, title: 'Ground-up construction', body: 'Discuss land, plans, budget, experience, contingencies, draws, and the intended exit.', href: '/loans/bridge-construction', link: 'Discuss a construction project' },
            ].map((strategy) => <article key={strategy.title} className="rounded-2xl border border-[#292929] bg-[#111] p-6"><strategy.icon className="text-[#8FA9BD]" size={23} /><h3 className="mt-5 font-serif text-2xl text-white">{strategy.title}</h3><p className="mt-3 text-sm leading-6 text-[#999]">{strategy.body}</p><Link href={strategy.href} className="mt-5 inline-block text-sm font-semibold text-white underline decoration-[#555] underline-offset-4">{strategy.link}</Link></article>)}
          </div>
        </div></div>
      </section>

      <section className="border-y border-[#2E2E2E] bg-[#F3F3F1] px-6 py-20 text-[#111]">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#50687A]">Experience behind the financing</p><h2 className="mt-4 font-serif text-4xl leading-tight">A deal conversation with someone who has been inside the deal.</h2></div>
          <div className="space-y-5 text-base leading-7 text-[#4B4B4B]"><p>Stevie developed a self-storage project from the ground up in Gilmer, Texas, then worked in commercial real estate underwriting and helped raise capital for multifamily projects.</p><p>That experience shapes the questions he asks about basis, renovation scope, rent, reserves, carrying cost, timing, and exit—not just the loan amount.</p><Link href="/about" className="inline-block font-semibold text-black underline decoration-[#888] underline-offset-4">About Stevie</Link></div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] px-6 py-20">
        <div className="mx-auto max-w-6xl"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8FA9BD]">How it works</p><div className="mt-9 grid gap-8 md:grid-cols-3">
          {[
            ['01', 'Share the plan', 'Use Find My Loan or the fix-and-flip calculator to describe the property, strategy, timing, and upcoming deal flow.'],
            ['02', 'Compare relevant programs', 'Stevie reviews the request against applicable lender programs, tradeoffs, documentation, and current availability.'],
            ['03', 'Move with context', 'Discuss the recommendation, prepare the deal package, and decide whether to apply—without having to repeat the story.'],
          ].map(([number, title, body]) => <div key={number} className="border-t border-[#3A3A3A] pt-5"><p className="text-xs font-semibold text-[#71899B]">{number}</p><h3 className="mt-4 font-serif text-2xl text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-[#999]">{body}</p></div>)}
        </div></div>
      </section>

      <section className="border-y border-[#2E2E2E] bg-[#111] px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 md:flex-row md:items-center md:justify-between"><div className="max-w-3xl"><div className="flex items-center gap-2 text-[#8FA9BD]"><Stethoscope size={18} /><p className="text-xs font-semibold uppercase tracking-[.2em]">Second primary specialty</p></div><h2 className="mt-4 font-serif text-3xl text-white">Home loans for medical professionals</h2><p className="mt-3 leading-7 text-[#A7A7A7]">Programs designed around the income, contracts, education debt, and career path of eligible physicians and other medical professionals.</p></div><Link href="/who-i-help/medical-professionals" className="w-max rounded-full border border-[#777] px-6 py-3 text-sm font-semibold text-white hover:border-white">Explore Medical Home Loans</Link></div>
      </section>

      <section className="bg-[#0A0A0A] px-6 py-20">
        <div className="mx-auto max-w-4xl"><p className="text-xs font-semibold uppercase tracking-[.22em] text-[#8FA9BD]">Investor FAQs</p><h2 className="mt-4 font-serif text-4xl text-white">Questions worth answering before the term sheet.</h2><div className="mt-9 divide-y divide-[#2D2D2D] border-y border-[#2D2D2D]">{faqItems.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-white"><span>{question}</span><span aria-hidden className="text-[#777] group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-4 text-sm leading-7 text-[#999]">{answer}</p></details>)}</div></div>
      </section>

      <section className="bg-[#F3F3F1] px-6 py-20 text-center text-[#111]"><div className="mx-auto max-w-3xl"><Layers3 className="mx-auto text-[#50687A]" /><h2 className="mt-5 font-serif text-4xl">Start with the deal you are working on.</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-[#555]">Get a preliminary direction, see what information to prepare, and carry the context into a conversation with Stevie.</p><Link href="/find-my-loan" className="mt-8 inline-block rounded-full bg-[#0A0A0A] px-8 py-4 text-sm font-semibold text-white">Find My Loan</Link></div></section>
    </main>
  )
}
