'use client'

import { useState, useEffect, useCallback } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'ic-auto'

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
]

export default function AutoInsuranceCalculator() {
  const [driverAge, setDriverAge] = useState('35')
  const [record, setRecord] = useState('clean')
  const [vehicleYear, setVehicleYear] = useState('2022')
  const [vehicleValue, setVehicleValue] = useState('25000')
  const [annualMiles, setAnnualMiles] = useState('12000')
  const [coverageType, setCoverageType] = useState('full')
  const [deductible, setDeductible] = useState('500')
  const [state, setState] = useState('California')
  const [creditScore, setCreditScore] = useState('good')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.driverAge) setDriverAge(p.driverAge)
        if (p.record) setRecord(p.record)
        if (p.vehicleYear) setVehicleYear(p.vehicleYear)
        if (p.vehicleValue) setVehicleValue(p.vehicleValue)
        if (p.annualMiles) setAnnualMiles(p.annualMiles)
        if (p.coverageType) setCoverageType(p.coverageType)
        if (p.deductible) setDeductible(p.deductible)
        if (p.state) setState(p.state)
        if (p.creditScore) setCreditScore(p.creditScore)
      }
    } catch { /* ignore */ }
  }, [])

  const save = useCallback((updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }, [])

  const age = parseInt(driverAge) || 35
  const value = parseFloat(vehicleValue) || 0
  const miles = parseFloat(annualMiles) || 0

  const ageFactor = age < 25 ? 1.8 : age > 65 ? 1.2 : 1.0
  const recordFactor = record === 'clean' ? 1.0 : record === 'minor' ? 1.25 : 1.75
  const vehicleValueFactor = value / 20000
  const coverageFactor = coverageType === 'liability' ? 0.6 : coverageType === 'collision' ? 0.85 : 1.0
  const deductibleFactor = deductible === '500' ? 1.0 : deductible === '1000' ? 0.9 : 0.8
  const creditFactor = creditScore === 'excellent' ? 0.9 : creditScore === 'good' ? 1.0 : creditScore === 'fair' ? 1.1 : 1.25
  const milesFactor = miles < 7500 ? 0.9 : miles > 15000 ? 1.1 : 1.0

  const annual = 1500 * ageFactor * recordFactor * vehicleValueFactor * coverageFactor * deductibleFactor * creditFactor * milesFactor
  const monthly = annual / 12

  const liabilityAmt = annual * 0.40
  const collisionAmt = coverageType !== 'liability' ? annual * 0.38 : 0
  const comprehensiveAmt = coverageType === 'full' ? annual * 0.22 : 0

  const factors: { label: string; impact: string; positive: boolean }[] = []
  if (age < 25) factors.push({ label: 'Young driver (under 25)', impact: '+80%', positive: false })
  else if (age > 65) factors.push({ label: 'Senior driver (over 65)', impact: '+20%', positive: false })
  else factors.push({ label: 'Standard age (25-65)', impact: 'no surcharge', positive: true })

  if (record === 'clean') factors.push({ label: 'Clean driving record', impact: '-0%', positive: true })
  else if (record === 'minor') factors.push({ label: 'Minor violations on record', impact: '+25%', positive: false })
  else factors.push({ label: 'Major violation/DUI on record', impact: '+75%', positive: false })

  if (creditScore === 'excellent') factors.push({ label: 'Excellent credit score', impact: '-10%', positive: true })
  else if (creditScore === 'poor') factors.push({ label: 'Poor credit score', impact: '+25%', positive: false })

  if (miles < 7500) factors.push({ label: 'Low annual mileage', impact: '-10%', positive: true })
  else if (miles > 15000) factors.push({ label: 'High annual mileage', impact: '+10%', positive: false })

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-blue-600'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
  const pillCls = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
      active
        ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]'
        : 'bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-400'
    }`

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Driver Age</label>
              <input type="number" value={driverAge} onChange={e => { setDriverAge(e.target.value); save({ driverAge: e.target.value }) }} className={inputCls} min="16" max="90" />
            </div>
            <div>
              <label className={labelCls}>Vehicle Year</label>
              <input type="number" value={vehicleYear} onChange={e => { setVehicleYear(e.target.value); save({ vehicleYear: e.target.value }) }} className={inputCls} min="1990" max="2026" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Driving Record</label>
            <div className="flex flex-wrap gap-2">
              {[['clean', 'Clean'], ['minor', 'Minor Violations'], ['major', 'Major/DUI']].map(([v, l]) => (
                <button key={v} onClick={() => { setRecord(v); save({ record: v }) }} className={pillCls(record === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Vehicle Value</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={vehicleValue} onChange={e => { setVehicleValue(e.target.value); save({ vehicleValue: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Annual Miles Driven</label>
            <input type="number" value={annualMiles} onChange={e => { setAnnualMiles(e.target.value); save({ annualMiles: e.target.value }) }} className={inputCls} min="0" />
          </div>

          <div>
            <label className={labelCls}>Coverage Type</label>
            <div className="flex flex-wrap gap-2">
              {[['liability', 'Liability Only'], ['collision', 'Liability + Collision'], ['full', 'Full Coverage']].map(([v, l]) => (
                <button key={v} onClick={() => { setCoverageType(v); save({ coverageType: v }) }} className={pillCls(coverageType === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Deductible</label>
            <div className="flex gap-2">
              {[['500', '$500'], ['1000', '$1,000'], ['2000', '$2,000']].map(([v, l]) => (
                <button key={v} onClick={() => { setDeductible(v); save({ deductible: v }) }} className={pillCls(deductible === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Credit Score</label>
            <div className="flex flex-wrap gap-2">
              {[['excellent', 'Excellent'], ['good', 'Good'], ['fair', 'Fair'], ['poor', 'Poor']].map(([v, l]) => (
                <button key={v} onClick={() => { setCreditScore(v); save({ creditScore: v }) }} className={pillCls(creditScore === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>State</label>
            <select value={state} onChange={e => { setState(e.target.value); save({ state: e.target.value }) }} className={inputCls}>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-5">
            <p className="text-sm text-blue-800 dark:text-blue-400 font-medium mb-1">Estimated Annual Premium</p>
            <p className="text-4xl font-bold text-[#1e3a8a] dark:text-blue-300">{fmt(annual)}</p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Monthly: <span className="font-semibold">{fmt(monthly)}/month</span></p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Coverage Breakdown (estimated)</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Liability</span>
                <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(liabilityAmt)}/yr</span>
              </div>
              {collisionAmt > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Collision</span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(collisionAmt)}/yr</span>
                </div>
              )}
              {comprehensiveAmt > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Comprehensive</span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(comprehensiveAmt)}/yr</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Factors Affecting Your Rate</p>
            <div className="space-y-2">
              {factors.map(f => (
                <div key={f.label} className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                    <span>{f.positive ? '✅' : '⚠️'}</span> {f.label}
                  </span>
                  <span className={`font-medium ${f.positive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{f.impact}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/20 p-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">How to Lower Your Auto Insurance Premium</p>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>• Bundle auto and home insurance for multi-policy discounts up to 25%</li>
              <li>• Raise your deductible from $500 to $1,000 to save ~10% on your premium</li>
              <li>• Ask about good driver, good student, and low-mileage discounts</li>
              <li>• Improve your credit score — insurers use it as a rating factor in most states</li>
              <li>• Shop and compare quotes from at least 3 insurers every renewal period</li>
            </ul>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            This calculator provides estimates for educational purposes only. Actual insurance premiums vary based on your specific situation, insurer, location, and other factors. Consult a licensed insurance agent for accurate quotes and coverage recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}
