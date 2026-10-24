import type { Metadata } from 'next'
import ChatGPTDeal from './ChatGPTDeal'
export const metadata: Metadata = {
  title: 'Your Fix & Flip Estimate | Mortgage Stevie',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}
export default function Page() { return <ChatGPTDeal /> }
