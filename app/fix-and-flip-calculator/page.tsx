import type { Metadata } from 'next'
import FixAndFlipCalculatorClient from './FixAndFlipCalculatorClient'

export const metadata: Metadata = {
  title: 'Fix-and-Flip Calculator | Mortgage Stevie',
  description: 'Analyze a fix-and-flip deal, estimate profit and cash return, and compare preliminary financing structures from Mortgage Stevie’s renovation programs.',
  openGraph: {
    title: 'Fix-and-Flip Calculator | Mortgage Stevie',
    description: 'Run the numbers on your renovation project and compare preliminary fix-and-flip financing structures.',
    type: 'website',
  },
}

export default function FixAndFlipCalculatorPage() {
  return <FixAndFlipCalculatorClient />
}
