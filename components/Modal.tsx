'use client'

import { useEffect, useRef } from 'react'
import { CALLS, getBookingUrl } from '@/lib/booking'
import CalEmbed from './CalEmbed'
import { useModalStore } from '@/lib/modalStore'

export default function Modal() {
  const { isOpen, closeModal, callType } = useModalStore()
  const overlayRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  // Keep keyboard focus inside the booking dialog and restore it on close.
  useEffect(() => {
    if (!isOpen) return
    const previousFocus = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    const keepFocus = (event: FocusEvent) => {
      if (!dialogRef.current?.contains(event.target as Node)) closeButtonRef.current?.focus()
    }
    document.addEventListener('focusin', keepFocus)
    return () => {
      document.removeEventListener('focusin', keepFocus)
      previousFocus?.focus()
    }
  }, [isOpen])
  // Keyboard + scroll lock
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeModal])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeModal()
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: isOpen ? 'flex' : 'none',
      }}
    >
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={CALLS[callType].title} className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white" style={{ height: '90dvh' }}>
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-gray-200 px-4 py-3 text-[#111111]">
          <a href={getBookingUrl(callType)} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">Open booking in a new tab</a>
          <button ref={closeButtonRef} onClick={closeModal} className="flex h-10 w-10 items-center justify-center rounded-full text-3xl hover:bg-gray-100" aria-label="Close booking">&times;</button>
        </div>
        {isOpen && <CalEmbed key={callType} callType={callType} />}
      </div>
    </div>
  )
}
