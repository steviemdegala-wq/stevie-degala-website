'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const investorLinks = [
  { label: 'Hard Money / Private Money', href: '/loans/private-hard-money' },
  { label: 'DSCR Loans', href: '/loans/dscr' },
  { label: 'Investor Line of Credit', href: '/loans/investor-line-of-credit' },
  { label: 'Fix & Flip Financing', href: '/loans/fix-and-flip' },
  { label: 'Ground-Up Construction', href: '/loans/bridge-construction' },
  { label: 'Fix & Flip Calculator', href: '/fix-and-flip-calculator' },
]

const otherLoanLinks = [
  { label: 'Conventional', href: '/loans/conventional' },
  { label: 'FHA', href: '/loans/fha' },
  { label: 'VA', href: '/who-i-help/veterans' },
  { label: 'Jumbo', href: '/loans/jumbo' },
  { label: 'USDA', href: '/loans/usda' },
  { label: 'Refinance', href: '/loans/refinance' },
  { label: 'HELOC', href: '/loans/heloc' },
  { label: 'Bank Statement', href: '/loans/bank-statement' },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const close = () => setMobileOpen(false)

  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-40 border-b transition ${scrolled ? 'border-[#2E2E2E] bg-[#0A0A0A]' : 'border-transparent bg-[#0A0A0A]/80 backdrop-blur-md'}`} aria-label="Primary navigation">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-7 px-6 md:h-20">
          <Link href="/" aria-label="Mortgage Stevie home" className="shrink-0 font-serif text-xl tracking-[-.02em] text-white">Mortgage Stevie</Link>

          <div className="hidden items-center gap-6 lg:flex">
            <div className="group relative">
              <Link href="/who-i-help/investors" className="flex items-center gap-1 text-sm text-white">Investor Financing <span aria-hidden className="text-[#777]">⌄</span></Link>
              <div className="absolute left-1/2 top-full hidden -translate-x-1/2 pt-4 group-hover:block group-focus-within:block">
                <div className="min-w-[260px] rounded-xl border border-[#303030] bg-[#111] p-2 shadow-2xl">
                  {investorLinks.map((link) => <Link key={link.href} href={link.href} className="block rounded-lg px-4 py-2.5 text-sm text-[#C4C4C4] hover:bg-[#1D1D1D] hover:text-white">{link.label}</Link>)}
                </div>
              </div>
            </div>
            <Link href="/who-i-help/medical-professionals" className="text-sm text-[#C4C4C4] hover:text-white">Medical Home Loans</Link>
            <Link href="/about" className="text-sm text-[#C4C4C4] hover:text-white">About Stevie</Link>
            <div className="group relative">
              <Link href="/resources" className="flex items-center gap-1 text-sm text-[#C4C4C4] hover:text-white">Resources <span aria-hidden className="text-[#777]">⌄</span></Link>
              <div className="absolute left-1/2 top-full hidden -translate-x-1/2 pt-4 group-hover:block group-focus-within:block">
                <div className="min-w-[220px] rounded-xl border border-[#303030] bg-[#111] p-2 shadow-2xl">
                  <Link href="/blog" className="block rounded-lg px-4 py-2.5 text-sm text-[#C4C4C4] hover:bg-[#1D1D1D] hover:text-white">Investor Articles</Link>
                  <Link href="/resources/rates" className="block rounded-lg px-4 py-2.5 text-sm text-[#C4C4C4] hover:bg-[#1D1D1D] hover:text-white">Current Rates</Link>
                  <Link href="/refinance-calculator" className="block rounded-lg px-4 py-2.5 text-sm text-[#C4C4C4] hover:bg-[#1D1D1D] hover:text-white">Refinance Calculator</Link>
                  <Link href="/resources/mortgage-calculator" className="block rounded-lg px-4 py-2.5 text-sm text-[#C4C4C4] hover:bg-[#1D1D1D] hover:text-white">Mortgage Calculator</Link>
                  <Link href="/loans" className="block rounded-lg px-4 py-2.5 text-sm text-[#C4C4C4] hover:bg-[#1D1D1D] hover:text-white">All Loan Programs</Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/find-my-loan" className="hidden shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#E5E5E5] md:block">Find My Loan</Link>
          <button type="button" onClick={() => setMobileOpen(true)} className="flex flex-col gap-1.5 p-2 lg:hidden" aria-label="Open menu" aria-expanded={mobileOpen}><span className="block h-px w-6 bg-white" /><span className="block h-px w-6 bg-white" /><span className="block h-px w-4 bg-white" /></button>
        </div>
      </nav>

      {mobileOpen && <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0A0A0A] px-6 pb-10 text-white">
        <div className="flex h-16 items-center justify-between"><Link href="/" onClick={close} aria-label="Mortgage Stevie home" className="font-serif text-xl tracking-[-.02em]">Mortgage Stevie</Link><button type="button" onClick={close} className="p-2 text-3xl text-[#AAA]" aria-label="Close menu">×</button></div>
        <div className="mx-auto mt-5 max-w-xl">
          <Link href="/who-i-help/investors" onClick={close} className="block border-b border-[#333] py-4 font-serif text-2xl">Investor Financing</Link>
          <div className="grid grid-cols-1 gap-1 border-b border-[#333] py-3 pl-3 sm:grid-cols-2">{investorLinks.map((link) => <Link key={link.href} href={link.href} onClick={close} className="py-2 text-sm text-[#BDBDBD]">{link.label}</Link>)}</div>
          <Link href="/who-i-help/medical-professionals" onClick={close} className="block border-b border-[#333] py-4 font-serif text-2xl">Medical Home Loans</Link>
          <Link href="/about" onClick={close} className="block border-b border-[#333] py-4 font-serif text-2xl">About Stevie</Link>
          <Link href="/refinance-calculator" onClick={close} className="block border-b border-[#333] py-4 font-serif text-2xl">Refinance Calculator</Link>
          <Link href="/resources" onClick={close} className="block border-b border-[#333] py-4 font-serif text-2xl">Resources</Link>
          <details className="border-b border-[#333] py-4"><summary className="cursor-pointer font-serif text-2xl">Other Mortgage Products</summary><div className="mt-3 grid grid-cols-2 gap-1 pl-3">{otherLoanLinks.map((link) => <Link key={link.href} href={link.href} onClick={close} className="py-2 text-sm text-[#BDBDBD]">{link.label}</Link>)}</div></details>
          <Link href="/find-my-loan" onClick={close} className="mt-8 block rounded-full bg-white px-6 py-4 text-center font-semibold text-black">Find My Loan</Link>
        </div>
      </div>}
    </>
  )
}
