'use client'

import { useEffect, useRef } from 'react'
import { useModalStore } from '@/lib/modalStore'

export default function Modal() {
  const { isOpen, closeModal } = useModalStore()
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeModal])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeModal()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: REPLACE WITH CALENDLY OR SCHEDULING LINK
    window.location.href = 'https://calendly.com/steviedegala'
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[#2E2E2E] bg-[#111111] p-8"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute right-6 top-6 text-[#888888] hover:text-[#F8F8F8] transition-colors text-2xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h2
          className="font-serif text-2xl text-[#F8F8F8] mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Let&apos;s talk.
        </h2>
        <p className="text-[#888888] text-sm mb-8">
          Fill this out and I will send you a link to schedule your free 20-minute call.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#C4C4C4] text-xs uppercase tracking-widest mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors rounded-xl"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-[#C4C4C4] text-xs uppercase tracking-widest mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors rounded-xl"
              placeholder="(555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-[#C4C4C4] text-xs uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors rounded-xl"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="block text-[#C4C4C4] text-xs uppercase tracking-widest mb-2">
              What best describes you?
            </label>
            <select
              required
              className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors appearance-none rounded-xl"
            >
              <option value="" disabled selected>Select one</option>
              <option value="first-time-homebuyer">First time homebuyer</option>
              <option value="refinance">Refinance</option>
              <option value="cash-out-refinance">Cash-out refinance</option>
              <option value="real-estate-investor">Real estate investor</option>
            </select>
          </div>

          <div>
            <label className="block text-[#C4C4C4] text-xs uppercase tracking-widest mb-2">
              What is your goal for this call?
            </label>
            <textarea
              required
              rows={4}
              className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-[#F8F8F8] px-4 py-3 text-sm focus:outline-none focus:border-[#888888] transition-colors resize-none rounded-xl"
              placeholder="3–4 sentences. What are you trying to accomplish?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F8F8F8] text-[#0A0A0A] py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#0A0A0A] hover:text-[#F8F8F8] hover:border hover:border-[#F8F8F8] transition-all rounded-full"
          >
            Book My Free Call
          </button>
        </form>
      </div>
    </div>
  )
}
