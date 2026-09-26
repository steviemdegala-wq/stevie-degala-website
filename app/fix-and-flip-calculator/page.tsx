import type { Metadata } from 'next'
import FixAndFlipCalculatorClient from './FixAndFlipCalculatorClient'

export const metadata: Metadata = {
  title: 'Fix-and-Flip Calculator | Mortgage Stevie',
  description: 'Estimate fix-and-flip financing, cash needed, and two potential funding paths using current program assumptions.',
  openGraph: {
    title: 'Fix-and-Flip Calculator | Mortgage Stevie',
    description: 'Run the numbers on your next renovation project and compare two potential funding paths.',
    type: 'website',
  },
}

export default function FixAndFlipCalculatorPage() {
  return <FixAndFlipCalculatorClient />
}
