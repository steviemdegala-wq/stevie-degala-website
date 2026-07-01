'use client'

import { useState, useEffect, useRef } from 'react'

export default function LeadCapturePopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const triggered = useRef(false)

  useEffect(() => {
    // Don't show if already dismissed in this session
    if (sessionStorage.getItem('leadPopupDismissed')) return

    const trigger = () => {
      if (triggered.current) return
      triggered.current = true
      // Small delay so it doesn't feel instant
      setTimeout(() => setVisible(true), 500)
    }

    // Trigger after 12 seconds
    const timer = setTimeout(trigger, 12000)

    // Or trigger when user scrolls 50% down the page
    const handleScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrolled >= 0.5) trigger()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem('leadPopupDismissed', '1')
  }

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // TODO: replace with your Vercel CRM endpoint
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, source: 'popup' }),
      })
    } catch {
      // fail silently — don't block the success state
    }
    setLoading(false)
    setSubmitted(true)
    sessionStorage.setItem('leadPopupDismissed', '1')
  }

  if (!visible || dismissed) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
    >
      <div className="w-full max-w-md bg-[#111111] border border-[#2E2E2E] rounded-2xl p-8 relative">
        <button
          onClick={dismiss}
          className="absolute top-4 right-5 text-[#555555] hover:text-[#F8F8F8] transition-colors text-2xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <p
              className="text-2xl text-[#F8F8F8] mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Got it.
            </p>
            <p className="text-[#C4C4C4] text-sm leading-relaxed">
              I&apos;ll reach out within one business day with your rate estimate. Talk soon.
            </p>
          </div>
        ) : (
          <>
            <p className="text-[#888888] text-xs uppercase tracking-[0.2em] mb-3">Free Rate Estimate</p>
            <h2
              className="text-2xl md:text-3xl text-[#F8F8F8] leading-tight mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              See what rate you actually qualify for.
            </h2>
            <p className="text-[#888888] text-sm leading-relaxed mb-7">
              Drop your number. I&apos;ll pull rates from 30+ lenders and reach out personally — no spam, no pressure.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(___) ___-____"
                className="w-full bg-[#1A1A1A] border border-[#2E2E2E] text-[#F8F8F8] px-5 py-3.5 text-sm focus:outline-none focus:border-[#888888] transition-colors rounded-full placeholder:text-[#555555]"
              />
              <button
                type="submit"
                disabled={loading || phone.replace(/\D/g, '').length < 10}
                className="w-full bg-[#F8F8F8] text-[#0A0A0A] py-3.5 text-sm uppercase tracking-widest font-medium rounded-full hover:bg-[#C4C4C4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending…' : 'Get My Free Rate Estimate'}
              </button>
            </form>
            <p className="text-[#555555] text-[10px] mt-4 text-center leading-relaxed">
              By submitting, you agree to be contacted by Stevie de Gala, NMLS# 2845865.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
