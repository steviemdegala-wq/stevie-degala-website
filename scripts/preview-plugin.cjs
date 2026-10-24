// Local-only browser preview: in-memory CRM, no email key, no live records.
const { createServer } = require('node:http')
const { spawn } = require('node:child_process')
const { randomBytes, randomUUID, createCipheriv } = require('node:crypto')
const { writeFileSync } = require('node:fs')
const secret = randomBytes(32), iv = randomBytes(12)
const scenario = { version: 1, id: randomUUID(), expires: Date.now() + 48 * 3600000, deal: { state: 'CO', purchasePrice: 200000, renovationBudget: 50000, arv: 400000, monthlyHoldingCosts: 1000, projectMonths: 6, propertyType: 'sfr' } }
const cipher = createCipheriv('aes-256-gcm', secret, iv); cipher.setAAD(Buffer.from('mortgage-stevie-flip-v1'))
const data = Buffer.concat([cipher.update(JSON.stringify(scenario)), cipher.final()])
const token = Buffer.concat([iv, cipher.getAuthTag(), data]).toString('base64url')
writeFileSync('.local-plugin-preview-url', `http://localhost:3111/fix-and-flip-calculator/chatgpt#estimate=${token}`)
const records = new Map()
const mock = createServer(async (req, res) => {
  let raw = ''; for await (const chunk of req) raw += chunk
  res.setHeader('Content-Type', 'application/json')
  if (req.url === '/api/auth/login') { res.setHeader('Set-Cookie', 'mock=local-only; HttpOnly'); res.end('{"ok":true}'); return }
  if (req.url !== '/api/calculator-intake') { res.statusCode = 404; res.end('{}'); return }
  const data = JSON.parse(raw), key = data.scenarioId + data.contact.email
  let record = records.get(key)
  if (!record && data.stage !== 'estimate_saved') { res.statusCode = 503; res.end('{}'); return }
  if (!record) records.set(key, record = { ok: true, stage: 'estimate_saved', delivery: { borrower: false, internal: false, letter: false } })
  if (data.stage !== 'estimate_saved') record.stage = data.stage
  for (const [key, value] of Object.entries(data.delivery || {})) if (value) record.delivery[key] = true
  res.end(JSON.stringify(record))
})
mock.listen(3122, '127.0.0.1', () => {
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3111', '-H', '127.0.0.1'], { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production', CALCULATOR_HANDOFF_SECRET: secret.toString('hex'), CALCULATOR_PLUGIN_ORIGIN: 'http://localhost:3111', CRM_URL: 'http://127.0.0.1:3122', CRM_PASSWORD: 'local-preview-only', RESEND_API_KEY: '' } })
  const close = () => { child.kill(); mock.close(); process.exit() }
  process.on('SIGINT', close); process.on('SIGTERM', close)
  child.on('exit', () => { mock.close(); process.exit() })
})
