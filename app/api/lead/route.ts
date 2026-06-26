import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { phone, source } = body

  if (!phone) {
    return NextResponse.json({ error: 'Phone required' }, { status: 400 })
  }

  // TODO: replace this block with your Vercel CRM endpoint
  // Example using fetch to a Vercel Postgres, Airtable, or custom API:
  //
  // await fetch(process.env.CRM_WEBHOOK_URL!, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ phone, source, submittedAt: new Date().toISOString() }),
  // })

  console.log('New lead:', { phone, source, submittedAt: new Date().toISOString() })

  return NextResponse.json({ ok: true })
}
