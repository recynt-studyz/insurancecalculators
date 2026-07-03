'use client'

import { useState, useEffect, useCallback } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'ic-termvswhole'

function calcTermRate(age: number, termYears: number): number {
  const base = age < 30 ? 0.15 : age < 40 ? 0.25 : age < 50 ? 0.50 : age < 60 ? 1.20 : 2.50
  const termMult = termYears === 10 ? 0.75 : termYears === 30 ? 1.35 : 1.0
  return base * termMult
}

export default function TermVsWholeCalculator() {
  const [coverage, setCoverage] = useState('500000')
  const [age, setAge] = useState('35')
  const [sex, setSex] = useState('male')
  const [health, setHealth] = useState('good')
  const [smoker, setSmoker] = useState(false)
  const [termYears, setTermYears] = useState('20')
  const [returnRate, setReturnRate] = useState('7')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.coverage) setCoverage(p.coverage)
        if (p.age) setAge(p.age)
        if (p.sex) setSex(p.sex)
        if (p.health) setHealth(p.health)
        if (p.smoker !== undefined) setSmoker(p.smoker)
        if (p.termYears) setTermYears(p.termYears)
        if (p.returnRate) setReturnRate(p.returnRate)
      }
    } catch { /* ignore */ }
  }, [])

  const save = useCallback((updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }, [])

  const amt = parseFloat(coverage) || 0
  const ageNum = parseInt(age) || 35
  const termNum = parseInt(termYears) || 20
  const rateNum = parseFloat(returnRate) / 100 || 0.07

  const healthFactor = health === 'excellent' ? 0.85 : health === 'good' ? 1.0 : 1.2
  const sexFactor = sex === 'female' ? 0.85 : 1.0
  const smokerFactor = smoker ? 2.5 : 1.0

  const termRate = calcTermRate(ageNum, termNum)
  const termMonthly = (amt / 1000) * termRate * healthFactor * sexFactor * smokerFactor
  const wholeMonthly = termMonthly * 8

  const YEARS = 30
  const termTotal = termMonthly * 12 * YEARS
  const wholeTotal = wholeMonthly * 12 * YEARS
  const wholeCashValue = wholeTotal * 0.6

  const difference = wholeMonthly - termMonthly
  const annualSavings = difference * 12
  const investedValue = rateNum > 0
    ? annualSavings * ((Math.pow(1 + rateNum, YEARS) - 1) / rateNum)
    : annualSavings * YEARS

  const termWins = investedValue > wholeCashValue

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
            <label className={labelCls}>Coverage Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={coverage} onChange={e => { setCoverage(e.target.value); save({ coverage: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Age</label>
            <input type="number" value={age} onChange={e => { setAge(e.target.value); save({ age: e.target.value }) }} className={inputCls} min="18" max="70" />
          </div>

          <div>
            <label className={labelCls}>Sex</label>
            <div className="flex gap-2">
              {[['male', 'Male'], ['female', 'Female']].map(([v, l]) => (
                <button key={v} onClick={() => { setSex(v); save({ sex: v }) }} className={pillCls(sex === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Health</label>
            <div className="flex flex-wrap gap-2">
              {[['excellent', 'Excellent'], ['good', 'Good'], ['fair', 'Fair']].map(([v, l]) => (
                <button key={v} onClick={() => { setHealth(v); save({ health: v }) }} className={pillCls(health === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className={`${labelCls} mb-0`}>Tobacco / Smoker</label>
            <button
              onClick={() => { setSmoker(!smoker); save({ smoker: !smoker }) }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${smoker ? 'bg-[#1e3a8a]' : 'bg-gray-200 dark:bg-gray-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${smoker ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div>
            <label className={labelCls}>Term Length (for term policy)</label>
            <div className="flex gap-2">
              {[['10', '10yr'], ['20', '20yr'], ['30', '30yr']].map(([v, l]) => (
                <button key={v} onClick={() => { setTermYears(v); save({ termYears: v }) }} className={pillCls(termYears === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Investment Return Assumption</label>
            <div className="relative">
              <input type="number" value={returnRate} onChange={e => { setReturnRate(e.target.value); save({ returnRate: e.target.value }) }} className={`${inputCls} pr-7`} min="0" max="20" step="0.5" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Side by side comparison */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-4 text-center">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-2">Term Life</p>
              <p className="text-2xl font-bold text-[#1e3a8a] dark:text-blue-300">{fmt(termMonthly)}<span className="text-xs font-normal text-blue-600">/mo</span></p>
              <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">{termNum}-year term</p>
              <p className="text-xs text-blue-600 dark:text-blue-500">{fmt(termTotal)} total ({YEARS}yr)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">$0 cash value</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Whole Life</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-[#e2e8f0]">{fmt(wholeMonthly)}<span className="text-xs font-normal text-gray-500">/mo</span></p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Permanent coverage</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{fmt(wholeTotal)} total ({YEARS}yr)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">~{fmt(wholeCashValue)} cash value</p>
            </div>
          </div>

          {/* Buy term invest difference */}
          <div className={`rounded-xl border p-4 ${termWins ? 'border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-950/20' : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b]'}`}>
            <p className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0] mb-3">Buy Term &amp; Invest the Difference</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Monthly savings vs whole life</span>
                <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(difference)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Invested over {YEARS}yr at {returnRate}%</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{fmt(investedValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">vs Whole life cash value</span>
                <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(wholeCashValue)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 flex justify-between">
                <span className="font-semibold text-gray-800 dark:text-[#e2e8f0]">
                  {termWins ? '✅ Term + Invest wins by' : '⚠️ Whole life cash value leads by'}
                </span>
                <span className={`font-bold ${termWins ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>
                  {fmt(Math.abs(investedValue - wholeCashValue))}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">When Each Makes Sense</p>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-medium text-[#1e3a8a] dark:text-blue-400">Term life is best when:</p>
                <p className="text-gray-600 dark:text-gray-400">You need maximum coverage at lowest cost, have a mortgage to protect, or are building wealth through investments. Best for most families.</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Whole life may make sense when:</p>
                <p className="text-gray-600 dark:text-gray-400">You have a high net worth, have maxed out other tax-advantaged accounts, or have specific estate planning needs requiring permanent coverage.</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            This calculator provides estimates for educational purposes only. Actual insurance premiums vary based on your specific situation, insurer, location, and other factors. Consult a licensed insurance agent for accurate quotes and coverage recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}
