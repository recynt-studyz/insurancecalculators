import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import AutoInsuranceCalculatorWrapper from '@/components/AutoInsuranceCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Auto Insurance Calculator — Estimate Your Premium',
  description:
    'Estimate your auto insurance premium based on age, driving record, vehicle value and coverage type. Free car insurance cost calculator.',
  alternates: { canonical: 'https://insurancecalculators.app/auto-insurance' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What factors affect auto insurance rates?',
    a: 'Auto insurance premiums are determined by several key factors: your driving record (accidents and violations significantly increase premiums), age (drivers under 25 pay the most), vehicle value and make (expensive or high-theft vehicles cost more to insure), annual mileage, coverage type and deductible, your ZIP code, and credit score in most states. Insurance companies use these factors to assess the statistical likelihood that you will file a claim.',
  },
  {
    q: 'What is the minimum auto insurance required by law?',
    a: 'Every state except New Hampshire requires minimum auto insurance, typically liability-only coverage. Minimum limits vary by state but commonly include $25,000/$50,000 for bodily injury and $25,000 for property damage (written as 25/50/25). However, minimum coverage rarely provides adequate protection — if you cause an accident exceeding these limits, you are personally responsible for the difference. Most financial advisors recommend 100/300/100 limits.',
  },
  {
    q: 'What is the difference between liability and full coverage?',
    a: 'Liability insurance covers damage you cause to other people and their property but does NOT cover your own vehicle. Full coverage adds collision (covers your car after an accident regardless of fault) and comprehensive (covers non-collision damage like theft, fire, hail, and hitting an animal). Full coverage is typically required by lenders if you have an auto loan or lease. For older vehicles worth less than $3,000-$4,000, dropping collision and comprehensive may save more than the coverage is worth.',
  },
  {
    q: 'How can I lower my car insurance premium?',
    a: 'The most effective ways to reduce your auto insurance premium: (1) Shop and compare quotes from at least 3 insurers — rates can vary by hundreds of dollars for identical coverage. (2) Bundle your auto and home insurance for multi-policy discounts of 5-25%. (3) Raise your deductible from $500 to $1,000 to save ~10-15%. (4) Ask about available discounts: good driver, good student, low mileage, defensive driving course, anti-theft devices, and payment-in-full discounts. (5) Maintain good credit — in most states it significantly affects your rate.',
  },
  {
    q: 'Does my credit score affect my auto insurance rate?',
    a: 'In most states, yes. Insurers have found a statistical correlation between credit scores and the likelihood of filing claims. Drivers with poor credit can pay 50-100% more than drivers with excellent credit for identical coverage. California, Hawaii, Massachusetts, and Michigan prohibit using credit scores in auto insurance rating. If your credit has recently improved, ask your insurer to re-run your rate or shop competing quotes to capture the savings.',
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
  name: 'Auto Insurance Calculator',
  url: 'https://insurancecalculators.app/auto-insurance',
  description: 'Free auto insurance cost estimator based on driver age, driving record, vehicle value, and coverage type.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Estimate Your Auto Insurance Premium',
  step: [
    { '@type': 'HowToStep', name: 'Enter your driver profile', text: 'Enter your age and select your driving record. Younger drivers and those with violations pay significantly higher premiums.' },
    { '@type': 'HowToStep', name: 'Add your vehicle information', text: 'Enter your vehicle year and value. Higher-value vehicles cost more to insure. Select your annual mileage — low-mileage drivers often qualify for discounts.' },
    { '@type': 'HowToStep', name: 'Choose coverage type and deductible', text: 'Select liability only, liability plus collision, or full coverage. Choose your deductible amount — a higher deductible lowers your premium. Your estimated annual and monthly premium appears instantly.' },
  ],
}

const trustSignals = ['🔒 Protected', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function AutoInsurancePage() {
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
              Auto Insurance Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your car insurance premium based on your driver profile, vehicle, and coverage needs. Understand what factors drive your rate — and how to lower it.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="4444444444" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <AutoInsuranceCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="5555555555" />
          </div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              How auto insurance premiums are calculated
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Auto insurance companies use actuarial data to price policies based on your statistical risk of filing a claim. Your driving record is the single biggest factor — a DUI can more than double your premium and follow you for 3–7 years. Age is another major factor: teen drivers (16-19) have the highest accident rates and pay the most; premiums generally decrease through your 20s and 30s before rising slightly for seniors over 70. Your vehicle&apos;s make, model, and value affect the cost to repair or replace it after a collision or theft. Choosing the right coverage type — whether liability only or full coverage with collision and comprehensive — and deductible has a significant impact on your annual premium. Comparing car insurance quotes from multiple companies is the most effective way to find the best rate for your specific driver profile.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="6666666666" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
