import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import DeductibleCalculatorWrapper from '@/components/DeductibleCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Insurance Deductible Calculator — Find Your Optimal Deductible',
  description:
    'Calculate whether a higher insurance deductible saves money. Free deductible optimizer for auto, home and health insurance.',
  alternates: { canonical: 'https://insurancecalculators.app/deductible' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is an insurance deductible?',
    a: 'An insurance deductible is the amount you pay out-of-pocket before your insurance coverage kicks in for a covered claim. For example, with a $1,000 auto insurance deductible and a $4,000 collision repair bill, you pay $1,000 and your insurance pays the remaining $3,000. Deductibles reset each policy period (annually for auto and home, annually for health). Higher deductibles mean lower premiums because you are taking on more of the financial risk yourself.',
  },
  {
    q: 'Should I choose a high or low deductible?',
    a: 'The right deductible depends on your financial situation and risk tolerance. A higher deductible makes sense if: (1) you have an adequate emergency fund to cover the higher deductible, (2) you rarely file claims, and (3) the annual premium savings break even in 3 years or less. A lower deductible makes sense if: your emergency fund is small and you couldn\'t comfortably pay a large deductible, you have a history of frequent claims, or the premium savings are minimal. This calculator finds your specific break-even point.',
  },
  {
    q: 'How does a higher deductible affect my premium?',
    a: 'Choosing a higher deductible directly lowers your insurance premium. For auto insurance, moving from a $500 to $1,000 deductible typically saves 10-15% on collision and comprehensive coverage. Moving from $500 to $2,000 can save 20-30%. For home insurance, doubling your deductible from $1,000 to $2,000 may save 5-10% on your annual premium. The premium savings are front-loaded (you save every year), while the extra risk is back-loaded (you only pay more when you actually file a claim).',
  },
  {
    q: 'What is a good deductible amount for auto insurance?',
    a: 'A $500-$1,000 deductible is the most common range for auto insurance. For most drivers with a solid emergency fund (3+ months of expenses), a $1,000 deductible offers the best balance of premium savings and manageable out-of-pocket risk. If your vehicle is worth less than $5,000-$6,000, you may want to consider dropping collision and comprehensive coverage altogether — the potential insurance payout minus your deductible may be minimal. For a newer, higher-value vehicle with a loan or lease, a lower deductible protects your larger financial exposure.',
  },
  {
    q: 'How does my emergency fund affect my deductible choice?',
    a: 'Your emergency fund is the key determinant of how high a deductible you can safely choose. Financial advisors recommend having 3-6 months of living expenses in readily accessible savings. Your emergency fund must be able to absorb your deductible in a worst-case scenario where you file a claim at the same time as another financial hardship. Never choose a deductible higher than what you could comfortably pay today without going into debt. The premium savings from a very high deductible offer no benefit if a single claim forces you to use a credit card or take out a loan.',
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
  name: 'Insurance Deductible Calculator',
  url: 'https://insurancecalculators.app/deductible',
  description: 'Free insurance deductible optimizer showing break-even analysis and personalized recommendation for auto, home, and health insurance.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Find Your Optimal Insurance Deductible',
  step: [
    { '@type': 'HowToStep', name: 'Enter your current deductible and premium', text: 'Enter your current deductible amount and the annual premium you pay with it. This is your baseline for comparison.' },
    { '@type': 'HowToStep', name: 'Enter the higher deductible option', text: 'Enter the higher deductible you are considering and the annual premium you would pay. The difference in premiums is your annual savings.' },
    { '@type': 'HowToStep', name: 'Review break-even analysis and recommendation', text: 'Enter your emergency fund balance. The calculator shows your annual savings, break-even point in years, and a personalized recommendation based on whether your emergency fund can cover the higher deductible.' },
  ],
}

const trustSignals = ['🔒 Protected', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function DeductiblePage() {
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
              Insurance Deductible Optimizer
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Should you raise your deductible? Find your break-even point and get a personalized recommendation for auto, home, and health insurance deductibles.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="2222222223" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <DeductibleCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2323232323" />
          </div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              The deductible decision: premium savings vs out-of-pocket risk
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Choosing the right insurance deductible is a personal finance optimization problem with a clear mathematical answer. Every dollar increase in your deductible translates to lower premiums — the question is whether the annual savings outweigh the increased financial risk of a larger out-of-pocket payment when you file a claim. The break-even analysis is straightforward: if you save $300/year by moving from a $500 to a $1,000 deductible, and you file a claim once every 3 years on average, you break even. File claims less frequently than your break-even rate, and the higher deductible saves you money over time. The critical constraint is your emergency fund: you should never choose a deductible you couldn&apos;t pay out-of-pocket today. A higher deductible with an inadequate emergency fund creates financial stress at the exact moment you&apos;re already dealing with an insurance claim.
            </p>
          </div>

          <div className="space-y-10 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How the Deductible Break-Even Analysis Works</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                The deductible decision is a straightforward math problem: you are trading a known, recurring annual savings (lower premium) for an increased financial risk that only materializes when you file a claim. The break-even analysis calculates how many claim-free years it takes before your cumulative premium savings exceed the extra out-of-pocket cost you would face on a single claim. The core formulas are:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3 overflow-x-auto">
                Annual Savings = Current Annual Premium − Higher Deductible Annual Premium
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3 overflow-x-auto">
                Break-Even (years) = (Higher Deductible − Current Deductible) ÷ Annual Savings
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                The break-even year is your point of financial indifference: go longer than the break-even period without a claim and you come out ahead with the higher deductible. File a claim before break-even and the lower deductible would have saved you money. Most financial planners use a 3-year break-even as the threshold for recommending a higher deductible — if you recoup the extra risk within 3 years of savings, the math favors raising the deductible.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                The critical constraint that math alone cannot capture is your emergency fund. Even a highly favorable break-even analysis is irrelevant if you could not comfortably pay the higher deductible out of pocket today. A deductible is a contingent liability — it can come due at the worst possible time (alongside a job loss, medical bill, or other financial hardship). Your emergency fund must be large enough to absorb the deductible without forcing you into debt.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Kevin&apos;s Auto Insurance Deductible Decision</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Kevin currently pays $1,560/year for auto insurance with a $500 collision deductible. His insurer quotes $1,230/year for a $1,000 deductible on the same policy. He has $8,500 in his emergency fund and has filed only one minor claim in the past 9 years of driving.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1.5">
                <div className="flex justify-between gap-4"><span className="font-semibold">Current premium ($500 deductible):</span><span>$1,560/year</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">New premium ($1,000 deductible):</span><span>$1,230/year</span></div>
                <div className="flex justify-between gap-4 font-semibold"><span>Annual savings:</span><span>$330/year</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Extra out-of-pocket risk per claim:</span><span>$500</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Break-even period:</span><span>$500 ÷ $330 = 1.5 years</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Emergency fund covers $1,000 deductible?</span><span>Yes ($8,500)</span></div>
                <div className="flex justify-between gap-4 text-blue-700 dark:text-blue-400 font-bold pt-0.5 border-t border-gray-200 dark:border-gray-600"><span>Recommendation:</span><span>Raise the deductible</span></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Kevin breaks even in just 18 months — well under the 3-year threshold. His emergency fund comfortably covers the $1,000 deductible. Over 10 claim-free years, he saves $3,300 in total premiums. Even if he files one claim in year 4, his net position is ($330 × 4 years) − $500 extra = +$820 ahead. The higher deductible is the correct financial decision here given his clean record, adequate savings, and fast break-even. In contrast, if Kevin had only $600 in savings, the analysis would flip — the math might favor the higher deductible, but his inability to cover the deductible comfortably makes the lower deductible the right choice for his financial situation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in the Deductible Decision</h2>
              <ul className="space-y-5">
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Size of Annual Premium Savings</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">The premium reduction from raising your deductible varies by insurer, policy type, and state. For auto collision coverage, moving from $500 to $1,000 typically saves 10–15%; moving from $500 to $2,000 can save 20–30%. Homeowners insurance yields less savings per deductible dollar because a large portion of the premium covers liability and other components unaffected by the deductible. Always get an actual quote from your insurer before making the decision — the real numbers are what matter.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Emergency Fund Size</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Your deductible represents the maximum out-of-pocket payment you must make before your insurance kicks in on any single claim. Never select a deductible you could not pay comfortably today without going into debt. Financial advisors recommend keeping an emergency fund of 3–6 months of living expenses — if your fund is at that level, higher deductibles are generally accessible. If your fund is thin, prioritize building it before raising your deductibles.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Personal Claim Frequency</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">A higher deductible benefits policyholders who file claims infrequently. If you have filed multiple claims in recent years, a lower deductible may be more appropriate — both because you are more likely to file again, and because frequent claims can affect your premium and insurability regardless of deductible level. For auto insurance specifically, consider whether minor incidents are better paid out of pocket to avoid claim-related rate surcharges that may cost more over 3 years than the incident itself.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Insurance Type and How Deductibles Apply</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Auto deductibles apply separately to each claim — you could pay your deductible twice in a single year if you file two claims. Home insurance deductibles also apply per claim; many coastal policies have a separate, higher percentage-based deductible for wind and hail. Health insurance deductibles accumulate throughout the year and reset annually; once met, you pay coinsurance until you reach your out-of-pocket maximum. Understanding your specific policy structure is essential to interpreting break-even analysis correctly.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">The 3-Year Break-Even Threshold</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">A break-even of 1–2 years is highly favorable — the premium savings recoup the extra risk quickly and nearly guarantee you come out ahead over any multi-year period. A break-even of 3 years sits at the generally accepted boundary for a sound financial decision. A break-even of 4–5 or more years suggests the premium savings are too small relative to the increased out-of-pocket risk, and you may be better served by keeping your current deductible or shopping for a different insurer that offers more competitive pricing on both deductible tiers.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pb-6 px-2">
            This calculator provides estimates for educational purposes only. Actual insurance premium savings from deductible changes vary based on your specific insurer, policy, location, coverage type, and underwriting factors. Consult a licensed insurance agent or broker for accurate quotes and coverage recommendations.
          </p>

          <div className="pb-6">
            <AdBanner slot="2424242424" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
