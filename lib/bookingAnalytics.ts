import { trackEvent } from './analytics'
import type { CallType } from './booking'

export function createBookingTracker(callType: CallType) {
  const seen = new Set<string>()
  return (event: { detail?: { data?: { uid?: string; status?: string; paymentRequired?: boolean } } }) => {
    const data = event.detail?.data
    if (!data?.uid || seen.has(data.uid)) return
    seen.add(data.uid)
    trackEvent('booking_created', { call_type: callType })
    if (data.status?.toLowerCase() === 'accepted' && data.paymentRequired === false) {
      trackEvent('booking_confirmed', { call_type: callType })
    }
  }
}
