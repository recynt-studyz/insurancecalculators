'use client'

import dynamic from 'next/dynamic'

const HomeInsuranceCalculator = dynamic(() => import('./HomeInsuranceCalculator'), { ssr: false })

export default function HomeInsuranceCalculatorWrapper() {
  return <HomeInsuranceCalculator />
}
