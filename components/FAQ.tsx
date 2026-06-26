'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'What does a mortgage broker actually do?',
    a: 'A mortgage broker shops the market on your behalf. Instead of going to one bank and accepting whatever they offer, I compare rates and loan structures across 30+ lenders — then bring you the best options. You get more choices, better terms, and someone in your corner who works for you, not the lender.',
  },
  {
    q: 'Does using a broker cost me more?',
    a: 'No — in many cases, broker compensation is paid by the lender, not you. And if you would rather pay it yourself, you typically save on fees. Either way, working with a broker almost always gets you better terms than going direct to a single bank.',
  },
  {
    q: 'How much do I need for a down payment?',
    a: 'It depends on the loan type. VA and USDA loans require zero down for those who qualify. FHA loans start at 3.5% down. Conventional loans — if you were going to a bank, they would typically want 20–25% down. For investment properties, expect the same. On a free call, I can tell you exactly what applies to your situation.',
  },
  {
    q: 'Can I get a mortgage if I am self-employed?',
    a: 'Yes. Bank statement loans and Non-QM products are designed specifically for business owners and 1099 earners. Instead of using your tax returns — which often show lower income after write-offs — lenders look at your actual cash deposits. I work with these products regularly. If you went to a traditional bank, they would typically want to see two years of income history, so if this is a new switch, Non-QM or bank statement loans are an effective way to move forward.',
  },
  {
    q: 'How long does the mortgage process take?',
    a: 'From application to closing, most loans take 21 to 45 days. The biggest factor is how quickly we can collect your documents. I keep the process moving and stay in communication throughout so nothing stalls on our end.',
  },
  {
    q: 'When does it make sense to refinance?',
    a: 'A good rule of thumb is when you can lower your rate by at least 0.5% — but it really depends on your break-even point (how long until the savings outweigh closing costs). I run those numbers for free. If it makes sense, we move. If it does not, I will tell you that too.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-[#2E2E2E]">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left gap-6 group"
          >
            <span
              className="text-[#F8F8F8] text-base leading-snug group-hover:text-[#C4C4C4] transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {faq.q}
            </span>
            <svg
              className={`w-4 h-4 flex-shrink-0 text-[#888888] transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <p className="text-[#888888] text-sm leading-relaxed pb-5 max-w-3xl">
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
