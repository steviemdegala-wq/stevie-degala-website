import type { Metadata } from 'next'
import Link from 'next/link'
import { BUSINESS } from '@/lib/business'
import BookCallButton from '@/components/BookCallButton'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Stevie de Gala | Northern Colorado Investor Financing',
  description: 'Call (970) 415-0539 or request an investor deal review with Stevie de Gala. DSCR, hard money, private money, and investor financing in Northern Colorado.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main className="bg-[#0A0A0A] px-6 pb-20 pt-28 text-white md:pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[.22em] text-[#8FA9BD]">Stevie de Gala · Mortgage Stevie</p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">Let’s talk about your next investment.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#B8B8B8]">Buying a rental, renovating a property, or planning several deals? Share what you’re working on. We’ll discuss the financing direction and what a lender would need to review.</p>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-[#333] bg-[#111] p-7">
              <h2 className="font-serif text-2xl">Contact Stevie directly</h2>
              <a href={`tel:${BUSINESS.telephone}`} className="mt-5 block text-2xl font-semibold underline underline-offset-4">{BUSINESS.phone}</a>
              <a href={`mailto:${BUSINESS.email}`} className="mt-4 block break-words text-sm text-[#C4C4C4] underline underline-offset-4">{BUSINESS.email}</a>
              <p className="mt-5 text-sm leading-7 text-[#999]">{BUSINESS.hours}</p>
              <div className="mt-6"><BookCallButton label="Book an Investor Review" callType="investor-portfolio-review" className="!px-5 !text-xs" /></div>
              <p className="mt-4 text-xs leading-6 text-[#999]">For a home purchase or another mortgage question, <a href="https://cal.com/mortgage-stevie/discoverycall" target="_blank" rel="noopener noreferrer" className="text-white underline">book a discovery call</a>.</p>
            </section>
            <section>
              <h2 className="font-serif text-2xl">Based in Timnath. Serving Northern Colorado.</h2>
              <p className="mt-4 text-sm leading-7 text-[#AAA]">Fort Collins, Timnath, Windsor, Loveland, Greeley, and Severance. Online consultations and in-person meetings are available by appointment. Please arrange a meeting directly; there is no public walk-in office.</p>
              <p className="mt-4 text-sm leading-7 text-[#AAA]">Investor and business-purpose real estate financing is my primary focus. Medical professional home loans, VA loans, and other residential options are also available, subject to program requirements.</p>
              <a href={BUSINESS.googleProfile} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm text-white underline underline-offset-4">View my Google Business Profile</a>
            </section>
            <p className="text-xs leading-6 text-[#888]">Stevie de Gala · NMLS# 2845865<br />Barrett Financial · NMLS# 181106<br />Licensed in Colorado and Texas. Financing is subject to lender guidelines and underwriting.</p>
          </div>
          <section className="rounded-2xl border border-[#333] bg-[#111] p-6 sm:p-8" aria-labelledby="review-heading">
            <h2 id="review-heading" className="font-serif text-3xl">Request a deal review</h2>
            <p className="mt-3 text-sm leading-7 text-[#AAA]">A short request is enough to start. No loan questionnaire or hard credit pull is required to get in touch.</p>
            <ContactForm />
          </section>
        </div>
        <div className="mt-14 flex flex-wrap gap-5 border-t border-[#333] pt-7 text-sm text-[#BBB]">
          <Link href="/loans/dscr" className="underline">DSCR loans</Link>
          <Link href="/loans/private-hard-money" className="underline">Hard / private money</Link>
          <Link href="/loans/investor-line-of-credit" className="underline">Investor lines of credit</Link>
          <Link href="/find-my-loan" className="underline">Use the loan finder</Link>
        </div>
      </div>
    </main>
  )
}
