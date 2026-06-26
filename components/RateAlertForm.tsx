'use client'

import { useState } from 'react'

export default function RateAlertForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source: 'rate-alert' }),
      })
    } catch {
      // fail silently
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-[#C4C4C4] text-sm">
        You&apos;re on the list. I&apos;ll reach out when rates make a meaningful move.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="flex-1 bg-[#1A1A1A] border border-[#2E2E2E] text-[#F8F8F8] px-5 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors rounded-full placeholder:text-[#888888]"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="flex-1 bg-[#1A1A1A] border border-[#2E2E2E] text-[#F8F8F8] px-5 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors rounded-full placeholder:text-[#888888]"
        />
      </div>
      <button
        type="submit"
        className="border border-[#F8F8F8] text-[#F8F8F8] px-6 py-3 text-sm tracking-wide hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all rounded-full whitespace-nowrap self-start"
      >
        Notify Me
      </button>
    </form>
  )
}
