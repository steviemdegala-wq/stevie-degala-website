'use client'

import { useEffect, useSyncExternalStore } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

const MEASUREMENT_ID = 'G-F4H0ZB38JD'
const subscribe = () => () => {}
const productionHost = () => ['mortgagestevie.com', 'www.mortgagestevie.com'].includes(window.location.hostname)

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const enabled = useSyncExternalStore(subscribe, productionHost, () => false)
  useEffect(() => {
    // Local checks and deployment previews must not inflate production traffic.
    const privateCalculator = pathname === '/fix-and-flip-calculator/chatgpt'
    ;(window as unknown as Record<string, unknown>)[`ga-disable-${MEASUREMENT_ID}`] = privateCalculator
  }, [pathname])
  if (!enabled || pathname === '/fix-and-flip-calculator/chatgpt') return null
  return <>
    <Script id="mortgage-stevie-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
      window.gtag('js', new Date());
      window.gtag('config', '${MEASUREMENT_ID}');
    `}</Script>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`} strategy="afterInteractive" />
  </>
}
