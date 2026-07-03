'use client'

import dynamic from 'next/dynamic'

const HealthInsuranceCalculator = dynamic(() => import('./HealthInsuranceCalculator'), { ssr: false })

export default function HealthInsuranceCalculatorWrapper() {
  return <HealthInsuranceCalculator />
}
