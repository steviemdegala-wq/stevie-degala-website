'use client'

import { useState } from 'react'
import { useModalStore } from '@/lib/modalStore'

// ─── Types ───────────────────────────────────────────────────────────────────

type Answers = {
  goal?: string
  military?: string
  firstTime?: string
  location?: string
  downPayment?: string
  credit?: string
  income?: string
  loanAmount?: string
}

type LoanKey =
  | 'conventional'
  | 'fha'
  | 'va'
  | 'usda'
  | 'jumbo'
  | 'refinance'
  | 'heloc'
  | 'dscr'
  | 'bankStatement'
  | 'bridge'
  | 'doctorLoan'

type LoanInfo = {
  name: string
  tagline: string
  pros: string[]
  cons: string[]
  bestFor: string
  accent: string
}

// ─── Loan Definitions ────────────────────────────────────────────────────────

const LOANS: Record<LoanKey, LoanInfo> = {
  conventional: {
    name: 'Conventional Loan',
    tagline: 'The standard — and often the smartest.',
    pros: [
      'No upfront mortgage insurance with 20%+ down',
      'Wide range of lenders and rates to shop',
      'PMI drops off automatically at 20% equity',
    ],
    cons: [
      'Stricter credit and income qualification',
      'PMI required if down payment is under 20%',
    ],
    bestFor:
      'Buyers with solid credit (640+) and steady income who want the most competitive long-term cost.',
    accent: '#B8860B',
  },
  fha: {
    name: 'FHA Loan',
    tagline: 'Low barrier to entry. Big path forward.',
    pros: [
      'Down payments as low as 3.5% with 580+ credit',
      'More flexible debt-to-income ratios',
      'Available with credit scores as low as 500 (with 10% down)',
    ],
    cons: [
      'Mortgage insurance required for the life of the loan',
      'Loan limits vary by county',
    ],
    bestFor:
      'First-time buyers or those rebuilding credit who need lower down payment and more forgiving qualification standards.',
    accent: '#4A7FA5',
  },
  va: {
    name: 'VA Loan',
    tagline: 'Earned. Zero down. No PMI.',
    pros: [
      'No down payment required',
      'No private mortgage insurance (PMI)',
      'Competitive rates backed by the U.S. government',
    ],
    cons: [
      'VA funding fee required (waived for some veterans)',
      'Available only to eligible military members and surviving spouses',
    ],
    bestFor:
      'Active duty, veterans, or surviving spouses who want to maximize buying power with zero down and no PMI.',
    accent: '#5C8A5C',
  },
  usda: {
    name: 'USDA Loan',
    tagline: 'Rural living. Zero down.',
    pros: [
      'No down payment required',
      'Below-market interest rates',
      'Lower mortgage insurance than FHA',
    ],
    cons: [
      'Property must be in an eligible rural or suburban area',
      'Income limits apply based on household size and location',
    ],
    bestFor:
      'Buyers purchasing in rural or qualifying suburban areas who meet income limits and want zero down.',
    accent: '#7A9E5C',
  },
  jumbo: {
    name: 'Jumbo Loan',
    tagline: 'High-value homes. High-caliber financing.',
    pros: [
      'Finances properties above conforming loan limits',
      'Competitive rates for strong borrowers',
      'Fixed and adjustable rate options available',
    ],
    cons: [
      'Stricter credit and reserve requirements',
      'Larger down payment typically required (10–20%)',
    ],
    bestFor:
      'Buyers financing luxury properties or homes in high-cost markets where loan amounts exceed conforming limits.',
    accent: '#9B7FA5',
  },
  refinance: {
    name: 'Refinance',
    tagline: 'Same house. Better terms.',
    pros: [
      'Lower your monthly payment or pay off faster',
      'Lock in a better rate if the market shifted',
      'Cash-out option to access your built-up equity',
    ],
    cons: [
      'Closing costs typically 2–5% of the loan amount',
      'Resets your loan term if not structured carefully',
    ],
    bestFor:
      'Homeowners who want to reduce their rate, change loan terms, or pull equity for a major life expense.',
    accent: '#B8860B',
  },
  heloc: {
    name: 'HELOC / Home Equity',
    tagline: 'Your equity, working for you.',
    pros: [
      'Flexible line of credit based on your home\'s value',
      'Only pay interest on what you actually draw',
      'Use for renovations, debt payoff, or investing',
    ],
    cons: [
      'Variable rate — payments can increase over time',
      'Your home is the collateral — missed payments carry real risk',
    ],
    bestFor:
      'Homeowners with significant equity who want a flexible credit line for home improvements, debt consolidation, or other goals.',
    accent: '#A5704A',
  },
  dscr: {
    name: 'DSCR Investor Loan',
    tagline: 'Qualify on cash flow, not your W-2.',
    pros: [
      'No personal income verification required',
      'Qualify based on the property\'s rental income',
      'Scale your portfolio without W-2 limitations',
    ],
    cons: [
      'Rates are higher than traditional loans',
      'Larger down payment typically required (20–25%)',
    ],
    bestFor:
      'Real estate investors who want to grow their rental portfolio without relying on personal income for qualification.',
    accent: '#4A7FA5',
  },
  bankStatement: {
    name: 'Bank Statement / Non-QM',
    tagline: 'Your deposits are your income.',
    pros: [
      'No tax returns or W-2s required',
      'Qualify using 12–24 months of bank statements',
      'Built for self-employed borrowers',
    ],
    cons: [
      'Higher rates than conventional loans',
      'Larger down payments typically required',
    ],
    bestFor:
      'Self-employed business owners, freelancers, or entrepreneurs who show strong deposits but have complex tax situations.',
    accent: '#5C7AA5',
  },
  bridge: {
    name: 'Bridge / Construction Loan',
    tagline: 'Finance the build. Own the vision.',
    pros: [
      'Funds new construction or major renovation',
      'Bridge financing between selling and buying',
      'Interest-only during the construction period',
    ],
    cons: [
      'Higher short-term rates',
      'Requires strong equity and financial profile',
    ],
    bestFor:
      'Buyers building new construction, doing major renovation, or bridging between the sale of one home and purchase of another.',
    accent: '#A58B4A',
  },
  doctorLoan: {
    name: 'Doctor Loan',
    tagline: 'Low down, no PMI, student debt excluded.',
    pros: [
      'Low or no down payment required',
      'No private mortgage insurance (PMI)',
      'Student loan debt often excluded from DTI calculation',
    ],
    cons: [
      'Available only to qualifying medical professionals',
      'Typically limited to primary residence purchases',
    ],
    bestFor:
      'Medical professionals (MD, DO, DDS, DMD, OD) who have strong earning potential but high student debt and limited down payment savings.',
    accent: '#5C8AA5',
  },
}

// ─── Questions ───────────────────────────────────────────────────────────────

type Option = { value: string; label: string; sub?: string }
type Question = {
  id: keyof Answers
  question: string
  options: Option[]
  showIf?: (a: Answers) => boolean
}

const QUESTIONS: Question[] = [
  {
    id: 'goal',
    question: "What's your primary goal?",
    options: [
      { value: 'buy', label: 'Buy a home', sub: 'Primary residence or first home' },
      { value: 'refinance', label: 'Refinance my current home', sub: 'Lower rate, change terms, or cash out' },
      { value: 'invest', label: 'Purchase an investment property', sub: 'Rental or BRRRR strategy' },
      { value: 'equity', label: 'Access my home equity', sub: 'HELOC or home equity loan' },
    ],
  },
  {
    id: 'military',
    question: 'Have you or your spouse served in the U.S. military?',
    options: [
      { value: 'yes', label: 'Yes', sub: 'Active duty, veteran, or surviving spouse' },
      { value: 'no', label: 'No' },
    ],
    showIf: (a) => a.goal === 'buy' || a.goal === 'invest',
  },
  {
    id: 'firstTime',
    question: 'Is this your first home purchase?',
    options: [
      { value: 'yes', label: 'Yes, first-time buyer' },
      { value: 'no', label: "No, I've bought before" },
    ],
    showIf: (a) => a.goal === 'buy',
  },
  {
    id: 'location',
    question: 'Where is the property located?',
    options: [
      { value: 'rural', label: 'Rural or small town', sub: 'Outside major metro areas' },
      { value: 'urban', label: 'Suburban or urban', sub: 'In or near a city' },
    ],
    showIf: (a) => a.goal === 'buy',
  },
  {
    id: 'downPayment',
    question: 'How much are you putting down?',
    options: [
      { value: 'lt3.5', label: 'Less than 3.5%' },
      { value: '3.5-10', label: '3.5% – 10%' },
      { value: '10-20', label: '10% – 20%' },
      { value: 'gt20', label: '20% or more' },
    ],
    showIf: (a) => a.goal === 'buy' || a.goal === 'invest',
  },
  {
    id: 'credit',
    question: 'What is your estimated credit score?',
    options: [
      { value: 'lt580', label: 'Below 580' },
      { value: '580-639', label: '580 – 639' },
      { value: '640-699', label: '640 – 699' },
      { value: 'gt700', label: '700 or above' },
    ],
  },
  {
    id: 'income',
    question: 'How do you primarily earn your income?',
    options: [
      { value: 'w2', label: 'W-2 / Salaried', sub: 'Traditional employee' },
      { value: 'selfEmployed', label: 'Self-employed or freelance', sub: 'Business owner, 1099, contractor' },
      { value: 'rental', label: 'Rental or investment income', sub: 'Portfolio income' },
      { value: 'other', label: 'Other / non-traditional', sub: 'Pension, trust, or mixed' },
    ],
  },
  {
    id: 'loanAmount',
    question: 'What is your estimated loan amount?',
    options: [
      { value: 'lt400', label: 'Under $400,000' },
      { value: '400-750', label: '$400,000 – $750,000' },
      { value: 'gt750', label: 'Over $750,000' },
    ],
  },
]

// ─── Scoring Engine ───────────────────────────────────────────────────────────

function getTopLoans(answers: Answers): LoanKey[] {
  const scores: Record<LoanKey, number> = {
    conventional: 0,
    fha: 0,
    va: 0,
    usda: 0,
    jumbo: 0,
    refinance: 0,
    heloc: 0,
    dscr: 0,
    bankStatement: 0,
    bridge: 0,
    doctorLoan: 0,
  }

  // Goal
  if (answers.goal === 'equity') {
    scores.heloc += 20
    scores.refinance += 5 // cash-out refi also works
  }
  if (answers.goal === 'refinance') {
    scores.refinance += 20
    scores.conventional += 4
  }
  if (answers.goal === 'invest') {
    scores.dscr += 10
    scores.conventional += 4
    scores.bridge += 2
  }
  if (answers.goal === 'buy') {
    scores.conventional += 5
    scores.fha += 5
  }

  // Military
  if (answers.military === 'yes') {
    scores.va += 18
  } else {
    scores.va = 0 // hard disqualifier
  }

  // First time
  if (answers.firstTime === 'yes') {
    scores.fha += 5
    scores.usda += 3
  }

  // Location
  if (answers.location === 'rural') {
    scores.usda += 8
  }

  // Down payment
  if (answers.downPayment === 'lt3.5') {
    scores.fha += 6
    scores.usda += 5
    scores.va += 5
  } else if (answers.downPayment === '3.5-10') {
    scores.fha += 8
    scores.conventional += 3
  } else if (answers.downPayment === '10-20') {
    scores.conventional += 7
    scores.fha += 2
    scores.jumbo += 3
  } else if (answers.downPayment === 'gt20') {
    scores.conventional += 10
    scores.jumbo += 6
    scores.dscr += 4
  }

  // Credit
  if (answers.credit === 'lt580') {
    scores.fha += 4 // 500–579 with 10% down
    scores.conventional = Math.max(0, scores.conventional - 8)
    scores.jumbo = 0
    scores.dscr = Math.max(0, scores.dscr - 4)
  } else if (answers.credit === '580-639') {
    scores.fha += 8
    scores.conventional += 1
    scores.jumbo = Math.max(0, scores.jumbo - 4)
  } else if (answers.credit === '640-699') {
    scores.conventional += 5
    scores.fha += 4
  } else if (answers.credit === 'gt700') {
    scores.conventional += 9
    scores.jumbo += 5
    scores.va += 3
    scores.dscr += 3
  }

  // Income
  if (answers.income === 'selfEmployed') {
    scores.bankStatement += 16
    scores.conventional += 1
  }
  if (answers.income === 'rental') {
    scores.dscr += 10
    scores.conventional += 2
  }
  if (answers.income === 'other') {
    scores.bankStatement += 6
  }
  if (answers.income === 'w2') {
    scores.conventional += 3
    scores.fha += 2
    scores.va += 2
    if (answers.goal === 'buy' && (answers.downPayment === 'lt3.5' || answers.downPayment === '3.5-10') && answers.credit === 'gt700') {
      scores.doctorLoan += 14
    }
  }

  // Loan amount
  if (answers.loanAmount === 'gt750') {
    scores.jumbo += 18
    scores.conventional = Math.max(0, scores.conventional - 5)
  } else if (answers.loanAmount === '400-750') {
    scores.conventional += 4
    scores.jumbo += 3
  } else if (answers.loanAmount === 'lt400') {
    scores.fha += 3
    scores.usda += 3
    scores.conventional += 2
  }

  // Goal-based hard disqualifiers
  if (answers.goal !== 'equity') scores.heloc = 0
  if (answers.goal === 'invest') {
    scores.fha = 0
    scores.va = 0
    scores.usda = 0
  }
  if (answers.goal !== 'buy' && answers.goal !== 'invest') {
    scores.usda = 0
  }
  if (answers.income !== 'selfEmployed' && answers.income !== 'other') {
    scores.bankStatement = Math.max(0, scores.bankStatement - 10)
  }
  if (answers.goal !== 'invest' && answers.income !== 'rental') {
    scores.dscr = Math.max(0, scores.dscr - 8)
  }
  if (answers.goal !== 'buy') {
    scores.doctorLoan = 0
  }

  return (Object.entries(scores) as [LoanKey, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([k]) => k)
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FindMyLoanPage() {
  const { openModal } = useModalStore()
  const [answers, setAnswers] = useState<Answers>({})
  const [stepIndex, setStepIndex] = useState(0)
  const [done, setDone] = useState(false)

  const visibleQuestions = QUESTIONS.filter(
    (q) => !q.showIf || q.showIf(answers)
  )
  const currentQ = visibleQuestions[stepIndex]
  const progress = done ? 100 : Math.round((stepIndex / visibleQuestions.length) * 100)

  function handleSelect(value: string) {
    const updated = { ...answers, [currentQ.id]: value }
    setAnswers(updated)

    const nextQuestions = QUESTIONS.filter(
      (q) => !q.showIf || q.showIf(updated)
    )
    const nextIndex = stepIndex + 1

    if (nextIndex >= nextQuestions.length) {
      setDone(true)
    } else {
      setStepIndex(nextIndex)
    }
  }

  function handleBack() {
    if (stepIndex === 0) return
    setDone(false)
    setStepIndex(stepIndex - 1)
  }

  function handleReset() {
    setAnswers({})
    setStepIndex(0)
    setDone(false)
  }

  const topLoans = done ? getTopLoans(answers) : []

  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-[#0A0A0A]">
      <section className="bg-[#0A0A0A] px-6 py-12 md:py-16">
        <div className={`mx-auto transition-all duration-300 ${done ? 'max-w-5xl' : 'max-w-2xl'}`}>

          {/* Compact header */}
          <div className="mb-10">
            <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-3">Loan Matcher</p>
            <h1
              className="text-3xl md:text-4xl text-[#F8F8F8] leading-tight mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Find the loan that fits your life.
            </h1>
            <p className="text-[#888888] text-sm leading-relaxed">
              Answer a few questions and I will show you which loan options match your situation — and why.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#888888] text-xs uppercase tracking-[0.2em]">
                {done ? 'Complete' : `Question ${stepIndex + 1} of ${visibleQuestions.length}`}
              </span>
              <span className="text-[#888888] text-xs">{progress}%</span>
            </div>
            <div className="h-px bg-[#2E2E2E] relative">
              <div
                className="absolute top-0 left-0 h-px bg-[#F8F8F8] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          {!done && currentQ && (
            <div>
              <h2
                className="text-2xl md:text-3xl text-[#F8F8F8] mb-7 leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {currentQ.question}
              </h2>

              <div className="space-y-3">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className="w-full text-left border border-white/40 bg-white/90 backdrop-blur-sm px-6 py-5 rounded-2xl hover:border-[#0A0A0A] hover:bg-white/95 transition-all group"
                  >
                    <span className="block text-[#0A0A0A] text-base group-hover:text-black">
                      {opt.label}
                    </span>
                    {opt.sub && (
                      <span className="block text-[#555555] text-sm mt-0.5">
                        {opt.sub}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {stepIndex > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 mt-8 text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              )}
            </div>
          )}

          {/* Results */}
          {done && topLoans.length === 2 && (
            <div>
              <h2
                className="text-2xl md:text-3xl text-[#F8F8F8] mb-2 leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Based on your answers, here are your best fits.
              </h2>
              <p className="text-[#888888] text-sm mb-8">
                These are starting points — every situation is different. A quick call confirms the right move.
              </p>

              {/* Side-by-side cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {topLoans.map((key, i) => {
                  const loan = LOANS[key]
                  return (
                    <div
                      key={key}
                      className="bg-white/90 backdrop-blur-sm border border-white/40 rounded-2xl px-7 py-8"
                      style={{ borderLeft: `3px solid ${loan.accent}` }}
                    >
                      {i === 0 && (
                        <p
                          className="text-xs uppercase tracking-[0.2em] mb-3"
                          style={{ color: loan.accent }}
                        >
                          Top Match
                        </p>
                      )}
                      {i === 1 && (
                        <p className="text-xs uppercase tracking-[0.2em] mb-3 text-[#555555]">
                          Also Consider
                        </p>
                      )}

                      <h3
                        className="text-[#0A0A0A] text-xl mb-1"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {loan.name}
                      </h3>
                      <p className="text-[#555555] text-sm mb-6 italic">{loan.tagline}</p>

                      <div className="mb-6">
                        <p className="text-[#3A3A3A] text-xs uppercase tracking-[0.15em] mb-3">Pros</p>
                        <ul className="space-y-2 mb-5">
                          {loan.pros.map((pro) => (
                            <li key={pro} className="flex items-start gap-2.5 text-[#3A3A3A] text-sm">
                              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#5C8A5C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              {pro}
                            </li>
                          ))}
                        </ul>
                        <p className="text-[#3A3A3A] text-xs uppercase tracking-[0.15em] mb-3">Cons</p>
                        <ul className="space-y-2">
                          {loan.cons.map((con) => (
                            <li key={con} className="flex items-start gap-2.5 text-[#555555] text-sm">
                              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#A55C5C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-[#555555] text-sm leading-relaxed border-t border-[#E0E0E0] pt-5">
                        <span className="text-[#3A3A3A] font-medium">Best for: </span>
                        {loan.bestFor}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* CTA — full width below both cards */}
              <div className="border border-white/40 bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-10 text-center">
                <h3
                  className="text-[#0A0A0A] text-2xl md:text-3xl mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Ready to get specific numbers?
                </h3>
                <p className="text-[#3A3A3A] text-sm leading-relaxed mb-8 max-w-md mx-auto">
                  I will pull real rate quotes for your situation, compare lenders, and walk you through which option actually saves you the most money.
                </p>
                <button
                  onClick={openModal}
                  className="bg-[#0A0A0A] text-[#F8F8F8] px-8 py-3.5 text-sm tracking-wide rounded-full hover:bg-[#1A1A1A] transition-colors"
                >
                  Set Up a Free Call
                </button>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 mt-8 mx-auto text-[#888888] text-sm hover:text-[#F8F8F8] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Start over
              </button>
            </div>
          )}

        </div>
      </section>
    </main>
  )
}
