'use client'

import { useState } from 'react'
import { useModalStore } from '@/lib/modalStore'

export default function DTICalculator() {
  const { openModal } = useModalStore()
  const [income, setIncome] = useState('')
  const [debt, setDebt] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const i = parseFloat(income.replace(/,/g, ''))
    const d = parseFloat(debt.replace(/,/g, ''))
    if (!i || !d || isNaN(i) || isNaN(d) || i <= 0) return
    setResult(Math.round((d / i) * 100 * 10) / 10)
  }

  const isGoodDTI = result !== null && result <= 43

  return (
    <div className="border border-[#2E2E2E] bg-[#111111] p-8 md:p-10">
      <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Calculator 2</p>
      <h2
        className="text-2xl md:text-3xl text-[#F8F8F8] mb-3"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        DTI Calculator
      </h2>
      <p className="text-[#C4C4C4] text-sm leading-relaxed mb-8">
        Your debt to income ratio is one of the first things lenders look at. Enter your monthly income and your existing monthly debt payments to see where you stand.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-[#C4C4C4] text-xs uppercase tracking-widest mb-2">Gross Monthly Income ($)</label>
          <input
            type="text"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors rounded-xl"
            placeholder="8,000"
          />
        </div>
        <div>
          <label className="block text-[#C4C4C4] text-xs uppercase tracking-widest mb-2">Monthly Debt Payments ($)</label>
          <input
            type="text"
            value={debt}
            onChange={(e) => setDebt(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors rounded-xl"
            placeholder="2,400"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="bg-[#F8F8F8] text-[#0A0A0A] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#0A0A0A] hover:text-[#F8F8F8] border border-[#F8F8F8] transition-all rounded-full"
      >
        Calculate
      </button>

      {result !== null && (
        <div className="mt-8 border-t border-[#2E2E2E] pt-8">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Your DTI Ratio</p>
          <p
            className="text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {result}%
          </p>
          {isGoodDTI ? (
            <p className="text-[#C4C4C4] text-sm leading-relaxed">
              You are in good shape. Most lenders like to see a DTI below 43 percent.{' '}
              <button onClick={openModal} className="text-[#F8F8F8] underline underline-offset-4 hover:text-[#C4C4C4] transition-colors">
                Let&apos;s talk about what you can qualify for.
              </button>
            </p>
          ) : (
            <p className="text-[#C4C4C4] text-sm leading-relaxed">
              Your DTI is on the higher end. That does not mean financing is off the table. It means we need a strategy.{' '}
              <button onClick={openModal} className="text-[#F8F8F8] underline underline-offset-4 hover:text-[#C4C4C4] transition-colors">
                Book a call and let&apos;s figure it out together.
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
