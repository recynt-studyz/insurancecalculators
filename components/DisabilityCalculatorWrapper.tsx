'use client'

import dynamic from 'next/dynamic'

const DisabilityCalculator = dynamic(() => import('./DisabilityCalculator'), { ssr: false })

export default function DisabilityCalculatorWrapper() {
  return <DisabilityCalculator />
}
