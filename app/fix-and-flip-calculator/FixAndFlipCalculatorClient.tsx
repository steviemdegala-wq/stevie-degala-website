'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useModalStore } from '@/lib/modalStore'

declare global {
  interface Window {
    google?: any
    fixFlipGoogleLoading?: Promise<void>
  }
}

type Step = 'intro' | 'address' | 'deal' | 'timeline' | 'property' | 'experience' | 'credit' | 'plans' | 'overlap' | 'contact' | 'results'

type Answers = {
  addressKnown: boolean
  address: string
  state: string
  zip: string
  purchasePrice: string
  renovationBudget: string
  arv: string
  acquisitionClosingCosts: string
  monthlyHoldingCosts: string
  projectMonths: string
  propertyType: string
  experience: string
  credit: string
  plannedDeals: string
  overlappingProjects: string
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
  acquisitionClosingCosts: number
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
  appraisalFee: number
  titleFee: number
  payoffFee: number
  estimatedSellingCosts: number
  totalProjectCost: number
  sellingCostPercent: number
}

const initialAnswers: Answers = {
  addressKnown: true, address: '', state: '', zip: '', purchasePrice: '', renovationBudget: '', arv: '', projectMonths: '6',
  acquisitionClosingCosts: '', monthlyHoldingCosts: '', propertyType: '', experience: '', credit: '', plannedDeals: '', overlappingProjects: '', name: '', email: '', phone: '',
}

const flow: Step[] = ['address', 'deal', 'timeline', 'property', 'experience', 'credit', 'plans', 'overlap', 'contact']
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
  const [capacityRecommendation, setCapacityRecommendation] = useState<{ title: string; body: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [addressNote, setAddressNote] = useState('Start typing for Google address suggestions, or enter the address manually.')
  const placesToken = useRef<any>(null)
  const addressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

  const currentIndex = flow.indexOf(step)
  const progress = step === 'intro' ? 0 : step === 'results' ? 100 : ((currentIndex + 1) / flow.length) * 100

  const update = (field: keyof Answers, value: string) => setAnswers((current) => ({ ...current, [field]: value }))
  const show = (next: Step) => { setHistory((items) => [...items, step]); setError(''); setStep(next) }
  const next = () => {
    if (step === 'plans' && ['1', 'exploring'].includes(answers.plannedDeals)) {
      show('contact')
      return
    }
    const index = flow.indexOf(step)
    if (index >= 0 && index < flow.length - 1) show(flow[index + 1])
  }

  const track = (event: string, properties: Record<string, string | number | boolean> = {}) => {
    ;(window as any).dataLayer?.push({ event, page: 'fix-and-flip-calculator', ...properties })
  }

  const startCalculator = () => {
    track('calculator_started')
    show('address')
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
    if (step !== 'address') return
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
          deal: {
            addressKnown: answers.addressKnown, address: answers.address, state: answers.state, zip: answers.zip,
            purchasePrice: dollars(answers.purchasePrice), renovationBudget: dollars(answers.renovationBudget), arv: dollars(answers.arv),
            acquisitionClosingCosts: dollars(answers.acquisitionClosingCosts), monthlyHoldingCosts: dollars(answers.monthlyHoldingCosts),
            projectMonths: Number(answers.projectMonths), propertyType: answers.propertyType, experience: answers.experience,
            credit: answers.credit, plannedDeals: answers.plannedDeals, overlappingProjects: answers.overlappingProjects,
          },
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
      setCapacityRecommendation(data.capacityRecommendation ?? null)
      track('calculator_results_viewed', { optionCount: data.options?.length ?? 0, manualReview: Boolean(data.manualReview) })
      if (data.capacityRecommendation) track('financing_capacity_recommendation_displayed', { productCategory: 'fix-and-flip' })
      setHistory((items) => [...items, 'contact'])
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

  const inputClass = 'w-full rounded-xl border border-[#d4d0ca] bg-white px-4 py-4 text-[#090909] outline-none focus:border-[#555] focus:ring-4 focus:ring-black/5'
  const buttonClass = 'mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#090909] px-6 py-4 font-semibold text-white hover:bg-[#303030] disabled:cursor-not-allowed disabled:opacity-50'
  const options = (items: { value: string; title: string; detail?: string }[], field: keyof Answers) => (
    <div className={`grid gap-3 ${items.length === 4 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((item) => (
        <button key={item.value} type="button" onClick={() => { update(field, item.value); setTimeout(next, 0) }} className="flex min-h-[76px] w-full items-center justify-between rounded-2xl border border-[#d4d0ca] bg-white/60 px-5 py-4 text-left text-[#090909] hover:-translate-y-0.5 hover:border-[#777] hover:bg-white hover:shadow-lg">
          <span><strong className="block text-base">{item.title}</strong>{item.detail && <small className="mt-1 block text-sm text-[#73706b]">{item.detail}</small>}</span><span aria-hidden="true">→</span>
        </button>
      ))}
    </div>
  )

  const heading = useMemo(() => ({
    address: ['Property details', 'Where is the property?', answers.addressKnown ? (apiKey ? 'Choose an address from Google or enter it manually.' : 'Enter the full address, state, and ZIP code.') : 'Just tell us which state you are shopping in.'],
    deal: ['Deal details', 'What are the numbers?', 'Best estimates are fine.'],
    timeline: ['Project timeline', 'How long will the project take?', 'Choose the closest realistic timeline.'],
    property: ['Property type', 'What type of property is it?', 'Choose the closest match.'],
    experience: ['Your experience', 'How many flips have you completed in the last 3 years?', 'This can change the pricing and amount available.'],
    credit: ['Credit', 'Which range is closest to your credit score?', 'No hard credit pull. You can also choose an option that does not use FICO.'],
    plans: ['Your next 12 months', 'How many investment properties do you expect to purchase or renovate?', 'This helps Stevie plan beyond this one deal. It does not determine approval.'],
    overlap: ['Project timing', 'Will any of those projects overlap?', 'A rough answer is enough.'],
    contact: ['One last step', 'Where should we send your results?', 'Enter your details to see the complete comparison now and receive a copy by email.'],
  } as Record<string, string[]>)[step], [step, apiKey, answers.addressKnown])

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

        <section className="flex min-h-screen flex-col px-5 pb-10 pt-5 sm:px-9 lg:px-[clamp(40px,6vw,96px)] lg:pt-8">
          <div className="mb-4 flex items-baseline justify-between gap-4 lg:hidden">
            <Link href="/" className="font-serif text-xl">Mortgage Stevie</Link>
            <span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#777]">Fix &amp; Flip Calculator</span>
          </div>
          <header className="flex min-h-[42px] items-center gap-4">
            <button type="button" onClick={back} className={`font-semibold ${history.length && step !== 'intro' ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>← Back</button>
            <div className="ml-auto h-1 w-full max-w-[360px] overflow-hidden rounded-full bg-[#ddd8d1]"><div className="h-full bg-[#555] transition-all" style={{ width: `${progress}%` }} /></div>
            <span className="min-w-[56px] text-right text-xs text-[#777]">{currentIndex >= 0 ? `${currentIndex + 1} / ${flow.length}` : ''}</span>
          </header>

          <main className="mx-auto my-auto w-full max-w-[720px] py-12 lg:py-16">
            {step === 'intro' && (
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-[#666]">Fix-and-flip calculator</p>
                <h1 className="mb-5 font-serif text-5xl leading-[1] tracking-[-.045em] sm:text-6xl">Run the numbers on your next flip.</h1>
                <p className="max-w-[620px] text-lg leading-7 text-[#65615c]">See estimated financing, cash needed to get started, and carrying cost using current renovation programs. The numbers should be close, but nothing shown is final.</p>
                <button type="button" onClick={startCalculator} className={buttonClass}>Run my numbers <span>→</span></button>
                <p className="mt-4 text-xs text-[#777]">About 2 minutes · No hard credit pull · Free to use</p>
              </div>
            )}

            {heading && step !== 'contact' && (
              <div className="mb-8"><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#666]">{heading[0]}</p><h1 className="mb-3 font-serif text-4xl leading-[1.03] tracking-[-.04em] sm:text-5xl">{heading[1]}</h1><p className="text-base leading-6 text-[#65615c]">{heading[2]}</p></div>
            )}

            {step === 'address' && (
              <form onSubmit={(e) => { e.preventDefault(); next() }}>
                {answers.addressKnown && <>
                  <div className="relative">
                    <label className="mb-2 block text-sm font-semibold">Property address</label>
                    <input required className={inputClass} value={answers.address} onChange={(e) => handleAddressInput(e.target.value)} autoComplete="street-address" placeholder="Start typing the property address" />
                    {suggestions.length > 0 && <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#d4d0ca] bg-white shadow-2xl">{suggestions.map((suggestion, index) => <button key={index} type="button" onClick={() => chooseAddress(suggestion)} className="block w-full border-b border-[#eee] px-4 py-3 text-left text-sm hover:bg-[#f4f4f4]">{suggestion.text?.toString()}</button>)}</div>}
                  </div>
                  <p className="mt-2 text-xs text-[#777]">{addressNote}</p>
                </>}
                <div className={`mt-4 grid gap-3 ${answers.addressKnown ? 'grid-cols-[1fr_1.4fr]' : 'grid-cols-1'}`}>
                  <label className="text-sm font-semibold">State<select required className={`${inputClass} mt-2`} value={answers.state} onChange={(e) => update('state', e.target.value)}><option value="">Select</option>{states.map((state) => <option key={state}>{state}</option>)}</select></label>
                  {answers.addressKnown && <label className="text-sm font-semibold">ZIP code<input required pattern="[0-9]{5}" inputMode="numeric" maxLength={5} className={`${inputClass} mt-2`} value={answers.zip} onChange={(e) => update('zip', e.target.value.replace(/\D/g, '').slice(0, 5))} /></label>}
                </div>
                <button className={buttonClass}>Continue <span>→</span></button>
                <button type="button" onClick={() => setAnswers((current) => ({ ...current, addressKnown: !current.addressKnown, address: '', zip: '' }))} className="ml-4 mt-6 text-sm font-semibold text-[#666] underline underline-offset-4 hover:text-black">{answers.addressKnown ? "I don't have the address yet" : 'I have an address'}</button>
              </form>
            )}

            {step === 'deal' && (
              <form onSubmit={(e) => { e.preventDefault(); next() }}>
                <div className="grid gap-4 sm:grid-cols-3">
                  {([
                    ['purchasePrice', 'Purchase price'],
                    ['renovationBudget', 'Renovation budget'],
                    ['arv', 'After-repair value (ARV)'],
                  ] as [keyof Answers, string][]).map(([field, label]) => <label key={field} className="block text-sm font-semibold">{label}<div className="relative mt-2"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]">$</span><input required inputMode="numeric" className={`${inputClass} pl-8 text-lg`} value={String(answers[field])} onChange={(e) => update(field, formattedMoney(e.target.value))} placeholder="0" /></div></label>)}
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {([
                    ['acquisitionClosingCosts', 'Acquisition closing costs', 'Title, escrow, legal, transfer and other purchase costs'],
                    ['monthlyHoldingCosts', 'Other holding costs per month', 'Taxes, insurance, utilities, HOA and maintenance'],
                  ] as [keyof Answers, string, string][]).map(([field, label, detail]) => <label key={field} className="block text-sm font-semibold">{label}<div className="relative mt-2"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]">$</span><input inputMode="numeric" className={`${inputClass} pl-8`} value={String(answers[field])} onChange={(e) => update(field, formattedMoney(e.target.value))} placeholder="0" /></div><span className="mt-1 block text-xs font-normal leading-5 text-[#777]">{detail}</span></label>)}
                </div>
                <p className="mt-4 text-xs leading-5 text-[#777]">Include labor, materials, permits, and a realistic contingency in the renovation budget. Use a supportable resale estimate for ARV.</p>
                <button className={buttonClass}>Continue <span>→</span></button>
              </form>
            )}

            {step === 'timeline' && options([{value:'6',title:'6 months or less'},{value:'12',title:'7 to 12 months'},{value:'18',title:'More than 12 months'}], 'projectMonths')}
            {step === 'property' && options([{value:'sfr',title:'Single-family home'},{value:'condo',title:'Condo or townhome'},{value:'multi',title:'2 to 4 units'},{value:'other',title:'Manufactured, mixed-use, or other',detail:'Manual review may be needed'}], 'propertyType')}
            {step === 'experience' && options([{value:'0',title:'This is my first flip'},{value:'1-2',title:'1 to 2 completed flips'},{value:'3-5',title:'3 to 5 completed flips'},{value:'6+',title:'6 or more completed flips'}], 'experience')}
            {step === 'credit' && options([{value:'800+',title:'800 or higher'},{value:'700+',title:'700 to 799'},{value:'below700',title:'Below 700'},{value:'noCredit',title:'Use an option without a credit-score requirement',detail:'This removes credit-based programs from the comparison'}], 'credit')}
            {step === 'plans' && options([{value:'1',title:'1'},{value:'2-3',title:'2–3'},{value:'4-6',title:'4–6'},{value:'7+',title:'7+'},{value:'exploring',title:'Still exploring'}], 'plannedDeals')}
            {step === 'overlap' && options([{value:'yes',title:'Yes, I expect more than one underway'},{value:'no',title:'No, I expect to finish one first'},{value:'unsure',title:'Not sure yet'}], 'overlappingProjects')}

            {step === 'contact' && heading && (
              <form onSubmit={submitContact}>
                <div className="mb-8"><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#666]">{heading[0]}</p><h1 className="mb-3 font-serif text-4xl leading-[1.03] tracking-[-.04em] sm:text-5xl">{heading[1]}</h1><p className="text-base leading-6 text-[#65615c]">{heading[2]}</p></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold sm:col-span-2">Full name<input required autoComplete="name" className={`${inputClass} mt-2`} value={answers.name} onChange={(e) => update('name', e.target.value)} /></label>
                  <label className="text-sm font-semibold">Email address<input required type="email" autoComplete="email" className={`${inputClass} mt-2`} value={answers.email} onChange={(e) => update('email', e.target.value)} /></label>
                  <label className="text-sm font-semibold">Phone number<input required type="tel" autoComplete="tel" className={`${inputClass} mt-2`} value={answers.phone} onChange={(e) => update('phone', formattedPhone(e.target.value))} placeholder="555-555-5555" /></label>
                </div>
                <p className="mt-4 text-xs leading-5 text-[#777]">By continuing, you agree that Mortgage Stevie may contact you about this financing request. Your information will not be sold.</p>
                {error && <p role="alert" aria-live="polite" className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
                <button disabled={submitting} className={buttonClass}>{submitting ? 'Calculating your options...' : 'Show my results'} {!submitting && <span>→</span>}</button>
              </form>
            )}

            {step === 'results' && (
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#666]">{dealWarning ? 'Deal check' : 'Your financing options'}</p>
                <h1 className="mb-3 font-serif text-4xl leading-[1.03] tracking-[-.04em] sm:text-5xl">{dealWarning ? 'The numbers show a loss.' : manualReview ? "Let's take a closer look." : 'Here are two ways to fund the deal.'}</h1>
                <p className="mb-8 text-base leading-6 text-[#65615c]">{dealWarning ? "With what you entered, this deal could lose money. We don't want anyone going into a deal that's likely to lose money." : 'These estimates use current program assumptions and should be close to what we may be able to get done. Nothing shown is final.'}</p>
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
                      <span>Other program fees: <strong>{money(dealWarning.otherFees)}</strong></span>
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
                {manualReview ? <div className="rounded-2xl border border-[#d4d0ca] bg-white p-6"><h2 className="font-serif text-2xl">This deal needs a closer look</h2><p className="mt-2 text-[#666]">Stevie can review the property, state, and deal structure to find the best available path.</p></div> : <div className="grid gap-4">{results.map((option, index) => <ResultCard key={option.label} option={option} primary={index === 0} />)}</div>}
                {capacityRecommendation && <div className="mt-6 rounded-2xl border border-[#9eb3c6] bg-[#eef3f7] p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#49647a]">Multiple-project line of credit</p><h2 className="mt-2 font-serif text-2xl">{capacityRecommendation.title}</h2><p className="mt-3 text-sm leading-6 text-[#4f5961]">{capacityRecommendation.body}</p><button type="button" onClick={() => bookCall('financing-capacity')} className="mt-5 rounded-full bg-[#090909] px-5 py-3 text-sm font-semibold text-white">Discuss an investor line</button></div>}
                <div className="mt-7 border-l-2 border-[#777] pl-4 text-sm leading-6 text-[#555]">The financing structures shown are preliminary planning estimates, not approvals or commitments to lend. Stevie will review the specific lender match with you after an application or financing discussion. Rates and terms can change and must be confirmed. Interest assumes the full modeled loan is outstanding for the displayed period; renovation draws may reduce actual interest. Total project cost includes the costs you entered, modeled financing, and selling costs equal to 6% of the sale price. It excludes income taxes and unexpected costs not entered. Return on contributed cash means estimated net profit divided by estimated borrower cash invested through payoff. Final eligibility, pricing, fees, cash needed, and timing depend on lender review, appraisal, title, documentation, property condition, and current program availability. *Appraisal and title fees are conservative estimates.</div>
                {!dealWarning && <div className="mt-8">
                  <button type="button" onClick={() => bookCall('results-primary')} className="rounded-full bg-[#090909] px-6 py-4 text-center font-semibold text-white hover:bg-[#303030]">Discuss this deal with Stevie</button>
                </div>}
              </div>
            )}
          </main>

          <p className="mx-auto mt-auto w-full max-w-[720px] pt-7 text-[11px] leading-5 text-[#817d77]">Current program assumptions can change. This calculator provides a close planning estimate only, not final terms or a commitment to lend. NMLS# 2845865.</p>
        </section>
      </div>
    </div>
  )
}

function ResultCard({ option, primary }: { option: ResultOption; primary: boolean }) {
  return (
    <article className={`rounded-2xl border p-6 shadow-lg ${primary ? 'border-[#090909] bg-[#090909] text-white' : 'border-[#d4d0ca] bg-white text-[#090909]'}`}>
      <div className="flex items-start justify-between gap-4"><div><p className={`text-xs font-bold uppercase tracking-[.16em] ${primary ? 'text-[#aaa]' : 'text-[#777]'}`}>{option.label} · Financing structure</p><h2 className="mt-1 font-serif text-3xl">{option.program}</h2><p className={`mt-1 text-sm ${primary ? 'text-[#aaa]' : 'text-[#666]'}`}>{option.advantage}</p></div><span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs ${primary ? 'bg-white text-black' : 'bg-[#eee] text-black'}`}>{option.rate.toFixed(2)}% · {option.termMonths} mo.</span></div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Metric label="Cash to get started" value={money(option.startupCash)} primary={primary} />
        <Metric label={`Estimated carrying cost (${option.carryingMonths} mo.)`} value={money(option.carryingCost)} primary={primary} />
        <Metric label="Estimated total cash through payoff*" value={money(option.totalCash)} primary={primary} />
      </div>
      <p className={`mt-4 text-sm ${primary ? 'text-[#d0d0d0]' : 'text-[#555]'}`}>Estimated financing: <strong className={primary ? 'text-white' : 'text-black'}>{money(option.loanAmount)}</strong>, including up to <strong className={primary ? 'text-white' : 'text-black'}>{money(option.renovationAdvance)}</strong> for renovation.</p>
      <div className={`mt-5 rounded-xl border p-4 ${primary ? 'border-[#333] bg-[#151515]' : 'border-[#ddd] bg-[#f7f7f7]'}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[.14em] ${primary ? 'text-[#888]' : 'text-[#777]'}`}>Projected deal economics</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Metric label="Estimated total project cost" value={money(option.totalProjectCost)} primary={primary} />
          <Metric label="Estimated net profit" value={money(option.estimatedProfit)} primary={primary} />
          <Metric label="Estimated cash invested" value={money(option.estimatedCashContribution)} primary={primary} />
          <Metric label="Return on contributed cash" value={option.returnOnCash === null ? 'Not available' : `${option.returnOnCash.toFixed(1)}%`} primary={primary} />
          <Metric label="Break-even sale price" value={money(option.breakEvenSalePrice)} primary={primary} />
        </div>
        <details className="mt-4 text-sm"><summary className="cursor-pointer font-semibold">See sensitivity checks</summary><div className={`mt-3 grid gap-2 ${primary ? 'text-[#ccc]' : 'text-[#555]'}`}><span>Sale price 5% lower: <strong>{money(option.sensitivity.salePriceDownFivePercent)}</strong> profit</span><span>Renovation 10% over budget: <strong>{money(option.sensitivity.renovationUpTenPercent)}</strong> profit</span><span>Hold 3 months longer: <strong>{money(option.sensitivity.holdThreeMonthsLonger)}</strong> profit</span></div></details>
      </div>
      <details className={`mt-5 rounded-xl border p-4 text-sm ${primary ? 'border-[#333] bg-[#151515] text-[#d0d0d0]' : 'border-[#ddd] bg-[#f7f7f7] text-[#555]'}`}>
        <summary className="cursor-pointer font-semibold">What is included?</summary>
        <div className="mt-4 grid gap-2">
          <span>Origination fee ({option.originationPercent.toFixed(2)}%): <strong className={primary ? 'text-white' : 'text-black'}>{money(option.originationFee)}</strong></span>
          <span>Other program fees: <strong className={primary ? 'text-white' : 'text-black'}>{money(option.otherFees)}</strong></span>
          <span>Estimated appraisal*: <strong className={primary ? 'text-white' : 'text-black'}>{money(option.appraisalFee)}</strong></span>
          <span>Estimated title fees*: <strong className={primary ? 'text-white' : 'text-black'}>{money(option.titleFee)}</strong></span>
          <span>Acquisition closing costs entered: <strong className={primary ? 'text-white' : 'text-black'}>{money(option.acquisitionClosingCosts)}</strong></span>
          <span>Other holding costs entered: <strong className={primary ? 'text-white' : 'text-black'}>{money(option.nonFinancingHoldingCosts)}</strong></span>
          {option.payoffFee > 0 && <span>Payoff fee, paid later: <strong className={primary ? 'text-white' : 'text-black'}>{money(option.payoffFee)}</strong></span>}
          {option.reserveTarget > 0 && <span>Estimated reserve target, not a fee: <strong className={primary ? 'text-white' : 'text-black'}>{money(option.reserveTarget)}</strong></span>}
        </div>
      </details>
      <ul className={`mt-5 grid gap-2 pl-5 text-sm ${primary ? 'text-[#d0d0d0]' : 'text-[#555]'}`}>{option.reasons.map((reason) => <li key={reason} className="list-disc">{reason}</li>)}</ul>
      {(option.termReview || option.cautions.length > 0) && <div className={`mt-5 rounded-xl p-4 text-xs leading-5 ${primary ? 'bg-[#191919] text-[#bbb]' : 'bg-[#f3f3f3] text-[#666]'}`}>{option.termReview && <p className="mb-2 font-bold">Your project timeline is longer than this modeled term. An extension or different structure may be needed.</p>}{option.cautions.map((caution) => <p key={caution}>• {caution}</p>)}</div>}
    </article>
  )
}

function Metric({ label, value, primary }: { label: string; value: string; primary: boolean }) {
  return <div><p className={`text-[10px] uppercase tracking-[.14em] ${primary ? 'text-[#888]' : 'text-[#777]'}`}>{label}</p><p className="mt-1 text-lg font-semibold">{value}</p></div>
}
