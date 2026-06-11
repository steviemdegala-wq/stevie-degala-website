'use client'

import { useState } from 'react'
import { useModalStore } from '@/lib/modalStore'

export default function QualificationEstimator() {
  const { openModal } = useModalStore()
  const [annualIncome, setAnnualIncome] = useState('')
  const [low, setLow] = useState<number | null>(null)
  const [high, setHigh] = useState<number | null>(null)

  const calculate = () => {
    const income = parseFloat(annualIncome.replace(/,/g, ''))
    if (!income || isNaN(income) || income <= 0) return
    setLow(Math.round(income * 3))
    setHigh(Math.round(income * 4.5))
  }

  const fmt = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)

  return (
    <div className="border border-[#2E2E2E] bg-[#111111] p-8 md:p-10">
      <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">Calculator 3</p>
      <h2
        className="text-2xl md:text-3xl text-[#F8F8F8] mb-3"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Qualification Estimator
      </h2>
      <p className="text-[#C4C4C4] text-sm leading-relaxed mb-8">
        This is a starting point, not a guarantee. Enter your annual income to get a rough estimate of your purchase range. Your full picture matters, and that is exactly what we look at together on a call.
      </p>

      <div className="max-w-xs mb-6">
        <label className="block text-[#C4C4C4] text-xs uppercase tracking-widest mb-2">Annual Income ($)</label>
        <input
          type="text"
          value={annualIncome}
          onChange={(e) => setAnnualIncome(e.target.value)}
          className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors rounded-xl"
          placeholder="120,000"
        />
      </div>

      <button
        onClick={calculate}
        className="bg-[#F8F8F8] text-[#0A0A0A] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#0A0A0A] hover:text-[#F8F8F8] border border-[#F8F8F8] transition-all rounded-full"
      >
        Estimate
      </button>

      {low !== null && high !== null && (
        <div className="mt-8 border-t border-[#2E2E2E] pt-8">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Estimated Purchase Range</p>
          <p
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {fmt(low)} – {fmt(high)}
          </p>
          <p className="text-[#888888] text-xs mb-6">Based on 3x–4.5x annual income. Your actual range depends on your full picture.</p>
          <p className="text-[#C4C4C4] text-sm">
            Ready to find out exactly what you qualify for?{' '}
            <button onClick={openModal} className="text-[#F8F8F8] underline underline-offset-4 hover:text-[#C4C4C4] transition-colors">
              Book a free call and I will walk you through it.
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
