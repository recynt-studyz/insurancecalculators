'use client'

import { useState, useEffect, useCallback } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'ic-deductible'

export default function DeductibleCalculator() {
  const [insuranceType, setInsuranceType] = useState('auto')
  const [currentDeductible, setCurrentDeductible] = useState('500')
  const [higherDeductible, setHigherDeductible] = useState('1000')
  const [currentPremium, setCurrentPremium] = useState('1800')
  const [higherPremium, setHigherPremium] = useState('1500')
  const [emergencyFund, setEmergencyFund] = useState('5000')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.insuranceType) setInsuranceType(p.insuranceType)
        if (p.currentDeductible) setCurrentDeductible(p.currentDeductible)
        if (p.higherDeductible) setHigherDeductible(p.higherDeductible)
        if (p.currentPremium) setCurrentPremium(p.currentPremium)
        if (p.higherPremium) setHigherPremium(p.higherPremium)
        if (p.emergencyFund) setEmergencyFund(p.emergencyFund)
      }
    } catch { /* ignore */ }
  }, [])

  const save = useCallback((updates: Record<string, string>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }, [])

  const curDed = parseFloat(currentDeductible) || 0
  const highDed = parseFloat(higherDeductible) || 0
  const curPrem = parseFloat(currentPremium) || 0
  const highPrem = parseFloat(higherPremium) || 0
  const efund = parseFloat(emergencyFund) || 0

  const annualSavings = curPrem - highPrem
  const extraRisk = highDed - curDed
  const breakevenYears = annualSavings > 0 ? extraRisk / annualSavings : Infinity

  const canCoverHigher = efund >= highDed
  const savingsPositive = annualSavings > 0
  const goodDeal = savingsPositive && canCoverHigher && breakevenYears <= 3

  let recommendation: 'higher' | 'keep' | 'fund'
  if (!savingsPositive) recommendation = 'keep'
  else if (!canCoverHigher) recommendation = 'fund'
  else if (goodDeal) recommendation = 'higher'
  else recommendation = 'keep'

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
            <label className={labelCls}>Insurance Type</label>
            <div className="flex gap-2">
              {[['auto', 'Auto'], ['home', 'Home'], ['health', 'Health']].map(([v, l]) => (
                <button key={v} onClick={() => { setInsuranceType(v); save({ insuranceType: v }) }} className={pillCls(insuranceType === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Option A — Current (Lower Deductible)</p>
            <div>
              <label className={labelCls}>Current Deductible</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={currentDeductible} onChange={e => { setCurrentDeductible(e.target.value); save({ currentDeductible: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Annual Premium with Current Deductible</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={currentPremium} onChange={e => { setCurrentPremium(e.target.value); save({ currentPremium: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Option B — Higher Deductible</p>
            <div>
              <label className={labelCls}>Higher Deductible</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={higherDeductible} onChange={e => { setHigherDeductible(e.target.value); save({ higherDeductible: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Annual Premium with Higher Deductible</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={higherPremium} onChange={e => { setHigherPremium(e.target.value); save({ higherPremium: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>Emergency Fund Available</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={emergencyFund} onChange={e => { setEmergencyFund(e.target.value); save({ emergencyFund: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
            <p className="text-xs text-gray-400 mt-1">Your savings available to cover an unexpected claim</p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Analysis</p>
            {[
              { label: 'Annual premium savings', val: savingsPositive ? fmt(annualSavings) : 'No savings', highlight: savingsPositive },
              { label: 'Extra out-of-pocket risk', val: fmt(extraRisk), highlight: false },
              { label: 'Break-even point', val: isFinite(breakevenYears) ? `${breakevenYears.toFixed(1)} years` : 'N/A', highlight: false },
              { label: 'Emergency fund vs deductible', val: canCoverHigher ? `✅ ${fmt(efund)} covers ${fmt(highDed)}` : `⚠️ ${fmt(efund)} < ${fmt(highDed)}`, highlight: canCoverHigher },
            ].map(({ label, val, highlight }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className={`font-medium ${highlight ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
              </div>
            ))}
          </div>

          <div className={`rounded-xl border p-5 ${recommendation === 'higher' ? 'border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-950/20' : 'border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20'}`}>
            <p className={`text-lg font-bold mb-2 ${recommendation === 'higher' ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'}`}>
              {recommendation === 'higher' ? '✅ Higher Deductible Makes Sense' : recommendation === 'fund' ? '⚠️ Build Emergency Fund First' : '⚠️ Keep Current Deductible'}
            </p>
            <p className={`text-sm leading-relaxed ${recommendation === 'higher' ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
              {recommendation === 'higher' && `You save ${fmt(annualSavings)}/year on your insurance premium. Even if you file one claim every ${breakevenYears.toFixed(1)} years, you come out ahead financially. Your emergency fund of ${fmt(efund)} comfortably covers the higher deductible of ${fmt(highDed)}.`}
              {recommendation === 'fund' && `Your emergency fund of ${fmt(efund)} does not cover the higher deductible of ${fmt(highDed)}. If you had a claim, you might struggle to pay it. Build your emergency fund to at least ${fmt(highDed)} first, then consider the higher deductible.`}
              {recommendation === 'keep' && `The premium savings of ${fmt(annualSavings)}/year don't justify taking on ${fmt(extraRisk)} in extra deductible risk given your current situation. The break-even point of ${isFinite(breakevenYears) ? `${breakevenYears.toFixed(1)} years` : 'N/A'} is too long to make the switch worthwhile.`}
            </p>
          </div>

          <div className="rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/20 p-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Deductible Strategy Tips</p>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>• If you rarely file claims, a higher deductible almost always saves money long-term</li>
              <li>• A 3-year break-even or less generally favors the higher deductible</li>
              <li>• Never choose a deductible you couldn&apos;t pay out-of-pocket today</li>
              <li>• Health insurance deductibles work differently — consider your expected annual medical use</li>
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
