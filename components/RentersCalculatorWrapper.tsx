'use client'

import dynamic from 'next/dynamic'

const RentersCalculator = dynamic(() => import('./RentersCalculator'), { ssr: false })

export default function RentersCalculatorWrapper() {
  return <RentersCalculator />
}
