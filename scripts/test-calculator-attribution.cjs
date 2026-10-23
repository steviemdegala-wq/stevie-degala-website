const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const compile = path => ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
function attribution({ stored, blocked = false, query = '?utm_source=google&utm_medium=organic&utm_campaign=gbp', referrer = 'https://google.com/search?q=test' } = {}) {
  let saved = stored
  const context = { exports: {}, URL, URLSearchParams, window: { location: { origin: 'https://mortgagestevie.com', pathname: '/', search: query } }, document: { referrer }, sessionStorage: { getItem() { if (blocked) throw Error('blocked'); return saved }, setItem(key, value) { if (blocked) throw Error('blocked'); saved = value } } }
  vm.runInNewContext(compile('lib/attribution.ts'), context)
  return { context, api: context.exports }
}
let test = attribution()
assert.equal(test.api.getLeadAttribution().utm_campaign, 'gbp')
test.context.window.location.pathname = '/fix-and-flip-calculator'
test.context.window.location.search = ''
test.context.document.referrer = 'https://mortgagestevie.com/'
let result = test.api.getCalculatorAttribution()
assert.equal(result.utmSource, 'google'); assert.equal(result.utmCampaign, 'gbp'); assert.equal(result.landingPage, '/'); assert.equal(result.referrer, 'google.com')
assert.equal(result.pageUrl, 'https://mortgagestevie.com/fix-and-flip-calculator')
for (const stored of ['not JSON', '[]', '{"utm_source":123}']) assert.equal(attribution({ stored }).api.getLeadAttribution().utm_source, 'google')
assert.equal(attribution({ blocked: true }).api.getLeadAttribution().utm_campaign, 'gbp')
assert.equal(attribution({ referrer: 'not a URL' }).api.getLeadAttribution().referrer_host, undefined)
const a = { exports: {}, window: {} }
vm.runInNewContext(compile('lib/analytics.ts'), a)
a.exports.trackEvent('calculator_started', { page: 'fix-and-flip-calculator', email: 'private@example.com', credit: '700+', purchasePrice: 300000 })
assert.equal(a.window.dataLayer.length, 1)
assert.equal(a.window.dataLayer[0].event, 'calculator_started')
assert.deepEqual(Object.keys(a.window.dataLayer[0]).sort(), ['event', 'page'])
const calls = []
a.window.gtag = (...args) => calls.push(args)
a.exports.trackEvent('generate_lead', { method: 'calculator_email_unlock' })
assert.equal(calls.length, 1); assert.equal(calls[0][0], 'event'); assert.equal(calls[0][1], 'generate_lead'); assert.equal(a.window.dataLayer.length, 1)
a.window.gtag = () => { throw Error('blocked analytics') }
assert.doesNotThrow(() => a.exports.trackEvent('calculator_started'))
console.log('PASS: first-touch source survives navigation; malformed/blocked storage falls back safely; analytics excludes identifying and deal data; tag/dataLayer routing does not double-send. No external requests sent.')
const bookingEvents = []
const bookingContext = { exports: {}, require(name) { assert.equal(name, './analytics'); return { trackEvent: (event, props) => bookingEvents.push({ event, props }) } } }
vm.runInNewContext(compile('lib/bookingAnalytics.ts'), bookingContext)
const onBooking = bookingContext.exports.createBookingTracker('investor-portfolio-review')
onBooking({ detail: { data: { uid: 'test1', status: 'PENDING', paymentRequired: false } } })
assert.equal(bookingEvents.length, 1); assert.equal(bookingEvents[0].event, 'booking_created')
onBooking({ detail: { data: { uid: 'test1', status: 'PENDING', paymentRequired: false } } })
assert.equal(bookingEvents.length, 1)
onBooking({ detail: { data: { uid: 'test2', status: 'ACCEPTED', paymentRequired: false, email: 'not-sent@example.com' } } })
assert.equal(bookingEvents.length, 3); assert.equal(bookingEvents[2].event, 'booking_confirmed'); assert.deepEqual(Object.keys(bookingEvents[2].props), ['call_type'])
onBooking({ detail: { data: { uid: 'test3', status: 'ACCEPTED', paymentRequired: true } } })
assert.equal(bookingEvents.length, 4); assert.equal(bookingEvents[3].event, 'booking_created')
onBooking({ detail: { data: {} } }); assert.equal(bookingEvents.length, 4)
console.log('PASS: pending/payment-required bookings are not confirmed conversions; duplicate callbacks ignored; booking details excluded from analytics.')
;(async () => {
 const requests = []
 const context = { exports: {}, URL, Buffer, Intl, AbortController, setTimeout, clearTimeout, process: { env: { NODE_ENV: 'production', CRM_PASSWORD: 'test-only', RESEND_API_KEY: 'test-only' } }, console: { info() {}, error() {} },
   require(name) { if (name === '@/lib/booking') return { BOOKING_URL: 'https://cal.com/example' }; assert.equal(name, 'next/server'); return { NextResponse: { json(body, options) { return { body, status: options?.status || 200 } } } } },
   async fetch(url, options) { requests.push({ url, body: JSON.parse(options.body) }); return { ok: true, headers: { get() { return 'test=session' } }, json: async () => ({ id: 'test' }) } }
 }
 vm.runInNewContext(compile('app/api/fix-and-flip/route.ts'), context)
 const r = await context.exports.POST({ json: async () => ({ contact: { email: 'test@example.com' }, deal: { purchasePrice: 300000, renovationBudget: 60000, arv: 450000, projectMonths: 6, propertyType: 'sfr', experience: '0', credit: '700+', monthlyHoldingCosts: 1000 }, attribution: { landingPage: '/blog/fix-and-flip-loans-fort-collins-co', pageUrl: 'https://mortgagestevie.com/fix-and-flip-calculator', utmSource: 'google', utmCampaign: 'gbp', referrer: 'google.com' } }) })
 assert.equal(r.status, 200); assert.equal(r.body.captured.crm, true)
 const crm = requests.find(x => x.url.endsWith('/api/pipeline')).body
 assert.match(crm.notes, /Landing page: \/blog\/fix-and-flip-loans-fort-collins-co/); assert.match(crm.notes, /UTM campaign: gbp/)
 const email = requests.filter(x => x.url.includes('resend')).find(x => x.body.html.includes('New fix-and-flip calculator lead'))
 assert.ok(email); assert.match(email.body.html, /Landing page: \/blog\/fix-and-flip-loans-fort-collins-co/)
 console.log('PASS: original calculator attribution reaches CRM notes and internal email using mocked delivery only.')
})().catch(error => { console.error(error); process.exitCode = 1 })
