import { ImageResponse } from 'next/og'
import { getPost } from '@/lib/posts'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  const title = post?.title ?? 'Mortgage Insights — Stevie de Gala'
  const excerpt = post?.excerpt ?? 'Physician loans, VA loans, and mortgage advice for Northern Colorado.'

  // Truncate title if too long
  const displayTitle = title.length > 70 ? title.slice(0, 67) + '...' : title
  const displayExcerpt = excerpt.length > 120 ? excerpt.slice(0, 117) + '...' : excerpt

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
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7A9E5C' }} />
          <span style={{ color: '#888888', fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>
            mortgagestevie.com · Blog
          </span>
        </div>

        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              color: '#F8F8F8',
              fontSize: title.length > 50 ? '44px' : '52px',
              lineHeight: 1.15,
              fontFamily: 'Georgia, serif',
              maxWidth: '960px',
            }}
          >
            {displayTitle}
          </div>
          <p style={{ color: '#888888', fontSize: '20px', lineHeight: 1.5, maxWidth: '800px', fontFamily: 'Georgia, serif' }}>
            {displayExcerpt}
          </p>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#555555', fontSize: '14px', fontFamily: 'Georgia, serif' }}>
            Stevie de Gala · NMLS# 2845865 · Northern Colorado Mortgage Consultant
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
