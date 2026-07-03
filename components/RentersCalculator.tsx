'use client'

import { useState, useEffect, useCallback } from 'react'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v)
const fmtDec = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)

const STORAGE_KEY = 'ic-renters'

export default function RentersCalculator() {
  const [propertyValue, setPropertyValue] = useState('15000')
  const [locationType, setLocationType] = useState('suburban')
  const [crimeRate, setCrimeRate] = useState('medium')
  const [liability, setLiability] = useState('300000')
  const [electronics, setElectronics] = useState(false)
  const [identityTheft, setIdentityTheft] = useState(false)
  const [waterBackup, setWaterBackup] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.propertyValue) setPropertyValue(p.propertyValue)
        if (p.locationType) setLocationType(p.locationType)
        if (p.crimeRate) setCrimeRate(p.crimeRate)
        if (p.liability) setLiability(p.liability)
        if (p.electronics !== undefined) setElectronics(p.electronics)
        if (p.identityTheft !== undefined) setIdentityTheft(p.identityTheft)
        if (p.waterBackup !== undefined) setWaterBackup(p.waterBackup)
      }
    } catch { /* ignore */ }
  }, [])

  const save = useCallback((updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }, [])

  const propValue = parseFloat(propertyValue) || 0
  const liabilityAmt = parseInt(liability) || 300000

  const propertyFactor = propValue / 30000
  const locationFactor = locationType === 'urban' ? 1.1 : locationType === 'rural' ? 0.9 : 1.0
  const crimeFactor = crimeRate === 'low' ? 0.9 : crimeRate === 'high' ? 1.3 : 1.0

  const baseAnnual = 180 * propertyFactor * locationFactor * crimeFactor
  const liabilityAdd = liabilityAmt / 1000000 * 15
  const electronicsRider = electronics ? 50 : 0
  const identityTheftRider = identityTheft ? 25 : 0
  const waterBackupRider = waterBackup ? 35 : 0
  const ridersTotal = electronicsRider + identityTheftRider + waterBackupRider

  const annualTotal = baseAnnual + liabilityAdd + ridersTotal
  const monthly = annualTotal / 12
  const addlLiving = propValue * 0.2

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-blue-600'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
  const pillCls = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
      active
        ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]'
        : 'bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-400'
    }`

  const CheckToggle = ({ checked, onChange, label, sub }: { checked: boolean; onChange: () => void; label: string; sub: string }) => (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="mt-0.5">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${checked ? 'bg-[#1e3a8a] border-[#1e3a8a]' : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-400'}`}>
          {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>}
        </div>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>
      </div>
    </label>
  )

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Personal Property Value</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={propertyValue} onChange={e => { setPropertyValue(e.target.value); save({ propertyValue: e.target.value }) }} className={`${inputCls} pl-7`} min="0" />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Add up electronics, furniture, clothing, jewelry, and other belongings</p>
          </div>

          <div>
            <label className={labelCls}>Location Type</label>
            <div className="flex gap-2">
              {[['urban', 'Urban'], ['suburban', 'Suburban'], ['rural', 'Rural']].map(([v, l]) => (
                <button key={v} onClick={() => { setLocationType(v); save({ locationType: v }) }} className={pillCls(locationType === v)}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Crime Rate in Area</label>
            <div className="flex gap-2">
              {[['low', 'Low'], ['medium', 'Medium'], ['high', 'High']].map(([v, l]) => (
                <button key={v} onClick={() => { setCrimeRate(v); save({ crimeRate: v }) }} className={pillCls(crimeRate === v)}>{l}</button>
              ))}
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

          <div>
            <label className={labelCls}>Additional Coverage (optional riders)</label>
            <div className="space-y-3 mt-2">
              <CheckToggle
                checked={electronics}
                onChange={() => { setElectronics(!electronics); save({ electronics: !electronics }) }}
                label="Electronics &amp; Jewelry Rider (+$50/yr)"
                sub="Extended coverage for high-value items exceeding standard policy limits"
              />
              <CheckToggle
                checked={identityTheft}
                onChange={() => { setIdentityTheft(!identityTheft); save({ identityTheft: !identityTheft }) }}
                label="Identity Theft Protection (+$25/yr)"
                sub="Covers costs to restore your identity and credit after fraud"
              />
              <CheckToggle
                checked={waterBackup}
                onChange={() => { setWaterBackup(!waterBackup); save({ waterBackup: !waterBackup }) }}
                label="Water Backup Coverage (+$35/yr)"
                sub="Covers damage from sewer or drain backup not covered by standard policy"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-5">
            <p className="text-sm text-blue-800 dark:text-blue-400 font-medium mb-1">Estimated Annual Cost</p>
            <p className="text-4xl font-bold text-[#1e3a8a] dark:text-blue-300">{fmt(annualTotal)}</p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Monthly: <span className="font-semibold">{fmtDec(monthly)}/month</span></p>
            <p className="text-xs text-blue-600 dark:text-blue-500 mt-0.5">Less than ${(monthly / 30).toFixed(2)}/day for full renters protection</p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Coverage Included</p>
            <div className="space-y-2">
              {[
                { label: 'Personal Property', val: fmt(propValue) },
                { label: 'Liability', val: fmt(liabilityAmt) },
                { label: 'Additional Living Expenses', val: fmt(addlLiving) },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{val}</span>
                </div>
              ))}
              {ridersTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Optional riders</span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">+{fmt(ridersTotal)}/yr</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/20 p-4">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Why Renters Need Insurance</p>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1.5">
              <li>• Your landlord&apos;s insurance does <strong>NOT</strong> cover your personal belongings</li>
              <li>• The average renter has $30,000+ in personal property at risk</li>
              <li>• Liability coverage protects you if a guest is injured in your apartment</li>
              <li>• Additional living expenses pays hotel costs if your unit becomes uninhabitable</li>
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
