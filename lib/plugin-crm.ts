import { createHash } from 'node:crypto'
import type { PluginScenario } from './flip-plugin'
import { PLUGIN_CONSENT_VERSION } from './flip-plugin'
export type Delivery = { borrower: boolean; internal: boolean; letter: boolean }
export function deliveryKey(scenario: PluginScenario, email: string, kind: string) {
  return `flip-${createHash('sha256').update(`${scenario.id}:${email}:${kind}`).digest('hex')}`
}
export async function savePluginDeal(scenario: PluginScenario, contact: { name: string; email: string; phone: string }, stage: string, deal: unknown, loanAmount: number, delivery?: Partial<Delivery>): Promise<Delivery> {
  if (!process.env.CRM_PASSWORD) throw new Error('CRM not configured')
  const base = (process.env.CRM_URL || 'https://crm-two-beta-90.vercel.app').replace(/\/$/, '')
  const login = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: process.env.CRM_PASSWORD }), signal: AbortSignal.timeout(8000), redirect: 'error' })
  if (!login.ok) throw new Error('CRM authentication unavailable')
  const cookie = login.headers.getSetCookie().map(value => value.split(';')[0]).join('; ')
  const response = await fetch(`${base}/api/calculator-intake`, { method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: cookie }, body: JSON.stringify({ scenarioId: scenario.id, contact, stage, consentVersion: PLUGIN_CONSENT_VERSION, notes: JSON.stringify({ source: 'ChatGPT', scenarioId: scenario.id, contact, deal, stage, consentVersion: PLUGIN_CONSENT_VERSION }), loanAmount, delivery, contactKey: createHash('sha256').update(JSON.stringify(contact)).digest('hex'), propertyKey: stage === 'estimate_saved' ? undefined : createHash('sha256').update(JSON.stringify(deal)).digest('hex') }), signal: AbortSignal.timeout(8000), redirect: 'error' })
  if (!response.ok) throw new Error('CRM intake unavailable')
  const result = await response.json()
  if (result.ok !== true || typeof result.delivery?.borrower !== 'boolean' || typeof result.delivery?.internal !== 'boolean' || typeof result.delivery?.letter !== 'boolean') throw new Error('Invalid CRM response')
  return result.delivery
}
