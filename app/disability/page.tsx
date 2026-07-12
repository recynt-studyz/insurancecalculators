import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import DisabilityCalculatorWrapper from '@/components/DisabilityCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Disability Insurance Calculator — Income Protection',
  description:
    'Calculate how much disability insurance you need to protect your income. Free disability insurance calculator for short-term and long-term coverage.',
  alternates: { canonical: 'https://insurancecalculators.app/disability' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is disability insurance?',
    a: 'Disability insurance replaces a portion of your income if you become unable to work due to illness or injury. It is often called income protection insurance because it protects your most valuable financial asset — your ability to earn income. Most disability policies replace 60-70% of your gross income. There are two main types: short-term disability (STD) covers income loss for a few weeks to months, while long-term disability (LTD) covers extended periods ranging from 2 years to retirement age.',
  },
  {
    q: 'How much disability insurance do I need?',
    a: 'Most financial advisors recommend disability insurance that replaces 60-70% of your gross income. You don\'t need 100% replacement because disability benefits are often tax-free (if you paid premiums with after-tax dollars), and you won\'t have work-related expenses or retirement contributions when disabled. This calculator uses 65% as the target income replacement rate. If your employer provides disability coverage, subtract that from your target benefit to find your personal coverage gap.',
  },
  {
    q: 'What is the elimination period in disability insurance?',
    a: 'The elimination period (also called the waiting period) is the time between when you become disabled and when benefit payments begin. Common elimination periods are 30, 60, 90, or 180 days. A longer elimination period means lower premiums — choosing 90 days instead of 30 days can save 15-20% on your premium. The right elimination period depends on your emergency fund: if you have 3-6 months of expenses saved, a 90-day elimination period is often the best value.',
  },
  {
    q: 'Does my employer provide disability insurance?',
    a: 'Many employers provide group short-term and long-term disability coverage as an employee benefit. Group LTD policies typically replace 60% of base salary (excluding bonuses and commissions) up to a monthly maximum, often $10,000-$15,000. However, group coverage has limitations: benefits may be taxable if the employer paid premiums, coverage usually ends when you leave the job, and the definition of disability may be more restrictive than individual policies. Supplemental individual disability insurance can fill gaps in employer coverage.',
  },
  {
    q: 'What is the difference between short-term and long-term disability?',
    a: 'Short-term disability (STD) insurance covers income replacement for a brief period, typically 3-6 months, with a short elimination period (0-14 days). It covers illnesses, injuries, and maternity leave. Premiums are lower because the benefit period is short. Long-term disability (LTD) insurance begins after the STD period ends (or after the elimination period) and can pay benefits for 2 years, 5 years, or until retirement age. LTD covers serious, extended disabilities — the average LTD claim lasts over 2.5 years. Both types of disability coverage work together to provide comprehensive income protection.',
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
  name: 'Disability Insurance Calculator',
  url: 'https://insurancecalculators.app/disability',
  description: 'Free disability insurance calculator showing recommended monthly benefit and premium estimates for short-term and long-term disability coverage.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Disability Insurance Needs',
  step: [
    { '@type': 'HowToStep', name: 'Enter your income and occupation', text: 'Enter your gross monthly income and select your occupation type. Higher-risk occupations (heavy manual, high-risk) have higher disability insurance premiums due to greater injury risk.' },
    { '@type': 'HowToStep', name: 'Check existing coverage', text: 'Enter any existing disability coverage from your employer. The calculator finds your coverage gap — the additional monthly benefit needed to reach the recommended 65% income replacement level.' },
    { '@type': 'HowToStep', name: 'Choose elimination period and benefit period', text: 'Select your preferred elimination period (how long before benefits begin) and benefit period (how long benefits last). Longer elimination periods and shorter benefit periods reduce your premium. See estimates for both short-term and long-term disability insurance.' },
  ],
}

const trustSignals = ['🔒 Protected', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function DisabilityPage() {
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
              Disability Insurance Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate how much disability insurance you need to protect your income. Compare short-term and long-term disability coverage options and premium estimates.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1313131313" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <DisabilityCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="1414141414" />
          </div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              Why disability insurance is your most important coverage
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Most people insure their car, home, and health — but forget to insure their income, which is statistically their largest asset. A 35-year-old earning $75,000 per year has $2.25 million in future earning potential over a 30-year career. Social Security disability benefits average just $1,537 per month and are difficult to qualify for. One in four workers will experience a disability lasting 90 days or more before reaching retirement age. Disability insurance bridges the gap between your normal income and what you can earn while disabled, preventing a health crisis from becoming a financial crisis. The combination of employer-provided group disability coverage and a supplemental individual policy provides the most comprehensive income protection.
            </p>
          </div>

          <div className="space-y-10 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How Disability Insurance Needs and Premiums Are Calculated</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                This calculator first determines how much monthly benefit you need, then estimates the premium for that benefit. The recommended benefit target is 65% of your gross monthly income — the widely accepted income replacement standard used by financial planners and most disability insurers. Benefits are typically tax-free when you pay premiums with after-tax dollars, so 65% of gross income generally approximates 85–90% of your take-home pay.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3 overflow-x-auto">
                Target Benefit = Gross Monthly Income × 0.65 − Existing Employer Coverage
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3 overflow-x-auto">
                LTD Monthly Premium ≈ Target Benefit × 2.5% × Occupation Factor × Elimination Factor × Benefit Period Factor
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Occupation is a critical pricing factor. Insurers assign occupation classes (typically 1–6 or A–F) based on the injury risk and the likelihood of return to work after a disability. A sedentary office professional (Class 6/A) pays the lowest rates. A general contractor or equipment operator (Class 2/D) pays 2–3 times more for the same monthly benefit, because both the frequency and severity of disability claims are higher in physical occupations.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                The elimination period (waiting period) and benefit period are the two levers you have to adjust premium. A 90-day elimination period costs 15–20% less than a 30-day period, because the insurer only pays if you are disabled longer than 90 days — covering shorter illnesses falls on your emergency fund. A benefit period to age 65 costs significantly more than a 5-year benefit period but provides far superior protection for permanent or long-duration disabilities.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Jennifer, Graphic Designer at 41</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Jennifer is 41, a graphic designer earning $7,200 per month gross ($86,400/year). Her employer provides a group LTD policy covering 40% of base salary ($2,880/month). She selects a 90-day elimination period and a benefit period to age 65, classifying as an office professional (Class 5/B occupation).
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1.5">
                <div className="flex justify-between gap-4"><span className="font-semibold">Gross monthly income:</span><span>$7,200</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Target benefit (65%):</span><span>$4,680/month</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Minus employer LTD:</span><span>−$2,880/month</span></div>
                <div className="flex justify-between gap-4 font-semibold"><span>Coverage gap (additional LTD needed):</span><span>$1,800/month</span></div>
                <div className="flex justify-between gap-4 border-t border-gray-200 dark:border-gray-600 pt-1.5"><span className="font-semibold">LTD premium (2.5% × $1,800 × 0.85 × 0.85):</span><span>≈ $32/month</span></div>
                <div className="flex justify-between gap-4 text-blue-700 dark:text-blue-400 font-bold pt-0.5"><span>Total income protection (employer + personal):</span><span>$4,680/month (65%)</span></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                At $32/month for her supplemental policy, Jennifer is protecting $1,800/month of income — an insurance cost of under 2% of the benefit. If she became permanently disabled at 41 and collected LTD benefits until age 65, her personal policy alone would pay out $518,400 in total benefits. Considered this way, disability insurance provides extraordinary financial leverage for a modest monthly premium. Without this coverage, Jennifer&apos;s employer policy would leave her $1,800/month short — $21,600/year below her target income replacement through no fault of her own.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Disability Insurance Premiums</h2>
              <ul className="space-y-5">
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Occupation Class</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Occupation is the primary pricing variable in disability insurance. Insurers assign occupations to classes based on injury risk, duty demands, and historical claims experience. A surgeon, attorney, or accountant (high-income professional with low physical risk) receives the best (Class 6) rates. A construction worker, farmer, or logger receives the least favorable (Class 1–2) rates and may have monthly benefit caps applied. Your occupation class can create a 2–3x difference in premium for the same benefit amount.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Elimination Period (Waiting Period)</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">The elimination period is how long you must be disabled before benefits begin. A 30-day elimination period costs more because the insurer covers disabilities lasting as little as a month. A 90-day elimination period saves 15–20% and is the sweet spot for people with 3+ months of emergency savings. A 180-day elimination period saves more but requires a larger emergency fund to cover the gap. Coordinate your elimination period with your available liquid assets and any short-term disability coverage.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Benefit Period</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">A benefit period to age 65 provides coverage for the longest possible duration but costs the most in premium. Two-year and five-year benefit periods are less expensive but may leave you unprotected if you suffer a disability lasting longer. The average LTD claim exceeds 2.5 years, and many serious conditions — cancer, musculoskeletal disorders, mental health conditions — can result in disabilities lasting a decade or more. A to-age-65 benefit period, while more expensive, is the only option that fully protects your income-earning potential.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Monthly Benefit Amount</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Disability insurers will not insure more than 60–70% of your pre-disability income, regardless of how much coverage you want. This ensures you always have a financial incentive to return to work. Premiums are proportional to your monthly benefit — the more coverage you need, the more you pay. If your employer provides group LTD, you only need to supplement the gap, which significantly reduces your personal policy cost.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Definition of Disability</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">The policy&apos;s definition of disability significantly affects both your claim eligibility and your premium. An &quot;own occupation&quot; definition pays benefits if you cannot perform the specific duties of your current occupation — even if you can work in a different field. An &quot;any occupation&quot; definition only pays if you cannot perform any work. Own-occupation policies are more expensive but far superior for professionals and skilled workers whose income depends on specific abilities. A surgeon with an own-occupation policy who loses fine motor skills in one hand would receive full benefits even if she could technically work as a medical consultant.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pb-6 px-2">
            This calculator provides estimates for educational purposes only. Actual disability insurance premiums and benefit amounts vary based on your specific situation, occupation, insurer underwriting criteria, elimination period, benefit period, and policy factors. Consult a licensed insurance agent or broker for accurate quotes and coverage recommendations.
          </p>

          <div className="pb-6">
            <AdBanner slot="1515151515" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
