'use client'

import { useState, type FormEvent } from 'react'
import { BUSINESS } from '@/lib/business'

const fieldClass = 'mt-2 w-full rounded-xl border border-[#444] bg-[#0A0A0A] px-4 py-3 text-base text-white outline-none focus:border-[#8FA9BD] focus:ring-1 focus:ring-[#8FA9BD]'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const values = new FormData(form)
    if (String(values.get('company_website') || '')) return
    const phone = String(values.get('phone') || '').replace(/\D/g, '')
    if (!/^(1)?\d{10}$/.test(phone)) {
      setError('Please enter a 10-digit US phone number.'); setStatus('error'); return
    }
    setStatus('sending'); setError('')
    let attribution = {}
    try { attribution = JSON.parse(sessionStorage.getItem('mortgage-stevie-attribution') || '{}') } catch { /* Contact works without browser storage. */ }
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'website-contact',
          request_type: 'deal_review',
          contact: { name: String(values.get('name') || '').trim(), phone, email: String(values.get('email') || '').trim() },
          deal_highlights: { financing_need: values.get('financing_need'), location: String(values.get('market') || '').trim(), timeline: values.get('timeline') },
          message: String(values.get('message') || '').trim(),
          attribution,
        }),
      })
      const result = await response.json()
      if (!response.ok || result.ok !== true) throw new Error(result.error || 'Your request could not be delivered. Please try again or call Stevie directly.')
      setStatus('sent'); form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Your request could not be delivered. Please call Stevie directly.'); setStatus('error')
    }
  }

  if (status === 'sent') return (
    <div role="status" className="mt-7 rounded-xl border border-[#57725B] bg-[#172019] p-6">
      <h3 className="font-serif text-2xl">Your request was received.</h3>
      <p className="mt-3 text-sm leading-7 text-[#C4C4C4]">Stevie will follow up using the contact details you provided. If your closing is approaching, call <a href={`tel:${BUSINESS.telephone}`} className="text-white underline">{BUSINESS.phone}</a>.</p>
      <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-sm underline">Send another inquiry</button>
    </div>
  )

  return (
    <form onSubmit={submit} className="mt-7 space-y-5" aria-busy={status === 'sending'}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">Name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required maxLength={120} className={fieldClass} /></label>
        <label className="block text-sm">Phone <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" required maxLength={25} placeholder="(970) 555-0123" className={fieldClass} /></label>
      </div>
      <label className="block text-sm">Email <span className="text-[#999]">(optional)</span><input name="email" type="email" autoComplete="email" maxLength={254} className={fieldClass} /></label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">What are you working on?<select name="financing_need" defaultValue="Investment property financing" className={fieldClass}>
          <option>Investment property financing</option><option>DSCR rental loan</option><option>Fix and flip / private money</option><option>Investor line of credit</option><option>Construction financing</option><option>Medical professional home loan</option><option>VA or other home loan</option><option>Not sure yet</option>
        </select></label>
        <label className="block text-sm">Property city or market<input name="market" maxLength={120} placeholder="Fort Collins, CO" className={fieldClass} /></label>
      </div>
      <label className="block text-sm">Timing<select name="timeline" defaultValue="researching" className={fieldClass}><option value="researching">Still exploring</option><option value="two-weeks">Within 2 weeks</option><option value="month">Within 30 days</option><option value="month-plus">More than 30 days</option></select></label>
      <label className="block text-sm">Anything else Stevie should know? <span className="text-[#999]">(optional)</span><textarea name="message" maxLength={2000} rows={3} className={fieldClass} /></label>
      <div className="hidden" aria-hidden="true"><label>Company website<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>
      {status === 'error' && <p role="alert" className="rounded-xl border border-[#A55C5C] p-4 text-sm leading-6 text-[#FFD1D1]">{error} You can also call <a href={`tel:${BUSINESS.telephone}`} className="underline">{BUSINESS.phone}</a>.</p>}
      <button type="submit" disabled={status === 'sending'} className="w-full rounded-full bg-white px-6 py-4 text-sm font-semibold text-black hover:bg-[#E5E5E5] disabled:cursor-wait disabled:opacity-50">{status === 'sending' ? 'Sending your request…' : 'Request a Callback'}</button>
      <p className="text-xs leading-6 text-[#999]">By sending this request, you ask Stevie de Gala to contact you about this inquiry. This is not a loan application, approval, or commitment to lend.</p>
    </form>
  )
}
