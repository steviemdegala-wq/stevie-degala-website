'use client'

const MEDICAL_PROFESSIONS = [
  'Doctor of Medicine (MD)',
  'Doctor of Osteopathy (DO)',
  'Doctor of Dental Science or Surgery (DDS)',
  'Doctor of Dental Medicine (DMD)',
  'Doctor of Ophthalmology (MD or DO)',
  'Doctor of Optometry (OD)',
  'Doctor of Psychiatry (MD or DO)',
  'Doctor of Pharmacy (PharmD)',
  'Doctor of Veterinary Medicine (DVM or VMD)',
  'Doctor of Podiatric Medicine (DPM)',
  'Certified Registered Nurse Anesthetist (CRNA)',
  'Physician Assistant (PA)',
  'Registered Nurse (RN)',
  'Nurse Practitioner (NP)',
  'Clinical Nurse Specialist (CNS)',
  'Chiropractor (DC)',
  'Medical Residents, Fellows & Interns',
]

export default function MedicalProfessionsTicker() {
  const doubled = [...MEDICAL_PROFESSIONS, ...MEDICAL_PROFESSIONS]

  return (
    <div className="relative overflow-hidden" style={{ height: '352px' }}>
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-8 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #0A0A0A, transparent)' }} />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-8 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }} />

      <div
        className="flex flex-col gap-2"
        style={{
          animation: 'ticker-scroll 28s linear infinite',
        }}
      >
        {doubled.map((profession, i) => (
          <div
            key={i}
            className="bg-[#111111] border border-[#2E2E2E] px-5 py-3 rounded-lg flex items-center gap-3 flex-shrink-0"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#444444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[#C4C4C4] text-sm">{profession}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  )
}
