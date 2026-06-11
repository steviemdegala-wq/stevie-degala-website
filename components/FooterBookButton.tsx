'use client'

import { useModalStore } from '@/lib/modalStore'

export default function FooterBookButton() {
  const { openModal } = useModalStore()
  return (
    <button
      onClick={openModal}
      className="flex-shrink-0 border border-[#F8F8F8] text-[#F8F8F8] px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all rounded-full"
    >
      Book a Free Call
    </button>
  )
}
