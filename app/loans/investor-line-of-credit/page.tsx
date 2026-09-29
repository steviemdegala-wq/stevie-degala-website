import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Investor Line of Credit | Revolving & Hybrid Options | Mortgage Stevie',
  description: 'Plan financing for multiple acquisitions and overlapping renovation projects with revolving or hybrid investor line-of-credit options.',
  alternates: { canonical: '/loans/investor-line-of-credit' },
  openGraph: {
    title: 'Investor Line of Credit | Mortgage Stevie',
    description: 'Explore revolving and hybrid line-of-credit structures for repeat acquisitions and overlapping projects.',
  },
}

const comparisons = [
  { title: 'True revolving line', body: 'A credit facility that may allow funds to be borrowed, repaid, and borrowed again within its terms. Collateral, availability, draws, fees, and deal review vary by program.' },
  { title: 'Hybrid line of credit', body: 'An upfront borrower and line review designed for repeat use, with property-level approval, appraisal, underwriting, and closing requirements that may still apply to each draw or deal.' },
  { title: 'Deal-by-deal private money', body: 'A separate loan for each acquisition or renovation. It can be the right structure for a specific opportunity, a first project, or a deal outside a facility’s rules.' },
]

const preparation = [
  'Expected acquisitions or renovations during the next 12 months',
  'Whether projects are likely to overlap',
  'Typical purchase price, renovation budget, and property type',
  'Completed investment projects and current portfolio',
  'Available liquidity, equity, and preferred borrower entity',
  'Target markets, timing, and exit strategies',
]

const faq = [
  ['Is every investor line of credit fully revolving?', 'No. Some programs are true revolving facilities; others are hybrid lines with an upfront borrower review and property-level approval for each deal. Stevie will explain the exact structure before you proceed.'],
  ['Does an upfront review eliminate underwriting on each deal?', 'Not necessarily. Even with a line or preapproval, a lender may still review the property, appraisal, renovation scope, title, insurance, entity documents, and exit plan.'],
  ['Is there a guaranteed line amount?', 'No. The available line depends on the program, borrower, portfolio, liquidity, experience, collateral, and each project. Public marketing ranges are not approvals.'],
  ['Who should explore an investor line of credit?', 'Investors expecting several acquisitions, renovations that may overlap, or repeat deal flow can benefit from arranging a line before the next contract arrives.'],
]

export default function InvestorLineOfCreditPage() {
  return (
    <main className="pt-16 md:pt-20">
      <section className="bg-[#0A0A0A] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <Link href="/who-i-help/investors" className="text-xs uppercase tracking-widest text-[#888] hover:text-white">Investor financing</Link>
          <p className="mt-10 text-xs uppercase tracking-[.22em] text-[#8FA9BD]">Financing for repeat deal flow</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.02] text-white md:text-6xl">Put a line of credit behind your next deals.</h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-[#C4C4C4]">If you expect several acquisitions or renovations in the next year, the conversation is bigger than one loan. Compare a true revolving line, a hybrid line of credit, and deal-by-deal private money on their actual terms.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/find-my-loan?goal=multiple-deals" className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black">Discuss an Investor Line</Link><Link href="/fix-and-flip-calculator" className="rounded-full border border-[#666] px-7 py-3.5 text-sm font-semibold text-white">Analyze a Specific Deal</Link></div>
        </div>
      </section>

      <section className="border-y border-[#2E2E2E] bg-[#111] px-6 py-20"><div className="mx-auto max-w-7xl"><p className="text-xs uppercase tracking-[.22em] text-[#8FA9BD]">Know the structure</p><h2 className="mt-4 max-w-3xl font-serif text-4xl text-white">Similar goal. Different legal and lending mechanics.</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{comparisons.map((item) => <article key={item.title} className="rounded-2xl border border-[#303030] bg-[#0A0A0A] p-7"><h3 className="font-serif text-2xl text-white">{item.title}</h3><p className="mt-4 text-sm leading-7 text-[#A5A5A5]">{item.body}</p></article>)}</div></div></section>

      <section className="bg-[#0A0A0A] px-6 py-20"><div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2"><div><p className="text-xs uppercase tracking-[.22em] text-[#8FA9BD]">When it may fit</p><h2 className="mt-4 font-serif text-4xl text-white">Arrange the line before the projects overlap.</h2><p className="mt-5 leading-7 text-[#A5A5A5]">Multiple planned purchases, overlapping projects, or a need to make offers with more confidence can justify an earlier line-of-credit review. One planned deal does not rule it out if you are deliberately building toward repeat acquisitions.</p></div><div><h3 className="font-serif text-2xl text-white">Information to prepare</h3><ul className="mt-5 grid gap-3 text-sm leading-6 text-[#B5B5B5]">{preparation.map((item) => <li key={item} className="border-b border-[#292929] pb-3">{item}</li>)}</ul></div></div></section>

      <section className="border-y border-[#2E2E2E] bg-[#F3F3F1] px-6 py-20 text-[#111]"><div className="mx-auto max-w-5xl"><p className="text-xs uppercase tracking-[.22em] text-[#50687A]">Tradeoffs to compare</p><div className="mt-8 grid gap-7 md:grid-cols-3">{[
        ['Speed versus certainty', 'An upfront review may shorten later conversations, but property-level requirements and lender approval can still control timing.'],
        ['Availability versus cost', 'Fees, unused-line requirements, interest mechanics, points, and extension terms can make a flexible structure more or less attractive than separate loans.'],
        ['Line size versus collateral', 'A larger line may require portfolio equity, guaranties, liquidity, or collateral that you would rather preserve.'],
      ].map(([title, body]) => <div key={title}><h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-[#555]">{body}</p></div>)}</div></div></section>

      <section className="bg-[#0A0A0A] px-6 py-20"><div className="mx-auto max-w-4xl"><h2 className="font-serif text-4xl text-white">Questions investors ask</h2><div className="mt-8 divide-y divide-[#2D2D2D] border-y border-[#2D2D2D]">{faq.map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer font-semibold text-white">{question}</summary><p className="max-w-3xl pt-4 text-sm leading-7 text-[#999]">{answer}</p></details>)}</div></div></section>

      <section className="border-t border-[#2E2E2E] bg-[#111] px-6 py-20 text-center"><div className="mx-auto max-w-3xl"><h2 className="font-serif text-4xl text-white">Map the next 12 months, not just the next closing.</h2><p className="mt-4 leading-7 text-[#AAA]">Share the number of projects you expect, whether they may overlap, and the typical deal profile. Stevie can identify whether a revolving or hybrid line is worth a real lender conversation.</p><Link href="/find-my-loan?goal=multiple-deals" className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-semibold text-black">Discuss an Investor Line</Link><p className="mx-auto mt-5 max-w-2xl text-xs leading-5 text-[#777]">This page describes planning options, not a prequalification or approval. Line structure, amount, pricing, collateral, and availability are subject to lender requirements and underwriting.</p></div></section>
    </main>
  )
}
