import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import RentersCalculatorWrapper from '@/components/RentersCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Renters Insurance Calculator — Estimate Your Cost',
  description:
    'Estimate renters insurance costs based on personal property value and location. Free renters insurance calculator showing coverage options.',
  alternates: { canonical: 'https://insurancecalculators.app/renters' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'Is renters insurance required?',
    a: 'Renters insurance is not required by law, but many landlords require proof of renters insurance as a condition of the lease agreement. Even when not required, renters insurance is strongly recommended — it protects your belongings from theft, fire, and water damage and provides liability coverage if someone is injured in your rental. At an average cost of $15/month, renters insurance is one of the most affordable and highest-value insurance policies available.',
  },
  {
    q: 'What does renters insurance cover?',
    a: 'A standard renters insurance policy (HO-4) covers three main areas: (1) Personal property — your belongings including furniture, electronics, clothing, and appliances, typically covered for theft, fire, vandalism, and certain water damage. (2) Liability — if someone is injured in your apartment or you accidentally damage someone else\'s property, liability coverage pays for legal costs and damages up to your policy limit. (3) Additional living expenses — if your unit becomes uninhabitable due to a covered event, your policy pays for temporary housing, food, and other costs while repairs are made.',
  },
  {
    q: 'How much does renters insurance cost per month?',
    a: 'The national average renters insurance cost is approximately $15 per month ($180 per year). Your actual premium depends on the value of your personal property, your location, crime rates in your area, and the liability coverage amount you choose. High-crime or urban areas cost more. Adding optional riders for electronics, jewelry, or identity theft protection adds a few dollars per month. Bundling renters and auto insurance with the same company can save 5-15% on both policies.',
  },
  {
    q: 'Does renters insurance cover my car?',
    a: 'No — renters insurance does not cover your car. Damage to your vehicle or theft of your car requires auto insurance (comprehensive coverage for theft). However, renters insurance does cover personal belongings stolen from your car, such as a laptop or other items, up to your personal property coverage limit and subject to your deductible. It also does not cover damage to the building itself — that is covered by your landlord\'s property insurance.',
  },
  {
    q: 'How much personal property coverage do I need?',
    a: 'To determine how much personal property coverage you need, take a home inventory: walk through each room and estimate the value of your belongings. Include furniture, electronics, clothing, kitchen appliances, jewelry, sporting equipment, and any collections. Most renters underestimate their belongings — the average renter has $30,000 or more in personal property. Choose coverage that equals your total inventory value. Consider a replacement cost policy rather than actual cash value to ensure your payout covers the full cost of replacing items at today\'s prices.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Renters Insurance Calculator',
  url: 'https://insurancecalculators.app/renters',
  description: 'Free renters insurance cost estimator based on personal property value, location, and liability coverage needs.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Estimate Your Renters Insurance Cost',
  step: [
    { '@type': 'HowToStep', name: 'Estimate your personal property value', text: 'Add up the value of all your belongings — furniture, electronics, clothing, and other personal items. This determines your personal property coverage amount and is the primary driver of your renters insurance premium.' },
    { '@type': 'HowToStep', name: 'Select location and liability coverage', text: 'Choose your location type (urban, suburban, rural) and crime rate. Select your liability coverage amount — $300,000 is recommended for most renters. Higher liability limits add minimal cost.' },
    { '@type': 'HowToStep', name: 'Add optional riders and view your estimate', text: 'Optionally add coverage for electronics/jewelry, identity theft protection, or water backup. Your estimated annual and monthly renters insurance cost appears instantly.' },
  ],
}

const trustSignals = ['🔒 Protected', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function RentersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgic.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Renters Insurance Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your renters insurance cost in seconds. Protect your personal property, get liability coverage, and add optional riders — all for less than $1 per day.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1616161616" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <RentersCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="1717171717" />
          </div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              Why renters insurance is the most overlooked policy
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Only about half of all renters have renters insurance, despite it being one of the most affordable and valuable types of coverage available. Many renters mistakenly believe their landlord&apos;s insurance covers their belongings — it does not. The landlord&apos;s policy covers the building structure but provides zero protection for your furniture, electronics, clothing, or other personal property. Renters insurance also provides critical liability coverage: if a guest slips and falls in your apartment, your policy covers medical bills and potential lawsuits up to your liability limit. At just $15/month on average, renters insurance delivers exceptional value and peace of mind for any renter.
            </p>
          </div>

          <div className="space-y-10 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Renters Insurance Premiums Are Calculated</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Renters insurance premiums are calculated from a base rate tied to your personal property coverage amount, then adjusted for your location&apos;s risk profile and any optional riders you add. The three main coverage components — personal property, liability, and additional living expenses — are bundled together, with ALE typically set at 20–30% of your personal property limit automatically. The core formula is:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3 overflow-x-auto">
                Premium = ($180 × Property Value ÷ $30,000) × Location Factor × Crime Factor + Liability Add-On + Optional Riders
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                The base rate of $180/year per $30,000 of personal property reflects national average pricing. Location type adjusts this up for urban and coastal areas (higher theft and weather claims) and down for rural areas. Crime rate is applied as a separate multiplier — a high-crime urban ZIP code might carry a 1.4× surcharge relative to a low-crime suburban neighborhood.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Liability coverage is the most undervalued component of renters insurance. If a guest is injured in your apartment and sues you, your landlord&apos;s policy provides zero protection for you personally. Your renters insurance liability coverage pays legal defense costs and damages up to your policy limit. The premium difference between $100,000 and $300,000 of liability coverage is typically only $5–$10 per year — making the higher limit almost always the right choice.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Alex in a Suburban Apartment</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Alex rents a 2-bedroom apartment in a suburban Chicago suburb. After taking a home inventory, he estimates his personal belongings are worth $32,000 (furniture, laptop, TV, bicycle, clothing, kitchen appliances). He wants $300,000 in liability coverage and adds an electronics rider for his camera equipment.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1.5">
                <div className="flex justify-between gap-4"><span className="font-semibold">Base rate ($180 × $32,000 ÷ $30,000):</span><span>$192/year</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Location (suburban, moderate crime):</span><span>× 1.10</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Base adjusted:</span><span>$211/year</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Liability add-on ($300,000 coverage):</span><span>+$18/year</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Electronics/camera rider:</span><span>+$24/year</span></div>
                <div className="flex justify-between gap-4 border-t border-gray-200 dark:border-gray-600 pt-1.5 text-blue-700 dark:text-blue-400 font-bold"><span>Estimated Annual Premium:</span><span>≈ $253/year ($21/month)</span></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                For $21/month, Alex has $32,000 of personal property coverage, $300,000 of liability protection, and specialized coverage for his camera gear. If his apartment were broken into and his laptop ($1,200), TV ($800), and bicycle ($900) were stolen, a single claim would pay out approximately $2,500 — nearly a decade of premiums recovered in one event. If his landlord requires proof of renters insurance, most policies can provide a certificate of insurance directly to the property management company. Bundling this policy with an auto insurance policy from the same insurer typically saves 5–15% on both.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Renters Insurance Premium</h2>
              <ul className="space-y-5">
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Personal Property Coverage Amount</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">The value of your insured belongings is the primary driver of your renters insurance premium. Most renters significantly underestimate what they own — a realistic home inventory often reaches $25,000–$40,000 once you account for furniture, electronics, clothing, kitchen appliances, bicycles, and sports equipment. Choosing too little coverage is the most common renters insurance mistake; you can only be reimbursed up to your coverage limit after a total loss.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Location Type and Crime Rate</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Urban renters typically pay more than suburban or rural renters due to higher rates of theft, vandalism, and weather-related claims. Your specific ZIP code&apos;s crime statistics directly influence your premium. High-crime areas can add 20–50% to the base rate. Moving to a building with secure entry, on-site security, or in a lower-crime neighborhood can meaningfully reduce your annual premium at renewal.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Liability Coverage Limit</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">The liability component of renters insurance is remarkably inexpensive relative to the protection it provides. The premium difference between $100,000 and $300,000 of liability coverage is typically $5–$12 per year. Given that a single slip-and-fall injury claim or dog bite lawsuit can easily exceed $100,000 in legal costs and damages, selecting the highest available liability limit is almost always the right financial decision for the minimal additional cost.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Optional Riders</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Standard renters policies have sub-limits for certain high-value items — typically $1,500–$2,500 for jewelry, $1,500 for firearms, and varying limits for electronics. If you own items exceeding these sub-limits, a scheduled personal property rider (floater) provides full replacement cost coverage for listed items. Electronics riders, identity theft coverage, and water backup protection are common add-ons that cost $5–$15/month each and fill important coverage gaps.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Multi-Policy Bundling</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Bundling your renters insurance with auto insurance from the same company is one of the easiest ways to reduce both premiums simultaneously. Multi-policy discounts typically range from 5–15% on your auto policy and may also reduce your renters premium. Since renters insurance premiums are already low ($12–$25/month for most renters), the bundling discount on your auto policy often saves more in absolute dollars than the renters premium itself.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pb-6 px-2">
            This calculator provides estimates for educational purposes only. Actual renters insurance premiums vary based on your specific situation, insurer underwriting criteria, location, coverage limits, and policy factors. Consult a licensed insurance agent or broker for accurate quotes and coverage recommendations.
          </p>

          <div className="pb-6">
            <AdBanner slot="1818181818" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
