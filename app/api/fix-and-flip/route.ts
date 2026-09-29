import { NextRequest, NextResponse } from 'next/server'

const CRM_URL = (process.env.CRM_URL ?? 'https://crm-two-beta-90.vercel.app').replace(/\/$/, '')
const DEFAULT_NOTIFICATION_EMAIL = 'SDegala@BarrettFinancial.com'
const DEFAULT_FROM_EMAIL = 'Mortgage Stevie <onboarding@resend.dev>'
const BOOKING_URL = 'https://cal.com/mortgagestevie/discoverycall'
const SELLING_COST_RATE = 0.06

type Deal = {
  addressKnown: boolean
  address: string
  state: string
  zip: string
  purchasePrice: number
  renovationBudget: number
  arv: number
  acquisitionClosingCosts: number
  monthlyHoldingCosts: number
  projectMonths: number
  propertyType: string
  experience: string
  credit: string
  plannedDeals: string
  overlappingProjects: string
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

function wantsFinancingCapacity(deal: Deal) {
  return ['2-3', '4-6', '7+'].includes(deal.plannedDeals) || deal.overlappingProjects === 'yes'
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
        originationFee: deal.purchasePrice * 0.0275,
        otherFees: 600,
        payoffFee: 0,
        appraisalFee: 1000,
        titleFee: 500,
        reserveTarget,
        reasons: ['A 12-month modeled term gives the renovation more breathing room', 'Pricing rewards stronger experience and credit', `The estimate uses Standard Renovation Tier ${tier} leverage`],
        cautions: ['Requires six months of interest reserves plus 10% of the renovation budget in liquidity', 'The estimate assumes three renovation draws at $200 each'],
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
  let advantage = 'Best overall fit'
  if (index > 0 && primary) {
    if (option.cashNeeded < primary.cashNeeded) advantage = 'Lower estimated cash needed'
    else if (option.borrowingCost < primary.borrowingCost) advantage = 'Lower estimated borrowing cost'
    else if (option.termMonths > primary.termMonths) advantage = 'More time for the project'
    else advantage = 'Another strong route'
  }
  const estimatedSellingCosts = deal.arv * SELLING_COST_RATE
  const nonFinancingHoldingCosts = deal.monthlyHoldingCosts * deal.projectMonths
  const financingAndFees = option.borrowingCost + option.appraisalFee + option.titleFee
  const costBeforeSelling = deal.purchasePrice + deal.renovationBudget + deal.acquisitionClosingCosts + nonFinancingHoldingCosts + financingAndFees
  const totalProjectCost = costBeforeSelling + estimatedSellingCosts
  const estimatedProfit = deal.arv - totalProjectCost
  const estimatedCashContribution = option.totalCash + deal.acquisitionClosingCosts + nonFinancingHoldingCosts
  const returnOnCash = estimatedCashContribution > 0 ? estimatedProfit / estimatedCashContribution * 100 : null
  const breakEvenSalePrice = costBeforeSelling / (1 - SELLING_COST_RATE)
  const lowerSalePrice = deal.arv * 0.95
  const lowerSaleProfit = lowerSalePrice - (costBeforeSelling + lowerSalePrice * SELLING_COST_RATE)
  const renovationOverrunProfit = estimatedProfit - deal.renovationBudget * 0.1
  const extensionMonths = Math.min(3, Math.max(0, option.termMonths - deal.projectMonths))
  const longerHoldProfit = estimatedProfit - deal.monthlyHoldingCosts * 3 - option.loanAmount * option.rate * extensionMonths / 12
  const labels = { label: `Option ${index + 1}`, advantage }
  return {
    ...labels,
    program: option.program,
    rate: option.rate * 100,
    termMonths: option.termMonths,
    loanAmount: Math.round(option.loanAmount),
    purchaseAdvance: Math.round(option.purchaseAdvance),
    renovationAdvance: Math.round(option.renovationAdvance),
    originationFee: Math.round(option.originationFee),
    originationPercent: Math.round(option.originationFee / deal.purchasePrice * 10000) / 100,
    otherFees: Math.round(option.otherFees),
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
    acquisitionClosingCosts: Math.round(deal.acquisitionClosingCosts),
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
  const publicOptions = options.slice(0, 2).map((option, index) => publicOption(option, index, deal, options[0]))
  const projectedLoss = publicOptions.length > 0 && publicOptions.every((option) => option.estimatedProfit < 0)
  const capacityRecommendation = wantsFinancingCapacity(deal) ? {
    title: 'Planning multiple deals? Explore an investor line of credit.',
    body: 'Based on your plans, it may be worth discussing a true revolving line or a hybrid line of credit for the projects ahead. The exact structure depends on lender availability, underwriting, and approval.',
  } : null
  if (!projectedLoss) return { options: publicOptions, warning: null, capacityRecommendation }

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
      appraisalFee: best.appraisalFee,
      titleFee: best.titleFee,
      payoffFee: best.payoffFee,
      estimatedSellingCosts: best.estimatedSellingCosts,
      totalProjectCost: best.totalProjectCost,
      sellingCostPercent: SELLING_COST_RATE * 100,
    },
    capacityRecommendation,
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
    `Property: ${deal.addressKnown ? `${deal.address}, ${deal.state} ${deal.zip}` : `Not identified, ${deal.state}`}`,
    `Purchase price: ${money(deal.purchasePrice)}`,
    `Renovation budget: ${money(deal.renovationBudget)}`,
    `ARV: ${money(deal.arv)}`,
    `Project timeline: ${deal.projectMonths} months`,
    `Acquisition closing costs: ${money(deal.acquisitionClosingCosts)}`,
    `Taxes, insurance, utilities and other holding costs: ${money(deal.monthlyHoldingCosts)} per month`,
    `Experience: ${deal.experience}`,
    `Credit: ${deal.credit}`,
    `Planned projects in next 12 months: ${deal.plannedDeals}`,
    `Overlapping projects: ${deal.overlappingProjects || 'Not asked'}`,
    wantsFinancingCapacity(deal) ? 'Financing-capacity discussion recommended' : '',
    attribution.utmSource ? `UTM source: ${attribution.utmSource}` : '',
    attribution.utmMedium ? `UTM medium: ${attribution.utmMedium}` : '',
    attribution.utmCampaign ? `UTM campaign: ${attribution.utmCampaign}` : '',
    attribution.referrer ? `Referrer: ${attribution.referrer}` : '',
    attribution.pageUrl ? `Submitted from: ${attribution.pageUrl}` : '',
    '',
    ...options.slice(0, 2).map((option, index) => `${index + 1}. ${option.lender} | Loan ${money(option.loanAmount)} | Cash needed ${money(option.cashNeeded)} | ${option.rate * 100}% | ${option.termMonths} months`),
  ].filter(Boolean).join('\n')
  const leadRes = await fetchWithTimeout(`${CRM_URL}/api/pipeline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: loginRes.headers.get('set-cookie') ?? '' },
    body: JSON.stringify({
      name: contact.name,
      phone: contact.phone,
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
  const resultRows = publicOptions.map((option) => `<div style="border:1px solid #ddd;border-radius:14px;padding:20px;margin:16px 0"><div style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#666">${option.label} · Financing structure to discuss</div><h2 style="font-family:Georgia,serif;font-size:24px;margin:4px 0 4px">${escapeHtml(option.program)}</h2><p style="color:#666;margin:0 0 12px">${escapeHtml(option.advantage)}</p><p style="margin:0">Estimated financing: <strong>${money(option.loanAmount)}</strong><br>Cash to get started: <strong>${money(option.startupCash)}</strong><br>Estimated total cash invested: <strong>${money(option.estimatedCashContribution)}</strong><br>Estimated net profit: <strong>${money(option.estimatedProfit)}</strong><br>Return on contributed cash: <strong>${option.returnOnCash === null ? 'Not available' : `${option.returnOnCash.toFixed(1)}%`}</strong><br>Break-even sale price: <strong>${money(option.breakEvenSalePrice)}</strong><br>Rate: ${option.rate.toFixed(2)}% | Term: ${option.termMonths} months</p></div>`).join('')
  const disclaimer = '<p style="color:#666;font-size:12px">These estimates reflect current program assumptions and the information provided. They are intended to be close planning estimates, but they are not final terms, an approval, a commitment to lend, or a rate quote. Appraisal and title charges are estimates and actual third-party fees may vary.</p>'
  const warningHtml = result.warning ? `<div style="background:#fff4e5;border:1px solid #e7b978;border-radius:14px;padding:20px;margin:20px 0"><h2 style="font-family:Georgia,serif;margin:0 0 8px">The numbers show a loss.</h2><p style="margin:0">With what you entered, this deal could lose about <strong>${money(result.warning.estimatedLoss)}</strong>. The estimated project cost is ${money(result.warning.totalProjectCost)} against an ARV of ${money(result.warning.arv)}. We don't want anyone going into a deal that's likely to lose money. Let's talk through why, or look at another deal with better numbers.</p></div>` : ''
  const intro = result.warning ? `Hi ${escapeHtml(contact.name)}, there just isn't enough room in this deal right now. Here is the financing path with the lowest projected loss so you can see the numbers clearly.` : `Hi ${escapeHtml(contact.name)}, here are the two financing paths that currently appear strongest for your project.`
  const capacityHtml = result.capacityRecommendation ? `<div style="background:#f1f4f7;border-radius:14px;padding:20px;margin:20px 0"><h2 style="font-family:Georgia,serif;margin:0 0 8px">${result.capacityRecommendation.title}</h2><p style="margin:0">${result.capacityRecommendation.body}</p><p><a href="${BOOKING_URL}" style="color:#111;font-weight:700">Discuss an investor line of credit</a></p></div>` : ''
  const action = result.warning ? `<p style="margin-top:24px"><a href="${BOOKING_URL}" style="display:inline-block;background:#111;color:#fff;padding:13px 18px;border-radius:999px;text-decoration:none;font-weight:700">Discuss this deal or another opportunity</a></p>` : `<p style="margin-top:24px"><a href="${BOOKING_URL}" style="display:inline-block;background:#111;color:#fff;padding:13px 18px;border-radius:999px;text-decoration:none;font-weight:700">Discuss this deal with Stevie</a></p>`
  return `<div style="background:#f3f3f1;padding:28px 16px"><div style="font-family:Arial,sans-serif;color:#111;line-height:1.55;max-width:680px;margin:0 auto;background:#fff;border-radius:18px;padding:32px"><div style="font-family:Georgia,serif;font-size:22px;margin-bottom:28px">Mortgage Stevie</div><h1 style="font-family:Georgia,serif;font-size:36px;line-height:1.05;margin:0 0 16px">Your fix-and-flip financing estimate</h1><p>${intro}</p><p style="color:#666">These preliminary structures are based on the information you entered. Stevie will review the available lender match with you after an application or financing discussion.</p>${warningHtml}${resultRows}${capacityHtml}${action}${disclaimer}<p style="color:#777;font-size:12px;margin-top:24px">Stevie de Gala · NMLS# 2845865 · Barrett Financial NMLS# 181106 · SDegala@BarrettFinancial.com</p></div></div>`
}

async function sendEmails(contact: Contact, deal: Deal, options: InternalOption[], attribution: Attribution) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { borrower: false, internal: false }
  const sender = process.env.LEAD_FROM_EMAIL ?? DEFAULT_FROM_EMAIL
  const borrowerHtml = buildBorrowerEmail(contact, deal, options)
  const disclaimer = '<p style="color:#666;font-size:12px">These estimates reflect current program assumptions and the information provided. They are intended to be close planning estimates, but they are not final terms, an approval, a commitment to lend, or a rate quote. Appraisal and title charges are estimates and actual third-party fees may vary.</p>'
  const internalRows = options.slice(0, 2).map((option, index) => `<li><strong>${index + 1}. ${option.lender}</strong>: ${money(option.loanAmount)} loan, ${money(option.cashNeeded)} estimated cash needed, ${(option.rate * 100).toFixed(2)}%, ${option.termMonths} months</li>`).join('')
  const internalProperty = deal.addressKnown ? `${escapeHtml(deal.address)}, ${escapeHtml(deal.state)} ${escapeHtml(deal.zip)}` : `Property not identified, ${escapeHtml(deal.state)}`
  const attributionRows = [
    attribution.utmSource ? `Source: ${escapeHtml(attribution.utmSource)}` : '',
    attribution.utmMedium ? `Medium: ${escapeHtml(attribution.utmMedium)}` : '',
    attribution.utmCampaign ? `Campaign: ${escapeHtml(attribution.utmCampaign)}` : '',
    attribution.referrer ? `Referrer: ${escapeHtml(attribution.referrer)}` : '',
  ].filter(Boolean).join('<br>')
  const internalHtml = `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.5;max-width:680px"><h1>New fix-and-flip calculator lead</h1><p><strong>${escapeHtml(contact.name)}</strong><br>${escapeHtml(contact.email)}<br>${escapeHtml(contact.phone)}</p><p>${internalProperty}<br>Purchase ${money(deal.purchasePrice)} | Renovation ${money(deal.renovationBudget)} | ARV ${money(deal.arv)}<br>Acquisition closing costs ${money(deal.acquisitionClosingCosts)} | Other holding costs ${money(deal.monthlyHoldingCosts)}/month<br>${deal.projectMonths} months | Experience ${escapeHtml(deal.experience)} | Credit ${escapeHtml(deal.credit)}<br>Planned deals: ${escapeHtml(deal.plannedDeals)} | Overlap: ${escapeHtml(deal.overlappingProjects || 'Not asked')}</p>${wantsFinancingCapacity(deal) ? '<p><strong>Financing-capacity discussion recommended.</strong></p>' : ''}${attributionRows ? `<p>${attributionRows}</p>` : ''}<ol>${internalRows}</ol>${disclaimer}</div>`

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
    send([process.env.LEAD_NOTIFICATION_EMAIL ?? DEFAULT_NOTIFICATION_EMAIL], `New fix-and-flip lead: ${contact.name}`, internalHtml, contact.email),
  ])
  if (borrowerResult.status === 'rejected') console.error('Borrower result email failed:', borrowerResult.reason)
  if (internalResult.status === 'rejected') console.error('Internal lead email failed:', internalResult.reason)
  return { borrower: borrowerResult.status === 'fulfilled', internal: internalResult.status === 'fulfilled' }
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
    addressKnown: body.deal?.addressKnown !== false,
    address: String(body.deal?.address ?? '').trim(),
    state: String(body.deal?.state ?? '').trim().toUpperCase(),
    zip: String(body.deal?.zip ?? '').trim(),
    purchasePrice: asMoney(body.deal?.purchasePrice),
    renovationBudget: asMoney(body.deal?.renovationBudget),
    arv: asMoney(body.deal?.arv),
    acquisitionClosingCosts: asMoney(body.deal?.acquisitionClosingCosts),
    monthlyHoldingCosts: asMoney(body.deal?.monthlyHoldingCosts),
    projectMonths: Math.max(1, Math.min(24, Number(body.deal?.projectMonths) || 6)),
    propertyType: String(body.deal?.propertyType ?? ''),
    experience: String(body.deal?.experience ?? ''),
    credit: String(body.deal?.credit ?? ''),
    plannedDeals: String(body.deal?.plannedDeals ?? ''),
    overlappingProjects: String(body.deal?.overlappingProjects ?? ''),
  }
  const bounded = (value: unknown, length: number) => String(value ?? '').trim().slice(0, length)
  const attribution: Attribution = {
    pageUrl: bounded(body.attribution?.pageUrl, 500),
    referrer: bounded(body.attribution?.referrer, 500),
    utmSource: bounded(body.attribution?.utmSource, 100),
    utmMedium: bounded(body.attribution?.utmMedium, 100),
    utmCampaign: bounded(body.attribution?.utmCampaign, 150),
  }
  if (!contact.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) || !contact.phone) return NextResponse.json({ error: 'Valid contact information is required.' }, { status: 400 })
  if (!/^[A-Z]{2}$/.test(deal.state)) return NextResponse.json({ error: 'A property state is required.' }, { status: 400 })
  if (deal.addressKnown && (!deal.address || !/^\d{5}$/.test(deal.zip))) return NextResponse.json({ error: 'A property address and ZIP code are required.' }, { status: 400 })
  if (!deal.purchasePrice || !deal.renovationBudget || !deal.arv) return NextResponse.json({ error: 'Purchase price, renovation budget, and ARV are required.' }, { status: 400 })
  if (!['sfr', 'condo', 'multi', 'other'].includes(deal.propertyType) || !['0', '1-2', '3-5', '6+'].includes(deal.experience) || !['800+', '700+', 'below700', 'noCredit'].includes(deal.credit) || !['1', '2-3', '4-6', '7+', 'exploring'].includes(deal.plannedDeals) || (deal.plannedDeals !== '1' && deal.plannedDeals !== 'exploring' && !['yes', 'no', 'unsure'].includes(deal.overlappingProjects))) return NextResponse.json({ error: 'Please complete every question before viewing results.' }, { status: 400 })
  const options = calculateOptions(deal)

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
    addressKnown: false,
    address: '',
    state: 'TX',
    zip: '',
    purchasePrice: 200000,
    renovationBudget: 50000,
    arv: 350000,
    acquisitionClosingCosts: 5000,
    monthlyHoldingCosts: 1200,
    projectMonths: 6,
    propertyType: 'sfr',
    experience: '6+',
    credit: '700+',
    plannedDeals: '2-3',
    overlappingProjects: 'yes',
  }
  const html = buildBorrowerEmail({ name: 'Alex', email: 'alex@example.com', phone: '903-555-0142' }, deal, calculateOptions(deal))
  return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })
}
