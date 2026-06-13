import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#2E2E2E] bg-[#0A0A0A]">
      {/* Main footer columns */}
      <div className="py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Identity */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <p
              className="text-[#F8F8F8] text-base"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Stevie De Gala
            </p>
            <p className="text-[#888888] text-xs leading-relaxed">Licensed Mortgage Broker.<br />Cash Flow Consultant.</p>
            <p className="text-[#888888] text-xs">NMLS# 2845865</p>
            <p className="text-[#888888] text-xs">NEXA Lending</p>
            {/* TODO: Replace with real phone number */}
            <a href="tel:+10000000000" className="text-[#888888] text-xs hover:text-[#F8F8F8] transition-colors">(000) 000-0000</a>
            <p className="text-[#888888] text-xs">Texas · Colorado · Utah</p>
            <div className="flex gap-3 pt-1">
              <a href="#" aria-label="LinkedIn" className="text-[#888888] hover:text-[#F8F8F8] transition-colors" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-[#888888] hover:text-[#F8F8F8] transition-colors" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className="space-y-3">
            <p className="text-[#F8F8F8] text-xs uppercase tracking-widest mb-4">Pages</p>
            <Link href="/" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Home</Link>
            <Link href="/about" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">About</Link>
            <Link href="/who-i-help" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Who I Help</Link>
            <Link href="/resources" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Resources</Link>
            <Link href="/lifestyle" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Lifestyle</Link>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <p className="text-[#F8F8F8] text-xs uppercase tracking-widest mb-4">Resources</p>
            <Link href="/resources/rates" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Current Rates</Link>
            <Link href="/resources/mortgage-calculator" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Mortgage Calculator</Link>
            <Link href="/resources/dti-calculator" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">DTI Calculator</Link>
            <Link href="/resources/qualification-estimator" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Qualification Estimator</Link>
          </div>

          {/* Lifestyle */}
          <div className="space-y-3">
            <p className="text-[#F8F8F8] text-xs uppercase tracking-widest mb-4">Lifestyle</p>
            <Link href="/lifestyle/recipes" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Family Recipes</Link>
            <Link href="/lifestyle/restaurants" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Restaurant Guides</Link>
            <Link href="/lifestyle/active" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Active Lifestyle</Link>
          </div>

          {/* Who I Help */}
          <div className="space-y-3">
            <p className="text-[#F8F8F8] text-xs uppercase tracking-widest mb-4">Who I Help</p>
            <Link href="/who-i-help/homeowners" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Homeowners</Link>
            <Link href="/who-i-help/homeowners" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">First-Time Buyers</Link>
            <Link href="/who-i-help/homeowners" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Refinancing</Link>
            <Link href="/who-i-help/investors" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Investors</Link>
            <Link href="/who-i-help/investors" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">DSCR Loans</Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2E2E2E] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[#888888] text-xs leading-relaxed max-w-xl">
            Rates shown are estimates and are subject to change. Contact me for a personalized quote based on your full financial picture.
          </p>
          <p className="text-[#888888] text-xs flex-shrink-0">© 2025 Stevie De Gala</p>
        </div>
      </div>
    </footer>
  )
}
