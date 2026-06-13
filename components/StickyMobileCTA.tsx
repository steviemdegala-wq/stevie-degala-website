'use client'

import { useModalStore } from '@/lib/modalStore'

export default function StickyMobileCTA() {
  const { openModal } = useModalStore()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A0A0A] border-t border-[#2E2E2E] px-5 py-4">
      <button
        onClick={openModal}
        className="w-full bg-[#F8F8F8] text-[#0A0A0A] py-3.5 text-sm uppercase tracking-widest font-medium rounded-full hover:bg-[#C4C4C4] transition-colors"
      >
        Book a Free Call
      </button>
    </div>
  )
}
