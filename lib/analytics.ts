type EventProperties = Record<string, string | number | boolean>

// Only explicitly allowed, non-identifying properties reach measurement tools.
const allowedProperties = new Set(['page', 'placement', 'step', 'stepNumber', 'totalSteps', 'projectedLoss', 'manualReview', 'optionCount', 'productCategory', 'method', 'call_type'])

export function trackEvent(event: string, properties: EventProperties = {}) {
  if (typeof window === 'undefined') return
  try {
    const safe = Object.fromEntries(Object.entries(properties).filter(([key]) => allowedProperties.has(key)))
    const analytics = window as Window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
    if (typeof analytics.gtag === 'function') analytics.gtag('event', event, safe)
    else {
      analytics.dataLayer = analytics.dataLayer || []
      analytics.dataLayer.push({ event, ...safe })
    }
  } catch { /* Measurement must not interrupt forms or navigation. */ }
}
