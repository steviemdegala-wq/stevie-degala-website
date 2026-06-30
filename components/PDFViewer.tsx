'use client'

import { useState, useEffect } from 'react'

type PDFResource = {
  title: string
  excerpt: string
  file: string
  label: string
  date: string
}

export default function PDFViewer({ pdfs }: { pdfs: PDFResource[] }) {
  const [activePDF, setActivePDF] = useState<PDFResource | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePDF(null)
    }
    if (activePDF) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [activePDF])

  return (
    <>
      {pdfs.map((pdf) => (
        <button
          key={pdf.file}
          onClick={() => setActivePDF(pdf)}
          className="card-hover w-full text-left block group border border-white/40 bg-white backdrop-blur-sm rounded-xl p-8"
        >
          <p className="text-[#555555] text-xs uppercase tracking-widest mb-3">
            {pdf.date} · Weekly Market Update · {pdf.label}
          </p>
          <h2 className="text-[#0A0A0A] text-2xl font-semibold mb-3 group-hover:text-[#3A3A3A] transition-colors">
            {pdf.title}
          </h2>
          <p className="text-[#3A3A3A] text-sm leading-relaxed mb-4">{pdf.excerpt}</p>
          <span className="text-[#555555] text-sm group-hover:text-[#0A0A0A] transition-colors">
            Read now →
          </span>
        </button>
      ))}

      {activePDF && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setActivePDF(null) }}
        >
          <div className="relative w-full max-w-5xl" style={{ height: '90vh' }}>
            <button
              onClick={() => setActivePDF(null)}
              className="absolute -top-8 right-0 text-[#888888] hover:text-[#F8F8F8] transition-colors text-2xl leading-none z-10"
              aria-label="Close"
            >
              &times;
            </button>
            <iframe
              src={activePDF.file}
              className="w-full h-full rounded-xl"
              title={activePDF.title}
            />
          </div>
        </div>
      )}
    </>
  )
}
