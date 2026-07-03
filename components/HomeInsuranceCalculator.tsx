'use client'

import { useState, useEffect, useCallback } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

const STORAGE_KEY = 'ic-home'

export default function HomeInsuranceCalculator() {
  const [homeValue, setHomeValue] = useState('350000')
  const [yearBuilt, setYearBuilt] = useState('2000')
  const [sqft, setSqft] = useState('2000')
  const [location, setLocation] = useState('standard')
  const [construction, setConstruction] = useState('wood')
  const [roofAge, setRoofAge] = useState('5to10')
  const [securitySystem, setSecuritySystem] = useState(false)
  const [pool, setPool] = useState(false)
  const [deductible, setDeductible] = useState('1000')
  const [propertyPct, setPropertyPct] = useState('50')
  const [liability, setLiability] = useState('300000')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.homeValue) setHomeValue(p.homeValue)
        if (p.yearBuilt) setYearBuilt(p.yearBuilt)
        if (p.sqft) setSqft(p.sqft)
        if (p.location) setLocation(p.location)
        if (p.construction) setConstruction(p.construction)
        if (p.roofAge) setRoofAge(p.roofAge)
        if (p.securitySystem !== undefined) setSecuritySystem(p.securitySystem)
        if (p.pool !== undefined) setPool(p.pool)
        if (p.deductible) setDeductible(p.deductible)
        if (p.propertyPct) setPropertyPct(p.propertyPct)
        if (p.liability) setLiability(p.liability)
      }
    } catch { /* ignore */ }
  }, [])

  const save = useCallback((updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }, [])

  const value = parseFloat(homeValue) || 0
  const yr = parseInt(yearBuilt) || 2000
  const houseAge = 2026 - yr

  const locationFactor = location === 'coastal' ? 1.4 : location === 'tornado' ? 1.3 : location === 'flood' ? 1.5 : location === 'wildfire' ? 1.35 : 1.0
  const ageFactor = houseAge < 10 ? 0.9 : houseAge < 20 ? 1.0 : 1.15
  const constructionFactor = construction === 'brick' ? 0.9 : 1.0
  const roofFactor = roofAge === 'new' ? 0.9 : roofAge === '5to10' ? 1.0 : roofAge === '10to20' ? 1.05 : 1.2
  const deductibleFactor = deductible === '500' ? 1.1 : deductible === '1000' ? 1.0 : deductible === '2500' ? 0.9 : 0.8
  const securityDiscount = securitySystem ? 0.95 : 1.0
  const poolSurcharge = pool ? 1.05 : 1.0

  const base_rate = 0.005
  const dwellingAnnual = value * base_rate * locationFactor * ageFactor * constructionFactor * roofFactor * deductibleFactor * securityDiscount * poolSurcharge
  const liabilityAmt = parseInt(liability) || 300000
  const liabilityAdd = liabilityAmt / 1000000 * 15 * 12
  const annualTotal = dwellingAnnual + liabilityAdd
  const monthly = annualTotal / 12

  const personalProperty = value * (parseFloat(propertyPct) / 100 || 0.5)
  const addlLiving = value * 0.2

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-blue-600'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
  const pillCls = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
      active
        ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]'
        : 'bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-400'
    }`

  const Toggle = ({ value: v, onChange }: { value: boolean; onChange: (b: boolean) => void }) => (
    <button
      onClick={() => onChange(!v)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${v ? 'bg-[#1e3a8a]' : 'bg-gray-200 dark:bg-gray-600'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${v ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Home Value (Replacement Cost)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={homeValue} onChange={e => { setHomeValue(e.target.value); save({ homeValue: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Year Built</label>
              <input type="number" value={yearBuilt} onChange={e => { setYearBuilt(e.target.value); save({ yearBuilt: e.target.value }) }} className={inputCls} min="1900" max="2026" />
            </div>
            <div>
              <label className={labelCls}>Square Footage</label>
              <input type="number" value={sqft} onChange={e => { setSqft(e.target.value); save({ sqft: e.target.value }) }} className={inputCls} min="0" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Location Type</label>
            <div className="flex flex-wrap gap-2">
              {[['standard', 'Standard'], ['coastal', 'Coastal'], ['tornado', 'Tornado Alley'], ['flood', 'Flood Zone'], ['wildfire', 'Wildfire Zone']].map(([v, l]) => (
                <button key={v} onClick={() => { setLocation(v); save({ location: v }) }} className={pillCls(location === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Construction Type</label>
            <div className="flex gap-2">
              {[['wood', 'Wood Frame'], ['brick', 'Brick/Masonry'], ['other', 'Other']].map(([v, l]) => (
                <button key={v} onClick={() => { setConstruction(v); save({ construction: v }) }} className={pillCls(construction === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Roof Age</label>
            <div className="flex flex-wrap gap-2">
              {[['new', 'New'], ['5to10', '5-10yr'], ['10to20', '10-20yr'], ['20plus', '20yr+']].map(([v, l]) => (
                <button key={v} onClick={() => { setRoofAge(v); save({ roofAge: v }) }} className={pillCls(roofAge === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className={`${labelCls} mb-0`}>Security System <span className="text-green-600 dark:text-green-400 font-normal">(5% discount)</span></label>
            <Toggle value={securitySystem} onChange={v => { setSecuritySystem(v); save({ securitySystem: v }) }} />
          </div>

          <div className="flex items-center justify-between">
            <label className={`${labelCls} mb-0`}>Swimming Pool <span className="text-gray-400 font-normal">(liability increase)</span></label>
            <Toggle value={pool} onChange={v => { setPool(v); save({ pool: v }) }} />
          </div>

          <div>
            <label className={labelCls}>Deductible</label>
            <div className="flex flex-wrap gap-2">
              {[['500', '$500'], ['1000', '$1,000'], ['2500', '$2,500'], ['5000', '$5,000']].map(([v, l]) => (
                <button key={v} onClick={() => { setDeductible(v); save({ deductible: v }) }} className={pillCls(deductible === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Personal Property Coverage <span className="text-gray-400 font-normal">(% of dwelling)</span></label>
            <div className="relative">
              <input type="number" value={propertyPct} onChange={e => { setPropertyPct(e.target.value); save({ propertyPct: e.target.value }) }} className={`${inputCls} pr-7`} min="10" max="100" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>

          <div>
            <label className={labelCls}>Liability Coverage</label>
            <div className="flex gap-2">
              {[['100000', '$100K'], ['300000', '$300K'], ['500000', '$500K']].map(([v, l]) => (
                <button key={v} onClick={() => { setLiability(v); save({ liability: v }) }} className={pillCls(liability === v)}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-5">
            <p className="text-sm text-blue-800 dark:text-blue-400 font-medium mb-1">Estimated Annual Premium</p>
            <p className="text-4xl font-bold text-[#1e3a8a] dark:text-blue-300">{fmt(annualTotal)}</p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Monthly: <span className="font-semibold">{fmt(monthly)}/month</span></p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Coverage Summary</p>
            <div className="space-y-2">
              {[
                { label: 'Dwelling Coverage', val: value },
                { label: 'Personal Property', val: personalProperty },
                { label: 'Liability', val: liabilityAmt },
                { label: 'Additional Living Expenses', val: addlLiving },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(val)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Rate Factors Applied</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Location</span><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">×{locationFactor.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Home age ({houseAge}yrs)</span><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">×{ageFactor.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Construction</span><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">×{constructionFactor.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Roof condition</span><span className="font-medium text-gray-800 dark:text-[#e2e8f0]">×{roofFactor.toFixed(2)}</span></div>
              {securitySystem && <div className="flex justify-between"><span className="text-green-600 dark:text-green-400">Security discount</span><span className="font-medium text-green-600 dark:text-green-400">−5%</span></div>}
              {pool && <div className="flex justify-between"><span className="text-amber-600 dark:text-amber-400">Pool surcharge</span><span className="font-medium text-amber-600 dark:text-amber-400">+5%</span></div>}
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
