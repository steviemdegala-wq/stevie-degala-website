'use client'

import { useState } from 'react'
import { useModalStore } from '@/lib/modalStore'

export default function MortgageCalculator() {
  const { openModal } = useModalStore()
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('30')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const P = parseFloat(loanAmount.replace(/,/g, ''))
    const r = parseFloat(interestRate) / 100 / 12
    const n = parseFloat(loanTerm) * 12

    if (!P || !r || !n || isNaN(P) || isNaN(r) || isNaN(n)) return

    const payment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    setResult(Math.round(payment))
  }

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)

  return (
    <div className="border border-[#2E2E2E] bg-[#111111] p-8 md:p-10">
      <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Calculator 1</p>
      <h2
        className="text-2xl md:text-3xl text-[#F8F8F8] mb-3"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Mortgage Payment Calculator
      </h2>
      <p className="text-[#C4C4C4] text-sm leading-relaxed mb-8">
        Enter your loan amount, interest rate, and term to see your estimated monthly payment. A good starting point before we talk through the full picture together.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-[#C4C4C4] text-xs uppercase tracking-widest mb-2">Loan Amount ($)</label>
          <input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors rounded-xl"
            placeholder="400,000"
          />
        </div>
        <div>
          <label className="block text-[#C4C4C4] text-xs uppercase tracking-widest mb-2">Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors rounded-xl"
            placeholder="6.75"
          />
        </div>
        <div>
          <label className="block text-[#C4C4C4] text-xs uppercase tracking-widest mb-2">Loan Term (Years)</label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors appearance-none rounded-xl"
          >
            <option value="30">30 years</option>
            <option value="20">20 years</option>
            <option value="15">15 years</option>
            <option value="10">10 years</option>
          </select>
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
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Estimated Monthly Payment</p>
          <p
            className="text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {formatCurrency(result)}
          </p>
          <p className="text-[#888888] text-sm">
            Want to see what a lower rate could do for this number?{' '}
            <button onClick={openModal} className="text-[#C4C4C4] underline underline-offset-4 hover:text-[#F8F8F8] transition-colors">
              Let&apos;s talk.
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
