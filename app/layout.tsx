import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Insurance Calculators — Free Insurance Estimates',
  description:
    'Free insurance calculators for life, auto, home, health, disability and renters insurance. Estimate your coverage needs and monthly premiums instantly. No signup required.',
  keywords: [
    'insurance calculator',
    'life insurance calculator',
    'auto insurance calculator',
    'home insurance calculator',
    'health insurance calculator',
    'disability insurance calculator',
    'renters insurance calculator',
    'how much life insurance do I need',
    'insurance cost estimator',
    'term vs whole life insurance',
  ],
  metadataBase: new URL('https://insurancecalculators.app'),
  alternates: { canonical: 'https://insurancecalculators.app' },
  openGraph: {
    title: 'Insurance Calculators — Free Insurance Estimates',
    description:
      'Free insurance calculators for life, auto, home, health, disability and renters insurance. Estimate your coverage needs and premiums instantly.',
    url: 'https://insurancecalculators.app',
    siteName: 'insurancecalculators.app',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Free Insurance Calculators' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insurance Calculators — Free Insurance Estimates',
    description: 'Free insurance calculators for life, auto, home, health and more. No signup.',
    images: ['/twitter-image.png'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8792838105001561" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ic-theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#0f172a] text-gray-900 dark:text-[#e2e8f0]" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8792838105001561"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
