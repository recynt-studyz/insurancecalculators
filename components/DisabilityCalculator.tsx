'use client'

import { useState, useEffect, useCallback } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'ic-disability'

export default function DisabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('6000')
  const [occupation, setOccupation] = useState('office')
  const [age, setAge] = useState('35')
  const [existingCoverage, setExistingCoverage] = useState('0')
  const [elimination, setElimination] = useState('90')
  const [benefitPeriod, setBenefitPeriod] = useState('age65')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.monthlyIncome) setMonthlyIncome(p.monthlyIncome)
        if (p.occupation) setOccupation(p.occupation)
        if (p.age) setAge(p.age)
        if (p.existingCoverage) setExistingCoverage(p.existingCoverage)
        if (p.elimination) setElimination(p.elimination)
        if (p.benefitPeriod) setBenefitPeriod(p.benefitPeriod)
      }
    } catch { /* ignore */ }
  }, [])

  const save = useCallback((updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }, [])

  const gross = parseFloat(monthlyIncome) || 0
  const existing = parseFloat(existingCoverage) || 0
  const annualIncome = gross * 12

  const recommendedBenefit = gross * 0.65
  const coverageGap = Math.max(0, recommendedBenefit - existing)

  const occupationFactor = occupation === 'office' ? 1.0 : occupation === 'light' ? 1.2 : occupation === 'heavy' ? 1.5 : 2.0
  const eliminationFactor = elimination === '30' ? 1.0 : elimination === '60' ? 0.9 : elimination === '90' ? 0.8 : 0.65
  const benefitFactor = benefitPeriod === '2yr' ? 0.7 : benefitPeriod === '5yr' ? 0.9 : 1.0

  const stdMonthlyPremium = (annualIncome * 0.004 / 12) * occupationFactor
  const ltdMonthlyPremium = (annualIncome * 0.025 / 12) * occupationFactor * eliminationFactor * benefitFactor

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
          <div>
            <label className={labelCls}>Gross Monthly Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={monthlyIncome} onChange={e => { setMonthlyIncome(e.target.value); save({ monthlyIncome: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Occupation Type</label>
            <div className="flex flex-wrap gap-2">
              {[['office', 'Office/Professional'], ['light', 'Light Manual'], ['heavy', 'Heavy Manual'], ['highrisk', 'High Risk']].map(([v, l]) => (
                <button key={v} onClick={() => { setOccupation(v); save({ occupation: v }) }} className={pillCls(occupation === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Age</label>
            <input type="number" value={age} onChange={e => { setAge(e.target.value); save({ age: e.target.value }) }} className={inputCls} min="18" max="64" />
          </div>

          <div>
            <label className={labelCls}>Existing Disability Coverage <span className="text-gray-400 font-normal">(employer-provided)</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={existingCoverage} onChange={e => { setExistingCoverage(e.target.value); save({ existingCoverage: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">/mo</span>
            </div>
          </div>

          <div>
            <label className={labelCls}>Elimination Period <span className="text-gray-400 font-normal">(waiting period before benefits begin)</span></label>
            <div className="flex flex-wrap gap-2">
              {[['30', '30 days'], ['60', '60 days'], ['90', '90 days'], ['180', '180 days']].map(([v, l]) => (
                <button key={v} onClick={() => { setElimination(v); save({ elimination: v }) }} className={pillCls(elimination === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Benefit Period</label>
            <div className="flex flex-wrap gap-2">
              {[['2yr', '2 Years'], ['5yr', '5 Years'], ['age65', 'To Age 65']].map(([v, l]) => (
                <button key={v} onClick={() => { setBenefitPeriod(v); save({ benefitPeriod: v }) }} className={pillCls(benefitPeriod === v)}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-5">
            <p className="text-sm text-blue-800 dark:text-blue-400 font-medium mb-1">Recommended Monthly Benefit</p>
            <p className="text-4xl font-bold text-[#1e3a8a] dark:text-blue-300">{fmt(recommendedBenefit)}</p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Coverage gap: <span className="font-semibold">{fmt(coverageGap)}/month</span> after existing coverage
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">65% of {fmt(gross)} gross monthly income</p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Premium Estimates</p>
            <div className="space-y-3">
              <div className="rounded-lg bg-gray-50 dark:bg-[#0f172a] p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-[#e2e8f0]">Short-Term Disability</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Coverage begins after {elimination}-day elimination period</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-[#e2e8f0]">~{fmt(stdMonthlyPremium)}<span className="text-xs font-normal text-gray-500">/mo</span></span>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 dark:bg-[#0f172a] p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-[#e2e8f0]">Long-Term Disability</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Benefit period: {benefitPeriod === 'age65' ? 'to age 65' : benefitPeriod}</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-[#e2e8f0]">~{fmt(ltdMonthlyPremium)}<span className="text-xs font-normal text-gray-500">/mo</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-100 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-4 space-y-2">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Disability Insurance Facts</p>
            <p className="text-sm text-amber-700 dark:text-amber-400">1 in 4 workers will experience a disability before retirement that prevents them from working.</p>
            <p className="text-sm text-amber-700 dark:text-amber-400">The average long-term disability claim lasts 31.6 months — nearly 3 years of lost income.</p>
            <p className="text-sm text-amber-700 dark:text-amber-400">Most employer plans only cover 60% of base salary and exclude bonuses and commissions.</p>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            This calculator provides estimates for educational purposes only. Actual insurance premiums vary based on your specific situation, insurer, location, and other factors. Consult a licensed insurance agent for accurate quotes and coverage recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}
