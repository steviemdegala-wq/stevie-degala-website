import { NextRequest, NextResponse } from 'next/server'

const CRM_URL = 'https://crm-two-beta-90.vercel.app'
const DEFAULT_NOTIFICATION_EMAIL = 'steviemdegala@gmail.com'
const DEFAULT_FROM_EMAIL = 'Mortgage Stevie <onboarding@resend.dev>'

const FIELD_LABELS: Record<string, string> = {
  purchase_use: 'Property use',
  primary_asset: 'Home type',
  investment_asset: 'Investment type',
  unit_count: 'Number of units',
  deal_stage: 'Deal stage',
  location: 'Property location',
  purchase_price: 'Purchase price',
  renovation_costs: 'Renovation costs',
  construction_costs: 'Construction costs',
  land_cost: 'Land cost or value',
  arv: 'Expected completed value or ARV',
  project_months: 'Projected timeline in months',
  timeline: 'Financing timeline',
  credit: 'Estimated credit score',
  experience: 'Similar project experience',
  funds_available: 'Available funds',
  refi_use: 'Refinance property use',
  refi_goal: 'Refinance goal',
  refi_asset: 'Refinance property type',
  value: 'Estimated property value',
  balance: 'Current mortgage balance',
  cash_use: 'Planned use of cash',
  sell_asset: 'Asset being sold',
  commercial_type: 'Commercial property type',
  sell_speed: 'Desired sale timing',
  reason: 'Reason for selling',
  business_purpose: 'Funding purpose',
  business_amount: 'Funding amount',
}

const VALUE_LABELS: Record<string, string> = {
  purchase: 'Purchase',
  refinance: 'Refinance',
  sell: 'Selling',
  business: 'Other funding',
  primary: 'Primary home',
  investment: 'Investment property',
  rental: 'Rental property',
  reno: 'Fix and flip or renovation',
  construction: 'Ground-up construction',
  multifamily: 'Commercial multifamily',
  storage: 'Self-storage or commercial',
  shopping: 'Still shopping',
  identified: 'Property or land identified',
  contract: 'Under contract',
  closing: 'Closing is approaching',
  estimate: 'Targeting land or getting an estimate',
  owned: 'Land already purchased',
  'mid-build': 'Mid-construction and needs funding',
  preapproval: 'Wants to get pre-approved',
  month: 'Within 30 days',
  'two-weeks': 'Within 2 weeks',
  '30-plus': '30 or more days',
  '15-30': '15 to 30 days',
  researching: 'Just researching',
  'month-plus': 'More than 30 days',
  cashout: 'Access cash or equity',
  rate: 'Change the rate or term',
  nextdeal: 'Another investment soon',
  futuredeal: 'A future investment',
  improve: 'Property improvements',
  liquidity: 'General liquidity or other',
  offer: 'Looking for an offer',
  '60': 'Within 30 to 60 days',
  '30': 'Within 2 to 4 weeks',
  urgent: 'Under 2 weeks',
  acquisition: 'Real estate acquisition',
  non_real_estate: 'Non-real-estate funding',
  under100: 'Under $100,000',
  '100-500': '$100,000 to $500,000',
  '500-1m': '$500,000 to $1 million',
  '1mplus': '$1 million or more',
  '740+': '740 or higher',
  '700-739': '700 to 739',
  '660-699': '660 to 699',
  below660: 'Below 660',
  unsure: 'Not sure',
}

const MONEY_FIELDS = new Set([
  'purchase_price',
  'renovation_costs',
  'construction_costs',
  'land_cost',
  'arv',
  'funds_available',
  'value',
  'balance',
])

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function formatAnswer(key: string, value: unknown) {
  const text = String(value ?? '').trim()
  if (!text) return ''
  if (MONEY_FIELDS.has(key)) {
    const number = Number(text.replace(/[^0-9.]/g, ''))
    if (Number.isFinite(number)) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(number)
    }
  }
  return VALUE_LABELS[text] ?? text
}

function buildLeadOverview(body: Record<string, any>) {
  const highlights = body.deal_highlights ?? {}
  return Object.entries(FIELD_LABELS)
    .map(([key, label]) => ({ label, value: formatAnswer(key, highlights[key]) }))
    .filter((item) => item.value)
}

async function sendLeadNotification(body: Record<string, any>) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('Lead email skipped because RESEND_API_KEY is not configured')
    return false
  }

  const contact = body.contact ?? body
  const requestType = VALUE_LABELS[body.request_type] ?? body.request_type ?? 'Website inquiry'
  const recipient = process.env.LEAD_NOTIFICATION_EMAIL ?? DEFAULT_NOTIFICATION_EMAIL
  const sender = process.env.LEAD_FROM_EMAIL ?? DEFAULT_FROM_EMAIL
  const overview = buildLeadOverview(body)
  const suggestions = Array.isArray(body.suggested_paths) ? body.suggested_paths : []
  const name = String(contact.name || 'Website Lead')
  const phone = String(contact.phone || 'Not provided')
  const email = String(contact.email || 'Not provided')

  const detailRows = overview
    .map(({ label, value }) => `<tr><td style="padding:7px 12px 7px 0;color:#666;vertical-align:top">${escapeHtml(label)}</td><td style="padding:7px 0;font-weight:600">${escapeHtml(value)}</td></tr>`)
    .join('')
  const suggestionList = suggestions.length
    ? `<h2 style="font-size:18px;margin:28px 0 10px">Suggested paths</h2><ul>${suggestions.map((item: unknown) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    : ''
  const planningCall = body.requires_planning_call
    ? '<p style="padding:12px 14px;background:#f2f2f2;border-radius:8px"><strong>Planning call recommended:</strong> Available funds may need a closer review against the purchase price.</p>'
    : ''
  const html = `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.5;max-width:680px"><h1 style="font-size:24px;margin-bottom:8px">New Find My Loan submission</h1><p style="color:#666;margin-top:0">${escapeHtml(requestType)}</p><h2 style="font-size:18px;margin:28px 0 10px">Borrower</h2><table><tr><td style="padding:7px 12px 7px 0;color:#666">Name</td><td style="padding:7px 0;font-weight:600">${escapeHtml(name)}</td></tr><tr><td style="padding:7px 12px 7px 0;color:#666">Phone</td><td style="padding:7px 0;font-weight:600">${escapeHtml(phone)}</td></tr><tr><td style="padding:7px 12px 7px 0;color:#666">Email</td><td style="padding:7px 0;font-weight:600">${escapeHtml(email)}</td></tr></table><h2 style="font-size:18px;margin:28px 0 10px">Submission overview</h2><table>${detailRows || '<tr><td>No additional details were provided.</td></tr>'}</table>${suggestionList}${planningCall}<p style="color:#777;font-size:12px;margin-top:30px">Submitted from the Mortgage Stevie Find My Loan questionnaire.</p></div>`
  const text = [
    'New Find My Loan submission',
    `Request type: ${requestType}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    '',
    'Submission overview',
    ...overview.map(({ label, value }) => `${label}: ${value}`),
    ...(suggestions.length ? ['', 'Suggested paths', ...suggestions.map((item: unknown) => `- ${String(item)}`)] : []),
    ...(body.requires_planning_call ? ['', 'Planning call recommended because available funds may need a closer review.'] : []),
  ].join('\n')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: contact.email || undefined,
      subject: `New ${requestType} lead: ${name}`,
      html,
      text,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Resend email failed with ${response.status}: ${error}`)
  }

  return true
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const contact = body.contact ?? body
  const { name, phone, email } = contact
  const requestType = typeof body.request_type === 'string' ? body.request_type : ''
  const source = requestType
    ? `website-find-my-loan:${requestType}`
    : body.source

  if (!phone && !email) {
    return NextResponse.json({ error: 'Phone or email required' }, { status: 400 })
  }

  try {
    // Authenticate with CRM
    const loginRes = await fetch(`${CRM_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: process.env.CRM_PASSWORD }),
    })

    if (!loginRes.ok) {
      throw new Error('CRM login failed')
    }

    const sessionCookie = loginRes.headers.get('set-cookie') ?? ''

    // Create lead in pipeline
    const leadRes = await fetch(`${CRM_URL}/api/pipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': sessionCookie,
      },
      body: JSON.stringify({
        name: name || 'Website Lead',
        phone: phone ?? '',
        email: email ?? '',
        stage: 'New Lead',
        source: source ?? 'website',
      }),
    })

    if (!leadRes.ok) {
      throw new Error(`CRM pipeline POST failed: ${leadRes.status}`)
    }

    const lead = await leadRes.json()
    console.log('Lead created:', lead.id)
  } catch (err) {
    console.error('CRM error:', err)
    // Still return ok so a CRM outage does not block the questionnaire.
  }

  let emailSent = false
  try {
    emailSent = await sendLeadNotification(body)
  } catch (err) {
    console.error('Lead email error:', err)
    // Still return ok so an email outage does not block the questionnaire.
  }

  return NextResponse.json({ ok: true, emailSent })
}
