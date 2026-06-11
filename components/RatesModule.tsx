'use client'

import { useState } from 'react'

const conventionalRates = [
  { label: '30 Year Fixed', rate: '[Contact for rate]', apr: '[Contact for APR]', lastUpdated: '[Update regularly]' },
  { label: '15 Year Fixed', rate: '[Contact for rate]', apr: '[Contact for APR]', lastUpdated: '[Update regularly]' },
]

const investorRates = [
  { label: 'DSCR Loan', rate: '[Contact for rate]', apr: '[Contact for APR]', lastUpdated: '[Update regularly]' },
]

export default function RatesModule() {
  const [activeTab, setActiveTab] = useState<'conventional' | 'investor'>('conventional')

  const rates = activeTab === 'conventional' ? conventionalRates : investorRates

  return (
    <div>
      <h2
        className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Current Rates
      </h2>
      <p className="text-[#C4C4C4] leading-relaxed mb-10 max-w-2xl">
        Rates move daily. These are current estimates to give you a starting point. Your actual rate depends on your credit, down payment, property type, and loan structure. Book a call and I will find the best rate available for your specific situation.
      </p>

      {/* Tabs */}
      <div className="flex gap-0 mb-8 border border-[#2E2E2E] w-fit rounded-xl overflow-hidden">
        {(['conventional', 'investor'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm uppercase tracking-widest transition-all ${
              activeTab === tab
                ? 'bg-[#F8F8F8] text-[#0A0A0A]'
                : 'bg-transparent text-[#888888] hover:text-[#F8F8F8]'
            }`}
          >
            {tab === 'conventional' ? 'Conventional' : 'Investor (DSCR)'}
          </button>
        ))}
      </div>

      {/* Rate cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rates.map((card) => (
          <div key={card.label} className="border border-[#2E2E2E] bg-[#0A0A0A] p-8 rounded-xl">
            <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">{card.label}</p>
            <div className="space-y-3">
              <div>
                <p className="text-[#888888] text-xs mb-1">Rate</p>
                <p className="text-[#F8F8F8] text-lg">{card.rate}</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs mb-1">APR</p>
                <p className="text-[#F8F8F8] text-lg">{card.apr}</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs mb-1">Last Updated</p>
                <p className="text-[#888888] text-xs">{card.lastUpdated}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[#888888] text-xs mt-6">
        Rates shown are estimates and subject to change. Contact me for a personalized quote.
      </p>
    </div>
  )
}
