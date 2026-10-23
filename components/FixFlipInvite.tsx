import Link from 'next/link'

export default function FixFlipInvite() {
  return <section className="border-y border-[#2E2E2E] bg-[#111111] px-6 py-14" aria-label="Fix-and-flip deal analysis">
    <div className="mx-auto max-w-3xl">
      <p className="mb-3 text-xs uppercase tracking-widest text-[#AAAAAA]">Before your next offer</p>
      <h2 className="font-serif text-3xl text-white">Does your next flip pencil out?</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#C4C4C4]">Enter your purchase price, renovation budget, resale estimate, and timeline. Compare projected profit, cash needed, and preliminary financing costs before discussing your deal with Stevie.</p>
      <Link href="/fix-and-flip-calculator" className="mt-6 inline-flex rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#111111]">Analyze My Next Flip →</Link>
      <p className="mt-3 text-xs leading-5 text-[#AAAAAA]">Planning estimates only. Final financing depends on property and lender review.</p>
    </div>
  </section>
}
