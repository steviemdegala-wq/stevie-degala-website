import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const runtime = 'nodejs'
export const alt = 'Stevie de Gala — Northern Colorado Investor Mortgage Broker'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const [headingFont, bodyFont, icon] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/DMSerifDisplay-Regular.ttf')),
    readFile(join(process.cwd(), 'public/fonts/Inter-Regular.ttf')),
    readFile(join(process.cwd(), 'app/icon.png')),
  ])

  return new ImageResponse(
    (
      <div style={{
        background: '#0A0A0A', width: '100%', height: '100%', display: 'flex',
        flexDirection: 'column', justifyContent: 'space-between', padding: '64px 80px',
        color: '#F8F8F8', fontFamily: 'Inter',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Use the actual website favicon, not a generic accent dot. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${icon.toString('base64')}`} width={48} height={48} alt="" />
          <span style={{ color: '#C4C4C4', fontSize: '20px', letterSpacing: '0.06em' }}>
            mortgagestevie.com
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span style={{ color: '#AAAAAA', fontSize: '17px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Northern Colorado
          </span>
          <div style={{ fontFamily: 'DM Serif Display', fontSize: '76px', lineHeight: 1.04, letterSpacing: '-0.025em', maxWidth: '1000px' }}>
            Investor Financing. Northern Colorado.
          </div>
          <p style={{ color: '#C4C4C4', fontSize: '24px', lineHeight: 1.5, maxWidth: '940px', margin: '0' }}>
            Hard money, DSCR loans, and investor lines of credit. Fort Collins · Greeley · Loveland · Timnath · Windsor · Severance.
          </p>
        </div>
        <span style={{ color: '#AAAAAA', fontSize: '18px' }}>
          Stevie de Gala · NMLS# 2845865
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'DM Serif Display', data: headingFont, weight: 400, style: 'normal' },
        { name: 'Inter', data: bodyFont, weight: 400, style: 'normal' },
      ],
    }
  )
}
