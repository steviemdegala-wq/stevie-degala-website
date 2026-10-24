'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
const consentVersion = 'chatgpt-estimate-contact-v1'
const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
type Estimate = { inputs: { state: string; purchasePrice: number; renovationBudget: number; arv: number; projectMonths: number }; options: { loanAmount: number; startupCash: number; totalCash: number; estimatedCashContribution: number; nonFinancingHoldingCosts: number; estimatedProfit: number; rate: number; termMonths: number; carryingCost: number; reserveTarget: number; cautions: string[] }[]; warning?: { estimatedLoss: number }; manualReview: boolean }
export default function ChatGPTDeal() {
  const token = useRef('')
  const loaded = useRef(false)
  const [estimate, setEstimate] = useState<Estimate | null>(null)
  const [contact, setContact] = useState({ name: '', email: '', phone: '' })
  const [consent, setConsent] = useState(false)
  const [property, setProperty] = useState({ address: '', zip: '' })
  const [saved, setSaved] = useState(false)
  const [emailed, setEmailed] = useState(false)
  const [letter, setLetter] = useState('')
  const [letterEmailed, setLetterEmailed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    if (loaded.current) return
    loaded.current = true
    token.current = new URLSearchParams(window.location.hash.slice(1)).get('estimate') || ''
    window.history.replaceState(null, '', window.location.pathname)
    if (!token.current) { setError('Open the estimate link from your ChatGPT conversation. You can also start a fresh calculation below.'); return }
    fetch('/api/calculator-handoff', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'preview', pluginToken: token.current }) }).then(async response => {
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setEstimate(data)
    }).catch(error => setError(error.message || 'Unable to load this estimate. Please try a fresh calculator link.'))
  }, [])
  useEffect(() => () => { if (letter) URL.revokeObjectURL(letter) }, [letter])
  async function submit(event: FormEvent, action: 'save' | 'prequalification') {
    event.preventDefault()
    setBusy(true); setError('')
    try {
      const response = await fetch('/api/calculator-handoff', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(30000), body: JSON.stringify({ action, pluginToken: token.current, contact, consent, consentVersion, deal: { ...property, state: estimate?.inputs.state } }) })
      if (!response.ok) { const data = await response.json(); throw new Error(data.error || 'Please try again.') }
      if (action === 'save') {
        const data = await response.json(); setSaved(true); setEmailed(Boolean(data.email?.borrower))
      } else {
        const blob = await response.blob(); setLetter(URL.createObjectURL(blob)); setLetterEmailed(response.headers.get('X-Email-Sent') === 'true')
      }
    } catch (error) { setError(error instanceof Error ? error.message : 'Unable to save. Please try again.') }
    finally { setBusy(false) }
  }
  const input = 'mt-2 w-full rounded-xl border border-stone-300 bg-white p-3 text-black'
  const button = 'mt-5 rounded-full bg-black px-6 py-4 font-semibold text-white disabled:opacity-50'
  const best = estimate?.options[0]
  return <div className="min-h-screen bg-stone-50"><main className="mx-auto max-w-4xl px-5 pb-16 pt-32 text-stone-900">
    <p className="text-xs font-semibold uppercase tracking-widest">From your ChatGPT deal analysis</p>
    <h1 className="mt-3 font-serif text-4xl">Your fix &amp; flip financing estimate</h1>
    <p className="mt-4 max-w-2xl text-stone-600">Review your numbers, save the breakdown, then request a conditional project letter from Stevie de Gala.</p>
    {error && <p role="alert" className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4">{error}</p>}
    {!estimate && !error && <p role="status" className="mt-6">Loading your estimate…</p>}
    {estimate && <>
      <div className="mt-8 rounded-2xl bg-stone-100 p-6"><h2 className="font-serif text-2xl">Your project in {estimate.inputs.state}</h2><p className="mt-3">Purchase {money(estimate.inputs.purchasePrice)} · Renovation {money(estimate.inputs.renovationBudget)} · ARV {money(estimate.inputs.arv)} · {estimate.inputs.projectMonths} months</p></div>
      {best ? <section className="mt-6 rounded-2xl border border-stone-300 p-6"><h2 className="font-serif text-2xl">Preliminary financing structure</h2><dl className="mt-5 grid gap-5 sm:grid-cols-2">{[['Estimated financing', best.loanAmount], ['Cash to get started', best.startupCash], ['Cash needed including holding costs', best.estimatedCashContribution], ['Projected profit', best.estimatedProfit], ['Estimated financing carrying cost', best.carryingCost], ['Additional liquidity/reserve target', best.reserveTarget]].map(([label, amount]) => <div key={label}><dt className="text-sm text-stone-600">{label}</dt><dd className="mt-1 text-2xl font-semibold">{money(Number(amount))}</dd></div>)}</dl><p className="mt-5">Modeled rate {best.rate.toFixed(2)}% · {best.termMonths}-month term. Project cash includes {money(best.nonFinancingHoldingCosts)} in nonfinancing holding costs. Reserves may be required in addition to cash spent. Nonfinancing holding costs, sale costs and timing affect project profit.</p>{best.cautions?.length > 0 && <ul className="mt-4 list-disc pl-5">{best.cautions.map(item => <li key={item}>{item}</li>)}</ul>}</section> : <p className="mt-6 rounded-xl bg-amber-50 p-5">This scenario needs a manual program review. Save the deal and Stevie can review the financing with you.</p>}
      {estimate.warning && <p className="mt-5 rounded-xl bg-amber-50 p-5">These numbers show a projected loss of {money(estimate.warning.estimatedLoss)}. An automated conditional project letter is unavailable for this scenario.</p>}
      {!saved ? <form onSubmit={event => submit(event, 'save')} className="mt-8 rounded-2xl border border-stone-300 p-6"><h2 className="font-serif text-2xl">Save &amp; email my estimate</h2><p className="mt-3">Receive the complete breakdown and let Stevie follow up personally about this deal.</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{(['name', 'email', 'phone'] as const).map(field => <label key={field} className="capitalize">{field === 'phone' ? 'Phone number' : field}<input required maxLength={field === 'name' ? 120 : field === 'email' ? 254 : 25} type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} autoComplete={field === 'phone' ? 'tel' : field} className={input} value={contact[field]} onChange={event => setContact({ ...contact, [field]: event.target.value })} /></label>)}</div><label className="mt-5 flex items-start gap-3 text-sm leading-6"><input required type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1" /><span>I agree to share my name, email, phone and deal details with Stevie de Gala / Barrett Financial to save and email this estimate and contact me personally about this financing request. See the <Link href="/calculator-privacy" className="underline">privacy policy</Link>. This does not authorize a credit inquiry.</span></label><button disabled={busy} className={button}>{busy ? 'Saving…' : 'Save & Email My Estimate'}</button></form> : <section className="mt-8 rounded-2xl border border-green-300 bg-green-50 p-6"><h2 className="font-serif text-2xl">Your deal is saved</h2><p className="mt-3">{emailed ? 'Your estimate was sent to your email.' : 'Your deal is in Stevie’s CRM, but email delivery was not confirmed.'}</p>{!emailed && <form onSubmit={event => submit(event, 'save')}><button disabled={busy} className={button}>Retry estimate email</button></form>}</section>}
      {saved && best && !estimate.warning && !letter && <form onSubmit={event => submit(event, 'prequalification')} className="mt-8 rounded-2xl border border-stone-300 p-6"><h2 className="font-serif text-2xl">Get conditionally prequalified for this deal</h2><p className="mt-3">Add the property address for your conditional project letter. Your saved contact information and deal numbers will stay attached to this request. State: {estimate.inputs.state}.</p><label className="mt-5 block">Property address (include city)<input required maxLength={250} autoComplete="street-address" className={input} value={property.address} onChange={event => setProperty({ ...property, address: event.target.value })} /></label><label className="mt-4 block">ZIP code<input required pattern="[0-9]{5}" inputMode="numeric" autoComplete="postal-code" className={input} value={property.zip} onChange={event => setProperty({ ...property, zip: event.target.value })} /></label><button disabled={busy} className={button}>{busy ? 'Preparing…' : 'Create My Conditional Project Letter'}</button></form>}
      {letter && <section className="mt-8 rounded-2xl border border-stone-300 p-6"><h2 className="font-serif text-2xl">Your conditional project letter</h2><p className="mt-3">{letterEmailed ? 'The letter was emailed to you.' : 'Email delivery was not confirmed. Download your letter here.'}</p><a href={letter} download="conditional-project-prequalification.pdf" className={button + ' inline-block'}>Download conditional letter</a></section>}
    </>}
    <p className="mt-8 text-sm leading-6 text-stone-600">Planning estimates based on unverified information and existing program assumptions. Not a loan approval, commitment to lend, guaranteed terms or rate lock. Final eligibility requires a complete application, property review and lender underwriting. No hard credit pull. Stevie de Gala, NMLS# 2845865 · Barrett Financial Group, L.L.C., NMLS# 181106.</p>
    <p className="mt-5"><a href="tel:+19704150539" className="underline">Call Stevie: (970) 415-0539</a> · <Link href="/fix-and-flip-calculator" className="underline">Start a new calculation</Link> · <Link href="/calculator-terms" className="underline">Calculator terms</Link></p>
  </main></div>
}
