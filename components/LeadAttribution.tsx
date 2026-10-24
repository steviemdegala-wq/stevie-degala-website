'use client'

import { useEffect } from 'react'
import { getLeadAttribution } from '@/lib/attribution'

export default function LeadAttribution() {
  useEffect(() => { if (window.location.pathname !== "/fix-and-flip-calculator/chatgpt") getLeadAttribution() }, [])
  return null
}
