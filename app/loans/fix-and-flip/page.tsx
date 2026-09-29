import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Fix-and-Flip Financing | Mortgage Stevie',
  description: 'Compare deal-specific fix-and-flip financing, private and hard money, and investor lines of credit. Model profit, cash needed, and downside scenarios first.',
  alternates: { canonical: '/loans/fix-and-flip' },
}

const structures = [
  { title: 'Deal-specific bridge loan', body: 'Underwritten for one acquisition and renovation. Often the most direct route for a first deal, a unique property, or an investor building experience.' },
  { title: 'Private or hard money', body: 'Asset-focused, short-term financing when speed, property condition, or the business plan does not fit conventional lending.' },
  { title: 'Investor line of credit', body: 'For active investors, a lender may offer a true revolving line or a hybrid line with property-level review. The exact structure must be confirmed program by program.' },
]

const faqs = [
  ['Is this always a revolving line of credit?', 'No. Many products marketed around “capital” or “capacity” are still deal-by-deal loans or reusable preapprovals. A true revolving line is distinct, and current availability depends on the lender, investor experience, collateral, and credit profile.'],
  ['What does the lender evaluate?', 'Expect review of the purchase price, renovation scope and budget, after-repair value, borrower experience, credit, liquidity, property type, location, and exit strategy. Guidelines vary by lender.'],
  ['How much cash will I need?', 'That depends on leverage, lender fees, closing costs, renovation funding, interest structure, reserves, and any costs the loan does not cover. The calculator estimates contributed cash, but a lender quote controls.'],
  ['Will the calculator select my lender?', 'The calculator compares preliminary financing structures without displaying the lender identity. Stevie will review the specific lender match with you after an application or financing discussion. A calculator result is not an approval or commitment to lend.'],
]

export default function FixAndFlipPage() {
  return (
    <main className="pt-16 md:pt-20 bg-[#0A0A0A]">
      <section className="py-24 md:py-32 px-6 border-b border-[#2E2E2E]"><div className="max-w-5xl mx-auto">
        <Link href="/who-i-help/investors" className="text-[#888888] text-xs uppercase tracking-widest hover:text-white">Investor Financing</Link><p className="text-[#888888] text-xs uppercase tracking-[0.25em] mt-10 mb-6">Fix-and-Flip Financing</p>
        <h1 className="text-4xl md:text-6xl text-[#F8F8F8] leading-tight mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Finance the deal. Pressure-test the exit.</h1>
        <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-3xl mb-10">Compare short-term financing structures while keeping the real investment decision in view: total project cost, cash required, expected profit, break-even sale price, and downside risk.</p>
        <div className="flex flex-col sm:flex-row gap-4"><Link href="/fix-and-flip-calculator" className="bg-[#F8F8F8] text-[#0A0A0A] px-7 py-3.5 rounded-full text-sm text-center font-medium">Run the Fix-and-Flip Calculator</Link><Link href="/find-my-loan?goal=flip" className="border border-[#555555] text-[#F8F8F8] px-7 py-3.5 rounded-full text-sm text-center hover:border-white">Find My Loan</Link></div>
      </div></section>

      <section className="bg-[#111111] py-20 px-6 border-b border-[#2E2E2E]"><div className="max-w-7xl mx-auto">
        <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Structures to Compare</p><h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-12" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>The right structure depends on this deal—and your pipeline.</h2>
        <div className="grid md:grid-cols-3 gap-6">{structures.map((item) => <div key={item.title} className="bg-[#0A0A0A] border border-[#2E2E2E] p-8 rounded-xl"><h3 className="text-xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{item.title}</h3><p className="text-[#888888] text-sm leading-relaxed">{item.body}</p></div>)}</div>
      </div></section>

      <section className="py-20 px-6"><div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-start">
        <div><p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Before You Apply</p><h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Know what has to go right.</h2><p className="text-[#C4C4C4] leading-relaxed mb-8">A promising spread can shrink quickly after acquisition costs, financing, holding costs, construction overruns, and selling expenses. Model the base case, then test a lower sale price, a larger renovation budget, and a longer hold.</p><ul className="space-y-4 text-[#C4C4C4] text-sm">{['Purchase price and acquisition closing costs','Renovation budget and contingency','Financing fees and interest','Taxes, insurance, utilities, HOA, and maintenance','Selling costs and target after-repair value','Cash contribution, break-even price, and expected return'].map((item) => <li key={item} className="flex gap-3"><span className="text-[#7A9E5C]">✓</span>{item}</li>)}</ul></div>
        <div className="bg-white rounded-2xl p-8"><p className="text-[#666666] text-xs uppercase tracking-[0.2em] mb-4">Calculator Output</p><h3 className="text-2xl text-[#0A0A0A] mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Numbers plus preliminary financing structures.</h3><p className="text-[#444444] text-sm leading-relaxed mb-6">Based on the details you enter, the calculator compares configured programs, then shows estimated economics and sensitivity scenarios. Lender identity stays private until you apply or discuss the financing with Stevie. Results are educational and subject to full lender review.</p><Link href="/fix-and-flip-calculator" className="inline-flex bg-[#0A0A0A] text-white px-6 py-3 rounded-full text-sm">Analyze a Deal →</Link></div>
      </div></section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6"><div className="max-w-3xl mx-auto"><h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-10" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Common questions.</h2><div className="divide-y divide-[#2E2E2E]">{faqs.map(([q, a]) => <div key={q} className="py-6"><h3 className="text-[#F8F8F8] mb-3">{q}</h3><p className="text-[#888888] text-sm leading-relaxed">{a}</p></div>)}</div></div></section>

      <section className="py-24 px-6 text-center"><div className="max-w-3xl mx-auto"><h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Bring the deal and the next-deal plan.</h2><p className="text-[#C4C4C4] text-lg mb-10">We can compare a one-off loan with a revolving or hybrid line of credit for the acquisitions that may follow.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link href="/find-my-loan?goal=multiple-deals" className="bg-[#F8F8F8] text-[#0A0A0A] px-7 py-3.5 rounded-full text-sm font-medium">Find My Loan</Link><BookCallButton variant="outline" label="Discuss the Deal" /></div></div></section>
    </main>
  )
}
