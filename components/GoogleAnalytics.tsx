'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const MEASUREMENT_ID = 'G-F4H0ZB38JD'

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    // Local checks and deployment previews must not inflate production traffic.
    setEnabled(['mortgagestevie.com', 'www.mortgagestevie.com'].includes(window.location.hostname))
  }, [])
  if (!enabled) return null
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
