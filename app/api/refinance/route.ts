import { NextRequest, NextResponse } from 'next/server'
import { calculateRefinance, money, validRefinance } from '@/lib/refinance'

async function timedFetch(url: string, init: RequestInit) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  try { return await fetch(url, { ...init, signal: controller.signal }) }
  finally { clearTimeout(timer) }
}

export async function POST(req: NextRequest) {
  let body
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  if (!body || !validRefinance(body.input)) return NextResponse.json({ error: 'Please check your refinance numbers.' }, { status: 400 })
  const text = (value: unknown, limit: number) => typeof value === 'string' ? value.trim().slice(0, limit) : ''
  const name = text(body.contact?.name, 120)
  const email = text(body.contact?.email, 254).toLowerCase()
  let phone = text(body.contact?.phone, 40).replace(/\D/g, '')
  if (phone.length === 11 && phone.startsWith('1')) phone = phone.slice(1)
  const zip = text(body.property?.zip, 5)
  const use = text(body.property?.use, 40)
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[2-9]\d{2}[2-9]\d{6}$/.test(phone) || /^(\d)\1{9}$/.test(phone) || !/^\d{5}$/.test(zip) || !['Primary home', 'Second home', 'Investment property'].includes(use) || body.consent !== true) {
    return NextResponse.json({ error: 'Please provide a name, valid email, 10-digit US phone number, property ZIP, and contact consent.' }, { status: 400 })
  }
  const input = body.input
  const result = calculateRefinance(input)
  const notes = [
    'Refinance Calculator submission',
    `Type: ${input.type}`,
    `Property: ${use}, ZIP ${zip}`,
    `Home value: ${money(input.homeValue)}`,
    `Current mortgage payoff: ${money(input.balance)}`,
    `Current monthly principal and interest: ${money(input.currentPayment)}`,
    `Requested net cash out: ${money(result.cashOut)}`,
    ...(input.type === 'cash-out' ? [`Cash purpose: ${text(body.property?.cashPurpose, 300) || 'Not provided'}`] : []),
    `Origination: ${money(result.origination)} (2% of final loan)`,
    'Appraisal: $1,000; title: $500; processing and underwriting: $2,000',
    `Total financed closing costs: ${money(result.closingCosts)}`,
    `New loan: ${money(result.loanAmount)}`,
    'Assumption: illustrative 8% fixed interest, 30 years; not a quote or APR',
    `New monthly P&I: ${money(result.payment)}`,
    `Monthly P&I savings (negative means increase): ${money(result.monthlySavings)}`,
    `LTV: ${(result.ltv * 100).toFixed(2)}%`,
    ...(input.type === 'cash-out' ? [`75% planning guideline exceeded: ${result.exceedsGuideline ? 'Yes' : 'No'}`, `Estimated net cash available at 75% LTV: ${money(result.cashAvailableAt75)}`] : [`Simple payment break-even: ${result.breakEvenMonths === null ? 'None' : `${result.breakEvenMonths} months`}`]),
    `Result: ${result.title}`,
    ...result.points,
    'Borrower consented to sharing this scenario and being contacted about the request.',
    `Submitted: ${new Date().toISOString()}`,
  ].join('\n')
  // Never report successful CRM delivery unless the CRM accepted the request.
  if (!process.env.CRM_PASSWORD) return NextResponse.json({ error: 'Online submission is temporarily unavailable. Your numbers are still here; you can book a call below.' }, { status: 503 })
  try {
    const crmUrl = (process.env.CRM_URL || 'https://crm-two-beta-90.vercel.app').replace(/\/$/, '')
    const login = await timedFetch(`${crmUrl}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: process.env.CRM_PASSWORD }) })
    if (!login.ok) throw new Error('CRM authentication failed')
    const cookie = login.headers.get('set-cookie')
    if (!cookie) throw new Error('CRM session missing')
    const lead = await timedFetch(`${crmUrl}/api/pipeline`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookie },
      body: JSON.stringify({ name, email, phone: `${phone.slice(0,3)}-${phone.slice(3,6)}-${phone.slice(6)}`, stage: 'New Lead', source: 'website-refinance-calculator', role: 'Borrower', tags: ['Refinance Calculator', input.type === 'cash-out' ? 'Cash-Out' : 'Rate and Term'], loanType: `Refinance: ${input.type}`, loanAmount: Math.round(result.loanAmount), notes }),
    })
    if (!lead.ok) throw new Error(`CRM rejected submission: ${lead.status}`)
    return NextResponse.json({ ok: true, captured: { crm: true } })
  } catch {
    console.error('Refinance CRM delivery failed')
    return NextResponse.json({ error: 'We could not confirm delivery of your request. Your numbers are still here. Please try again or book a call below.' }, { status: 503 })
  }
}
