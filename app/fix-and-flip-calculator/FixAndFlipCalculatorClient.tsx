'use client'

import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useModalStore } from '@/lib/modalStore'

declare global {
  interface Window {
    google?: any
    fixFlipGoogleLoading?: Promise<void>
  }
}

type Step = 'intro' | 'deal' | 'timeline' | 'property' | 'experience' | 'credit' | 'profit' | 'results' | 'prequal' | 'letter'

type Answers = {
  address: string
  state: string
  zip: string
  purchasePrice: string
  renovationBudget: string
  arv: string
  monthlyHoldingCosts: string
  projectMonths: string
  propertyType: string
  experience: string
  credit: string
  name: string
  email: string
  phone: string
}

type ResultOption = {
  label: string
  advantage: string
  program: string
  rate: number
  termMonths: number
  loanAmount: number
  purchaseAdvance: number
  renovationAdvance: number
  originationFee: number
  originationPercent: number
  otherFees: number
  otherFeeLabel: string
  payoffFee: number
  appraisalFee: number
  titleFee: number
  reserveTarget: number
  startupCash: number
  cashNeeded: number
  carryingCost: number
  carryingMonths: number
  totalCash: number
  borrowingCost: number
  estimatedSellingCosts: number
  financingAndFees: number
  nonFinancingHoldingCosts: number
  totalProjectCost: number
  estimatedProfit: number
  estimatedCashContribution: number
  returnOnCash: number | null
  breakEvenSalePrice: number
  sensitivity: {
    salePriceDownFivePercent: number
    renovationUpTenPercent: number
    holdThreeMonthsLonger: number
  }
  reasons: string[]
  cautions: string[]
  termReview: boolean
}

type DealWarning = {
  type: 'projected-loss'
  estimatedLoss: number
  arv: number
  purchaseAndRenovation: number
  financingAndFees: number
  carryingCost: number
  originationFee: number
  otherFees: number
  otherFeeLabel: string
  appraisalFee: number
  titleFee: number
  payoffFee: number
  estimatedSellingCosts: number
  totalProjectCost: number
  sellingCostPercent: number
}

const initialAnswers: Answers = {
  address: '', state: '', zip: '', purchasePrice: '', renovationBudget: '', arv: '', projectMonths: '6',
  monthlyHoldingCosts: '', propertyType: '', experience: '', credit: '', name: '', email: '', phone: '',
}

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

function dollars(value: string | number) {
  const number = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9]/g, ''))
  return Number.isFinite(number) ? number : 0
}

function money(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

function formattedMoney(value: string) {
  const digits = value.replace(/[^0-9]/g, '')
  return digits ? Number(digits).toLocaleString('en-US') : ''
}

function formattedPhone(value: string) {
  let digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length < 4) return digits
  if (digits.length < 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

function loadGooglePlaces(key: string) {
  if (window.google?.maps?.importLibrary) return Promise.resolve()
  if (window.fixFlipGoogleLoading) return window.fixFlipGoogleLoading
  window.fixFlipGoogleLoading = new Promise((resolve, reject) => {
    const callback = `fixFlipGoogleReady${Date.now()}`
    ;(window as any)[callback] = () => { delete (window as any)[callback]; resolve() }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&loading=async&libraries=places&v=weekly&callback=${callback}`
    script.async = true
    script.onerror = reject
    document.head.appendChild(script)
  })
  return window.fixFlipGoogleLoading
}

export default function FixAndFlipCalculatorClient() {
  const { openModal } = useModalStore()
  const [step, setStep] = useState<Step>('intro')
  const [answers, setAnswers] = useState<Answers>(initialAnswers)
  const [history, setHistory] = useState<Step[]>([])
  const [results, setResults] = useState<ResultOption[]>([])
  const [manualReview, setManualReview] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [dealWarning, setDealWarning] = useState<DealWarning | null>(null)
  const [prequalPdfUrl, setPrequalPdfUrl] = useState('')
  const [prequalEmailSent, setPrequalEmailSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [addressNote, setAddressNote] = useState('Start typing for Google address suggestions, or enter the address manually.')
  const placesToken = useRef<any>(null)
  const addressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

  const needsBorrowerProfile = useMemo(() => {
    const purchaseAndRenovation = dollars(answers.purchasePrice) + dollars(answers.renovationBudget)
    const arv = dollars(answers.arv)
    const baselineLoan = Math.min(purchaseAndRenovation, arv * 0.7)
    return !purchaseAndRenovation || !arv || Number(answers.projectMonths) > 6 || baselineLoan < 150000 || purchaseAndRenovation > arv * 0.7
  }, [answers.purchasePrice, answers.renovationBudget, answers.arv, answers.projectMonths])
  const flow = useMemo<Step[]>(() => ['deal'], [])
  const currentIndex = flow.indexOf(step)
  const progress = step === 'intro' ? 0 : ['profit', 'results', 'prequal', 'letter'].includes(step) ? 100 : ((currentIndex + 1) / flow.length) * 100
  const progressLabel = currentIndex >= 0 ? `${currentIndex + 1} / ${flow.length}` : step === 'profit' ? 'Estimate ready' : step === 'prequal' ? 'Pre-qual' : step === 'letter' ? 'Complete' : ''

  const track = (event: string, properties: Record<string, string | number | boolean> = {}) => {
    ;(window as any).dataLayer?.push({ event, page: 'fix-and-flip-calculator', ...properties })
  }
  const update = (field: keyof Answers, value: string) => setAnswers((current) => ({ ...current, [field]: value }))
  const show = (next: Step) => { setHistory((items) => [...items, step]); setError(''); setStep(next) }
  const dealPayload = (source: Answers) => ({
    purchasePrice: dollars(source.purchasePrice), renovationBudget: dollars(source.renovationBudget), arv: dollars(source.arv),
    monthlyHoldingCosts: dollars(source.monthlyHoldingCosts), projectMonths: Number(source.projectMonths), propertyType: source.propertyType,
    experience: source.experience || '0', credit: source.credit || 'noCredit',
    profileSkipped: !needsBorrowerProfile,
  })
  const loadProfitPreview = async (source: Answers) => {
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/fix-and-flip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'preview', deal: dealPayload(source) }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to calculate this estimate.')
      setResults(data.options ?? [])
      setManualReview(Boolean(data.manualReview))
      setDealWarning(data.warning ?? null)
      track('calculator_profit_previewed', { projectedLoss: Boolean(data.warning), manualReview: Boolean(data.manualReview) })
      show('profit')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to calculate this estimate.')
    } finally {
      setSubmitting(false)
    }
  }
  const next = (source = answers) => {
    const index = flow.indexOf(step)
    if (index < 0) return
    track('calculator_step_completed', { step, stepNumber: index + 1, totalSteps: flow.length })
    if (index < flow.length - 1) show(flow[index + 1])
    else void loadProfitPreview(source)
  }

  const startCalculator = () => {
    track('calculator_started')
    show('deal')
  }

  const bookCall = (placement: string) => {
    track('booking_clicked', { placement, productCategory: 'fix-and-flip' })
    openModal()
  }
  const back = () => {
    const previous = history.at(-1)
    if (!previous) return
    setHistory((items) => items.slice(0, -1))
    setStep(previous)
    setError('')
  }

  useEffect(() => {
    if (step !== 'prequal') return
    if (!apiKey) {
      setAddressNote('Google address suggestions are not configured in this local preview. Enter the address manually.')
      return
    }
    loadGooglePlaces(apiKey)
      .then(async () => {
        const { AutocompleteSessionToken } = await window.google.maps.importLibrary('places')
        placesToken.current = new AutocompleteSessionToken()
        setAddressNote('Powered by Google Places. You can also enter the address manually.')
      })
      .catch(() => setAddressNote('Google suggestions are unavailable. Enter the address manually.'))
  }, [step, apiKey])

  const handleAddressInput = (value: string) => {
    update('address', value)
    setSuggestions([])
    if (addressTimer.current) clearTimeout(addressTimer.current)
    if (!apiKey || value.trim().length < 3 || !window.google?.maps?.importLibrary) return
    addressTimer.current = setTimeout(async () => {
      try {
        const { AutocompleteSuggestion } = await window.google.maps.importLibrary('places')
        const response = await AutocompleteSuggestion.fetchAutocompleteSuggestions({ input: value, includedRegionCodes: ['us'], sessionToken: placesToken.current })
        setSuggestions((response.suggestions ?? []).map((item: any) => item.placePrediction).filter(Boolean))
      } catch {
        setAddressNote('Google suggestions are unavailable. Enter the address manually.')
      }
    }, 220)
  }

  const chooseAddress = async (prediction: any) => {
    try {
      const place = prediction.toPlace()
      await place.fetchFields({ fields: ['formattedAddress', 'addressComponents'] })
      const components = place.addressComponents ?? []
      const state = components.find((item: any) => item.types?.includes('administrative_area_level_1'))?.shortText ?? ''
      const zip = components.find((item: any) => item.types?.includes('postal_code'))?.shortText ?? ''
      setAnswers((current) => ({ ...current, address: place.formattedAddress ?? current.address, state: state || current.state, zip: zip || current.zip }))
      setSuggestions([])
      const { AutocompleteSessionToken } = await window.google.maps.importLibrary('places')
      placesToken.current = new AutocompleteSessionToken()
    } catch {
      update('address', prediction.text?.toString() ?? answers.address)
      setSuggestions([])
    }
  }

  const submitContact = async (event: FormEvent) => {
    event.preventDefault()
    track('full_estimate_requested', { placement: 'inline-email' })
    setSubmitting(true)
    setError('')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 20000)
    try {
      const search = new URLSearchParams(window.location.search)
      const response = await fetch('/api/fix-and-flip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contact: { name: answers.name, email: answers.email, phone: answers.phone },
          deal: dealPayload(answers),
          attribution: {
            pageUrl: window.location.href,
            referrer: document.referrer,
            utmSource: search.get('utm_source') ?? '',
            utmMedium: search.get('utm_medium') ?? '',
            utmCampaign: search.get('utm_campaign') ?? '',
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to calculate your results.')
      setResults(data.options ?? [])
      setManualReview(Boolean(data.manualReview))
      setPreviewMode(Boolean(data.preview))
      setEmailSent(Boolean(data.email?.borrower))
      setDealWarning(data.warning ?? null)
      track('calculator_step_completed', { step: 'email_unlock', stepNumber: flow.length + 1, totalSteps: flow.length + 1 })
      track('calculator_results_viewed', { optionCount: data.options?.length ?? 0, manualReview: Boolean(data.manualReview) })
      setHistory((items) => [...items, step])
      setStep('results')
    } catch (err) {
      setError(err instanceof DOMException && err.name === 'AbortError'
        ? 'This is taking longer than expected. Your information is still here, so please try again.'
        : err instanceof Error ? err.message : 'Unable to calculate your results.')
    } finally {
      window.clearTimeout(timeout)
      setSubmitting(false)
    }
  }

  const submitPrequalification = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/fix-and-flip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'prequalification',
          contact: { name: answers.name, email: answers.email, phone: answers.phone },
          deal: { ...dealPayload(answers), address: answers.address, state: answers.state, zip: answers.zip },
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Unable to create the pre-qualification letter.')
      }
      const blob = await response.blob()
      if (prequalPdfUrl) URL.revokeObjectURL(prequalPdfUrl)
      setPrequalPdfUrl(URL.createObjectURL(blob))
      setPrequalEmailSent(response.headers.get('X-Email-Sent') === 'true')
      track('prequalification_letter_created', { state: answers.state })
      setHistory((items) => [...items, 'prequal'])
      setStep('letter')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create the pre-qualification letter.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = 'w-full rounded-xl border border-[#d4d0ca] bg-white px-4 py-4 text-[#090909] outline-none focus:border-[#555] focus:ring-4 focus:ring-black/5'
  const buttonClass = 'mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#090909] px-6 py-4 font-semibold text-white hover:bg-[#303030] disabled:cursor-not-allowed disabled:opacity-50'
  const unlockForm = () => <form onSubmit={submitContact} className="rounded-2xl border border-[#d4d0ca] bg-white p-6 shadow-lg sm:p-8">
    <p className="text-xs font-bold uppercase tracking-[.16em] text-[#666]">Your full estimate is ready</p>
    <h2 className="mt-2 font-serif text-2xl sm:text-3xl">Unlock the complete deal breakdown</h2>
    <p className="mt-2 text-sm leading-6 text-[#65615c]">Enter your email to reveal the dollar amounts instantly and receive the complete estimate.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <label><span className="sr-only">Email address</span><input required type="email" autoComplete="email" inputMode="email" aria-label="Email address" className={inputClass} value={answers.email} onChange={(e) => update('email', e.target.value)} placeholder="Email address" /></label>
      <button disabled={submitting} className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-[#090909] px-6 py-3 font-semibold text-white hover:bg-[#303030] disabled:cursor-not-allowed disabled:opacity-50">{submitting ? 'Unlocking...' : 'Unlock & Email My Full Estimate'} {!submitting && <span aria-hidden="true" className="text-lg">↓</span>}</button>
    </div>
    <p className="mt-3 text-xs text-[#777]">No hard credit pull. Your information will not be sold.</p>
    {error && <p role="alert" aria-live="polite" className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
  </form>
  const choices = (items: { value: string; title: string; detail?: string }[], field: keyof Answers) => (
    <div className={`grid gap-3 ${items.length === 4 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((item) => (
        <button key={item.value} type="button" disabled={submitting} aria-pressed={answers[field] === item.value} onClick={() => update(field, item.value)} className={`flex min-h-[68px] w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition disabled:cursor-wait disabled:opacity-60 ${answers[field] === item.value ? 'border-[#090909] bg-[#090909] text-white shadow-md' : 'border-[#d4d0ca] bg-white text-[#090909] hover:border-[#777] hover:shadow-md'}`}>
          <span><strong className="block text-sm">{item.title}</strong>{item.detail && <small className={`mt-1 block text-xs ${answers[field] === item.value ? 'text-[#ccc]' : 'text-[#73706b]'}`}>{item.detail}</small>}</span><span aria-hidden="true">{answers[field] === item.value ? '✓' : ''}</span>
        </button>
      ))}
    </div>
  )

  const heading = useMemo(() => ({
    deal: ['One quick form', 'Tell us about the deal.', 'Best estimates are fine. We only ask the questions needed to produce your projection.'],
    timeline: ['Project timeline', 'How long do you expect to hold the property?', 'Choose the total time from purchase through the completed sale.'],
    property: ['Property type', 'What type of property is it?', 'Choose the closest match.'],
    experience: ['Your experience', 'How many flips have you completed in the last 3 years?', 'This can change the pricing and amount available.'],
    credit: ['Credit', 'Which range is closest to your credit score?', 'No hard credit pull. You can also choose an option that does not use FICO.'],
    prequal: ['Pre-qualification details', 'Tell us where the property is.', apiKey ? 'Your email is already filled in. Add your contact details, then choose an address from Google or enter it manually.' : 'Your email is already filled in. Add your contact details and the full property address.'],
  } as Record<string, string[]>)[step], [step, apiKey])

  return (
    <div className="fixed inset-0 z-[45] overflow-y-auto bg-[#f5f5f5] text-[#090909]">
      <div className="min-h-screen lg:grid lg:grid-cols-[minmax(320px,38vw)_1fr]">
        <aside className="relative hidden min-h-screen overflow-hidden bg-[#090909] px-10 py-9 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,.72)),url('/headshot.jpg')] bg-cover bg-[center_36%] grayscale opacity-80" />
          <div className="relative z-10">
            <Link href="/" className="w-max font-serif text-2xl">Mortgage Stevie</Link>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[.2em] text-[#c8c8c8]">Fix &amp; Flip Calculator</p>
          </div>
          <div className="relative z-10 mt-auto">
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[#aaa]">Fix-and-flip calculator</p>
            <p className="max-w-[8ch] font-serif text-6xl leading-[.95] tracking-[-.055em]">Run the deal before you fund it.</p>
            <div className="mt-8 flex gap-5 text-xs text-[#bbb]"><span>Current program assumptions</span><span>No hard credit pull</span></div>
          </div>
        </aside>

        <section className={`flex min-h-screen flex-col px-5 pt-5 sm:px-9 lg:px-[clamp(40px,6vw,96px)] lg:pb-10 lg:pt-8 ${step === 'results' && !dealWarning ? 'pb-28' : 'pb-10'}`}>
          <div className="mb-4 flex items-baseline justify-between gap-4 lg:hidden">
            <Link href="/" className="font-serif text-xl">Mortgage Stevie</Link>
            <span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#777]">Fix &amp; Flip Calculator</span>
          </div>
          <header className="flex min-h-[42px] items-center gap-4">
            <button type="button" onClick={back} className={`font-semibold ${history.length && step !== 'intro' ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>← Back</button>
            <div className="ml-auto h-1 w-full max-w-[360px] overflow-hidden rounded-full bg-[#ddd8d1]"><div className="h-full bg-[#555] transition-all" style={{ width: `${progress}%` }} /></div>
            <span className="min-w-[80px] text-right text-xs text-[#777]">{progressLabel}</span>
          </header>

          <main className="mx-auto my-auto w-full max-w-[720px] py-12 lg:py-16">
            {step === 'intro' && (
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-[#666]">Fix-and-flip calculator</p>
                <h1 className="mb-5 font-serif text-5xl leading-[1] tracking-[-.045em] sm:text-6xl">Run the numbers on your next flip.</h1>
                <p className="hidden max-w-[620px] text-lg leading-7 text-[#65615c] sm:block">See your projected profit, estimated financing terms, and conditional pre-qualification before you make an offer.</p>
                <ul className="space-y-3 text-base font-semibold text-[#34312e] sm:hidden">
                  <li className="flex items-center gap-3"><span aria-hidden="true" className="text-[#47745a]">●</span>See your projected profit</li>
                  <li className="flex items-center gap-3"><span aria-hidden="true" className="text-[#47745a]">●</span>Review estimated financing terms</li>
                  <li className="flex items-center gap-3"><span aria-hidden="true" className="text-[#47745a]">●</span>Get a conditional pre-qualification</li>
                </ul>
                <button type="button" onClick={startCalculator} className={buttonClass}>See My Projected Profit <span>→</span></button>
                <p className="mt-4 text-xs text-[#777]">About 2 minutes · No hard credit pull · Free to use</p>
              </div>
            )}

            {heading && (
              <div className="mb-8"><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#666]">{heading[0]}</p><h1 className="mb-3 font-serif text-4xl leading-[1.03] tracking-[-.04em] sm:text-5xl">{heading[1]}</h1><p className="text-base leading-6 text-[#65615c]">{heading[2]}</p></div>
            )}

            {step === 'prequal' && (
              <form onSubmit={submitPrequalification}>
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold sm:col-span-2">Email address<input required type="email" autoComplete="email" className={`${inputClass} mt-2`} value={answers.email} onChange={(e) => update('email', e.target.value)} /></label>
                  <label className="text-sm font-semibold">Full name<input required autoComplete="name" className={`${inputClass} mt-2`} value={answers.name} onChange={(e) => update('name', e.target.value)} /></label>
                  <label className="text-sm font-semibold">Phone number<input required type="tel" autoComplete="tel" className={`${inputClass} mt-2`} value={answers.phone} onChange={(e) => update('phone', formattedPhone(e.target.value))} placeholder="555-555-5555" /></label>
                </div>
                <>
                  <div className="relative">
                    <label className="mb-2 block text-sm font-semibold">Property address</label>
                    <input required className={inputClass} value={answers.address} onChange={(e) => handleAddressInput(e.target.value)} autoComplete="street-address" placeholder="Start typing the property address" />
                    {suggestions.length > 0 && <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#d4d0ca] bg-white shadow-2xl">{suggestions.map((suggestion, index) => <button key={index} type="button" onClick={() => chooseAddress(suggestion)} className="block w-full border-b border-[#eee] px-4 py-3 text-left text-sm hover:bg-[#f4f4f4]">{suggestion.text?.toString()}</button>)}</div>}
                  </div>
                  <p className="mt-2 text-xs text-[#777]">{addressNote}</p>
                </>
                <div className="mt-4 grid grid-cols-[1fr_1.4fr] gap-3">
                  <label className="text-sm font-semibold">State<select required className={`${inputClass} mt-2`} value={answers.state} onChange={(e) => update('state', e.target.value)}><option value="">Select</option>{states.map((state) => <option key={state}>{state}</option>)}</select></label>
                  <label className="text-sm font-semibold">ZIP code<input required pattern="[0-9]{5}" inputMode="numeric" maxLength={5} className={`${inputClass} mt-2`} value={answers.zip} onChange={(e) => update('zip', e.target.value.replace(/\D/g, '').slice(0, 5))} /></label>
                </div>
                <p className="mt-4 text-xs leading-5 text-[#777]">If the project passes the automated checks, we will email your conditional pre-qualification letter automatically and make it available to download immediately. It is not a loan approval or commitment to lend.</p>
                {error && <p role="alert" className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
                <button disabled={submitting} className={buttonClass}>{submitting ? 'Creating your letter...' : 'Create my letter'} {!submitting && <span>→</span>}</button>
              </form>
            )}

            {step === 'deal' && (
              <form onSubmit={(event) => { event.preventDefault(); if (!answers.propertyType || (needsBorrowerProfile && (!answers.experience || !answers.credit))) { setError('Please complete the highlighted deal details before viewing your projection.'); return } next() }} className="space-y-5">
                <section className="rounded-2xl border border-[#d4d0ca] bg-white p-5 shadow-sm sm:p-7">
                  <div className="mb-5 flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#090909] text-xs font-bold text-white">1</span><div><h2 className="font-serif text-2xl">Deal numbers</h2><p className="text-xs text-[#777]">The core numbers behind your projected profit.</p></div></div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {([
                      ['purchasePrice', 'Purchase price'],
                      ['renovationBudget', 'Renovation budget'],
                      ['arv', 'After-repair value (ARV)'],
                    ] as [keyof Answers, string][]).map(([field, label]) => <label key={field} className="block text-sm font-semibold">{label}<div className="relative mt-2"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]">$</span><input required inputMode="numeric" className={`${inputClass} pl-8 text-lg`} value={String(answers[field])} onChange={(e) => update(field, formattedMoney(e.target.value))} placeholder="0" /></div></label>)}
                  </div>
                  <label className="mt-5 block text-sm font-semibold">Estimated monthly holding costs<div className="relative mt-2"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]">$</span><input inputMode="numeric" className={`${inputClass} pl-8`} value={answers.monthlyHoldingCosts} onChange={(e) => update('monthlyHoldingCosts', formattedMoney(e.target.value))} placeholder="0" /></div><span className="mt-1 block text-xs font-normal leading-5 text-[#777]">Taxes, insurance, utilities, HOA, and maintenance</span></label>
                </section>

                <section className="rounded-2xl border border-[#d4d0ca] bg-white p-5 shadow-sm sm:p-7">
                  <div className="mb-5 flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#090909] text-xs font-bold text-white">2</span><div><h2 className="font-serif text-2xl">Timeline and property</h2><p className="text-xs text-[#777]">Used to estimate carrying costs and potential terms.</p></div></div>
                  <div className="flex items-end justify-between gap-4">
                    <label htmlFor="project-months" className="text-sm font-semibold">Projected length of the deal</label>
                    <output htmlFor="project-months" className="font-serif text-2xl text-[#23633c]">{answers.projectMonths} <span className="font-sans text-xs font-semibold text-[#47745a]">months</span></output>
                  </div>
                  <input id="project-months" name="projectMonths" type="range" min="1" max="24" step="1" list="project-month-marks" value={answers.projectMonths} onChange={(event) => update('projectMonths', event.target.value)} className="mt-5 h-2 w-full cursor-pointer accent-[#090909]" />
                  <datalist id="project-month-marks"><option value="1" /><option value="6" /><option value="12" /><option value="18" /><option value="24" /></datalist>
                  <div className="mt-3 flex justify-between text-[11px] font-semibold text-[#777]" aria-hidden="true"><span>1 mo.</span><span>6 mo.</span><span>12 mo.</span><span>18 mo.</span><span>24 mo.</span></div>
                  <div className="my-6 border-t border-[#e4e1dc]" />
                  <p className="mb-3 text-sm font-semibold">Property type</p>
                  {choices([{value:'sfr',title:'Single-family home'},{value:'condo',title:'Condo or townhome'},{value:'multi',title:'2 to 4 units'},{value:'other',title:'Manufactured, mixed-use, or other',detail:'Manual review may be needed'}], 'propertyType')}
                </section>

                <section className="rounded-2xl border border-[#d4d0ca] bg-white p-5 shadow-sm sm:p-7">
                  <div className="mb-5 flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#090909] text-xs font-bold text-white">3</span><div><h2 className="font-serif text-2xl">Quick borrower profile</h2><p className="text-xs text-[#777]">No hard credit pull. These answers help when a financing path uses experience or credit.</p></div></div>
                  <p className="mb-3 text-sm font-semibold">Completed flips in the last 3 years</p>
                  {choices([{value:'0',title:'This is my first flip'},{value:'1-2',title:'1 to 2 completed flips'},{value:'3-5',title:'3 to 5 completed flips'},{value:'6+',title:'6 or more completed flips'}], 'experience')}
                  <div className="my-6 border-t border-[#e4e1dc]" />
                  <p className="mb-3 text-sm font-semibold">Credit range</p>
                  {choices([{value:'800+',title:'800 or higher'},{value:'700+',title:'700 to 799'},{value:'below700',title:'Below 700'},{value:'noCredit',title:'Use an option without a credit-score requirement',detail:'Removes credit-based programs'}], 'credit')}
                </section>
                {error && <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
                <button disabled={submitting} className={`${buttonClass} mt-1 w-full sm:w-auto`}>{submitting ? 'Calculating...' : 'See My Projected Profit'} {!submitting && <span>→</span>}</button>
              </form>
            )}

            {step === 'profit' && (
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#666]">Your projected result</p>
                <h1 className="mb-3 font-serif text-4xl leading-[1.03] tracking-[-.04em] sm:text-5xl">{dealWarning ? 'The numbers show a loss.' : manualReview ? "Let's take a closer look." : 'Here is your projected profit.'}</h1>
                {!dealWarning && !manualReview && results[0] && <div className="my-7 rounded-2xl border border-[#79a98a] bg-[#eff8f1] p-6 text-[#173923]"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#47745a]">Projected profit</p><p className="mt-2 font-serif text-5xl text-[#23633c]">{money(results[0].estimatedProfit)}</p><p className="mt-3 text-sm leading-6 text-[#365f45]">A preliminary estimate based on the numbers you entered.</p></div>}
                {dealWarning && <div className="my-7 rounded-2xl border border-[#c96a5a] bg-[#fff5f2] p-6 text-[#171312]"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#8d463b]">Projected result</p><p className="mt-2 font-serif text-4xl text-[#9b2c20]">About {money(dealWarning.estimatedLoss)} loss</p><p className="mt-3 text-sm leading-6">There may not be enough room in this deal with the numbers entered. The full estimate will show where the costs are landing.</p></div>}
                {manualReview && <div className="my-7 rounded-2xl border border-[#d4d0ca] bg-white p-6"><p className="font-serif text-2xl">This deal needs a closer look.</p><p className="mt-2 text-sm leading-6 text-[#65615c]">A property-specific review is needed to finish the estimate.</p></div>}
                {results[0] && !manualReview ? <div className="mt-7 space-y-6">
                  {unlockForm()}
                  <div className="pointer-events-none select-none"><ResultCard option={results[0]} primary locked /></div>
                  <div className="pointer-events-auto rounded-2xl border border-[#d4d0ca] bg-white p-6 text-center shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[.16em] text-[#666]">Next step</p>
                    <h2 className="mt-2 font-serif text-2xl">Get your conditional pre-qualification letter</h2>
                    <p className="mx-auto mt-2 max-w-[520px] text-sm leading-6 text-[#65615c]">Unlock the estimate above, then add the property address to create your letter.</p>
                    <button type="button" onClick={() => document.querySelector<HTMLInputElement>('input[aria-label="Email address"]')?.focus()} className="mt-4 rounded-full bg-[#090909] px-6 py-3 font-bold text-white">Unlock Estimate to Continue <span>↑</span></button>
                  </div>
                </div> : unlockForm()}
              </div>
            )}

            {step === 'results' && (
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#666]">{dealWarning ? 'Deal check' : 'Potential financing structure'}</p>
                <h1 className="mb-3 font-serif text-4xl leading-[1.03] tracking-[-.04em] sm:text-5xl">{dealWarning ? 'The numbers show a loss.' : manualReview ? "Let's take a closer look." : 'A potential fit for this deal.'}</h1>
                <p className="mb-8 text-base leading-6 text-[#65615c]">{dealWarning ? "With what you entered, this deal could lose money. We don't want anyone going into a deal that's likely to lose money." : 'This preliminary structure is based on the numbers you entered. Property location can change program eligibility, so it will be confirmed before a pre-qualification letter is created.'}</p>
                {!dealWarning && !manualReview && results[0] && <div className="mb-6 rounded-2xl border border-[#79a98a] bg-[#eff8f1] p-6 text-[#173923]"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#47745a]">Projected profit</p><p className="mt-2 font-serif text-5xl text-[#23633c]">{money(results[0].estimatedProfit)}</p><p className="mt-3 text-sm leading-6 text-[#365f45]">Based on the deal details and preliminary financing shown below.</p></div>}
                {dealWarning && <div className="mb-6 rounded-2xl border border-[#c96a5a] bg-[#fff5f2] p-6 text-[#171312]">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-[#8d463b]">Projected result</p>
                  <p className="mt-2 font-serif text-4xl text-[#9b2c20]">About {money(dealWarning.estimatedLoss)} loss</p>
                  <p className="mt-3 max-w-[620px] text-sm leading-6">There just isn't enough room in this deal right now. We are showing the financing path with the lowest projected loss so you can see why. Let's talk it through or look at another deal with better numbers.</p>
                  <div className="mt-5 grid gap-3 border-t border-[#ddb0a8] pt-5 sm:grid-cols-2">
                    <Metric label="After-repair value" value={money(dealWarning.arv)} primary={false} />
                    <Metric label="Purchase + renovation" value={money(dealWarning.purchaseAndRenovation)} primary={false} />
                    <Metric label="Financing, interest & fees" value={money(dealWarning.financingAndFees)} primary={false} />
                    <Metric label={`Estimated selling costs (${dealWarning.sellingCostPercent}%)`} value={money(dealWarning.estimatedSellingCosts)} primary={false} />
                  </div>
                  <details className="mt-5 rounded-xl border border-[#ddb0a8] bg-white/60 p-4 text-sm">
                    <summary className="cursor-pointer font-semibold">See financing cost breakdown</summary>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <span>Estimated interest: <strong>{money(dealWarning.carryingCost)}</strong></span>
                      <span>Origination fee: <strong>{money(dealWarning.originationFee)}</strong></span>
                      <span>{dealWarning.otherFeeLabel}: <strong>{money(dealWarning.otherFees)}</strong></span>
                      <span>Estimated appraisal: <strong>{money(dealWarning.appraisalFee)}</strong></span>
                      <span>Estimated title fees: <strong>{money(dealWarning.titleFee)}</strong></span>
                      {dealWarning.payoffFee > 0 && <span>Payoff fee: <strong>{money(dealWarning.payoffFee)}</strong></span>}
                    </div>
                  </details>
                  <button type="button" onClick={() => bookCall('projected-loss')} className="mt-6 rounded-full bg-[#090909] px-6 py-4 font-semibold text-white hover:bg-[#303030]">Discuss this deal or another opportunity</button>
                </div>}
                {previewMode && <p className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">Local preview mode: no CRM record or email was sent.</p>}
                {!previewMode && emailSent && <p role="status" className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-950"><strong>Your results have been emailed.</strong> If they are not in your inbox within a few minutes, please check your spam or promotions folder.</p>}
                {!previewMode && !emailSent && <p role="status" className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950"><strong>Your request was saved, but we could not confirm email delivery.</strong> Your results are available below. You can retry later or contact Stevie directly.</p>}
                {manualReview ? <div className="rounded-2xl border border-[#d4d0ca] bg-white p-6"><h2 className="font-serif text-2xl">This deal needs a closer look</h2><p className="mt-2 text-[#666]">Stevie can review the property, state, and deal structure to identify a potential financing path.</p></div> : <div className="grid gap-4">{results.map((option, index) => <ResultCard key={option.label} option={option} primary={index === 0} />)}</div>}
                {!dealWarning && <div className="mt-8 rounded-2xl border border-[#d4d0ca] bg-white p-6">
                  <h2 className="font-serif text-2xl">Ready for your conditional pre-qualification letter?</h2>
                  <p className="mt-2 text-sm leading-6 text-[#65615c]">Add the property address so we can confirm location-based eligibility and create a conditional project pre-qualification letter.</p>
                  <button type="button" onClick={() => { track('prequalification_started', { placement: 'results-card' }); show('prequal') }} className="mt-5 rounded-full bg-[#090909] px-7 py-4 text-center text-base font-bold text-white hover:bg-[#303030]">Get My Conditional Pre-Qualification Letter <span>→</span></button>
                </div>}
                <div className="mt-7 border-l-2 border-[#777] pl-4 text-sm leading-6 text-[#555]">The financing structures shown are preliminary planning estimates, not approvals or commitments to lend. Stevie will review the specific lender match with you after an application or financing discussion. Rates and terms can change and must be confirmed. Interest assumes the full modeled loan is outstanding for the displayed period; renovation draws may reduce actual interest. Total project cost includes the costs you entered, modeled financing, and estimated selling costs equal to 3% of the sale price. It excludes income taxes and unexpected costs not entered. Return on contributed cash means estimated net profit divided by estimated borrower cash invested through payoff. Final eligibility, pricing, fees, cash needed, and timing depend on lender review, appraisal, title, documentation, property condition, and current program availability. *Appraisal and title fees are conservative estimates.</div>
              </div>
            )}

            {step === 'letter' && (
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#666]">Conditional pre-qualification</p>
                <h1 className="mb-3 font-serif text-4xl leading-[1.03] tracking-[-.04em] sm:text-5xl">Your letter is ready.</h1>
                <p className="max-w-[620px] text-base leading-6 text-[#65615c]">Download the PDF, or open it to print or save another copy. The letter clearly states that it is preliminary, conditional, and subject to full lender review.</p>
                {prequalEmailSent && <p className="mt-5 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">A copy was also sent to <strong>{answers.email}</strong>.</p>}
                {!prequalEmailSent && <p className="mt-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">The PDF is ready, but email delivery could not be confirmed. Please download a copy below.</p>}
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={prequalPdfUrl} download="conditional-project-prequalification.pdf" className="rounded-full bg-[#090909] px-6 py-4 font-bold text-white hover:bg-[#303030]">Download PDF</a>
                  <a href={prequalPdfUrl} target="_blank" rel="noreferrer" className="rounded-full border border-[#090909] bg-white px-6 py-4 font-semibold text-[#090909] hover:bg-[#f0f0f0]">Open to print or save</a>
                </div>
                <p className="mt-6 text-xs leading-5 text-[#777]">This letter is not a loan approval, commitment to lend, or guarantee of financing. Final terms require a complete application and lender underwriting.</p>
              </div>
            )}
          </main>

          {step === 'results' && !dealWarning && <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-black/10 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(0,0,0,.12)] backdrop-blur lg:hidden"><button type="button" onClick={() => { track('prequalification_started', { placement: 'mobile-sticky' }); show('prequal') }} className="mx-auto block w-full max-w-[720px] rounded-full bg-[#090909] px-6 py-4 text-center font-bold text-white">Get My Pre-Qualification Letter <span>→</span></button></div>}

          <p className="mx-auto mt-auto w-full max-w-[720px] pt-7 text-[11px] leading-5 text-[#817d77]">Current program assumptions can change. This calculator provides a close planning estimate only, not final terms or a commitment to lend. Stevie de Gala, NMLS# 2845865. Barrett Financial, NMLS# 181106.</p>
        </section>
      </div>
    </div>
  )
}

function ResultCard({ option, primary, locked = false }: { option: ResultOption; primary: boolean; locked?: boolean }) {
  return (
    <article className={`rounded-2xl border p-6 shadow-lg ${primary ? 'border-[#090909] bg-[#090909] text-white' : 'border-[#d4d0ca] bg-white text-[#090909]'}`}>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row"><div><p className={`text-xs font-bold uppercase tracking-[.16em] ${primary ? 'text-[#aaa]' : 'text-[#777]'}`}>Potential financing structure</p><h2 className="mt-1 font-serif text-3xl">{option.program}</h2><p className={`mt-1 text-sm ${primary ? 'text-[#aaa]' : 'text-[#666]'}`}>{option.advantage}</p></div><span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs ${primary ? 'bg-white text-black' : 'bg-[#eee] text-black'}`}>{option.rate.toFixed(2)}% · {option.termMonths}-month term</span></div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Metric label="Cash to get started" value={money(option.startupCash)} primary={primary} locked={locked} />
        <Metric label={`Estimated carrying cost (${option.carryingMonths} mo.)`} value={money(option.carryingCost)} primary={primary} locked={locked} />
        <Metric label="Total cost*" value={money(option.totalCash)} primary={primary} locked={locked} />
      </div>
      <p className={`mt-3 text-xs leading-5 ${primary ? 'text-[#aaa]' : 'text-[#666]'}`}>Total cost here means the estimated cash required through payoff: cash to get started, any renovation amount not financed, carrying cost, and applicable payoff fees.</p>
      <p className={`mt-4 text-sm ${primary ? 'text-[#d0d0d0]' : 'text-[#555]'}`}>Estimated financing: <SensitiveValue locked={locked} className={primary ? 'text-white' : 'text-black'}>{money(option.loanAmount)}</SensitiveValue>, including up to <SensitiveValue locked={locked} className={primary ? 'text-white' : 'text-black'}>{money(option.renovationAdvance)}</SensitiveValue> for renovation.</p>
      <div className={`mt-5 rounded-xl border p-4 ${primary ? 'border-[#333] bg-[#151515]' : 'border-[#ddd] bg-[#f7f7f7]'}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[.14em] ${primary ? 'text-[#888]' : 'text-[#777]'}`}>Projected deal economics</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Metric label="Estimated total project cost" value={money(option.totalProjectCost)} primary={primary} locked={locked} />
          <Metric label="Estimated cash invested" value={money(option.estimatedCashContribution)} primary={primary} locked={locked} />
          <Metric label="Return on contributed cash" value={option.returnOnCash === null ? 'Not available' : `${option.returnOnCash.toFixed(1)}%`} primary={primary} />
          <Metric label="Break-even sale price" value={money(option.breakEvenSalePrice)} primary={primary} locked={locked} />
        </div>
        <details className="mt-4 text-sm"><summary tabIndex={locked ? -1 : undefined} className="cursor-pointer font-semibold">See sensitivity checks</summary><div className={`mt-3 grid gap-2 ${primary ? 'text-[#ccc]' : 'text-[#555]'}`}><span>Sale price 5% lower: <SensitiveValue locked={locked}>{money(option.sensitivity.salePriceDownFivePercent)}</SensitiveValue> profit</span><span>Renovation 10% over budget: <SensitiveValue locked={locked}>{money(option.sensitivity.renovationUpTenPercent)}</SensitiveValue> profit</span><span>Hold 3 months longer: <SensitiveValue locked={locked}>{money(option.sensitivity.holdThreeMonthsLonger)}</SensitiveValue> profit</span></div></details>
      </div>
      <details className={`mt-5 rounded-xl border p-4 text-sm ${primary ? 'border-[#333] bg-[#151515] text-[#d0d0d0]' : 'border-[#ddd] bg-[#f7f7f7] text-[#555]'}`}>
        <summary tabIndex={locked ? -1 : undefined} className="cursor-pointer font-semibold">What is included?</summary>
        <div className="mt-4 grid gap-2">
          <span>Origination fee ({option.originationPercent.toFixed(2)}%): <SensitiveValue locked={locked} className={primary ? 'text-white' : 'text-black'}>{money(option.originationFee)}</SensitiveValue></span>
          <span>{option.otherFeeLabel}: <SensitiveValue locked={locked} className={primary ? 'text-white' : 'text-black'}>{money(option.otherFees)}</SensitiveValue></span>
          <span>Estimated appraisal*: <SensitiveValue locked={locked} className={primary ? 'text-white' : 'text-black'}>{money(option.appraisalFee)}</SensitiveValue></span>
          <span>Estimated title fees*: <SensitiveValue locked={locked} className={primary ? 'text-white' : 'text-black'}>{money(option.titleFee)}</SensitiveValue></span>
          <span>Other holding costs entered: <SensitiveValue locked={locked} className={primary ? 'text-white' : 'text-black'}>{money(option.nonFinancingHoldingCosts)}</SensitiveValue></span>
          {option.payoffFee > 0 && <span>Payoff fee, paid later: <SensitiveValue locked={locked} className={primary ? 'text-white' : 'text-black'}>{money(option.payoffFee)}</SensitiveValue></span>}
          {option.reserveTarget > 0 && <span>Illustrative reserve target, confirmed by lender: <SensitiveValue locked={locked} className={primary ? 'text-white' : 'text-black'}>{money(option.reserveTarget)}</SensitiveValue></span>}
        </div>
      </details>
      <ul className={`mt-5 grid gap-2 pl-5 text-sm ${primary ? 'text-[#d0d0d0]' : 'text-[#555]'}`}>{option.reasons.map((reason) => <li key={reason} className="list-disc">{reason}</li>)}</ul>
      {(option.termReview || option.cautions.length > 0) && <div className={`mt-5 rounded-xl p-4 text-xs leading-5 ${primary ? 'bg-[#191919] text-[#bbb]' : 'bg-[#f3f3f3] text-[#666]'}`}>{option.termReview && <p className="mb-2 font-bold">Your project timeline is longer than this modeled term. An extension or different structure may be needed.</p>}{option.cautions.map((caution) => <p key={caution}>• {caution}</p>)}</div>}
    </article>
  )
}

function SensitiveValue({ children, locked, className = '' }: { children: ReactNode; locked: boolean; className?: string }) {
  if (!locked) return <strong className={className}>{children}</strong>
  return <><strong aria-hidden="true" className={`${className} inline-block select-none blur-[5px]`}>{children}</strong><span className="sr-only">Amount available after email unlock</span></>
}

function Metric({ label, value, primary, locked = false }: { label: string; value: string; primary: boolean; locked?: boolean }) {
  return <div><p className={`text-[11px] font-extrabold uppercase tracking-[.13em] sm:min-h-[2.25rem] ${primary ? 'text-[#d0d0d0]' : 'text-[#555]'}`}>{label}</p>{locked ? <><p aria-hidden="true" className="mt-1 select-none text-lg font-semibold blur-[5px]">{value}</p><span className="sr-only">Amount available after email unlock</span></> : <p className="mt-1 text-lg font-semibold">{value}</p>}</div>
}
