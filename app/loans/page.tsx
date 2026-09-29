import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Investor & Home Loan Programs | Mortgage Stevie',
  description: 'Compare private and hard money, DSCR, investor lines of credit, medical professional home loans, and other mortgage programs with Stevie de Gala. NMLS# 2845865.',
  alternates: { canonical: '/loans' },
}

const investorLoans = [
  { href: '/loans/private-hard-money', label: 'Private & Hard Money', description: 'Short-term, asset-focused financing for acquisitions, renovations, bridge needs, and time-sensitive opportunities.' },
  { href: '/loans/dscr', label: 'DSCR Rental Loans', description: 'Long-term rental financing centered on the property’s cash flow, with credit, reserves, property, and program guidelines also reviewed.' },
  { href: '/loans/investor-line-of-credit', label: 'Investor Line of Credit', description: 'Plan for multiple acquisitions with a true revolving line or a hybrid line structure, depending on the program.' },
  { href: '/loans/fix-and-flip', label: 'Fix-and-Flip Financing', description: 'Compare deal-specific bridge financing with an investor line of credit—and model the deal before applying.' },
]

const homeLoans = [
  { href: '/loans/doctor-loan', label: 'Medical Professional Home Loan', description: 'Specialized home-loan options for eligible medical professionals. Profession, property, credit, reserves, and lender guidelines determine fit.' },
  { href: '/loans/va', label: 'VA Loan', description: 'Government-backed financing for eligible service members, veterans, and surviving spouses.' },
  { href: '/loans/conventional', label: 'Conventional Loan', description: 'Flexible financing for primary homes, second homes, and investment properties.' },
  { href: '/loans/fha', label: 'FHA Loan', description: 'Government-backed financing with flexible qualification guidelines for eligible primary-home buyers.' },
  { href: '/loans/jumbo', label: 'Jumbo Loan', description: 'Financing above conforming loan limits for qualified borrowers purchasing higher-value properties.' },
  { href: '/loans/bank-statement', label: 'Bank Statement Loan', description: 'Alternative-documentation financing for eligible self-employed borrowers and business owners.' },
  { href: '/loans/refinance', label: 'Refinance', description: 'Rate-and-term and cash-out options evaluated with a practical break-even analysis.' },
  { href: '/loans/heloc', label: 'HELOC', description: 'A revolving home-equity option for qualified homeowners, subject to available equity and underwriting.' },
  { href: '/loans/bridge-construction', label: 'Bridge & Construction', description: 'Specialized financing for transition periods and new construction, matched to the project and timeline.' },
]

type Loan = { href: string; label: string; description: string }

function LoanCard({ loan, featured = false }: { loan: Loan; featured?: boolean }) {
  return (
    <Link href={loan.href} className={`group block border p-7 rounded-xl transition-all ${featured ? 'bg-white border-[#E5E5E5] hover:border-[#0A0A0A]' : 'bg-[#111111] border-[#2E2E2E] hover:border-[#555555]'}`}>
      <h3 className={`text-xl mb-3 ${featured ? 'text-[#0A0A0A]' : 'text-[#F8F8F8]'}`} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{loan.label}</h3>
      <p className={`text-sm leading-relaxed mb-5 ${featured ? 'text-[#444444]' : 'text-[#888888]'}`}>{loan.description}</p>
      <span className={`text-sm flex items-center gap-1 group-hover:gap-2 transition-all ${featured ? 'text-[#0A0A0A]' : 'text-[#C4C4C4]'}`}>Explore <span>→</span></span>
    </Link>
  )
}

export default function LoansPage() {
  return (
    <main className="pt-16 md:pt-20">
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6"><div className="max-w-5xl mx-auto">
        <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-6">Investor &amp; Home Financing</p>
        <h1 className="text-4xl md:text-6xl text-[#F8F8F8] leading-tight mb-6" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Financing matched to the deal—and the plan behind it.</h1>
        <p className="text-[#C4C4C4] text-xl leading-relaxed max-w-3xl mb-10">Investor financing is the core focus: acquisitions, renovations, rentals, and reusable lines of credit. Medical professional and traditional home loans remain available when the goal is a primary residence.</p>
        <div className="flex flex-col sm:flex-row gap-4"><Link href="/find-my-loan" className="bg-[#F8F8F8] text-[#0A0A0A] px-7 py-3.5 rounded-full text-sm text-center font-medium">Find My Loan</Link><Link href="/who-i-help/investors" className="border border-[#555555] text-[#F8F8F8] px-7 py-3.5 rounded-full text-sm text-center hover:border-[#F8F8F8] transition-colors">Explore Investor Financing</Link></div>
      </div></section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6"><div className="max-w-7xl mx-auto">
        <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Core Focus</p><h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Investor financing.</h2><p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">Start with the current deal, then account for hold time, renovation risk, exits, and the next acquisition.</p>
        <div className="grid md:grid-cols-2 gap-6">{investorLoans.map((loan) => <LoanCard key={loan.href} loan={loan} featured />)}</div>
      </div></section>

      <section className="bg-[#0A0A0A] py-20 px-6"><div className="max-w-7xl mx-auto">
        <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-4">Home Financing</p><h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Medical professional and traditional home loans.</h2><p className="text-[#C4C4C4] leading-relaxed mb-12 max-w-2xl">Program availability and terms depend on borrower, property, location, occupancy, and lender guidelines.</p>
        <div className="grid md:grid-cols-3 gap-6">{homeLoans.map((loan) => <LoanCard key={loan.href} loan={loan} />)}</div>
      </div></section>

      <section className="bg-[#111111] border-t border-[#2E2E2E] py-24 px-6 text-center"><div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-[#F8F8F8] mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Not sure which structure fits?</h2><p className="text-[#C4C4C4] text-lg mb-10">Answer a few questions for a practical starting point, or talk through the deal directly.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link href="/find-my-loan" className="bg-[#F8F8F8] text-[#0A0A0A] px-7 py-3.5 rounded-full text-sm font-medium">Find My Loan</Link><BookCallButton variant="outline" /></div>
      </div></section>
    </main>
  )
}
