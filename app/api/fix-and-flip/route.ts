import { NextRequest, NextResponse } from 'next/server'
import { BOOKING_URL } from '@/lib/booking'

const CRM_URL = (process.env.CRM_URL ?? 'https://crm-two-beta-90.vercel.app').replace(/\/$/, '')
const DEFAULT_NOTIFICATION_EMAIL = 'SDegala@BarrettFinancial.com'
const DEFAULT_FROM_EMAIL = 'Mortgage Stevie <onboarding@resend.dev>'
const SELLING_COST_RATE = 0.03

type Deal = {
  address: string
  state: string
  zip: string
  purchasePrice: number
  renovationBudget: number
  arv: number
  monthlyHoldingCosts: number
  projectMonths: number
  propertyType: string
  experience: string
  credit: string
  profileSkipped?: boolean
}

type Contact = { name: string; email: string; phone: string }
type Attribution = { pageUrl: string; referrer: string; utmSource: string; utmMedium: string; utmCampaign: string }

type InternalOption = {
  lender: 'TC Lending' | 'Truly' | 'Bench'
  program: string
  rate: number
  termMonths: number
  loanAmount: number
  purchaseAdvance: number
  renovationAdvance: number
  originationFee: number
  otherFees: number
  payoffFee: number
  appraisalFee: number
  titleFee: number
  reserveTarget: number
  startupCash: number
  cashNeeded: number
  carryingCost: number
  totalCash: number
  borrowingCost: number
  reasons: string[]
  cautions: string[]
}

function asMoney(value: unknown) {
  const number = Number(value)
  return Number.isFinite(number) ? Math.max(0, Math.round(number)) : 0
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function money(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function normalizeUsPhone(value: unknown) {
  let digits = String(value ?? '').replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1)
  if (!/^\d{10}$/.test(digits)) return null
  if (!/[2-9]/.test(digits[0]) || !/[2-9]/.test(digits[3]) || /^(\d)\1{9}$/.test(digits)) return null
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 8000) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

function ficoValue(credit: string) {
  const map: Record<string, number> = {
    '800+': 800,
    '700+': 700,
    below700: 620,
    noCredit: 0,
  }
  return map[credit] ?? 0
}

function trulyTier(experience: string, credit: string) {
  const fico = ficoValue(credit)
  if (!fico || fico < 620) return null
  const column = fico >= 720 ? 0 : fico >= 680 ? 1 : fico >= 650 ? 2 : 3
  const tiers: Record<string, number[]> = {
    '6+': [1, 1, 2, 3],
    '3-5': [1, 2, 3, 4],
    '1-2': [2, 3, 4, 4],
    '0': [3, 4, 4, 4],
  }
  return tiers[experience]?.[column] ?? null
}

function createOption(args: Omit<InternalOption, 'startupCash' | 'cashNeeded' | 'carryingCost' | 'totalCash' | 'borrowingCost'>, deal: Deal): InternalOption {
  const purchaseGap = Math.max(0, deal.purchasePrice - args.purchaseAdvance)
  const renovationGap = Math.max(0, deal.renovationBudget - args.renovationAdvance)
  const startupCash = purchaseGap + args.originationFee + args.otherFees + args.appraisalFee + args.titleFee
  const cashNeeded = startupCash + renovationGap
  const interestMonths = Math.min(deal.projectMonths, args.termMonths)
  const estimatedInterest = args.loanAmount * args.rate * interestMonths / 12
  const borrowingCost = estimatedInterest + args.originationFee + args.otherFees + args.payoffFee
  const totalCash = cashNeeded + estimatedInterest + args.payoffFee
  return { ...args, startupCash, cashNeeded, carryingCost: estimatedInterest, totalCash, borrowingCost }
}

function calculateOptions(deal: Deal) {
  const options: InternalOption[] = []
  const totalCost = deal.purchasePrice + deal.renovationBudget

  const tcLoan = Math.min(totalCost, deal.arv * 0.7)
  if (tcLoan >= 150000) {
    const purchaseAdvance = Math.min(deal.purchasePrice, tcLoan)
    const renovationAdvance = Math.max(0, Math.min(deal.renovationBudget, tcLoan - purchaseAdvance))
    options.push(createOption({
      lender: 'TC Lending',
      program: 'High-leverage renovation financing',
      rate: 0.12,
      termMonths: 6,
      loanAmount: tcLoan,
      purchaseAdvance,
      renovationAdvance,
      originationFee: deal.purchasePrice * 0.05,
      otherFees: 1500,
      payoffFee: 0,
      appraisalFee: 1000,
      titleFee: 500,
      reserveTarget: 0,
      reasons: ['Can finance up to 100% of purchase and renovation costs', 'Designed to minimize cash invested in the project', 'Credit score and prior flip experience do not drive the estimate'],
      cautions: [
        'Total financing cannot exceed 70% of ARV',
        'The modeled term is 6 months',
        'Property-state eligibility must be confirmed',
      ],
    }, deal))
  }

  const tier = trulyTier(deal.experience, deal.credit)
  const trulyLeverage: Record<number, { ltv: number; ltc: number; ltarv: number }> = {
    1: { ltv: 0.95, ltc: 0.95, ltarv: 0.75 },
    2: { ltv: 0.9, ltc: 0.85, ltarv: 0.7 },
    3: { ltv: 0.8, ltc: 0.8, ltarv: 0.65 },
    4: { ltv: 0.75, ltc: 0.8, ltarv: 0.65 },
  }
  if (tier) {
    const leverage = trulyLeverage[tier]
    const loanAmount = Math.min(deal.purchasePrice * leverage.ltv + deal.renovationBudget, totalCost * leverage.ltc, deal.arv * leverage.ltarv, 5000000)
    if (loanAmount >= 100000 && !['NV', 'ND', 'SD', 'VT'].includes(deal.state)) {
      const purchaseAdvance = Math.min(deal.purchasePrice * leverage.ltv, loanAmount)
      const renovationAdvance = Math.max(0, Math.min(deal.renovationBudget, loanAmount - purchaseAdvance))
      const topPricing = deal.experience === '6+' && ficoValue(deal.credit) >= 700
      const rate = topPricing ? 0.1025 : 0.115
      const reserveTarget = loanAmount * rate / 12 * 6 + deal.renovationBudget * 0.1
      options.push(createOption({
        lender: 'Truly',
        program: 'Longer-term renovation financing',
        rate,
        termMonths: 12,
        loanAmount,
        purchaseAdvance,
        renovationAdvance,
        originationFee: loanAmount * (loanAmount > 500000 ? 0.015 : 0.0175),
        otherFees: 600,
        payoffFee: 0,
        appraisalFee: 1000,
        titleFee: 500,
        reserveTarget,
        reasons: ['A 12-month modeled term gives the project more breathing room', 'Pricing reflects the experience and credit entered', 'Financing is estimated from the purchase price, renovation budget, and after-repair value'],
        cautions: ['Requires six months of interest reserves plus 10% of the renovation budget in liquidity'],
      }, deal))
    }
  }

  const benchStates = ['AZ', 'CA', 'CO', 'FL', 'TX', 'UT']
  if (benchStates.includes(deal.state)) {
    const purchaseAdvance = deal.purchasePrice * 0.8
    const benchCap = deal.arv * 0.7
    const loanAmount = Math.min(purchaseAdvance + deal.renovationBudget, benchCap)
    if (loanAmount >= 100000) {
      const renovationAdvance = Math.max(0, Math.min(deal.renovationBudget, loanAmount - purchaseAdvance))
      const rate = ['CA', 'FL'].includes(deal.state) ? 0.12 : 0.11
      const termMonths = deal.state === 'AZ' ? 11 : 6
      const stateFees: Record<string, { upfront: number; payoff: number }> = {
        AZ: { upfront: 1250, payoff: 200 },
        CA: { upfront: Math.max(loanAmount * 0.0025, 1000) + 1095 + 1395, payoff: 400 },
        CO: { upfront: 1250, payoff: 200 },
        FL: { upfront: 1250 + 250 + 750, payoff: 200 },
        TX: { upfront: 1250, payoff: 200 },
        UT: { upfront: 1250, payoff: 200 },
      }
      const reserveTarget = loanAmount * rate / 12 * 3
      options.push(createOption({
        lender: 'Bench',
        program: 'Straightforward renovation financing',
        rate,
        termMonths,
        loanAmount,
        purchaseAdvance,
        renovationAdvance,
        originationFee: deal.purchasePrice * 0.02,
        otherFees: stateFees[deal.state].upfront,
        payoffFee: stateFees[deal.state].payoff,
        appraisalFee: 1000,
        titleFee: 500,
        reserveTarget,
        reasons: ['Funds up to 80% of the purchase price', 'Can fund up to 100% of the renovation budget within the ARV cap', 'Experience and FICO do not change the modeled terms'],
        cautions: ['Total financing cannot exceed 70% of ARV', `The modeled term in ${deal.state} is ${termMonths} months`, 'Renovation funds are reimbursed through draws'],
      }, deal))
    }
  }

  options.sort((a, b) => {
    const aTermPenalty = deal.projectMonths > a.termMonths ? 1000000 : 0
    const bTermPenalty = deal.projectMonths > b.termMonths ? 1000000 : 0
    return (a.cashNeeded + aTermPenalty) - (b.cashNeeded + bTermPenalty) || a.borrowingCost - b.borrowingCost
  })
  return options
}

function publicOption(option: InternalOption, index: number, deal: Deal, primary?: InternalOption) {
  let advantage = 'Potential fit based on the information entered'
  if (index > 0 && primary) {
    if (option.cashNeeded < primary.cashNeeded) advantage = 'Lower estimated cash needed'
    else if (option.borrowingCost < primary.borrowingCost) advantage = 'Lower estimated borrowing cost'
    else if (option.termMonths > primary.termMonths) advantage = 'More time for the project'
    else advantage = 'Another strong route'
  }
  const estimatedSellingCosts = deal.arv * SELLING_COST_RATE
  const nonFinancingHoldingCosts = deal.monthlyHoldingCosts * deal.projectMonths
  const financingAndFees = option.borrowingCost + option.appraisalFee + option.titleFee
  const costBeforeSelling = deal.purchasePrice + deal.renovationBudget + nonFinancingHoldingCosts + financingAndFees
  const totalProjectCost = costBeforeSelling + estimatedSellingCosts
  const estimatedProfit = deal.arv - totalProjectCost
  const estimatedCashContribution = option.totalCash + nonFinancingHoldingCosts
  const returnOnCash = estimatedCashContribution > 0 ? estimatedProfit / estimatedCashContribution * 100 : null
  const breakEvenSalePrice = costBeforeSelling / (1 - SELLING_COST_RATE)
  const lowerSalePrice = deal.arv * 0.95
  const lowerSaleProfit = lowerSalePrice - (costBeforeSelling + lowerSalePrice * SELLING_COST_RATE)
  const renovationOverrunProfit = estimatedProfit - deal.renovationBudget * 0.1
  const extensionMonths = Math.min(3, Math.max(0, option.termMonths - deal.projectMonths))
  const longerHoldProfit = estimatedProfit - deal.monthlyHoldingCosts * 3 - option.loanAmount * option.rate * extensionMonths / 12
  const labels = { label: index === 0 ? 'Potential option' : `Potential option ${index + 1}`, advantage }
  return {
    ...labels,
    program: 'Financing estimate',
    rate: option.rate * 100,
    termMonths: option.termMonths,
    loanAmount: Math.round(option.loanAmount),
    purchaseAdvance: Math.round(option.purchaseAdvance),
    renovationAdvance: Math.round(option.renovationAdvance),
    originationFee: Math.round(option.originationFee),
    originationPercent: Math.round(option.originationFee / (option.lender === 'Truly' ? option.loanAmount : deal.purchasePrice) * 10000) / 100,
    otherFees: Math.round(option.otherFees),
    otherFeeLabel: option.lender === 'Truly' ? 'Draw fees ($200 each x 3 estimated draws)' : 'Estimated lender fees',
    payoffFee: Math.round(option.payoffFee),
    appraisalFee: option.appraisalFee,
    titleFee: option.titleFee,
    reserveTarget: Math.round(option.reserveTarget),
    startupCash: Math.round(option.startupCash),
    cashNeeded: Math.round(option.cashNeeded),
    carryingCost: Math.round(option.carryingCost),
    carryingMonths: Math.min(deal.projectMonths, option.termMonths),
    totalCash: Math.round(option.totalCash),
    borrowingCost: Math.round(option.borrowingCost),
    estimatedSellingCosts: Math.round(estimatedSellingCosts),
    financingAndFees: Math.round(financingAndFees),
    nonFinancingHoldingCosts: Math.round(nonFinancingHoldingCosts),
    totalProjectCost: Math.round(totalProjectCost),
    estimatedProfit: Math.round(estimatedProfit),
    estimatedCashContribution: Math.round(estimatedCashContribution),
    returnOnCash: returnOnCash === null ? null : Math.round(returnOnCash * 10) / 10,
    breakEvenSalePrice: Math.round(breakEvenSalePrice),
    sensitivity: {
      salePriceDownFivePercent: Math.round(lowerSaleProfit),
      renovationUpTenPercent: Math.round(renovationOverrunProfit),
      holdThreeMonthsLonger: Math.round(longerHoldProfit),
    },
    reasons: option.reasons,
    cautions: option.cautions,
    termReview: deal.projectMonths > option.termMonths,
  }
}

function buildPublicResults(deal: Deal, options: InternalOption[]) {
  const publicOptions = options.slice(0, 1).map((option, index) => publicOption(option, index, deal, options[0]))
  const projectedLoss = publicOptions.length > 0 && publicOptions.every((option) => option.estimatedProfit < 0)
  if (!projectedLoss) return { options: publicOptions, warning: null }

  const best = [...publicOptions].sort((a, b) => b.estimatedProfit - a.estimatedProfit)[0]
  return {
    options: [{ ...best, label: 'One path to review', advantage: 'Lowest projected loss' }],
    warning: {
      type: 'projected-loss',
      estimatedLoss: Math.abs(best.estimatedProfit),
      arv: Math.round(deal.arv),
      purchaseAndRenovation: Math.round(deal.purchasePrice + deal.renovationBudget),
      financingAndFees: best.financingAndFees,
      carryingCost: best.carryingCost,
      originationFee: best.originationFee,
      otherFees: best.otherFees,
      otherFeeLabel: best.otherFeeLabel,
      appraisalFee: best.appraisalFee,
      titleFee: best.titleFee,
      payoffFee: best.payoffFee,
      estimatedSellingCosts: best.estimatedSellingCosts,
      totalProjectCost: best.totalProjectCost,
      sellingCostPercent: SELLING_COST_RATE * 100,
    },
  }
}

async function createCrmLead(contact: Contact, deal: Deal, options: InternalOption[], attribution: Attribution) {
  if (!process.env.CRM_PASSWORD) return false
  const loginRes = await fetchWithTimeout(`${CRM_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: process.env.CRM_PASSWORD }),
  })
  if (!loginRes.ok) throw new Error('CRM login failed')
  const primary = options[0]
  const notes = [
    'Fix-and-Flip Calculator submission',
    'Property address: Collected after preliminary results',
    `Purchase price: ${money(deal.purchasePrice)}`,
    `Renovation budget: ${money(deal.renovationBudget)}`,
    `ARV: ${money(deal.arv)}`,
    `Project timeline: ${deal.projectMonths} months`,
    `Taxes, insurance, utilities and other holding costs: ${money(deal.monthlyHoldingCosts)} per month`,
    `Experience: ${deal.profileSkipped ? 'Not collected - not needed for this estimate' : deal.experience}`,
    `Credit: ${deal.profileSkipped ? 'Not collected - not needed for this estimate' : deal.credit}`,
    attribution.utmSource ? `UTM source: ${attribution.utmSource}` : '',
    attribution.utmMedium ? `UTM medium: ${attribution.utmMedium}` : '',
    attribution.utmCampaign ? `UTM campaign: ${attribution.utmCampaign}` : '',
    attribution.referrer ? `Referrer: ${attribution.referrer}` : '',
    attribution.pageUrl ? `Submitted from: ${attribution.pageUrl}` : '',
    '',
    ...options.slice(0, 1).map((option, index) => `${index + 1}. ${option.lender} | Loan ${money(option.loanAmount)} | Cash needed ${money(option.cashNeeded)} | ${option.rate * 100}% | ${option.termMonths} months`),
  ].filter(Boolean).join('\n')
  const leadRes = await fetchWithTimeout(`${CRM_URL}/api/pipeline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: loginRes.headers.get('set-cookie') ?? '' },
    body: JSON.stringify({
      name: contact.name || contact.email,
      phone: contact.phone || undefined,
      email: contact.email,
      stage: 'New Lead',
      source: 'website-fix-and-flip-calculator',
      role: 'Borrower',
      tags: ['Fix and Flip Calculator', deal.state, primary?.lender].filter(Boolean),
      loanType: `Fix and Flip: ${primary?.lender ?? 'Manual review'}`,
      loanAmount: primary?.loanAmount ?? 0,
      notes,
    }),
  })
  if (!leadRes.ok) throw new Error(`CRM pipeline POST failed: ${leadRes.status}`)
  return true
}

function buildBorrowerEmail(contact: Contact, deal: Deal, options: InternalOption[]) {
  const result = buildPublicResults(deal, options)
  const publicOptions = result.options
  const resultRows = publicOptions.map((option) => `<div style="border:1px solid #ddd;border-radius:14px;padding:20px;margin:16px 0"><div style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#666">Potential financing structure</div><h2 style="font-family:Georgia,serif;font-size:24px;margin:4px 0 4px">${escapeHtml(option.program)}</h2><p style="margin:0"><strong>Projected profit: ${money(option.estimatedProfit)}</strong><br>Estimated financing: ${money(option.loanAmount)}<br>Cash to get started: ${money(option.startupCash)}<br>Estimated carrying cost: ${money(option.carryingCost)}<br>Total cash needed: ${money(option.totalCash)}<br>Rate: ${option.rate.toFixed(2)}% | ${option.termMonths}-month term</p></div>`).join('')
  const disclaimer = '<p style="color:#666;font-size:12px">These estimates reflect current program assumptions and the information provided. They are intended to be close planning estimates, but they are not final terms, an approval, a commitment to lend, or a rate quote. Appraisal and title charges are estimates and actual third-party fees may vary.</p>'
  const warningHtml = result.warning ? `<div style="background:#fff4e5;border:1px solid #e7b978;border-radius:14px;padding:20px;margin:20px 0"><h2 style="font-family:Georgia,serif;margin:0 0 8px">The numbers show a loss.</h2><p style="margin:0">With what you entered, this deal could lose about <strong>${money(result.warning.estimatedLoss)}</strong>. The estimated project cost is ${money(result.warning.totalProjectCost)} against an ARV of ${money(result.warning.arv)}. We don't want anyone going into a deal that's likely to lose money. Let's talk through why, or look at another deal with better numbers.</p></div>` : ''
  const intro = result.warning
    ? contact.name ? `Hi ${escapeHtml(contact.name)}, there just isn't enough room in this deal right now. Here is the financing path with the lowest projected loss so you can see the numbers clearly.` : `There just isn't enough room in this deal right now. Here is the financing path with the lowest projected loss so you can see the numbers clearly.`
    : contact.name ? `Hi ${escapeHtml(contact.name)}, here is a potential financing path based on the information entered for your project.` : 'Here is a potential financing path based on the information entered for your project.'
  const action = result.warning ? `<p style="margin-top:24px"><a href="${BOOKING_URL}" style="display:inline-block;background:#111;color:#fff;padding:13px 18px;border-radius:999px;text-decoration:none;font-weight:700">Discuss this deal or another opportunity</a></p>` : `<p style="margin-top:24px"><a href="${BOOKING_URL}" style="display:inline-block;background:#111;color:#fff;padding:13px 18px;border-radius:999px;text-decoration:none;font-weight:700">Discuss this deal with Stevie</a></p>`
  return `<div style="background:#f3f3f1;padding:28px 16px"><div style="font-family:Arial,sans-serif;color:#111;line-height:1.55;max-width:680px;margin:0 auto;background:#fff;border-radius:18px;padding:32px"><div style="font-family:Georgia,serif;font-size:22px;margin-bottom:28px">Mortgage Stevie</div><h1 style="font-family:Georgia,serif;font-size:36px;line-height:1.05;margin:0 0 16px">Your fix-and-flip financing estimate</h1><p>${intro}</p><p style="color:#666">This preliminary match is based on the information you entered. Property location can change eligibility and will be confirmed before a conditional pre-qualification letter is created.</p>${warningHtml}${resultRows}${action}${disclaimer}<p style="color:#777;font-size:12px;margin-top:24px">Stevie de Gala · NMLS# 2845865 · Barrett Financial NMLS# 181106 · SDegala@BarrettFinancial.com</p></div></div>`
}

async function sendEmails(contact: Contact, deal: Deal, options: InternalOption[], attribution: Attribution) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { borrower: false, internal: false }
  const sender = process.env.LEAD_FROM_EMAIL ?? DEFAULT_FROM_EMAIL
  const borrowerHtml = buildBorrowerEmail(contact, deal, options)
  const disclaimer = '<p style="color:#666;font-size:12px">These estimates reflect current program assumptions and the information provided. They are intended to be close planning estimates, but they are not final terms, an approval, a commitment to lend, or a rate quote. Appraisal and title charges are estimates and actual third-party fees may vary.</p>'
  const internalRows = options.slice(0, 1).map((option, index) => `<li><strong>${index + 1}. ${option.lender}</strong>: ${money(option.loanAmount)} loan, ${money(option.cashNeeded)} estimated cash needed, ${(option.rate * 100).toFixed(2)}%, ${option.termMonths} months</li>`).join('')
  const attributionRows = [
    attribution.utmSource ? `Source: ${escapeHtml(attribution.utmSource)}` : '',
    attribution.utmMedium ? `Medium: ${escapeHtml(attribution.utmMedium)}` : '',
    attribution.utmCampaign ? `Campaign: ${escapeHtml(attribution.utmCampaign)}` : '',
    attribution.referrer ? `Referrer: ${escapeHtml(attribution.referrer)}` : '',
  ].filter(Boolean).join('<br>')
  const contactRows = [contact.name ? `<strong>${escapeHtml(contact.name)}</strong>` : '', escapeHtml(contact.email), contact.phone ? escapeHtml(contact.phone) : ''].filter(Boolean).join('<br>')
  const profile = deal.profileSkipped ? 'Borrower experience and credit were not needed for this estimate.' : `Experience ${escapeHtml(deal.experience)} | Credit ${escapeHtml(deal.credit)}`
  const internalHtml = `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.5;max-width:680px"><h1>New fix-and-flip calculator lead</h1><p>${contactRows}</p><p>Property address will be collected after results.<br>Purchase ${money(deal.purchasePrice)} | Renovation ${money(deal.renovationBudget)} | ARV ${money(deal.arv)}<br>Estimated monthly holding costs ${money(deal.monthlyHoldingCosts)}<br>${deal.projectMonths} months | ${profile}</p>${attributionRows ? `<p>${attributionRows}</p>` : ''}<ol>${internalRows}</ol>${disclaimer}</div>`

  const send = async (to: string[], subject: string, html: string, replyTo?: string) => {
    const response = await fetchWithTimeout('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: sender, to, subject, html, reply_to: replyTo }),
    })
    if (!response.ok) throw new Error(`Resend email failed: ${response.status}`)
  }
  const [borrowerResult, internalResult] = await Promise.allSettled([
    send([contact.email], 'Your fix-and-flip financing estimate', borrowerHtml),
    send([process.env.LEAD_NOTIFICATION_EMAIL ?? DEFAULT_NOTIFICATION_EMAIL], `New fix-and-flip lead: ${contact.name || contact.email}`, internalHtml, contact.email),
  ])
  if (borrowerResult.status === 'rejected') console.error('Borrower result email failed:', borrowerResult.reason)
  if (internalResult.status === 'rejected') console.error('Internal lead email failed:', internalResult.reason)
  return { borrower: borrowerResult.status === 'fulfilled', internal: internalResult.status === 'fulfilled' }
}

function ascii(value: unknown) {
  return String(value ?? '').normalize('NFKD').replace(/[^\x20-\x7E]/g, '')
}

function pdfText(value: unknown) {
  return ascii(value).replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)')
}

function wrap(value: string, max = 88) {
  const words = ascii(value).split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    if (!line) line = word
    else if (`${line} ${word}`.length <= max) line += ` ${word}`
    else { lines.push(line); line = word }
  }
  if (line) lines.push(line)
  return lines
}

function buildPrequalificationPdf(contact: Contact, deal: Deal, option: InternalOption) {
  const issued = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'America/Denver' }).format(new Date())
  const validThrough = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'America/Denver' }).format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
  const property = `${deal.address}, ${deal.state} ${deal.zip}`
  const commands: string[] = []
  const add = (text: string, x: number, y: number, size = 10, bold = false) => {
    commands.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf 0 0 0 rg ${x} ${y} Td (${pdfText(text)}) Tj ET`)
  }
  const rule = (y: number) => commands.push(`q 0.82 0.82 0.82 RG 0.7 w 54 ${y} m 558 ${y} l S Q`)
  commands.push('q 0.035 0.035 0.035 rg 62 736 m 82 736 l 86.42 736 90 739.58 90 744 c 90 764 l 90 768.42 86.42 772 82 772 c 62 772 l 57.58 772 54 768.42 54 764 c 54 744 l 54 739.58 57.58 736 62 736 c f Q')
  commands.push('BT /F3 25 Tf 0.98 0.98 0.98 rg 64 745 Td (S) Tj ET')
  add('Mortgage Stevie', 102, 749, 17, true)
  rule(724)
  add('CONDITIONAL PROJECT FINANCING PRE-QUALIFICATION', 54, 699, 15, true)
  add('PRELIMINARY - NOT A LOAN APPROVAL OR COMMITMENT TO LEND', 54, 677, 9, true)
  add(`Issued: ${issued}   |   Valid through: ${validThrough}`, 54, 654, 9)
  rule(637)
  add(`Applicant: ${contact.name}`, 54, 610, 11, true)
  add(`Property: ${property}`, 54, 588, 10)
  add(`Purchase price: ${money(deal.purchasePrice)}`, 54, 566, 10)
  add(`Estimated loan amount: Up to ${money(option.loanAmount)}`, 54, 544, 10)
  add(`Illustrative rate and term: ${(option.rate * 100).toFixed(2)}% | ${option.termMonths} months`, 54, 522, 10)
  rule(505)

  let y = 480
  const paragraph = `Based solely on the unverified information submitted through the Mortgage Stevie fix-and-flip calculator, this business-purpose, non-owner-occupied investment project appears conditionally pre-qualified to proceed to full lender review for financing up to the amount shown above.`
  for (const line of wrap(paragraph)) { add(line, 54, y, 9); y -= 14 }
  y -= 4
  rule(y); y -= 22
  add('Conditions and limitations', 54, y, 11, true); y -= 20
  const conditions = [
    'Receipt of a complete application and all lender-required documentation.',
    'Verification of identity, borrowing entity, credit, assets, liquidity, experience, and source of funds.',
    'Acceptable appraisal or valuation, title, insurance, property condition, renovation scope, budget, and exit strategy.',
    'Compliance with lender guidelines, fraud and compliance review, state eligibility, and current program availability.',
    'No material adverse change to the applicant, property, market, or information provided before closing.',
    'Final loan amount, leverage, rate, term, fees, reserves, and cash required may differ after underwriting.',
  ]
  for (const condition of conditions) {
    const lines = wrap(condition, 82)
    lines.forEach((line, index) => { add(`${index === 0 ? '- ' : '  '}${line}`, 62, y, 8.5); y -= 13 })
    y -= 3
  }
  y -= 1
  rule(y); y -= 20
  const notice = 'This letter is an automated preliminary pre-qualification, not a credit decision, approval, rate lock, loan agreement, or guarantee of financing. It does not obligate Barrett Financial, any lender, or the applicant. Only a lender-issued written commitment following full underwriting can obligate a lender to fund.'
  for (const line of wrap(notice, 88)) { add(line, 54, y, 8.5, true); y -= 13 }
  y -= 4
  rule(y); y -= 20
  add('Stevie de Gala | Mortgage Broker | NMLS# 2845865', 54, y, 9, true); y -= 15
  add('Barrett Financial Group, L.L.C. | NMLS# 181106', 54, y, 9); y -= 15
  add('SDegala@BarrettFinancial.com | mortgagestevie.com', 54, y, 9)

  const stream = commands.join('\n')
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>',
    `<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`,
  ]
  let pdf = '%PDF-1.4\n'
  const offsets = [0]
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, 'utf8'))
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
  })
  const xref = Buffer.byteLength(pdf, 'utf8')
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (let index = 1; index <= objects.length; index += 1) pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  return Buffer.from(pdf, 'utf8')
}

async function sendPrequalificationLetter(contact: Contact, deal: Deal, option: InternalOption, pdf: Buffer) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false
  const property = `${escapeHtml(deal.address)}, ${escapeHtml(deal.state)} ${escapeHtml(deal.zip)}`
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.55;color:#111"><h1>Your conditional project pre-qualification letter</h1><p>Hi ${escapeHtml(contact.name)},</p><p>Your preliminary letter for <strong>${property}</strong> is attached. It reflects an estimated loan amount up to <strong>${money(option.loanAmount)}</strong> based on the unverified information you provided.</p><p>This is not a loan approval, commitment to lend, rate lock, or guarantee of financing. Final eligibility and terms require a complete application and lender underwriting.</p><p>Stevie de Gala | NMLS# 2845865<br>Barrett Financial Group, L.L.C. | NMLS# 181106<br>SDegala@BarrettFinancial.com</p></div>`
  const response = await fetchWithTimeout('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL ?? DEFAULT_FROM_EMAIL,
      to: [contact.email],
      subject: 'Your conditional project pre-qualification letter',
      html,
      attachments: [{ filename: 'conditional-project-prequalification.pdf', content: pdf.toString('base64') }],
    }),
  })
  return response.ok
}

export async function POST(req: NextRequest) {
  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const contact: Contact = {
    name: String(body.contact?.name ?? '').trim().slice(0, 120),
    email: String(body.contact?.email ?? '').trim().toLowerCase().slice(0, 254),
    phone: normalizeUsPhone(body.contact?.phone) ?? '',
  }
  const deal: Deal = {
    address: String(body.deal?.address ?? '').trim(),
    state: String(body.deal?.state ?? '').trim().toUpperCase(),
    zip: String(body.deal?.zip ?? '').trim(),
    purchasePrice: asMoney(body.deal?.purchasePrice),
    renovationBudget: asMoney(body.deal?.renovationBudget),
    arv: asMoney(body.deal?.arv),
    monthlyHoldingCosts: asMoney(body.deal?.monthlyHoldingCosts),
    projectMonths: Math.max(1, Math.min(24, Number(body.deal?.projectMonths) || 6)),
    propertyType: String(body.deal?.propertyType ?? ''),
    experience: String(body.deal?.experience ?? '') || '0',
    credit: String(body.deal?.credit ?? '') || 'noCredit',
    profileSkipped: Boolean(body.deal?.profileSkipped),
  }
  const bounded = (value: unknown, length: number) => String(value ?? '').trim().slice(0, length)
  const attribution: Attribution = {
    pageUrl: bounded(body.attribution?.pageUrl, 500),
    referrer: bounded(body.attribution?.referrer, 500),
    utmSource: bounded(body.attribution?.utmSource, 100),
    utmMedium: bounded(body.attribution?.utmMedium, 100),
    utmCampaign: bounded(body.attribution?.utmCampaign, 150),
  }
  const action = String(body.action ?? '')
  const isPreview = action === 'preview'
  const isPrequalification = action === 'prequalification'
  if (!isPreview && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
  if (isPrequalification && (!contact.name || !contact.phone)) return NextResponse.json({ error: 'Your name and a valid phone number are required for the pre-qualification letter.' }, { status: 400 })
  if (!deal.purchasePrice || !deal.renovationBudget || !deal.arv) return NextResponse.json({ error: 'Purchase price, renovation budget, and ARV are required.' }, { status: 400 })
  if (!['sfr', 'condo', 'multi', 'other'].includes(deal.propertyType) || !['0', '1-2', '3-5', '6+'].includes(deal.experience) || !['800+', '700+', 'below700', 'noCredit'].includes(deal.credit)) return NextResponse.json({ error: 'Please complete every question before viewing results.' }, { status: 400 })
  if (isPrequalification && (!deal.address || !/^[A-Z]{2}$/.test(deal.state) || !/^\d{5}$/.test(deal.zip))) return NextResponse.json({ error: 'A complete property address, state, and ZIP code are required.' }, { status: 400 })
  const options = calculateOptions(deal)

  if (isPreview) {
    return NextResponse.json({
      ok: true,
      ...buildPublicResults(deal, options),
      manualReview: options.length === 0,
    })
  }

  if (isPrequalification) {
    if (!options.length) return NextResponse.json({ error: 'This property needs a manual program review before a letter can be created. Please contact Stevie.' }, { status: 422 })
    const bestPublic = publicOption(options[0], 0, deal, options[0])
    if (bestPublic.estimatedProfit < 0) return NextResponse.json({ error: 'The current numbers show a projected loss, so an automated pre-qualification letter cannot be created. Please review the deal with Stevie.' }, { status: 422 })
    const pdf = buildPrequalificationPdf(contact, deal, options[0])
    const emailed = process.env.NODE_ENV === 'development' ? true : await sendPrequalificationLetter(contact, deal, options[0], pdf).catch((error) => {
      console.error('Pre-qualification email failed:', error)
      return false
    })
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="conditional-project-prequalification.pdf"',
        'Cache-Control': 'private, no-store',
        'X-Email-Sent': String(emailed),
      },
    })
  }

  const previewSubmission = process.env.NODE_ENV === 'development'
  let crm = false
  let email = { borrower: false, internal: false }
  if (previewSubmission) {
    crm = true
  } else {
    const [crmResult, emailResult] = await Promise.allSettled([
      createCrmLead(contact, deal, options, attribution),
      sendEmails(contact, deal, options, attribution),
    ])
    if (crmResult.status === 'fulfilled') crm = crmResult.value
    else console.error('Fix-and-flip CRM error:', crmResult.reason)
    if (emailResult.status === 'fulfilled') email = emailResult.value
    else console.error('Fix-and-flip email error:', emailResult.reason)
    if (!crm && !email.internal) {
      return NextResponse.json({ error: 'We could not save your request right now. Your information is still here, so please try again.' }, { status: 503 })
    }
    console.info('Fix-and-flip submission captured', { crm, internalEmail: email.internal, borrowerEmail: email.borrower })
  }
  return NextResponse.json({
    ok: true,
    preview: previewSubmission,
    captured: { crm, internalEmail: email.internal },
    email,
    ...buildPublicResults(deal, options),
    manualReview: options.length === 0,
    assumptions: { appraisalFee: 1000, titleFee: 500, asOf: 'Current program assumptions' },
  })
}

export async function GET() {
  if (process.env.NODE_ENV !== 'development') return new NextResponse('Not found', { status: 404 })
  const deal: Deal = {
    address: '',
    state: '',
    zip: '',
    purchasePrice: 200000,
    renovationBudget: 50000,
    arv: 350000,
    monthlyHoldingCosts: 1200,
    projectMonths: 6,
    propertyType: 'sfr',
    experience: '6+',
    credit: '700+',
  }
  const html = buildBorrowerEmail({ name: 'Alex', email: 'alex@example.com', phone: '903-555-0142' }, deal, calculateOptions(deal))
  return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })
}
