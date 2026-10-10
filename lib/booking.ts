export const CALLS = {
  discoverycall: {
    title: 'Discovery Call',
    audience: 'New here? Start here.',
    description: 'Tell me what you are working toward, ask your mortgage questions, and talk through your next steps.',
  },
  'investor-portfolio-review': {
    title: 'Investor Portfolio Review',
    audience: 'For real estate investors',
    description: 'Review your properties, current financing, cash flow, and plans for your next investment.',
  },
  'homeowner-mortgage-review': {
    title: 'Homeowner Mortgage Review',
    audience: 'For current homeowners',
    description: 'Take a fresh look at your current mortgage, equity, and goals, and discuss whether a change makes sense.',
  },
} as const

export type CallType = keyof typeof CALLS
export const getBookingUrl = (callType: CallType) => `https://cal.com/mortgage-stevie/${callType}`
export const BOOKING_URL = getBookingUrl('discoverycall')
