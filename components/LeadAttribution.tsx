'use client'

import { useEffect } from 'react'
import { getLeadAttribution } from '@/lib/attribution'

export default function LeadAttribution() {
  useEffect(() => { getLeadAttribution() }, [])
  return null
}
