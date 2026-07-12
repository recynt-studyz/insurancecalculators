import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import HomeInsuranceCalculatorWrapper from '@/components/HomeInsuranceCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Home Insurance Calculator — Estimate Your Premium',
  description:
    'Estimate your homeowners insurance premium based on home value, location, and coverage needs. Free home insurance cost calculator.',
  alternates: { canonical: 'https://insurancecalculators.app/home-insurance' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much home insurance coverage do I need?',
    a: 'Your dwelling coverage should equal the cost to fully rebuild your home — the replacement cost, not the market value or purchase price. Replacement cost is based on local construction costs per square foot. Personal property coverage typically defaults to 50-75% of dwelling coverage; consider taking a home inventory to make sure your belongings are adequately insured. Liability coverage of at least $300,000 is recommended, and umbrella policies provide additional liability protection for high-net-worth households.',
  },
  {
    q: 'What does homeowners insurance cover?',
    a: 'Standard homeowners insurance (HO-3 policy) covers: dwelling (the structure of your home), other structures (detached garage, fence, shed), personal property (furniture, electronics, clothing), liability (if someone is injured on your property), and additional living expenses (hotel and food if your home becomes uninhabitable). Coverage applies to named or open perils depending on your policy. Most policies also include medical payments coverage for guests injured on your property.',
  },
  {
    q: 'What is not covered by homeowners insurance?',
    a: 'Standard homeowners insurance does NOT cover: flooding (requires separate NFIP or private flood insurance), earthquakes (requires separate earthquake policy), normal wear and tear, pest infestations, sewer backup (available as an add-on rider), home business liability or equipment, and high-value items like jewelry and art above policy sub-limits. If you live in a coastal area, hurricane or windstorm coverage may be excluded or require a separate policy.',
  },
  {
    q: 'How is home insurance premium calculated?',
    a: 'Home insurance premiums are calculated based on: the replacement cost of your home (square footage × local construction costs), location risk (coastal, tornado, flood, or wildfire zones dramatically increase premiums), home age and construction type (brick homes and newer roofs cost less to insure), deductible amount, coverage limits, and your claims history. Insurers also consider proximity to fire stations, local crime rates, and whether you have a pool, trampoline, or certain dog breeds that increase liability exposure.',
  },
  {
    q: 'What is replacement cost vs actual cash value?',
    a: 'Replacement cost coverage pays what it costs to replace your damaged property with new equivalent items at today\'s prices — this is the preferred coverage. Actual cash value (ACV) coverage pays the depreciated value of your property, which can be significantly less after years of use. For example, a 5-year-old roof damaged by a storm might have an ACV of 50% of replacement cost. Replacement cost policies have higher premiums but provide substantially better protection. Always check whether your policy covers replacement cost or ACV for both the dwelling and personal property.',
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
  name: 'Home Insurance Calculator',
  url: 'https://insurancecalculators.app/home-insurance',
  description: 'Free homeowners insurance cost estimator based on home value, location, construction type, and coverage options.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Estimate Your Home Insurance Premium',
  step: [
    { '@type': 'HowToStep', name: 'Enter your home details', text: 'Enter your home value (replacement cost), year built, and square footage. The calculator uses these to determine your dwelling coverage and base premium.' },
    { '@type': 'HowToStep', name: 'Select location and construction factors', text: 'Choose your location type (coastal, tornado alley, flood zone, or standard), construction type, and roof age. These significantly impact your homeowners insurance premium.' },
    { '@type': 'HowToStep', name: 'Customize coverage and deductible', text: 'Set your personal property coverage percentage, choose a deductible, and select liability coverage. Toggle security system discount and pool surcharge. Your estimated annual premium appears instantly.' },
  ],
}

const trustSignals = ['🔒 Protected', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function HomeInsurancePage() {
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
              Home Insurance Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your homeowners insurance premium based on your home value, location, age, and coverage selections. Protect your most valuable asset with the right coverage.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="7777777777" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <HomeInsuranceCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="8888888888" />
          </div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              Understanding your homeowners insurance premium
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Homeowners insurance is required by virtually all mortgage lenders and protects your most significant financial asset. The national average homeowners insurance premium is approximately $1,900 per year, but it varies enormously based on where you live and the characteristics of your home. Coastal and flood zone properties can pay 40-50% more than comparable homes in standard risk areas. Your home&apos;s age matters too — older roofs and aging electrical systems increase the risk of claims. A new roof can reduce your insurance premium by 10-20%. Security systems, smoke detectors, and other protective features can earn additional discounts. When shopping for homeowners insurance, compare quotes from at least three insurers and make sure you&apos;re comparing identical coverage amounts, deductibles, and policy types.
            </p>
          </div>

          <div className="space-y-10 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Home Insurance Premiums Are Calculated</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Homeowners insurance is priced by starting with your home&apos;s replacement cost — the cost to rebuild it from the ground up at current local construction rates — and applying a base rate of approximately 0.5% of that value per year. The insurer then multiplies this base premium by a series of risk factors specific to your home and location. The core formula is:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3 overflow-x-auto">
                Premium = Home Value × 0.5% × Location Factor × Age Factor × Construction Factor × Roof Factor × Security Discount × Deductible Factor
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Location is the most powerful variable. A home in coastal Florida or a hurricane-prone Gulf Coast area might carry a location factor of 1.8–2.5x compared to a standard Midwest suburban home. Similarly, wildfire-risk zones in California and tornado-prone areas of the Great Plains carry significantly elevated location factors. Your roof&apos;s age and material matter because the roof is the most common source of homeowners claims — insurers may not cover a roof over 20–25 years old, or may require a separate wind/hail deductible.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Note that market value and replacement cost are different numbers. A home&apos;s market value includes land, which cannot be destroyed and does not need to be insured. Replacement cost is purely construction cost — for an older home in a high-cost-of-labor market, replacement cost may actually exceed market value. Most insurers include an inflation guard provision that automatically adjusts your dwelling coverage limit each year to keep pace with rising construction costs.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: The Chen Family&apos;s Home in Texas</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                The Chen family owns a 1,900 sq ft home in suburban Dallas with a replacement cost of $340,000. The home was built 12 years ago with a wood frame construction, a 7-year-old asphalt shingle roof, and no pool. They have a basic security system and are choosing a $1,000 deductible.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1.5">
                <div className="flex justify-between gap-4"><span className="font-semibold">Base premium ($340,000 × 0.5%):</span><span>$1,700/year</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Location (suburban TX, tornado risk):</span><span>× 1.15</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Home age (12 years):</span><span>× 1.08</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Wood frame construction:</span><span>× 1.00</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Roof age (7 years):</span><span>× 1.04</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Security system discount:</span><span>× 0.95</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Deductible ($1,000):</span><span>× 0.95</span></div>
                <div className="flex justify-between gap-4 border-t border-gray-200 dark:border-gray-600 pt-1.5 text-blue-700 dark:text-blue-400 font-bold"><span>Estimated Annual Premium:</span><span>≈ $1,965/year ($164/month)</span></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                If the Chens add a swimming pool, the liability surcharge typically adds $50–$150/year. If they replaced their roof last year, the roof factor drops from 1.04 to 1.0 and saves them about $70/year. Their standard coverage includes $340,000 dwelling, $255,000 personal property (75%), $100,000 liability, and $68,000 in Additional Living Expenses. When they compare quotes from multiple insurers, they should verify all four coverage components are identical, not just the premium — companies often quote different amounts to appear cheaper.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Home Insurance Premium</h2>
              <ul className="space-y-5">
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Location and Geographic Risk</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Where your home is located is the dominant factor in homeowners insurance pricing. Coastal properties face hurricane and flood risk; Great Plains homes face tornado exposure; Western states face wildfire risk. Homes in high-risk zones can pay 40–150% more than comparable homes in standard risk areas. Proximity to a fire station also matters — homes within 5 miles of a staffed fire station receive lower rates.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Replacement Cost of the Dwelling</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Your dwelling coverage should equal the cost to rebuild your home, not its market value. Replacement cost is based on local construction costs per square foot, which vary dramatically by region — rebuilding a 2,000 sq ft home might cost $150/sq ft in rural Kansas but $350/sq ft in coastal California. Underinsuring your home is a dangerous mistake: if your home is insured for less than 80% of its replacement cost, most policies reduce claim payouts proportionally through a coinsurance clause.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Home Age and Construction Type</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Older homes cost more to insure because they have a higher risk of outdated wiring, plumbing, and HVAC systems failing. Masonry (brick, stone) construction is more fire-resistant than wood frame and typically earns a 5–15% premium discount. A home with knob-and-tube wiring or a fuse box rather than a circuit breaker panel may be surcharged or even declined for coverage until updates are made.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Roof Age and Material</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Roofs are the most common source of homeowners insurance claims. A new asphalt shingle roof earns the best rates; a 15-year-old roof carries a surcharge; insurers may refuse to write new policies on roofs over 20–25 years. Impact-resistant roofing materials (Class 4 shingles) can earn discounts of 10–30% in hail-prone states. Replacing your roof is the single home improvement most likely to lower your insurance premium.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Claims History and Deductible</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Filing multiple claims in a short period can result in premium surcharges or non-renewal. Insurance is designed for large, unexpected losses — not routine maintenance. Your deductible directly impacts your premium: raising from $1,000 to $2,500 typically saves 5–10% per year on your homeowners policy. In coastal states, many policies now include a separate, higher hurricane or wind/hail deductible expressed as a percentage of your dwelling coverage (typically 1–5%).</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pb-6 px-2">
            This calculator provides estimates for educational purposes only. Actual homeowners insurance premiums vary based on your specific situation, insurer underwriting criteria, location, home characteristics, claims history, and policy factors. Consult a licensed insurance agent or broker for accurate quotes and coverage recommendations.
          </p>

          <div className="pb-6">
            <AdBanner slot="9999999999" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
