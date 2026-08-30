import type { Metadata } from 'next'
import FindMyLoanClient from './FindMyLoanClient'

export const metadata: Metadata = {
  title: 'Find My Loan | Mortgage Loan Matcher | Stevie de Gala',
  description:
    'Answer a few questions and find the right home loan for your situation — physician loan, VA loan, FHA, conventional, DSCR, and more. Free, no account required. Northern Colorado mortgage broker NMLS# 2845865.',
  openGraph: {
    title: 'Find My Loan | Mortgage Loan Matcher | Stevie de Gala',
    description:
      'Quick quiz to match you with the right home loan — physician loan, VA loan, FHA, DSCR, conventional, and more. Free and no account required.',
    type: 'website',
  },
}

export default function FindMyLoanPage() {
  return <FindMyLoanClient />
}
