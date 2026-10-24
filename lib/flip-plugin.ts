import { createCipheriv, createDecipheriv, randomBytes, randomUUID } from 'node:crypto'
import { z } from 'zod'

export const pluginDealSchema = z.object({
  state: z.enum(['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']),
  purchasePrice: z.number().int().positive().max(100_000_000),
  renovationBudget: z.number().int().positive().max(100_000_000),
  arv: z.number().int().positive().max(200_000_000),
  monthlyHoldingCosts: z.number().int().nonnegative().max(1_000_000),
  projectMonths: z.number().int().min(1).max(24),
  propertyType: z.enum(['sfr', 'condo', 'multi', 'other']),
  experience: z.enum(['0', '1-2', '3-5', '6+']).optional(),
  credit: z.enum(['800+', '700+', 'below700', 'noCredit']).optional(),
}).strict()
export type PluginDeal = z.infer<typeof pluginDealSchema>
const envelope = z.object({ version: z.literal(1), id: z.string().uuid(), expires: z.number().int(), deal: pluginDealSchema }).strict()
export type PluginScenario = z.infer<typeof envelope>
export const PLUGIN_CONSENT_VERSION = 'chatgpt-estimate-contact-v1'

function key() {
  const value = process.env.CALCULATOR_HANDOFF_SECRET || ''
  if (!/^[a-f0-9]{64}$/i.test(value)) throw new Error('Calculator handoff is not configured.')
  return Buffer.from(value, 'hex')
}
export function needsPluginProfile(deal: PluginDeal) {
  const cost = deal.purchasePrice + deal.renovationBudget
  return deal.projectMonths > 6 || Math.min(cost, deal.arv * .7) < 150000 || cost > deal.arv * .7
}
export function calculatorDeal(deal: PluginDeal) {
  const needsProfile = needsPluginProfile(deal)
  return { ...deal, experience: needsProfile ? deal.experience || '0' : '0', credit: needsProfile ? deal.credit || 'noCredit' : 'noCredit', profileSkipped: !needsProfile }
}
export function createScenario(deal: PluginDeal, now = Date.now()) {
  return { version: 1 as const, id: randomUUID(), expires: now + 48 * 60 * 60 * 1000, deal: pluginDealSchema.parse(deal) }
}
export function encodeScenario(value: PluginScenario) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key(), iv)
  cipher.setAAD(Buffer.from('mortgage-stevie-flip-v1'))
  const data = Buffer.concat([cipher.update(JSON.stringify(envelope.parse(value)), 'utf8'), cipher.final()])
  return Buffer.concat([iv, cipher.getAuthTag(), data]).toString('base64url')
}
export function decodeScenario(token: string, now = Date.now()): PluginScenario {
  if (token.length < 50 || token.length > 4096 || !/^[A-Za-z0-9_-]+$/.test(token)) throw new Error('This estimate link is invalid or expired. Please run a new estimate.')
  try {
    const bytes = Buffer.from(token, 'base64url')
    const decipher = createDecipheriv('aes-256-gcm', key(), bytes.subarray(0, 12))
    decipher.setAuthTag(bytes.subarray(12, 28))
    decipher.setAAD(Buffer.from('mortgage-stevie-flip-v1'))
    const result = envelope.parse(JSON.parse(Buffer.concat([decipher.update(bytes.subarray(28)), decipher.final()]).toString('utf8')))
    if (result.expires <= now || result.expires > now + 49 * 60 * 60 * 1000) throw new Error('Expired')
    return result
  } catch { throw new Error('This estimate link is invalid or expired. Please run a new estimate.') }
}
export function pluginOrigin() {
  const url = new URL(process.env.CALCULATOR_PLUGIN_ORIGIN || 'https://mortgagestevie.com')
  if (url.username || url.password || (url.protocol !== 'https:' && !['localhost','127.0.0.1'].includes(url.hostname))) throw new Error('Invalid calculator plugin origin.')
  return url.origin
}
