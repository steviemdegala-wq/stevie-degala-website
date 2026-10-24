import { NextRequest, NextResponse } from 'next/server'
import { POST as calculator } from '@/app/api/fix-and-flip/route'
import { pluginOrigin } from '@/lib/flip-plugin'
export const runtime = 'nodejs'
export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== pluginOrigin()) return NextResponse.json({ error: 'Please submit from the estimate page.' }, { status: 403 })
  const text = await request.text()
  if (Buffer.byteLength(text) > 16384) return NextResponse.json({ error: 'Request too large.' }, { status: 413 })
  let body
  try { body = JSON.parse(text) } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  if (!body.pluginToken || !['preview', 'save', 'prequalification'].includes(body.action)) return NextResponse.json({ error: 'Invalid estimate request.' }, { status: 400 })
  const response = await calculator(new NextRequest(request.url, { method: 'POST', body: JSON.stringify(body) }))
  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}
