'use client'

import dynamic from 'next/dynamic'

const AutoInsuranceCalculator = dynamic(() => import('./AutoInsuranceCalculator'), { ssr: false })

export default function AutoInsuranceCalculatorWrapper() {
  return <AutoInsuranceCalculator />
}
