'use client'

import dynamic from 'next/dynamic'

const DeductibleCalculator = dynamic(() => import('./DeductibleCalculator'), { ssr: false })

export default function DeductibleCalculatorWrapper() {
  return <DeductibleCalculator />
}
