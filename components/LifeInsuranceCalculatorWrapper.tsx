'use client'

import dynamic from 'next/dynamic'

const LifeInsuranceCalculator = dynamic(() => import('./LifeInsuranceCalculator'), { ssr: false })

export default function LifeInsuranceCalculatorWrapper() {
  return <LifeInsuranceCalculator />
}
