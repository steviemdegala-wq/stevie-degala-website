'use client'

import { useEffect, useId, useRef } from 'react'
import { type CallType } from '@/lib/booking'

export default function CalEmbed({ callType }: { callType: CallType }) {
  const instanceId = useId().replace(/[^a-zA-Z0-9]/g, '')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    // Separate namespaces let calendars coexist and remount after closing the dialog.
    const namespace = `${callType}-${instanceId}`
    const target = document.createElement('div')
    target.id = `cal-${namespace}`
    target.style.cssText = 'width:100%;height:100%;overflow:auto'
    container.appendChild(target)
    const script = document.createElement('script')
    script.textContent = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "${namespace}", {origin:"https://app.cal.com"});
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;
      Cal.ns["${namespace}"]("inline", {
        elementOrSelector:"#${target.id}",
        config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
        calLink: "mortgage-stevie/${callType}"
      });
      Cal.ns["${namespace}"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `
    container.appendChild(script)
    return () => { container.replaceChildren() }
  }, [callType, instanceId])

  return <div ref={containerRef} className="h-full min-h-0 w-full overflow-auto" />
}
