const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const compiled = ts.transpileModule(fs.readFileSync('app/api/lead/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
const inquiry = { source: 'website-contact', request_type: 'deal_review', contact: { name: 'Delivery Test', phone: '970-555-0123', email: 'test@example.com' }, deal_highlights: { financing_need: 'DSCR rental loan', location: 'Fort Collins, CO' }, message: '<script>test</script>', attribution: { utm_source: 'google', utm_campaign: 'gbp', landing_page: '/' } }

async function run({ crm = true, email = true, body = inquiry, malformed = false } = {}) {
  const requests = []
  const context = { exports: {}, process: { env: { RESEND_API_KEY: 'test-only', CRM_PASSWORD: 'test-only' } }, console: { log() {}, warn() {}, error() {} }, AbortSignal, Intl,
    require(name) { assert.equal(name, 'next/server'); return { NextResponse: { json(body, options) { return { status: options?.status || 200, body } } } } },
    async fetch(url, options) {
      requests.push({ url, payload: JSON.parse(options.body) })
      if (url.endsWith('/api/auth/login')) return { ok: crm, status: crm ? 200 : 503, headers: { get: () => 'test=session' } }
      if (url.endsWith('/api/pipeline')) return { ok: crm, status: crm ? 200 : 503, json: async () => ({ id: 'test' }) }
      assert.equal(url, 'https://api.resend.com/emails')
      return { ok: email, status: email ? 200 : 503, text: async () => 'test unavailable' }
    },
  }
  vm.runInNewContext(compiled, context)
  const result = await context.exports.POST({ json: async () => { if (malformed) throw Error('Malformed'); return JSON.parse(JSON.stringify(body)) } })
  return { ...result, requests }
}

;(async () => {
  let r = await run(); assert.equal(r.status, 200); assert.equal(r.body.crmSaved, true); assert.equal(r.body.emailSent, true)
  const saved = r.requests.find(x => x.url.endsWith('/api/pipeline')).payload
  assert.equal(saved.source, 'website-contact'); assert.equal(saved.phone, '970-555-0123'); assert.match(saved.notes, /utm_source: google/); assert.match(saved.notes, /Message: <script>test<\/script>/); assert.match(saved.loanType, /DSCR rental loan/)
  const sent = r.requests.find(x => x.url.includes('resend')).payload; assert.match(sent.html, /&lt;script&gt;test/); assert.ok(!sent.html.includes('<script>test'))
  r = await run({ crm: false }); assert.equal(r.status, 200); assert.equal(r.body.emailSent, true); assert.equal(r.body.crmSaved, false)
  r = await run({ email: false }); assert.equal(r.status, 200); assert.equal(r.body.crmSaved, true); assert.equal(r.body.emailSent, false)
  r = await run({ crm: false, email: false }); assert.equal(r.status, 503); assert.equal(r.body.ok, false)
  r = await run({ body: { phone: '123' } }); assert.equal(r.status, 400); assert.equal(r.requests.length, 0)
  r = await run({ malformed: true }); assert.equal(r.status, 400); assert.equal(r.requests.length, 0)
  r = await run({ body: [] }); assert.equal(r.status, 400); assert.equal(r.requests.length, 0)
  console.log('PASS: delivery fallback, total failure, validation, attribution, and message escaping; no external requests sent.')
})().catch(error => { console.error(error); process.exitCode = 1 })
