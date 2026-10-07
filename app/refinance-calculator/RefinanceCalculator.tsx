'use client'

import { APPLICATION_URL } from '@/lib/application'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { calculateRefinance, money, RefinanceInput, validRefinance } from '@/lib/refinance'

const steps = ['Your goal', 'Your numbers', 'Closing costs', 'Loan change', 'Talk with Stevie']
const inputClass = 'mt-2 block w-full rounded-xl border border-[#bcbcb5] bg-white px-4 py-3 text-base text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#556b56]'
const buttonClass = 'rounded-full bg-[#151515] px-7 py-3.5 font-semibold text-white hover:bg-[#363636] disabled:opacity-50'

export default function RefinanceCalculator({ bookingUrl }: { bookingUrl: string }) {
  const [step, setStep] = useState(0)
  const [type, setType] = useState<RefinanceInput['type']>('cash-out')
  const [fields, setFields] = useState({ homeValue: '', balance: '', cashOut: '', currentPayment: '' })
  const [contact, setContact] = useState({ name: '', email: '', phone: '' })
  const [property, setProperty] = useState({ zip: '', use: 'Primary home', cashPurpose: '' })
  const [consent, setConsent] = useState(false)
  const [sending, setSending] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => { if (step > 0) { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: 'start' }) } }, [step])
  const data: RefinanceInput = { type, homeValue: Number(fields.homeValue), balance: Number(fields.balance), cashOut: type === 'cash-out' ? Number(fields.cashOut) : 0, currentPayment: Number(fields.currentPayment) }
  const result = validRefinance(data) ? calculateRefinance(data) : null
  function next(event: FormEvent) {
    event.preventDefault()
    if (step === 1 && !validRefinance(data)) { setError('Please enter valid numbers in every required field.'); return }
    setError(''); setStep(step + 1)
  }
  function numberField(key: keyof typeof fields, label: string, hint?: string) {
    return <label className="block font-medium" key={key}>{label}<input className={inputClass} type="number" inputMode="decimal" required min="0.01" max={key === 'currentPayment' ? 1000000 : 100000000} step="any" value={fields[key]} onChange={e => { setFields({ ...fields, [key]: e.target.value }); setSaved(false) }} />{hint && <span className="mt-2 block text-sm font-normal leading-6 text-[#5a5a53]">{hint}</span>}</label>
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); if (sending || saved) return
    setSending(true); setError('')
    try {
      const response = await fetch('/api/refinance', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ input: data, contact, property: { ...property, cashPurpose: type === 'cash-out' ? property.cashPurpose : '' }, consent }) })
      const body = await response.json()
      if (!response.ok || !body.ok) throw new Error(body.error || 'Your request could not be saved. Please try again.')
      setSaved(true)
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to connect. Please try again.') }
    finally { setSending(false) }
  }
  return <main className="min-h-screen bg-[#f5f4ef] px-5 pb-20 pt-28 text-[#171717] md:pt-36">
    <div className="mx-auto max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#596451]">Mortgage Stevie · Refinance calculator</p>
      <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">A new loan. A clearer picture.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-7 text-[#57574f]">See the cash, costs, and payment change before deciding on your next move.</p>
      <div className="my-8 flex items-center gap-6 sm:gap-12">
        <div role="progressbar" aria-label="Refinance calculator progress" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={step + 1} aria-valuetext={`Step ${step + 1} of ${steps.length}: ${steps[step]}`} className="h-1 flex-1 overflow-hidden rounded-full bg-[#ddd8d1]">
          <div className="h-full bg-[#555] transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <span aria-hidden="true" className="min-w-[40px] text-right text-xs tabular-nums text-[#777]">{step + 1} / {steps.length}</span>
      </div>
      <section className="rounded-3xl border border-[#deded5] bg-white p-6 shadow-sm sm:p-10">
        <h2 ref={heading} tabIndex={-1} className="mb-6 scroll-mt-24 font-serif text-3xl focus:outline-none">{['What type of refinance are you considering?', 'Start with your home and current loan.', 'What would closing cost?', 'Is the change worth it?', 'Let’s review your refinance.'][step]}</h2>
        {step === 0 && <form onSubmit={next}>
          <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="sr-only">Refinance type</legend>{(['cash-out', 'rate-and-term'] as const).map(option => <label key={option} className={`cursor-pointer rounded-2xl border-2 p-6 ${type === option ? 'border-[#53644d] bg-[#f0f3ed]' : 'border-[#deded5]'}`}><input type="radio" name="refinanceType" checked={type === option} onChange={() => { setType(option); setSaved(false) }} className="mr-3 accent-[#53644d]" /><span className="text-lg font-semibold">{option === 'cash-out' ? 'Cash-out' : 'Rate and term'}</span><span className="mt-3 block text-sm leading-6 text-[#57574f]">{option === 'cash-out' ? 'Access equity and see the cost of borrowing more.' : 'Compare a new payment and the cost to refinance.'}</span></label>)}</fieldset>
          <button className={`${buttonClass} mt-8`}>Continue</button>
        </form>}
        {step === 1 && <form onSubmit={next}>
          <div className="grid gap-6 sm:grid-cols-2">
            {numberField('homeValue', 'Estimated home value ($)')}
            {numberField('balance', 'Current mortgage payoff ($)', 'Include all mortgage balances you intend to pay off.')}
            {type === 'cash-out' && numberField('cashOut', 'Cash you want to receive ($)', 'Enter the cash you want after estimated closing costs. Costs will be added to the new loan.')}
            {numberField('currentPayment', 'Current monthly principal + interest ($)', 'Exclude taxes, homeowners insurance, mortgage insurance, HOA dues, and extra principal payments. Include payments on all loans being paid off.')}
          </div>
          {type === 'cash-out' && <p className="mt-6 rounded-xl bg-[#f0f3ed] p-4 text-sm leading-6">We use 75% of home value as a planning guideline for the total new mortgage, including closing costs. Going above that may be difficult, depending on the program.</p>}
          <button className={`${buttonClass} mt-8`}>See closing costs</button>
        </form>}
        {step === 2 && result && <div>
          <p className="mb-5 leading-7 text-[#57574f]">These example costs are financed into the new loan. The 2% origination fee is calculated on the final loan amount, including those costs.</p>
          <dl className="divide-y divide-[#e4e4dc]">{[['Origination · 2% of new loan', result.origination], ['Appraisal', 1000], ['Title work', 500], ['Processing + underwriting', 2000], ['Total estimated closing costs', result.closingCosts], ['Current mortgage payoff', data.balance], ...(type === 'cash-out' ? [['Cash to you', result.cashOut]] : []), ['Estimated new loan amount', result.loanAmount]].map(([label, value]) => <div key={String(label)} className="flex justify-between gap-5 py-4"><dt>{label}</dt><dd className="text-right font-semibold">{money(Number(value))}</dd></div>)}</dl>
          <p className="mt-5 text-sm leading-6 text-[#62625a]">Estimates exclude prepaid interest, escrow deposits, taxes, insurance, mortgage insurance, and any additional lender, government, or third-party charges. Actual fees and payoff amounts may differ.</p>
          <button onClick={() => setStep(3)} className={`${buttonClass} mt-8`}>Compare the loan change</button>
        </div>}
        {step === 3 && result && <div>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">{[['Current P&I / month', money(data.currentPayment)], ['New P&I / month*', money(result.payment)], [result.monthlySavings >= 0 ? 'Monthly reduction' : 'Monthly increase', money(Math.abs(result.monthlySavings))]].map(([label,value]) => <div key={label} className="rounded-2xl bg-[#f3f3ee] p-5"><p className="text-sm text-[#5a5a53]">{label}</p><p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p></div>)}</div>
          <p className="text-sm leading-6 text-[#62625a]">*Illustrative 8% fixed interest rate over a new 30-year term. This is an example, not a rate quote, APR, offer, or approval. Payments are principal and interest only.</p>
          <div className="my-6 rounded-2xl border border-[#d4dccd] bg-[#f0f3ed] p-6"><h3 className="font-serif text-2xl">{result.title}</h3><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6">{result.points.map(point => <li key={point}>{point}</li>)}</ul></div>
          <dl className="grid gap-4 sm:grid-cols-2"><div><dt className="text-sm text-[#62625a]">New loan / home value</dt><dd className="mt-1 text-xl font-semibold">{(result.ltv * 100).toFixed(1)}% LTV</dd></div>{type === 'cash-out' && <div><dt className="text-sm text-[#62625a]">Estimated cash available at 75% LTV</dt><dd className="mt-1 text-xl font-semibold">{money(result.cashAvailableAt75)}</dd><p className="mt-1 text-xs text-[#62625a]">After modeled payoff and costs; not a lending limit or approval.</p></div>}</dl>
          {type === 'rate-and-term' && <p className="mt-5 text-sm leading-6 text-[#62625a]">Simple payment break-even divides estimated fees by monthly P&I savings. It is not a total-cost or equity comparison and does not account for different amortization schedules, the interest on financed fees, or future loan changes.</p>}
          <button onClick={() => setStep(4)} className={`${buttonClass} mt-8`}>Review this with Stevie</button>
        </div>}
        {step === 4 && <div>
          {saved ? <div role="status" className="rounded-xl bg-[#f0f3ed] p-6"><h3 className="text-xl font-semibold">Your refinance summary has been sent to Stevie.</h3><p className="mt-2 leading-6">Choose a time below to discuss it. Sending this request does not book an appointment.</p></div> : <form onSubmit={submit}>
            <p className="mb-6 text-[#57574f]">Send Stevie your numbers so he can review the scenario before your call.</p>
            <div className="grid gap-5 sm:grid-cols-2">{(['name', 'email', 'phone'] as const).map(key => <label key={key} className="block font-medium">{key === 'name' ? 'Full name' : key === 'email' ? 'Email' : 'Phone'}<input className={inputClass} autoComplete={key === 'phone' ? 'tel' : key} type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'} required maxLength={key === 'email' ? 254 : 120} value={contact[key]} onChange={e => setContact({ ...contact, [key]: e.target.value })} /></label>)}
            <label className="block font-medium">Property ZIP code<input className={inputClass} inputMode="numeric" pattern="[0-9]{5}" required maxLength={5} value={property.zip} onChange={e => setProperty({ ...property, zip: e.target.value })} /></label>
            <label className="block font-medium">Property use<select className={inputClass} value={property.use} onChange={e => setProperty({ ...property, use: e.target.value })}>{['Primary home', 'Second home', 'Investment property'].map(v => <option key={v}>{v}</option>)}</select></label>
            {type === 'cash-out' && <label className="block font-medium">What will the cash be used for?<input className={inputClass} maxLength={300} value={property.cashPurpose} onChange={e => setProperty({ ...property, cashPurpose: e.target.value })} placeholder="Optional · improvements, debt payoff…" /></label>}</div>
            <label className="mt-6 flex items-start gap-3 text-sm leading-6"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1.5" /><span>I agree to share my contact information and refinance scenario with Mortgage Stevie and be contacted about this request.</span></label>
            <button className={`${buttonClass} mt-6`} disabled={sending}>{sending ? 'Sending…' : 'Send my refinance summary'}</button>
          </form>}
          <div className="mt-8 border-t border-[#deded5] pt-6"><h3 className="font-serif text-2xl">Set up a refinance call</h3><p className="my-3 text-sm leading-6 text-[#57574f]">Review real program options and confirm pricing with Stevie.</p><a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`${buttonClass} inline-block`}>Choose a call time ↗</a><a href={APPLICATION_URL} target="_blank" rel="noopener noreferrer" className="mt-4 block text-sm font-semibold underline underline-offset-4">Ready to apply? Start my application ↗</a></div>
        </div>}
        {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</p>}
        {step > 0 && <button onClick={() => { setStep(step - 1); setError('') }} disabled={sending} className="mt-6 block text-sm font-semibold underline underline-offset-4">Back</button>}
      </section>
      <p className="mt-6 text-center text-xs leading-6 text-[#62625a]">Planning estimates only. Eligibility and terms depend on the borrower, property, lender, and program. Stevie de Gala · NMLS #2845865.</p>
    </div>
  </main>
}
