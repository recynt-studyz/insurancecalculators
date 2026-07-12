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
    a: 'Auto insurance premiums are calculated by applying a series of risk multipliers to a base rate. The most impactful factors are: your driving record (a single at-fault accident raises premiums 20–40%; a DUI can more than double your rate for 3–7 years), your age (teen drivers 16–19 pay 2–3x more than experienced adult drivers), your vehicle\'s value and theft rate, annual mileage driven, your ZIP code\'s claim history, and credit score in most states. Coverage type and deductible choice also have a major effect — moving from liability-only to full coverage can double or triple your premium. Insurance companies use actuarial data to assess the statistical likelihood that each driver will file a claim, and your premium directly reflects that calculated risk. Shopping at least three insurers annually is one of the most effective ways to ensure you\'re not overpaying.',
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

          <div className="space-y-10 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Auto Insurance Premiums Are Calculated</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Auto insurance companies use a multiplicative rating model: they start with a base annual premium and then apply a series of adjustment factors based on your specific risk profile. Each factor reflects actuarial data on how drivers with that characteristic statistically perform in terms of claims frequency and severity. The general pricing formula is:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3 overflow-x-auto">
                Premium = Base Rate × Age Factor × Record Factor × Vehicle Factor × Coverage Factor × Deductible Factor × Credit Factor × Mileage Factor
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                The base rate varies by insurer and state. Each factor is a multiplier: a clean driving record keeps this factor at 1.0, while a DUI conviction might push it to 2.0 or higher. Your vehicle&apos;s value drives the comprehensive and collision components of the premium — a $40,000 SUV costs roughly twice as much to insure for physical damage as a $20,000 sedan. Coverage type has one of the largest effects: moving from liability-only to full coverage (adding collision and comprehensive) can increase your premium by 60–120%.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                This calculator applies published industry average factors for each variable. Real insurer pricing uses proprietary rating algorithms, telematics data, local market conditions, and dozens of additional variables. The resulting estimate gives you a reasonable ballpark and shows you which inputs have the largest impact on your rate — useful for understanding where you can save money when shopping for car insurance quotes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Marcus, Age 29</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Marcus is 29 years old with a clean driving record. He drives a 2022 Honda CR-V worth approximately $28,000 and commutes about 11,000 miles per year. He wants full coverage (liability + collision + comprehensive) with a $1,000 deductible and has good credit.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1.5">
                <div className="flex justify-between gap-4"><span className="font-semibold">Base rate:</span><span>$1,500/year</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Age factor (29, experienced driver):</span><span>× 0.90</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Driving record (clean):</span><span>× 1.00</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Vehicle value ($28,000):</span><span>× 1.20</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Full coverage:</span><span>× 1.50</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Deductible ($1,000):</span><span>× 0.90</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Credit factor (good):</span><span>× 0.90</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Mileage (11,000/yr):</span><span>× 1.00</span></div>
                <div className="flex justify-between gap-4 border-t border-gray-200 dark:border-gray-600 pt-1.5 text-blue-700 dark:text-blue-400 font-bold"><span>Estimated Annual Premium:</span><span>≈ $1,640/year ($137/month)</span></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                If Marcus had a single at-fault accident on his record, his record factor would jump from 1.0 to approximately 1.35, pushing his estimated premium to around $2,215/year — an increase of roughly $575 per year. A DUI would spike his premium even further, often to 2.0–2.5x his current rate for 3–7 years. This illustrates why driving record is the single most impactful variable in auto insurance pricing and why safe driving habits are one of the most valuable long-term financial habits.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Auto Insurance Rate</h2>
              <ul className="space-y-5">
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Driving Record</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Your driving record is the single most powerful factor in auto insurance pricing. A single at-fault accident typically increases your premium 20–40% for 3–5 years. A DUI or reckless driving conviction can more than double your rate and remain on your record for 5–10 years. Maintaining a clean record is the most effective long-term strategy for keeping car insurance costs low.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Driver Age</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Teenage drivers (16–19) have the highest accident rates of any age group and pay 2–3 times more than adult drivers for comparable coverage. Premiums decrease steadily through your 20s and 30s as you accumulate a clean driving history. Rates may rise slightly for drivers over 70 due to increased accident risk associated with aging. Adding a teen driver to a family policy can increase the total premium by 50–100%.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Vehicle Value and Type</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">More expensive vehicles cost more to repair and replace, directly increasing comprehensive and collision premiums. High-theft vehicles (certain SUVs, pickup trucks, and luxury cars) carry higher comprehensive premiums in high-crime areas. Sports cars and performance vehicles often carry higher rates due to the correlation between vehicle type and driving behavior in actuarial data.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Coverage Type and Deductible</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Choosing full coverage vs. liability-only can double or triple your premium. Your deductible is a direct lever on cost: raising your collision deductible from $500 to $1,000 typically saves 10–15% on that coverage component. For vehicles worth less than $5,000–$6,000, consider dropping collision and comprehensive entirely — the maximum payout minus your deductible may be less than a few years of premiums.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Credit Score</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">In most states, insurers use credit-based insurance scores to price policies. Drivers with poor credit can pay 50–100% more than drivers with excellent credit for identical coverage. California, Hawaii, Massachusetts, and Michigan prohibit using credit scores in auto insurance rating. Improving your credit score over time can meaningfully reduce your car insurance premium when your policy renews.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pb-6 px-2">
            This calculator provides estimates for educational purposes only. Actual auto insurance premiums vary based on your specific situation, insurer underwriting criteria, driving record, location, vehicle, and policy factors. Consult a licensed insurance agent or broker for accurate quotes and coverage recommendations.
          </p>

          <div className="pb-6">
            <AdBanner slot="6666666666" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
