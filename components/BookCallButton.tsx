'use client'

import { type CallType } from '@/lib/booking'
import { useModalStore } from '@/lib/modalStore'

interface Props {
  callType?: CallType
  label?: string
  variant?: 'solid' | 'outline' | 'light'
  className?: string
}

export default function BookCallButton({ label = 'Get in Touch', variant = 'solid', className = '', callType = 'discoverycall' }: Props) {
  const { openCall } = useModalStore()

  const base = 'inline-block px-8 py-4 text-sm uppercase tracking-widest font-medium transition-all cursor-pointer rounded-full'

  const styles = {
    solid: 'bg-[#F8F8F8] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F8F8F8] border border-[#F8F8F8]',
    outline: 'border border-[#F8F8F8] text-[#F8F8F8] hover:bg-[#F8F8F8] hover:text-[#0A0A0A]',
    light: 'bg-[#0A0A0A] text-[#F8F8F8] border border-[#0A0A0A] hover:bg-transparent hover:text-[#0A0A0A]',
  }

  // For light variant (on white background)
  if (variant === 'light') {
    return (
      <button
        onClick={() => openCall(callType)}
        className={`${base} bg-[#0A0A0A] text-[#F8F8F8] border border-[#0A0A0A] hover:bg-transparent hover:text-[#0A0A0A] ${className}`}
      >
        {label}
      </button>
    )
  }

  return (
    <button
      onClick={() => openCall(callType)}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {label}
    </button>
  )
}
