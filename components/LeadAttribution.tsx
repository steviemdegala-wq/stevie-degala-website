'use client'

import { useEffect } from 'react'

export default function LeadAttribution() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem('mortgage-stevie-attribution')) return
      const params = new URLSearchParams(window.location.search)
      const attribution: Record<string, string> = { landing_page: window.location.pathname }
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
        const value = params.get(key)
        if (value) attribution[key] = value.slice(0, 120)
      }
      if (document.referrer) attribution.referrer_host = new URL(document.referrer).hostname
      sessionStorage.setItem('mortgage-stevie-attribution', JSON.stringify(attribution))
    } catch { /* Contact remains available when storage is disabled. */ }
  }, [])
  return null
}
