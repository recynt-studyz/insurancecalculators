import { ImageResponse } from 'next/og'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        <svg
          width="28"
          height="30"
          viewBox="0 0 28 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2L3 7V15C3 21.5 7.8 27.5 14 29C20.2 27.5 25 21.5 25 15V7L14 2Z"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="rgba(255,255,255,0.15)"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
