import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { NextRequest } from 'next/server'
import { POST as calculate } from '@/app/api/fix-and-flip/route'
import { pluginDealSchema, calculatorDeal, createScenario, encodeScenario, needsPluginProfile, pluginOrigin } from '@/lib/flip-plugin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  const expectedHost = new URL(pluginOrigin()).host
  if (request.headers.get('host') && request.headers.get('host') !== expectedHost) return new Response('Host not allowed', { status: 403 })
  const origin = request.headers.get('origin')
  if (origin && !['https://chatgpt.com', pluginOrigin()].includes(origin)) return new Response('Origin not allowed', { status: 403 })
  const server = new McpServer({ name: 'mortgage-stevie-fix-and-flip', version: '1.0.0' })
  server.registerTool('estimate_fix_flip_financing', {
    title: 'Estimate fix-and-flip financing and cash needed',
    description: 'Calculate a preliminary investor fix-and-flip financing structure, fees, out-of-pocket cash, projected profit and downside scenarios using Mortgage Stevie’s existing calculator. Ask for the property state, purchase price, rehab budget, ARV, monthly nonfinancing holding costs, months and property type. Ask experience and credit range only if requested by the tool. Do not request names, email, phone, exact addresses, SSNs or documents in chat. Distinguish startupCash (cash to start), totalCash (modeled financing cash), estimatedCashContribution (also includes nonfinancing holding costs), and reserveTarget (additional liquidity). No application, CRM record or email is created. A voluntary website link lets the user save/email the estimate and request a conditional project letter. Estimates are not approvals, rate locks or commitments; state eligibility and underwriting must be confirmed. Do not claim this compares the whole lending market.',
    inputSchema: pluginDealSchema,
    annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false, idempotentHint: false },
  }, async (input) => {
    if (needsPluginProfile(input) && (!input.experience || !input.credit)) return { content: [{ type: 'text', text: 'Please ask for completed flips in the last 3 years (0, 1-2, 3-5, 6+) and credit range (800+, 700+, below700, noCredit). noCredit means no FICO-based option. No hard credit inquiry occurs.' }], structuredContent: { needsBorrowerProfile: true } }
    try {
      const response = await calculate(new NextRequest('http://calculator.internal/api/fix-and-flip', { method: 'POST', body: JSON.stringify({ action: 'preview', deal: calculatorDeal(input) }) }))
      if (!response.ok) throw new Error('Unable to calculate this scenario.')
      const estimate = await response.json()
      const handoffUrl = `${pluginOrigin()}/fix-and-flip-calculator/chatgpt#estimate=${encodeScenario(createScenario(input))}`
      const result = { ...estimate, inputs: calculatorDeal(input), handoffUrl, linkExpiresInHours: 48, disclaimer: 'Planning estimate only. Not a loan approval, commitment, rate lock or guaranteed terms. No credit inquiry. Lender underwriting and property eligibility required.', nextStep: 'Optional: open the website to save and email this estimate using your name, email, phone and permission to contact you, then request a conditional project letter.' }
      return { content: [{ type: 'text', text: JSON.stringify(result) }], structuredContent: result }
    } catch { return { isError: true, content: [{ type: 'text', text: 'The estimate service is unavailable. Please try later or use https://mortgagestevie.com/fix-and-flip-calculator. No information was saved.' }] } }
  })
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true, maxRequestBodySize: 16384 })
  try {
    await server.connect(transport)
    const response = await transport.handleRequest(request)
    const body = await response.text()
    return new Response(body, { status: response.status, headers: { ...Object.fromEntries(response.headers), 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } })
  } finally { await server.close() }
}
export function GET() { return new Response('Use POST for stateless MCP.', { status: 405, headers: { Allow: 'POST' } }) }
