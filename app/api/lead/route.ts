import { NextRequest, NextResponse } from 'next/server'

const CRM_URL = 'https://crm-two-beta-90.vercel.app'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { phone, source } = body

  if (!phone) {
    return NextResponse.json({ error: 'Phone required' }, { status: 400 })
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
        name: 'Website Lead',
        phone,
        email: '',
        stage: 'New Lead',
        source: source ?? 'popup',
      }),
    })

    if (!leadRes.ok) {
      throw new Error(`CRM pipeline POST failed: ${leadRes.status}`)
    }

    const lead = await leadRes.json()
    console.log('Lead created:', lead.id)
  } catch (err) {
    console.error('CRM error:', err)
    // Still return ok — don't block the user on a CRM error
  }

  return NextResponse.json({ ok: true })
}
