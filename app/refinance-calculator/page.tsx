import type { Metadata } from 'next'
import RefinanceCalculator from './RefinanceCalculator'
import { getBookingUrl } from '@/lib/booking'

export const metadata: Metadata = {
  title: 'Refinance Calculator | Mortgage Stevie',
  description: 'Compare cash-out and rate-and-term refinance scenarios, estimated closing costs, monthly payment changes, and payment break-even.',
  alternates: { canonical: '/refinance-calculator' },
}
export default function Page() {
  return <RefinanceCalculator bookingUrl={process.env.REFINANCE_BOOKING_URL || getBookingUrl('homeowner-mortgage-review')} />
}
