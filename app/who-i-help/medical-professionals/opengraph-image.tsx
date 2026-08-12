import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Physician Loans for Medical Professionals in Northern Colorado — Stevie de Gala'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5C8AA5' }} />
          <span style={{ color: '#888888', fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>
            Who I Help · Medical Professionals
          </span>
        </div>

        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {['MD', 'DO', 'DDS', 'PharmD', 'NP', 'PA', 'CRNA'].map((deg) => (
              <span
                key={deg}
                style={{
                  color: '#555555',
                  fontSize: '13px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontFamily: 'Georgia, serif',
                  border: '1px solid #2E2E2E',
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}
              >
                {deg}
              </span>
            ))}
          </div>
          <div style={{ color: '#F8F8F8', fontSize: '56px', lineHeight: 1.1, fontFamily: 'Georgia, serif', maxWidth: '900px' }}>
            A physician loan built for the way you actually earn.
          </div>
          <p style={{ color: '#C4C4C4', fontSize: '22px', lineHeight: 1.5, maxWidth: '700px', fontFamily: 'Georgia, serif' }}>
            Zero down. No PMI. Student debt treated differently. Northern Colorado's specialist.
          </p>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#555555', fontSize: '14px', fontFamily: 'Georgia, serif' }}>
            Stevie de Gala · NMLS# 2845865 · mortgagestevie.com
          </span>
          <div
            style={{
              background: '#5C8AA5',
              color: '#F8F8F8',
              padding: '10px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.05em',
            }}
          >
            Book a Free Call
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
