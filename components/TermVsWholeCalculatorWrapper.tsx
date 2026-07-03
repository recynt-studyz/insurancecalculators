'use client'

import dynamic from 'next/dynamic'

const TermVsWholeCalculator = dynamic(() => import('./TermVsWholeCalculator'), { ssr: false })

export default function TermVsWholeCalculatorWrapper() {
  return <TermVsWholeCalculator />
}
