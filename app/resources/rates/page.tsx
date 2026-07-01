import type { Metadata } from 'next'
import RateChart from '@/components/RateChart'
import BookCallButton from '@/components/BookCallButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Current Mortgage Rates — Stevie de Gala',
  description: 'Current conventional mortgage rate estimates for Texas and Colorado.',
}

type RateData = { rate: number; change: number; date: string } | null
type ChartPoint = { date: string; rate30: number | null; rate15: number | null }

async function fetchFredSeries(seriesId: string, limit = 6): Promise<{ value: string; date: string }[]> {
  const apiKey = process.env.FRED_API_KEY
  if (!apiKey) return []
  try {
    const res = await fetch(
      `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=${limit}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.observations ?? []).filter((o: { value: string }) => o.value !== '.')
  } catch {
    return []
  }
}

function toRateData(obs: { value: string; date: string }[]): RateData {
  if (obs.length < 2) return null
  const current = parseFloat(obs[0].value)
  const prior = parseFloat(obs[Math.min(4, obs.length - 1)].value)
  return { rate: current, change: parseFloat((current - prior).toFixed(2)), date: obs[0].date }
}

export default async function RatesPage() {
  const [obs30, obs15] = await Promise.all([
    fetchFredSeries('MORTGAGE30US', 52),
    fetchFredSeries('MORTGAGE15US', 52),
  ])

  const rate30 = toRateData(obs30)
  const rate15 = toRateData(obs15)

  // Build chart data — merge both series by date, oldest first
  const dateMap: Record<string, ChartPoint> = {}
  for (const o of obs30) {
    dateMap[o.date] = { date: o.date, rate30: parseFloat(o.value), rate15: null }
  }
  for (const o of obs15) {
    if (dateMap[o.date]) dateMap[o.date].rate15 = parseFloat(o.value)
    else dateMap[o.date] = { date: o.date, rate30: null, rate15: parseFloat(o.value) }
  }
  const chartData = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date))

  return (
    <main className="pt-16 md:pt-20">
      {/* Header */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors flex items-center gap-2 mb-10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Resources
          </Link>
          <h1
            className="text-4xl md:text-5xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Current Rates
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            Rates move daily. These are current estimates to give you a starting point. Your actual rate depends on your credit, down payment, property type, and loan structure.
          </p>
        </div>
      </section>

      {/* Market Benchmark — current rates */}
      <section className="bg-[#0A0A0A] py-20 px-6 border-t border-[#2E2E2E]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.2em] mb-3">Market Benchmark</p>
          <h2
            className="text-3xl text-[#F8F8F8] mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Where rates stand nationally
          </h2>
          <p className="text-[#C4C4C4] text-sm leading-relaxed mb-10 max-w-2xl">
            National weekly averages published by Freddie Mac every Thursday. Use these as a market reference — your actual rate depends on credit, loan size, and property type.
          </p>

          {rate30 || rate15 ? (
            <>
              {/* Current rate cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {[
                  { label: '30-Year Fixed', href: 'https://fred.stlouisfed.org/series/MORTGAGE30US', data: rate30, accent: '#7A9E5C' },
                  { label: '15-Year Fixed', href: 'https://fred.stlouisfed.org/series/MORTGAGE15US', data: rate15, accent: '#4A7FA5' },
                ].map(({ label, href, data, accent }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-white bg-white border border-[#E5E5E5] rounded-2xl p-8 flex flex-col gap-4 hover:bg-[#F5F5F5] transition-colors"
                    style={{ borderLeft: `3px solid ${accent}` }}
                  >
                    <p className="text-[#888888] text-xs uppercase tracking-widest">{label} — National Avg</p>
                    {data ? (
                      <>
                        <p className="text-5xl text-[#0A0A0A]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {data.rate.toFixed(2)}%
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${data.change <= 0 ? 'text-[#7A9E5C]' : 'text-[#A55C5C]'}`}>
                            {data.change > 0 ? '+' : ''}{data.change.toFixed(2)}%
                          </span>
                          <span className="text-[#888888] text-xs">vs. 4 weeks ago</span>
                        </div>
                        <p className="text-[#888888] text-xs">
                          As of {new Date(data.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · Freddie Mac PMMS
                        </p>
                      </>
                    ) : (
                      <p className="text-[#888888] text-sm">Data unavailable</p>
                    )}
                  </a>
                ))}
              </div>

              {/* 52-week chart */}
              {chartData.length > 0 && (
                <div className="card-white bg-white border border-[#E5E5E5] rounded-2xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-[#888888] text-xs uppercase tracking-widest mb-1">Rate Trend</p>
                      <p className="text-[#444444] text-sm">Past 52 weeks · Hover to see rate on any date</p>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="flex items-center gap-1.5 text-xs text-[#888888]">
                        <span className="w-3 h-0.5 rounded bg-[#7A9E5C] inline-block" />
                        30-Year
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-[#888888]">
                        <span className="w-3 h-0.5 rounded bg-[#4A7FA5] inline-block" />
                        15-Year
                      </span>
                    </div>
                  </div>
                  <RateChart data={chartData} />
                  <p className="text-[#555555] text-xs mt-4">
                    Source: Freddie Mac Primary Mortgage Market Survey (PMMS) via FRED · Federal Reserve Bank of St. Louis · Updated weekly
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="text-[#888888] text-sm">
              Live rate data requires a{' '}
              <a href="https://fred.stlouisfed.org/docs/api/api_key.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#F8F8F8] transition-colors">
                FRED API key
              </a>
              . Add <code className="text-[#C4C4C4]">FRED_API_KEY=your_key</code> to your environment variables.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-20 px-6 border-t border-[#2E2E2E]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Want the best rate available for your situation?
          </h2>
          <p className="text-[#C4C4C4] mb-10 leading-relaxed">
            I shop the market on your behalf. Book a free call and I will find the most competitive rate available for your specific deal.
          </p>
          <BookCallButton variant="solid" />
        </div>
      </section>
    </main>
  )
}
