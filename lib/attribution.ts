export const ATTRIBUTION_KEY = 'mortgage-stevie-attribution'
type Attribution = Partial<Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'landing_page' | 'referrer_host', string>>

function currentAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search)
  const data: Attribution = { landing_page: window.location.pathname }
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign'] as const) {
    const value = params.get(key)
    if (value) data[key] = value.slice(0, 120)
  }
  try { if (document.referrer) data.referrer_host = new URL(document.referrer).hostname } catch { /* Ignore invalid referrers. */ }
  return data
}

export function getLeadAttribution(): Attribution {
  if (typeof window === 'undefined') return {}
  try {
    const stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || 'null')
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
      const data: Attribution = {}
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'landing_page', 'referrer_host'] as const) {
        if (typeof stored[key] === 'string') data[key] = stored[key].slice(0, key === 'landing_page' ? 300 : 120)
      }
      if (Object.keys(data).length) return data
    }
  } catch { /* Attribution must never prevent an inquiry. */ }
  const data = currentAttribution()
  try { sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data)) } catch { /* Storage may be disabled. */ }
  return data
}

export function getCalculatorAttribution() {
  const data = getLeadAttribution()
  return {
    pageUrl: window.location.origin + window.location.pathname,
    referrer: data.referrer_host || '',
    landingPage: data.landing_page || '',
    utmSource: data.utm_source || '',
    utmMedium: data.utm_medium || '',
    utmCampaign: data.utm_campaign || '',
  }
}
