import Link from 'next/link'

const PREQUALIFY_URL = 'https://prod.lendingpad.com/nexa/f4ccb1fc-693a-4398-9bc4-77bbd6cdc8c8/pos'

export default function Footer() {
  return (
    <footer className="border-t border-[#2E2E2E] bg-[#0A0A0A]">
      {/* Main footer columns */}
      <div className="py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Identity */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <p
              className="text-[#F8F8F8] text-base"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Stevie De Gala
            </p>
            <p className="text-[#888888] text-xs leading-relaxed">Licensed Mortgage Broker.<br />Mortgage Consultant.</p>
            <p className="text-[#888888] text-xs">NMLS# 2845865</p>
            <p className="text-[#888888] text-xs">NEXA Lending</p>
            <a href="tel:+18065082666" className="text-[#888888] text-xs hover:text-[#F8F8F8] transition-colors">(806) 508-2666</a>
            <p className="text-[#888888] text-xs">Texas · Colorado</p>
            <div className="flex gap-3 pt-1">
              <a href="https://www.facebook.com/stevie.degala/" target="_blank" aria-label="Facebook" className="text-[#888888] hover:text-[#F8F8F8] transition-colors" rel="noopener noreferrer">
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
            <Link href="/blog" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Blog</Link>
            <a href={PREQUALIFY_URL} target="_blank" rel="noopener noreferrer" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Get Pre-Qualified</a>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <p className="text-[#F8F8F8] text-xs uppercase tracking-widest mb-4">Resources</p>
            <Link href="/resources/rates" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Current Rates</Link>
            <Link href="/resources/mortgage-calculator" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Mortgage Calculator</Link>
            <Link href="/resources/dti-calculator" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">DTI Calculator</Link>
            <Link href="/resources/qualification-estimator" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Qualification Estimator</Link>
          </div>

          {/* Who I Help */}
          <div className="space-y-3">
            <p className="text-[#F8F8F8] text-xs uppercase tracking-widest mb-4">Who I Help</p>
            <Link href="/who-i-help/first-time" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">First-Time Buyers</Link>
            <Link href="/who-i-help/homeowners" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Homeowners</Link>
            <Link href="/who-i-help/investors" className="block text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors">Investors</Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2E2E2E] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[#888888] text-xs leading-relaxed max-w-xl">
              Rates shown are estimates and are subject to change. Contact me for a personalized quote based on your full financial picture.
            </p>
            <p className="text-[#888888] text-xs flex-shrink-0">© 2025 Stevie De Gala</p>
          </div>
          {/* Compliance bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-[#1E1E1E]">
            {/* Equal Housing Lender logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Equal Housing Lender">
                <rect x="1" y="1" width="38" height="38" stroke="#555555" strokeWidth="2" fill="none"/>
                <polygon points="20,6 34,18 34,36 6,36 6,18" stroke="#555555" strokeWidth="2" fill="none"/>
                <line x1="12" y1="24" x2="28" y2="24" stroke="#555555" strokeWidth="2"/>
                <line x1="12" y1="29" x2="28" y2="29" stroke="#555555" strokeWidth="2"/>
              </svg>
              <span className="text-[#555555] text-[10px] uppercase tracking-widest leading-tight">Equal Housing<br/>Lender</span>
            </div>
            <p className="text-[#555555] text-[10px] leading-relaxed">
              Excellent Lending with Stevie De Gala &nbsp;·&nbsp; (806) 508-2666 &nbsp;·&nbsp; NMLS# 2845865 &nbsp;·&nbsp; NEXA Lending &nbsp;·&nbsp; This website is for informational purposes and constitutes an advertisement. Not a commitment to lend. All loans subject to credit approval.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
