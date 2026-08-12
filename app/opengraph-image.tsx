import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Stevie de Gala — Northern Colorado Medical Professional Loan Consultant'
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
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#7A9E5C',
            }}
          />
          <span style={{ color: '#888888', fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>
            mortgagestevie.com
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span style={{ color: '#888888', fontSize: '16px', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>
            Northern Colorado
          </span>
          <div
            style={{
              color: '#F8F8F8',
              fontSize: '58px',
              lineHeight: 1.1,
              fontFamily: 'Georgia, serif',
              maxWidth: '900px',
            }}
          >
            Medical Professional Loan Consultant.
          </div>
          <p style={{ color: '#C4C4C4', fontSize: '22px', lineHeight: 1.5, maxWidth: '700px', fontFamily: 'Georgia, serif' }}>
            Physician loans, VA loans, and investor financing. Fort Collins · Greeley · Loveland · Timnath · Windsor · Severance.
          </p>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#555555', fontSize: '14px', fontFamily: 'Georgia, serif' }}>
            Stevie de Gala · NMLS# 2845865
          </span>
          <div
            style={{
              background: '#7A9E5C',
              color: '#0A0A0A',
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
