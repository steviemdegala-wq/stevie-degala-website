'use client'

import { useEffect, useRef } from 'react'
import { useModalStore } from '@/lib/modalStore'

declare global {
  interface Window {
    Cal?: any
  }
}

export default function Modal() {
  const { isOpen, closeModal } = useModalStore()
  const overlayRef = useRef<HTMLDivElement>(null)
  const calLoaded = useRef(false)

  // Initialize Cal.com once on mount
  useEffect(() => {
    if (calLoaded.current) return
    calLoaded.current = true

    ;(function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => { a.q.push(ar) }
      const d = C.document
      C.Cal = C.Cal || function (...args: any[]) {
        const cal = C.Cal
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement('script')).src = A
          cal.loaded = true
        }
        if (args[0] === L) {
          const api: any = function () { p(api, arguments) }
          const namespace = args[1]
          api.q = api.q || []
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api
            p(cal.ns[namespace], args)
            p(cal, ['initNamespace', namespace])
          } else {
            p(cal, args)
          }
          return
        }
        p(cal, args)
      }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    window.Cal('init', 'discoverycall', { origin: 'https://app.cal.com' })
    window.Cal.config = window.Cal.config || {}
    window.Cal.config.forwardQueryParams = true
    window.Cal.ns.discoverycall('inline', {
      elementOrSelector: '#my-cal-inline-discoverycall',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: 'mortgagestevie/discoverycall',
    })
    window.Cal.ns.discoverycall('ui', { hideEventTypeDetails: false, layout: 'month_view' })
  }, [])

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
      <div className="relative w-full max-w-4xl" style={{ height: '90vh' }}>
        <button
          onClick={closeModal}
          className="absolute -top-8 right-0 text-[#888888] hover:text-[#F8F8F8] transition-colors text-2xl leading-none z-10"
          aria-label="Close"
        >
          &times;
        </button>

        <div
          id="my-cal-inline-discoverycall"
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        />
      </div>
    </div>
  )
}
