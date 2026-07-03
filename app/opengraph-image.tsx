import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Free Insurance Calculators'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <svg width="80" height="86" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 28 }}>
          <path
            d="M14 2L3 7V15C3 21.5 7.8 27.5 14 29C20.2 27.5 25 21.5 25 15V7L14 2Z"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="rgba(255,255,255,0.2)"
          />
        </svg>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          Free Insurance Calculators
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.75)',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: 800,
          }}
        >
          Life, auto, home, health, disability and renters insurance estimates. Instant, free, private.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Free', 'Instant', 'Private', 'No Signup'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 100,
                padding: '8px 22px',
                color: 'white',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
