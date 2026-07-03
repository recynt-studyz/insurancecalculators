'use client'

import { useState, useEffect, useCallback } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'ic-health'

const FPL_BASE: Record<number, number> = { 1: 15060, 2: 20440, 3: 25820, 4: 31200, 5: 36580, 6: 41960 }
function getFPL(size: number): number {
  if (size <= 6) return FPL_BASE[size] || 15060
  return FPL_BASE[6] + (size - 6) * 5380
}

function getMaxContributionPct(incomePct: number): number {
  if (incomePct < 1.0) return 0
  if (incomePct < 1.33) return 0
  if (incomePct < 1.5) return 0.03
  if (incomePct < 2.0) return 0.04
  if (incomePct < 2.5) return 0.06
  if (incomePct < 3.0) return 0.085
  if (incomePct < 4.0) return 0.10
  return Infinity
}

const PLAN_BASES: Record<string, { base: number; deductible: string; oop: string }> = {
  bronze:   { base: 400, deductible: '$7,500', oop: '$9,450' },
  silver:   { base: 500, deductible: '$4,500', oop: '$7,900' },
  gold:     { base: 600, deductible: '$1,500', oop: '$6,000' },
  platinum: { base: 700, deductible: '$250',   oop: '$4,500' },
}

function calcPremium(base: number, age: number, smoker: boolean, familyMult: number): number {
  const ageFactor = 1 + (Math.max(age, 21) - 21) * 0.03
  return base * ageFactor * (smoker ? 1.5 : 1.0) * familyMult
}

export default function HealthInsuranceCalculator() {
  const [coverageFor, setCoverageFor] = useState('individual')
  const [primaryAge, setPrimaryAge] = useState('35')
  const [spouseAge, setSpouseAge] = useState('33')
  const [numChildren, setNumChildren] = useState('0')
  const [income, setIncome] = useState('60000')
  const [tobacco, setTobacco] = useState(false)
  const [planType, setPlanType] = useState('silver')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.coverageFor) setCoverageFor(p.coverageFor)
        if (p.primaryAge) setPrimaryAge(p.primaryAge)
        if (p.spouseAge) setSpouseAge(p.spouseAge)
        if (p.numChildren) setNumChildren(p.numChildren)
        if (p.income) setIncome(p.income)
        if (p.tobacco !== undefined) setTobacco(p.tobacco)
        if (p.planType) setPlanType(p.planType)
      }
    } catch { /* ignore */ }
  }, [])

  const save = useCallback((updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }, [])

  const age = parseInt(primaryAge) || 35
  const kids = parseInt(numChildren) || 0
  const annualIncome = parseFloat(income) || 0

  const householdSize = coverageFor === 'individual' ? 1 : coverageFor === 'couple' ? 2 : coverageFor === 'mechildren' ? 1 + kids : 2 + kids
  const familyMult = coverageFor === 'individual' ? 1.0 : coverageFor === 'couple' ? 1.8 : coverageFor === 'mechildren' ? (kids >= 3 ? 1.7 : kids === 2 ? 1.5 : 1.3) : 2.5

  const selectedPlan = PLAN_BASES[planType]
  const monthlyPremium = calcPremium(selectedPlan.base, age, tobacco, familyMult)
  const annualPremium = monthlyPremium * 12

  const fpl = getFPL(householdSize)
  const incomePct = annualIncome / fpl
  const maxContribPct = getMaxContributionPct(incomePct)
  const eligible = maxContribPct < Infinity && annualIncome > 0
  const monthlySubsidy = eligible
    ? Math.max(0, (annualPremium - annualIncome * maxContribPct) / 12)
    : 0
  const afterSubsidy = Math.max(0, monthlyPremium - monthlySubsidy)

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-blue-600'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
  const pillCls = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
      active
        ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]'
        : 'bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-400'
    }`

  const planDescriptions: Record<string, string> = {
    bronze: 'Lowest premiums, highest deductible. Best if rarely use healthcare.',
    silver: 'Moderate premiums and deductibles. Best for subsidy-eligible individuals.',
    gold: 'Higher premiums, lower deductible. Best if you use healthcare frequently.',
    platinum: 'Highest premiums, lowest deductible. Best for extensive ongoing care.',
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Coverage For</label>
            <div className="flex flex-wrap gap-2">
              {[['individual', 'Just Me'], ['couple', 'Me + Spouse'], ['mechildren', 'Me + Children'], ['family', 'Family']].map(([v, l]) => (
                <button key={v} onClick={() => { setCoverageFor(v); save({ coverageFor: v }) }} className={pillCls(coverageFor === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Your Age</label>
              <input type="number" value={primaryAge} onChange={e => { setPrimaryAge(e.target.value); save({ primaryAge: e.target.value }) }} className={inputCls} min="18" max="64" />
            </div>
            {(coverageFor === 'couple' || coverageFor === 'family') && (
              <div>
                <label className={labelCls}>Spouse Age</label>
                <input type="number" value={spouseAge} onChange={e => { setSpouseAge(e.target.value); save({ spouseAge: e.target.value }) }} className={inputCls} min="18" max="64" />
              </div>
            )}
          </div>

          {(coverageFor === 'mechildren' || coverageFor === 'family') && (
            <div>
              <label className={labelCls}>Number of Children</label>
              <div className="flex items-center gap-3">
                <button onClick={() => { const v = Math.max(0, kids - 1).toString(); setNumChildren(v); save({ numChildren: v }) }} className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 font-bold text-lg hover:border-blue-400 transition">−</button>
                <span className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0] w-8 text-center">{kids}</span>
                <button onClick={() => { const v = Math.min(6, kids + 1).toString(); setNumChildren(v); save({ numChildren: v }) }} className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 font-bold text-lg hover:border-blue-400 transition">+</button>
              </div>
            </div>
          )}

          <div>
            <label className={labelCls}>Annual Household Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={income} onChange={e => { setIncome(e.target.value); save({ income: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
            <p className="text-xs text-gray-400 mt-1">Household size: {householdSize} · 2026 FPL: {fmt(fpl)}</p>
          </div>

          <div className="flex items-center justify-between">
            <label className={`${labelCls} mb-0`}>Tobacco Use <span className="text-red-500 font-normal">(+50% surcharge)</span></label>
            <button
              onClick={() => { setTobacco(!tobacco); save({ tobacco: !tobacco }) }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${tobacco ? 'bg-[#1e3a8a]' : 'bg-gray-200 dark:bg-gray-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${tobacco ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div>
            <label className={labelCls}>Plan Type</label>
            <div className="flex flex-wrap gap-2">
              {['bronze', 'silver', 'gold', 'platinum'].map(p => (
                <button key={p} onClick={() => { setPlanType(p); save({ planType: p }) }} className={pillCls(planType === p)}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{planDescriptions[planType]}</p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-5">
            <p className="text-sm text-blue-800 dark:text-blue-400 font-medium mb-1">Estimated Monthly Premium</p>
            <p className="text-4xl font-bold text-[#1e3a8a] dark:text-blue-300">{fmt(monthlyPremium)}</p>
            {eligible && monthlySubsidy > 0 && (
              <>
                <p className="text-sm text-green-700 dark:text-green-400 mt-2">After subsidy: <span className="font-semibold">{fmt(afterSubsidy)}/month</span></p>
                <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">Annual subsidy savings: {fmt(monthlySubsidy * 12)}</p>
              </>
            )}
            {!eligible && annualIncome > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Income above 400% FPL — not eligible for ACA subsidies</p>
            )}
          </div>

          {/* Plan comparison table */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 overflow-x-auto">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Plan Comparison</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left pb-2 font-medium">Plan</th>
                  <th className="text-right pb-2 font-medium">Monthly</th>
                  <th className="text-right pb-2 font-medium">Deductible</th>
                  <th className="text-right pb-2 font-medium">OOP Max</th>
                </tr>
              </thead>
              <tbody>
                {['bronze', 'silver', 'gold', 'platinum'].map(p => {
                  const plan = PLAN_BASES[p]
                  const mo = calcPremium(plan.base, age, tobacco, familyMult)
                  const isSelected = p === planType
                  return (
                    <tr key={p} className={`border-b border-gray-50 dark:border-gray-700/50 ${isSelected ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}>
                      <td className={`py-2 font-medium ${isSelected ? 'text-[#1e3a8a] dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                        {isSelected && <span className="ml-1 text-xs text-blue-500">✓</span>}
                      </td>
                      <td className="text-right py-2 text-gray-800 dark:text-[#e2e8f0]">{fmt(mo)}</td>
                      <td className="text-right py-2 text-gray-600 dark:text-gray-400">{plan.deductible}</td>
                      <td className="text-right py-2 text-gray-600 dark:text-gray-400">{plan.oop}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {eligible && (
            <div className="rounded-xl border border-green-100 dark:border-green-900/50 bg-green-50 dark:bg-green-950/20 p-4">
              <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">ACA Subsidy Eligibility</p>
              <p className="text-sm text-green-700 dark:text-green-400">
                Your income of {fmt(annualIncome)} is {Math.round(incomePct * 100)}% of the Federal Poverty Level for a household of {householdSize}.
                You may qualify for a premium tax credit. Enroll through <strong>healthcare.gov</strong> during Open Enrollment.
              </p>
            </div>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400">
            This calculator provides estimates for educational purposes only. Actual insurance premiums vary based on your specific situation, insurer, location, and other factors. Consult a licensed insurance agent for accurate quotes and coverage recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}
