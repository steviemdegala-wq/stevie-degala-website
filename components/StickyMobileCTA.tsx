import Link from 'next/link'
import { BUSINESS } from '@/lib/business'

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 gap-3 border-t border-[#2E2E2E] bg-[#0A0A0A] px-5 py-3 md:hidden">
      <a href={`tel:${BUSINESS.telephone}`} className="rounded-full border border-[#777] px-4 py-3 text-center text-sm font-semibold text-white">Call Stevie</a>
      <Link href="/contact" className="rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-black">Deal Review</Link>
    </div>
  )
}
