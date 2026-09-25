'use client'

export default function FindMyLoanClient() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
  const questionnaireUrl = googleMapsApiKey
    ? `/find-my-loan-questionnaire.html?googleMapsApiKey=${encodeURIComponent(googleMapsApiKey)}`
    : '/find-my-loan-questionnaire.html'

  return (
    <main className="fixed inset-0 z-[100] bg-[#090909]">
      <iframe
        title="Mortgage Stevie loan questionnaire"
        src={questionnaireUrl}
        className="h-full w-full border-0"
        allow="clipboard-write"
      />
    </main>
  )
}
