'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useModalStore } from '@/lib/modalStore'

const whoIHelpLinks = [
  { label: 'First-Time Buyers', href: '/who-i-help/first-time' },
  { label: 'Homeowners', href: '/who-i-help/homeowners' },
  { label: 'Investors', href: '/who-i-help/investors' },
]

const resourcesLinks = [
  { label: 'Current Rates', href: '/resources/rates' },
  { label: 'Mortgage Calculator', href: '/resources/mortgage-calculator' },
  { label: 'DTI Calculator', href: '/resources/dti-calculator' },
  { label: 'Qualification Estimator', href: '/resources/qualification-estimator' },
]

const mobileNavSections = [
  { label: 'About', href: '/about', children: [] },
  { label: 'Who I Help', href: '/who-i-help', children: whoIHelpLinks },
  { label: 'Find My Loan', href: '/find-my-loan', children: [] },
  { label: 'Resources', href: '/resources', children: resourcesLinks },
  { label: 'Blog', href: '/blog', children: [] },
]

export default function Navigation() {
  const { openModal } = useModalStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-[#0A0A0A] border-b border-[#2E2E2E]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-serif text-[#F8F8F8] text-lg md:text-xl hover:text-[#C4C4C4] transition-colors flex-shrink-0"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Stevie de Gala
          </Link>

          {/* Desktop center links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-[#C4C4C4] text-sm hover:text-[#F8F8F8] transition-colors tracking-wide">
              About
            </Link>

            {/* Who I Help dropdown */}
            <div className="relative group">
              <Link
                href="/who-i-help"
                className="text-[#C4C4C4] text-sm hover:text-[#F8F8F8] transition-colors tracking-wide flex items-center gap-1"
              >
                Who I Help
                <svg className="w-3 h-3 mt-px transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 hidden group-hover:block">
                <div className="bg-[#111111] border border-[#2E2E2E] min-w-[160px] py-2 rounded-xl overflow-hidden">
                  {whoIHelpLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-2.5 text-sm text-[#C4C4C4] hover:text-[#F8F8F8] hover:bg-[#1A1A1A] transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Find My Loan */}
            <Link href="/find-my-loan" className="text-[#C4C4C4] text-sm hover:text-[#F8F8F8] transition-colors tracking-wide">
              Find My Loan
            </Link>

            {/* Resources dropdown */}
            <div className="relative group">
              <Link
                href="/resources"
                className="text-[#C4C4C4] text-sm hover:text-[#F8F8F8] transition-colors tracking-wide flex items-center gap-1"
              >
                Resources
                <svg className="w-3 h-3 mt-px transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 hidden group-hover:block">
                <div className="bg-[#111111] border border-[#2E2E2E] min-w-[200px] py-2 rounded-xl overflow-hidden">
                  {resourcesLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-5 py-2.5 text-sm text-[#C4C4C4] hover:text-[#F8F8F8] hover:bg-[#1A1A1A] transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog */}
            <Link href="/blog" className="text-[#C4C4C4] text-sm hover:text-[#F8F8F8] transition-colors tracking-wide">
              Blog
            </Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <a
              href="https://prod.lendingpad.com/nexa/f4ccb1fc-693a-4398-9bc4-77bbd6cdc8c8/pos"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#F8F8F8] text-[#F8F8F8] px-5 py-2 rounded-full text-sm hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all tracking-wide"
            >
              Get Pre-Qualified
            </a>
            <button
              onClick={openModal}
              className="bg-[#F8F8F8] text-[#0A0A0A] px-5 py-2 rounded-full text-sm hover:bg-[#C4C4C4] transition-all tracking-wide"
            >
              Book a Free Call
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-[#F8F8F8]" />
            <span className="block w-6 h-px bg-[#F8F8F8]" />
            <span className="block w-4 h-px bg-[#F8F8F8]" />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-6 h-16 flex-shrink-0">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="font-serif text-[#F8F8F8] text-xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Stevie de Gala
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[#888888] hover:text-[#F8F8F8] text-3xl leading-none transition-colors"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          <div className="flex-1 flex flex-col px-8 py-8 gap-2">
            {mobileNavSections.map((section) => (
              <div key={section.href} className="border-b border-[#2E2E2E]">
                {section.children.length === 0 ? (
                  <Link
                    href={section.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-serif text-[#F8F8F8] text-2xl py-5 hover:text-[#888888] transition-colors"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {section.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === section.label ? null : section.label)}
                      className="w-full flex items-center justify-between font-serif text-[#F8F8F8] text-2xl py-5 hover:text-[#888888] transition-colors text-left"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {section.label}
                      <svg
                        className={`w-5 h-5 transition-transform ${mobileExpanded === section.label ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileExpanded === section.label && (
                      <div className="pb-4 space-y-1 pl-4">
                        <Link
                          href={section.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-[#888888] text-sm py-2 hover:text-[#F8F8F8] transition-colors uppercase tracking-widest"
                        >
                          View All
                        </Link>
                        {section.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-[#C4C4C4] text-sm py-2 hover:text-[#F8F8F8] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            <button
              onClick={() => { setMobileOpen(false); openModal() }}
              className="border border-[#F8F8F8] text-[#F8F8F8] px-6 py-4 text-sm hover:bg-[#F8F8F8] hover:text-[#0A0A0A] transition-all tracking-widest uppercase mt-6 rounded-full"
            >
              Book a Free Call
            </button>
          </div>
        </div>
      )}
    </>
  )
}
