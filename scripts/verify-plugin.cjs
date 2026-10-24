/* Local verification only: external CRM and email requests are intercepted. */
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const http = require('node:http')
const { execFileSync } = require('node:child_process')
const ts = require('typescript')
const originalResolve = Module._resolveFilename
Module._resolveFilename = function(name, parent, ...rest) { return originalResolve.call(this, name.startsWith('@/') ? path.join(process.cwd(), name.slice(2)) : name, parent, ...rest) }
require.extensions['.ts'] = function(module, filename) { module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename) }
process.env.CALCULATOR_HANDOFF_SECRET = require('node:crypto').randomBytes(32).toString('hex')
process.env.CALCULATOR_PLUGIN_ORIGIN = 'http://localhost:3111'
process.env.CRM_URL = 'https://crm.mock.invalid'
process.env.CRM_PASSWORD = 'test-only'
process.env.RESEND_API_KEY = 'test-only'
process.env.NODE_ENV = 'development'
const { NextRequest } = require('next/server')
const tokens = require('../lib/flip-plugin.ts')
const { POST } = require('../app/api/fix-and-flip/route.ts')
const { POST: handoff } = require('../app/api/calculator-handoff/route.ts')
const deal = { state: 'CO', purchasePrice: 200000, renovationBudget: 50000, arv: 400000, monthlyHoldingCosts: 1000, projectMonths: 6, propertyType: 'sfr' }
const contact = { name: 'LOCAL TEST ONLY', email: 'local@example.invalid', phone: '970-555-0142' }
const realFetch = global.fetch
const records = new Map(), emails = new Map()
let crmDown = false, emailDown = false, crmCalls = 0
const json = (value, status = 200, headers = {}) => new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json', ...headers } })
global.fetch = async (url, init) => {
  if (String(url) === 'https://crm.mock.invalid/api/auth/login') return json({ ok: true }, crmDown ? 503 : 200, { 'Set-Cookie': 'test-session=local; HttpOnly; Path=/' })
  if (String(url) === 'https://crm.mock.invalid/api/calculator-intake') {
    crmCalls++
    const data = JSON.parse(init.body), key = data.scenarioId + data.contact.email
    let record = records.get(key)
    if (!record && data.stage !== 'estimate_saved') return json({ error: 'Save first' }, 503)
    if (!record) records.set(key, record = { stage: 'estimate_saved', delivery: { borrower: false, internal: false, letter: false }, deal: JSON.parse(data.notes).deal })
    if (data.stage !== 'estimate_saved') record.stage = data.stage
    Object.entries(data.delivery || {}).forEach(([key, value]) => { if (value) record.delivery[key] = true })
    return json({ ok: true, ...record })
  }
  if (String(url) === 'https://api.resend.com/emails') {
    assert.equal(init.headers.Authorization, 'Bearer test-only')
    const key = init.headers['Idempotency-Key']
    assert.ok(key, 'Plugin mail needs an idempotency key')
    if (emailDown) return json({ error: 'mock unavailable' }, 503)
    if (emails.has(key)) assert.equal(emails.get(key), init.body, 'A retry must preserve the payload')
    emails.set(key, init.body)
    return json({ id: 'LOCAL-MOCK-ONLY' })
  }
  throw new Error(`Blocked unexpected network request: ${url}`)
}
const req = body => new NextRequest('http://localhost:3111/api/fix-and-flip', { method: 'POST', body: JSON.stringify(body) })
const call = body => POST(req(body))
async function main() {
  const scenario = tokens.createScenario(deal), token = tokens.encodeScenario(scenario)
  assert.deepEqual(tokens.decodeScenario(token), scenario)
  assert.ok(!token.includes('200000'))
  assert.throws(() => tokens.decodeScenario(token.slice(0, 40) + (token[40] === 'A' ? 'B' : 'A') + token.slice(41)))
  assert.throws(() => tokens.decodeScenario(token, scenario.expires + 1))
  const baseline = new Module(path.join(process.cwd(), 'baseline-route.cjs'), module)
  baseline.filename = path.join(process.cwd(), 'baseline-route.cjs'); baseline.paths = module.paths
  baseline._compile(ts.transpileModule(execFileSync('git', ['show', '4fc1d7b:app/api/fix-and-flip/route.ts'], { encoding: 'utf8' }), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, baseline.filename)
  let parityCount = 0
  for (const state of ['CO', 'TX', 'NV', 'FL']) for (const months of [6, 12, 18]) for (const credit of ['noCredit', '700+']) {
    const sample = { ...deal, state, projectMonths: months, credit, experience: '3-5', profileSkipped: false }
    const body = { action: 'preview', deal: sample }
    assert.deepEqual(await (await call(body)).json(), await (await baseline.exports.POST(req(body))).json())
    parityCount++
  }
  const preview = await (await call({ action: 'preview', pluginToken: token, deal: { purchasePrice: 1 } })).json()
  assert.equal(preview.inputs.purchasePrice, deal.purchasePrice)
  assert.equal(crmCalls, 0); assert.equal(emails.size, 0)
  const body = { action: 'save', pluginToken: token, contact, consent: true, consentVersion: tokens.PLUGIN_CONSENT_VERSION }
  assert.equal((await call({ ...body, consent: false })).status, 400)
  assert.equal((await call({ ...body, contact: { email: contact.email } })).status, 400)
  crmDown = true
  assert.equal((await call(body)).status, 503); assert.equal(emails.size, 0)
  crmDown = false
  emailDown = true
  let result = await (await call(body)).json()
  assert.equal(result.captured.crm, true); assert.equal(result.email.borrower, false)
  emailDown = false
  result = await (await call({ ...body, deal: { purchasePrice: 1, arv: 9999999 } })).json()
  assert.equal(result.options[0].loanAmount, preview.options[0].loanAmount)
  assert.equal(result.email.borrower, true)
  await call(body)
  assert.equal(records.size, 1); assert.equal(emails.size, 2)
  assert.ok(Array.from(emails.values()).some(value => value.includes('chatgpt')))
  const letterBody = { ...body, action: 'prequalification', deal: { address: 'LOCAL TEST PROPERTY, Fort Collins', state: 'CO', zip: '80524' } }
  assert.equal((await call({ ...letterBody, deal: { ...letterBody.deal, state: 'TX' } })).status, 400)
  const response = await call(letterBody)
  assert.equal(response.headers.get('content-type'), 'application/pdf')
  assert.equal(response.headers.get('x-email-sent'), 'true')
  const pdf = Buffer.from(await response.arrayBuffer())
  const expected = await baseline.exports.POST(req({ action: 'prequalification', contact, deal: { ...tokens.calculatorDeal(deal), ...letterBody.deal } }))
  assert.deepEqual(pdf, Buffer.from(await expected.arrayBuffer()), 'Same existing conditional letter template and numbers')
  await call(letterBody)
  assert.equal(records.size, 1); assert.equal(emails.size, 3)
  assert.equal([...records.values()][0].stage, 'project_letter_created')
  assert.equal((await handoff(new NextRequest('http://localhost:3111/api/calculator-handoff', { method: 'POST', headers: { origin: 'https://evil.invalid' }, body: JSON.stringify(body) }))).status, 403)
  const lossToken = tokens.encodeScenario(tokens.createScenario({ ...deal, arv: 100000 }))
  const before = crmCalls
  assert.equal((await call({ ...letterBody, pluginToken: lossToken })).status, 422)
  assert.equal(crmCalls, before)
  // Real SDK client against real SDK stateless server; HTTP remains on localhost.
  const { POST: mcpPost } = require('../app/mcp/route.ts')
  const server = http.createServer(async (incoming, outgoing) => {
    const chunks = []; for await (const chunk of incoming) chunks.push(chunk)
    const response = await mcpPost(new Request('http://localhost/mcp', { method: 'POST', headers: { ...incoming.headers, host: 'localhost:3111' }, body: Buffer.concat(chunks) }))
    outgoing.writeHead(response.status, Object.fromEntries(response.headers)); outgoing.end(Buffer.from(await response.arrayBuffer()))
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const { Client } = await import('@modelcontextprotocol/sdk/client/index.js')
  const { StreamableHTTPClientTransport } = await import('@modelcontextprotocol/sdk/client/streamableHttp.js')
  const client = new Client({ name: 'local-verification', version: '1.0.0' })
  try {
    await client.connect(new StreamableHTTPClientTransport(new URL(`http://127.0.0.1:${server.address().port}/mcp`), { fetch: realFetch }))
    const list = await client.listTools(); assert.equal(list.tools.length, 1)
    assert.ok(!JSON.stringify(list.tools[0].inputSchema).includes('email'))
    const before = crmCalls
    const result = await client.callTool({ name: 'estimate_fix_flip_financing', arguments: deal })
    assert.ok(result.structuredContent.handoffUrl.includes('#estimate=')); assert.equal(crmCalls, before)
    const needed = await client.callTool({ name: 'estimate_fix_flip_financing', arguments: { ...deal, projectMonths: 12 } })
    assert.equal(needed.structuredContent.needsBorrowerProfile, true)
  } finally { await client.close(); await new Promise(resolve => server.close(resolve)) }
  console.log(JSON.stringify({ passed: true, calculatorParityScenarios: parityCount, conditionalLetterMatchesExisting: true, tokenTamperAndExpiry: true, immutableFinancialInputs: true, consentRequired: true, crmFailureFailsClosed: true, retryCreatesOneDeal: true, mockEmails: emails.size, realEmailsSent: 0, mcpSdkConnection: true }, null, 2))
}
main().catch(error => { console.error(error); process.exitCode = 1 })
