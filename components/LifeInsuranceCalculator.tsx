'use client'

import { useState, useEffect, useCallback } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const fmtDec = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'ic-life'

function calcTermRate(age: number, termYears: number): number {
  const base = age < 30 ? 0.15 : age < 40 ? 0.25 : age < 50 ? 0.50 : age < 60 ? 1.20 : 2.50
  const termMult = termYears === 10 ? 0.70 : termYears === 20 ? 1.0 : 1.35
  return base * termMult
}

function calcMonthlyPremium(
  coverage: number,
  age: number,
  smoker: boolean,
  health: string,
  sex: string,
  termYears: number
): number {
  const rate = calcTermRate(age, termYears)
  const healthFactor = health === 'excellent' ? 0.85 : health === 'good' ? 1.0 : health === 'fair' ? 1.2 : 1.5
  const sexFactor = sex === 'female' ? 0.85 : 1.0
  const smokerFactor = smoker ? 2.5 : 1.0
  return (coverage / 1000) * rate * healthFactor * sexFactor * smokerFactor
}

export default function LifeInsuranceCalculator() {
  const [income, setIncome] = useState('75000')
  const [yearsToRetire, setYearsToRetire] = useState('25')
  const [debts, setDebts] = useState('15000')
  const [mortgage, setMortgage] = useState('250000')
  const [children, setChildren] = useState('0')
  const [educationPerChild, setEducationPerChild] = useState('50000')
  const [existingCoverage, setExistingCoverage] = useState('0')
  const [spouseIncome, setSpouseIncome] = useState('0')
  const [savings, setSavings] = useState('25000')
  const [age, setAge] = useState('35')
  const [sex, setSex] = useState('male')
  const [health, setHealth] = useState('good')
  const [smoker, setSmoker] = useState(false)
  const [termYears, setTermYears] = useState('20')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.income) setIncome(p.income)
        if (p.yearsToRetire) setYearsToRetire(p.yearsToRetire)
        if (p.debts) setDebts(p.debts)
        if (p.mortgage) setMortgage(p.mortgage)
        if (p.children !== undefined) setChildren(p.children)
        if (p.educationPerChild) setEducationPerChild(p.educationPerChild)
        if (p.existingCoverage) setExistingCoverage(p.existingCoverage)
        if (p.spouseIncome) setSpouseIncome(p.spouseIncome)
        if (p.savings) setSavings(p.savings)
        if (p.age) setAge(p.age)
        if (p.sex) setSex(p.sex)
        if (p.health) setHealth(p.health)
        if (p.smoker !== undefined) setSmoker(p.smoker)
        if (p.termYears) setTermYears(p.termYears)
      }
    } catch { /* ignore */ }
  }, [])

  const save = useCallback((updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }, [])

  const annualIncome = parseFloat(income) || 0
  const yrs = parseFloat(yearsToRetire) || 0
  const totalDebts = parseFloat(debts) || 0
  const totalMortgage = parseFloat(mortgage) || 0
  const numChildren = parseInt(children) || 0
  const eduPerChild = parseFloat(educationPerChild) || 0
  const existing = parseFloat(existingCoverage) || 0
  const totalSavings = parseFloat(savings) || 0
  const ageNum = parseInt(age) || 35
  const termNum = parseInt(termYears) || 20

  const incomeReplacement = annualIncome * yrs * 0.8
  const educationFund = numChildren * eduPerChild
  const totalNeed = totalDebts + incomeReplacement + totalMortgage + educationFund - totalSavings
  const coverageGap = Math.max(0, totalNeed - existing)

  const monthly = calcMonthlyPremium(coverageGap, ageNum, smoker, health, sex, termNum)

  const scenarios = [500000, 1000000, 1500000, 2000000]

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-blue-600'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
  const sectionHeadCls = 'text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-3 mt-5'
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
        <div>
          <p className={sectionHeadCls}>Your Financial Obligations</p>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Annual Income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={income} onChange={e => { setIncome(e.target.value); save({ income: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Years Until Retirement</label>
              <input type="number" value={yearsToRetire} onChange={e => { setYearsToRetire(e.target.value); save({ yearsToRetire: e.target.value }) }} className={inputCls} min="0" max="50" />
            </div>
            <div>
              <label className={labelCls}>Outstanding Debts <span className="text-gray-400 font-normal">(credit cards, auto, personal loans)</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={debts} onChange={e => { setDebts(e.target.value); save({ debts: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Remaining Mortgage Balance</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={mortgage} onChange={e => { setMortgage(e.target.value); save({ mortgage: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Number of Children</label>
              <div className="flex items-center gap-3">
                <button onClick={() => { const v = Math.max(0, numChildren - 1).toString(); setChildren(v); save({ children: v }) }} className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 font-bold text-lg hover:border-blue-400 transition">−</button>
                <span className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0] w-8 text-center">{numChildren}</span>
                <button onClick={() => { const v = Math.min(6, numChildren + 1).toString(); setChildren(v); save({ children: v }) }} className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 font-bold text-lg hover:border-blue-400 transition">+</button>
              </div>
            </div>
            {numChildren > 0 && (
              <div>
                <label className={labelCls}>Education Cost per Child</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" value={educationPerChild} onChange={e => { setEducationPerChild(e.target.value); save({ educationPerChild: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
                </div>
              </div>
            )}
          </div>

          <p className={sectionHeadCls}>Existing Coverage &amp; Assets</p>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Existing Life Insurance</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={existingCoverage} onChange={e => { setExistingCoverage(e.target.value); save({ existingCoverage: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Savings &amp; Investments</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={savings} onChange={e => { setSavings(e.target.value); save({ savings: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
              </div>
            </div>
          </div>

          <p className={sectionHeadCls}>About You (for premium estimate)</p>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Age</label>
              <input type="number" value={age} onChange={e => { setAge(e.target.value); save({ age: e.target.value }) }} className={inputCls} min="18" max="80" />
            </div>
            <div>
              <label className={labelCls}>Sex</label>
              <div className="flex gap-2">
                {['male', 'female'].map(s => (
                  <button key={s} onClick={() => { setSex(s); save({ sex: s }) }} className={pillCls(sex === s)}>
                    {s === 'male' ? 'Male' : 'Female'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Health</label>
              <div className="flex flex-wrap gap-2">
                {[['excellent', 'Excellent'], ['good', 'Good'], ['fair', 'Fair'], ['poor', 'Poor']].map(([v, l]) => (
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
              <label className={labelCls}>Term Length</label>
              <div className="flex gap-2">
                {[['10', '10yr'], ['20', '20yr'], ['30', '30yr']].map(([v, l]) => (
                  <button key={v} onClick={() => { setTermYears(v); save({ termYears: v }) }} className={pillCls(termYears === v)}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-5">
            <p className="text-sm text-blue-800 dark:text-blue-400 font-medium mb-1">Coverage Needed</p>
            <p className="text-4xl font-bold text-[#1e3a8a] dark:text-blue-300">{fmt(Math.max(0, totalNeed))}</p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Coverage gap: <span className="font-semibold">{fmt(coverageGap)}</span> after existing coverage
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">DIME Method Breakdown</p>
            <div className="space-y-2">
              {[
                { label: 'Debt payoff', val: totalDebts },
                { label: `Income replacement (${yrs}yr × ${fmt(annualIncome)} × 80%)`, val: incomeReplacement },
                { label: 'Mortgage payoff', val: totalMortgage },
                { label: `Education fund (${numChildren} child${numChildren !== 1 ? 'ren' : ''} × ${fmt(eduPerChild)})`, val: educationFund },
                { label: 'Existing assets', val: -totalSavings },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 pr-2">{label}</span>
                  <span className={`font-medium whitespace-nowrap ${val < 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val < 0 ? `−${fmt(-val)}` : fmt(val)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 flex justify-between text-sm font-semibold">
                <span className="text-gray-800 dark:text-[#e2e8f0]">Total coverage need</span>
                <span className="text-[#1e3a8a] dark:text-blue-300">{fmt(Math.max(0, totalNeed))}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Estimated Premium</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-[#e2e8f0]">~${Math.round(monthly)}<span className="text-base font-normal text-gray-500">/month</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{termYears}-year term policy · Get quotes from multiple insurers for accurate rates</p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Coverage Scenarios</p>
            <div className="space-y-2">
              {scenarios.map(amt => {
                const mo = calcMonthlyPremium(amt, ageNum, smoker, health, sex, termNum)
                return (
                  <div key={amt} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{fmtDec(amt)} coverage</span>
                    <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">~${Math.round(mo)}/month</span>
                  </div>
                )
              })}
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
