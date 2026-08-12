'use client'

import { useState } from 'react'
import BookCallButton from '@/components/BookCallButton'

const PROGRAMS = [
  {
    id: 'standard',
    name: 'Physician Standard',
    minFico: 680,
    maxLtv: 100,
    maxLoanAmount: 2000000,
    propertyTypes: ['primary'],
    noMI: true,
    qualifyingDegrees: ['MD', 'DO', 'DDS', 'DMD', 'DPM', 'PharmD', 'DVM', 'VMD', 'CRNA', 'OD'],
    residentsAllowed: true,
    studentDebtNote: 'Deferred student loans excluded from DTI for residents',
    highlight: false,
  },
  {
    id: 'premier',
    name: 'Physician Premier',
    minFico: 700,
    maxLtv: 97,
    maxLoanAmount: 3000000,
    propertyTypes: ['primary', 'second'],
    noMI: true,
    qualifyingDegrees: ['MD', 'DO', 'DDS', 'DMD', 'DPM', 'PharmD', 'DVM', 'VMD', 'CRNA', 'OD', 'PA', 'RN', 'NP', 'CNS', 'DC'],
    residentsAllowed: false,
    studentDebtNote: 'Actual IBR payment used; deferred loans excluded',
    highlight: true,
  },
  {
    id: 'select',
    name: 'Physician Select',
    minFico: 700,
    maxLtv: 100,
    maxLoanAmount: 2000000,
    propertyTypes: ['primary'],
    noMI: true,
    qualifyingDegrees: ['MD', 'DO', 'DDS', 'DMD', 'DPM', 'PharmD', 'DVM', 'VMD', 'CRNA', 'OD', 'PA', 'NP'],
    residentsAllowed: true,
    studentDebtNote: 'Deferred student loans excluded from DTI',
    highlight: false,
  },
]

const DEGREE_OPTIONS = [
  { value: 'MD', label: 'MD — Doctor of Medicine' },
  { value: 'DO', label: 'DO — Doctor of Osteopathy' },
  { value: 'DDS', label: 'DDS — Doctor of Dental Science' },
  { value: 'DMD', label: 'DMD — Doctor of Dental Medicine' },
  { value: 'DPM', label: 'DPM — Doctor of Podiatric Medicine' },
  { value: 'PharmD', label: 'PharmD — Doctor of Pharmacy' },
  { value: 'DVM', label: 'DVM / VMD — Doctor of Veterinary Medicine' },
  { value: 'VMD', label: 'VMD — Veterinary Medical Doctor' },
  { value: 'CRNA', label: 'CRNA — Certified Registered Nurse Anesthetist' },
  { value: 'OD', label: 'OD — Doctor of Optometry' },
  { value: 'PA', label: 'PA — Physician Assistant' },
  { value: 'RN', label: 'RN — Registered Nurse' },
  { value: 'NP', label: 'NP — Nurse Practitioner' },
  { value: 'CNS', label: 'CNS — Clinical Nurse Specialist' },
  { value: 'DC', label: 'DC — Doctor of Chiropractic' },
  { value: 'resident', label: 'Resident / Fellow / Intern' },
]

const FICO_OPTIONS = [
  { value: 'below680', label: 'Below 680' },
  { value: '680', label: '680 – 699' },
  { value: '700', label: '700+' },
]

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function calcMonthlyPI(principal: number, annualRate: number, years = 30) {
  const r = annualRate / 100 / 12
  const n = years * 12
  if (r === 0) return principal / n
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export default function PhysicianLoanCalculator() {
  const [degree, setDegree] = useState('')
  const [fico, setFico] = useState('')
  const [homePrice, setHomePriceRaw] = useState('')
  const [downPayment, setDownPaymentRaw] = useState('')
  const [propertyType, setPropertyType] = useState('primary')
  const [rate, setRateRaw] = useState('')
  const [showResults, setShowResults] = useState(false)

  const homeVal = parseFloat(homePrice.replace(/,/g, '')) || 0
  const downVal = parseFloat(downPayment.replace(/,/g, '')) || 0
  const rateVal = parseFloat(rate) || 0
  const loanAmount = homeVal - downVal
  const ltv = homeVal > 0 ? Math.round((loanAmount / homeVal) * 100) : 0
  const ficoBelowMin = fico === 'below680'
  const ficoNum = ficoBelowMin ? 0 : (parseInt(fico) || 0)
  const isResident = degree === 'resident'

  const qualifyingPrograms = PROGRAMS.filter((p) => {
    if (!degree || !fico || homeVal === 0) return false
    if (ficoNum < p.minFico) return false
    if (ltv > p.maxLtv) return false
    if (loanAmount > p.maxLoanAmount) return false
    if (!p.propertyTypes.includes(propertyType)) return false
    if (isResident && !p.residentsAllowed) return false
    if (!isResident && !p.qualifyingDegrees.includes(degree)) return false
    return true
  })

  function handleCheck() {
    setShowResults(true)
  }

  const inputClass =
    'bg-[#111111] border border-[#2E2E2E] text-[#F8F8F8] text-sm px-4 py-3 rounded-lg w-full focus:outline-none focus:border-[#5C8AA5] transition-colors placeholder-[#555555]'
  const labelClass = 'text-[#888888] text-xs uppercase tracking-widest block mb-2'

  return (
    <div className="bg-[#111111] border border-[#2E2E2E] rounded-2xl p-8 md:p-10">
      <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Physician Loan</p>
      <h3
        className="text-2xl md:text-3xl text-[#F8F8F8] mb-2"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Which programs do I qualify for?
      </h3>
      <p className="text-[#888888] text-sm leading-relaxed mb-8 max-w-xl">
        Enter your details below to see which physician loan programs fit your situation. This is an estimate — exact terms depend on your full file.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Degree */}
        <div>
          <label className={labelClass}>Your Degree / License</label>
          <select
            value={degree}
            onChange={(e) => { setDegree(e.target.value); setShowResults(false) }}
            className={inputClass}
            style={{ appearance: 'none' }}
          >
            <option value="">Select credential</option>
            {DEGREE_OPTIONS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* FICO */}
        <div>
          <label className={labelClass}>Credit Score Range</label>
          <select
            value={fico}
            onChange={(e) => { setFico(e.target.value); setShowResults(false) }}
            className={inputClass}
            style={{ appearance: 'none' }}
          >
            <option value="">Select range</option>
            {FICO_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>

        {/* Home Price */}
        <div>
          <label className={labelClass}>Home Price</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 650,000"
            value={homePrice}
            onChange={(e) => { setHomePriceRaw(e.target.value); setShowResults(false) }}
            className={inputClass}
          />
        </div>

        {/* Down Payment */}
        <div>
          <label className={labelClass}>
            Down Payment
            {homeVal > 0 && downVal >= 0 && (
              <span className="ml-2 text-[#5C8AA5] normal-case tracking-normal">
                {ltv}% LTV {downVal === 0 ? '— Zero down' : `(${Math.round((downVal / homeVal) * 100)}% down)`}
              </span>
            )}
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0 for zero down"
            value={downPayment}
            onChange={(e) => { setDownPaymentRaw(e.target.value); setShowResults(false) }}
            className={inputClass}
          />
        </div>

        {/* Property Type */}
        <div>
          <label className={labelClass}>Property Type</label>
          <select
            value={propertyType}
            onChange={(e) => { setPropertyType(e.target.value); setShowResults(false) }}
            className={inputClass}
            style={{ appearance: 'none' }}
          >
            <option value="primary">Primary Residence</option>
            <option value="second">Second Home</option>
          </select>
        </div>

        {/* Rate */}
        <div>
          <label className={labelClass}>
            Estimated Rate (%)
            <span className="ml-1 text-[#555555] normal-case tracking-normal text-xs"> — optional, for payment estimate</span>
          </label>
          <input
            type="text"
            inputMode="decimal"
            placeholder="e.g. 6.875"
            value={rate}
            onChange={(e) => { setRateRaw(e.target.value); setShowResults(false) }}
            className={inputClass}
          />
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={!degree || !fico || homeVal === 0}
        className="bg-[#5C8AA5] text-[#F8F8F8] text-sm px-8 py-3 rounded-lg hover:bg-[#4A7A96] transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-8"
      >
        Check Programs
      </button>

      {/* Results */}
      {showResults && (
        <div>
          {qualifyingPrograms.length === 0 ? (
            <div className="border border-[#2E2E2E] rounded-xl p-6">
              {ficoBelowMin ? (
                <>
                  <p className="text-[#F8F8F8] text-sm font-medium mb-3">Physician loan programs require a minimum 680 credit score.</p>
                  <p className="text-[#888888] text-sm leading-relaxed mb-4">
                    Below 680, physician-specific programs are not available — but that does not mean you are out of options. An <a href="/loans/fha" className="text-[#5C8AA5] hover:underline">FHA loan</a> allows credit scores as low as 580 with 3.5% down and is worth looking at while you work toward the 680 threshold. Once you hit 680, we can revisit physician programs and likely get you into a much better structure.
                  </p>
                  <p className="text-[#555555] text-xs leading-relaxed mb-4">
                    Credit scores can often be improved in 60–90 days with targeted steps. A quick call can tell you exactly where you stand and what would move the number.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[#F8F8F8] text-sm font-medium mb-2">No matching programs for these parameters.</p>
                  <p className="text-[#888888] text-sm leading-relaxed mb-4">
                    This could mean your LTV exceeds program limits, the loan amount is above program maximums, or your credential does not meet the current program requirements. A quick call can clarify exactly where you stand and what adjustments would open additional options.
                  </p>
                </>
              )}
              <BookCallButton variant="outline" />
            </div>
          ) : (
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">
                {qualifyingPrograms.length} program{qualifyingPrograms.length > 1 ? 's' : ''} match your profile
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {qualifyingPrograms.map((p) => {
                  const minDown = Math.max(0, homeVal - (homeVal * p.maxLtv) / 100)
                  const actualLoan = homeVal - Math.max(downVal, minDown)
                  const monthly = rateVal > 0 ? calcMonthlyPI(actualLoan, rateVal) : null

                  return (
                    <div
                      key={p.id}
                      className={`rounded-xl p-6 border ${
                        p.highlight
                          ? 'bg-white border-[#E5E5E5]'
                          : 'bg-[#0A0A0A] border-[#2E2E2E]'
                      }`}
                    >
                      {p.highlight && (
                        <span className="text-[#5C8AA5] text-xs uppercase tracking-widest block mb-3">Broadest Eligibility</span>
                      )}
                      <h4
                        className={`text-lg mb-4 ${p.highlight ? 'text-[#0A0A0A]' : 'text-[#F8F8F8]'}`}
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {p.name}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-baseline">
                          <span className={`text-xs uppercase tracking-wide ${p.highlight ? 'text-[#888888]' : 'text-[#555555]'}`}>Min. down</span>
                          <span className={`text-sm font-medium ${p.highlight ? 'text-[#0A0A0A]' : 'text-[#F8F8F8]'}`}>
                            {p.maxLtv === 100 ? 'Zero' : `${100 - p.maxLtv}%`}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className={`text-xs uppercase tracking-wide ${p.highlight ? 'text-[#888888]' : 'text-[#555555]'}`}>Max loan</span>
                          <span className={`text-sm font-medium ${p.highlight ? 'text-[#0A0A0A]' : 'text-[#F8F8F8]'}`}>
                            {formatCurrency(p.maxLoanAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className={`text-xs uppercase tracking-wide ${p.highlight ? 'text-[#888888]' : 'text-[#555555]'}`}>PMI</span>
                          <span className="text-sm font-medium text-[#7A9E5C]">None</span>
                        </div>
                        {monthly !== null && (
                          <div className="flex justify-between items-baseline">
                            <span className={`text-xs uppercase tracking-wide ${p.highlight ? 'text-[#888888]' : 'text-[#555555]'}`}>Est. P&I</span>
                            <span className={`text-sm font-medium ${p.highlight ? 'text-[#0A0A0A]' : 'text-[#F8F8F8]'}`}>
                              {formatCurrency(monthly)}/mo
                            </span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-[#E5E5E5]/20">
                          <p className={`text-xs leading-relaxed ${p.highlight ? 'text-[#666666]' : 'text-[#555555]'}`}>{p.studentDebtNote}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="bg-[#0A0A0A] border border-[#2E2E2E] rounded-xl p-5">
                <p className="text-[#888888] text-xs leading-relaxed mb-4">
                  These results are estimates based on general program guidelines and may not reflect current rates, lender overlays, or your full credit profile. Final qualification is subject to underwriting. Stevie de Gala, NMLS# 2845865. Equal Housing Lender.
                </p>
                <BookCallButton variant="solid" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
