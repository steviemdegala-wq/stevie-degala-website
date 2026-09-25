import type { Metadata } from 'next'
import FindMyLoanClient from './FindMyLoanClient'

export const metadata: Metadata = {
  title: 'Find My Loan | Mortgage Loan Matcher | Stevie de Gala',
  description:
    'Answer a few questions and find the right financing path for your situation. Free, no account required. Northern Colorado mortgage broker NMLS# 2845865.',
  openGraph: {
    title: 'Find My Loan | Mortgage Loan Matcher | Stevie de Gala',
    description:
      'A quick questionnaire to identify the financing or selling path that fits your situation. Free and no account required.',
    type: 'website',
  },
}

export default function FindMyLoanPage() {
  return <FindMyLoanClient />
}
