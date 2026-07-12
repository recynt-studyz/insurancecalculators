import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import HealthInsuranceCalculatorWrapper from '@/components/HealthInsuranceCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Health Insurance Cost Calculator — Estimate Premiums',
  description:
    'Estimate health insurance premiums for ACA marketplace plans. Free health insurance calculator with subsidy eligibility check for all income levels.',
  alternates: { canonical: 'https://insurancecalculators.app/health-insurance' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the difference between Bronze, Silver, Gold, and Platinum plans?',
    a: 'ACA marketplace health insurance plans are categorized by how costs are split between you and the insurer. Bronze: you pay roughly 40% of covered costs; lowest premiums, highest deductibles (~$7,500). Silver: you pay about 30% of costs; moderate premiums and deductibles. Gold: you pay about 20% of costs; higher premiums, lower deductibles (~$1,500). Platinum: you pay about 10% of costs; highest premiums, lowest deductibles (~$250). Silver plans are the only tier eligible for Cost-Sharing Reductions (CSRs) if your income qualifies.',
  },
  {
    q: 'What is a health insurance deductible?',
    a: 'A health insurance deductible is the amount you pay for covered medical services before your insurance begins to pay. For example, with a $4,500 deductible, you pay the first $4,500 in covered costs each plan year. After meeting your deductible, you typically pay a copay or coinsurance for services until you reach your out-of-pocket maximum, at which point your insurance covers 100% of covered costs. Preventive care services are generally covered with no deductible.',
  },
  {
    q: 'Am I eligible for ACA subsidies?',
    a: 'You may be eligible for premium tax credits (subsidies) if your income is between 100% and 400% of the Federal Poverty Level (FPL) — though legislation has temporarily extended subsidies above 400% FPL through recent years. For 2026, 100% FPL is approximately $15,060 for an individual and $31,200 for a family of four. To claim the subsidy, you must enroll through your state\'s marketplace or healthcare.gov during Open Enrollment (November 1 – January 15) or a qualifying Special Enrollment Period.',
  },
  {
    q: 'What is the difference between HMO and PPO?',
    a: 'HMO (Health Maintenance Organization) requires you to choose a primary care physician (PCP) who coordinates your care. You typically need referrals to see specialists, and out-of-network care is not covered except in emergencies. HMOs generally have lower premiums. PPO (Preferred Provider Organization) allows you to see any doctor without a referral, in or out of network (though in-network care costs less). PPOs offer more flexibility but have higher premiums. Other plan types include EPO (like HMO but no referrals needed) and HDHP/HSA-compatible plans with high deductibles and health savings account benefits.',
  },
  {
    q: 'When can I enroll in health insurance?',
    a: 'The annual Open Enrollment Period for ACA marketplace plans typically runs from November 1 through January 15, with coverage starting February 1. Outside of Open Enrollment, you can enroll during a Special Enrollment Period (SEP) triggered by qualifying life events: losing job-based coverage, getting married, having a baby, moving to a new area, or other major life changes. Medicaid and CHIP enrollment is available year-round for those who qualify based on income.',
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
  name: 'Health Insurance Cost Calculator',
  url: 'https://insurancecalculators.app/health-insurance',
  description: 'Free health insurance premium estimator for ACA marketplace Bronze, Silver, Gold, and Platinum plans with subsidy eligibility calculator.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Estimate Your Health Insurance Premium',
  step: [
    { '@type': 'HowToStep', name: 'Select coverage type and ages', text: 'Choose who you are covering: individual, couple, parent with children, or family. Enter the ages of all covered members. Age is a primary factor in ACA health insurance pricing.' },
    { '@type': 'HowToStep', name: 'Enter household income', text: 'Enter your annual household income to check subsidy eligibility. If your income is below 400% of the Federal Poverty Level, you may qualify for premium tax credits that significantly reduce your monthly health insurance cost.' },
    { '@type': 'HowToStep', name: 'Compare plan tiers', text: 'Select your preferred plan tier (Bronze, Silver, Gold, Platinum) and see side-by-side cost comparisons. Your estimated monthly premium and potential subsidy savings appear instantly.' },
  ],
}

const trustSignals = ['🔒 Protected', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function HealthInsurancePage() {
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
              Health Insurance Cost Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your ACA marketplace health insurance premium and check subsidy eligibility. Compare Bronze, Silver, Gold, and Platinum plan costs side by side.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1010101010" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <HealthInsuranceCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="1111111112" />
          </div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              Understanding ACA health insurance costs and subsidies
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Health insurance through the ACA marketplace is priced primarily based on age, tobacco use, plan tier, and family size — not health status or pre-existing conditions. Premium tax credits (subsidies) are available to individuals and families with incomes between 100% and 400% of the Federal Poverty Level, significantly reducing the monthly premium you actually pay. Choosing the right plan tier involves balancing your monthly premium against your expected healthcare use: a Bronze plan works well if you rarely see a doctor, while a Gold or Platinum plan makes financial sense if you have regular medical needs, prescriptions, or planned procedures. Always check whether your preferred doctors and hospitals are in-network before enrolling in any health insurance plan.
            </p>
          </div>

          <div className="space-y-10 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How ACA Health Insurance Premiums Are Calculated</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                ACA marketplace health insurance premiums are set by federal rating rules that allow insurers to vary prices by only four factors: age, tobacco use, geographic area (rating region), and plan tier (Bronze, Silver, Gold, Platinum). Health status, medical history, and sex cannot be used — a major departure from pre-ACA underwriting. The premium calculation works as follows:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3 overflow-x-auto">
                Gross Premium = Base Tier Rate × Age Factor × Smoker Multiplier × Family Size Multiplier
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3 overflow-x-auto">
                Net Premium = Gross Premium − Premium Tax Credit (Subsidy)
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Age factors under ACA rules allow insurers to charge older enrollees up to 3 times more than younger ones. A 64-year-old pays the legal maximum of 3× what a 21-year-old pays for the same plan. Tobacco surcharges can add up to 50% to the premium (some states prohibit tobacco rating). The premium tax credit — the ACA subsidy — is calculated by capping your required contribution at a percentage of your household income, with the federal government paying the difference up to the cost of the benchmark Silver plan.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Cost-Sharing Reductions (CSRs) are an additional benefit available exclusively on Silver plans for enrollees earning 100–250% of FPL. CSRs reduce your deductibles, copays, and out-of-pocket maximum — effectively giving you a Silver plan with Gold or Platinum level cost-sharing at a Silver premium. If you qualify for CSRs, a Silver plan almost always provides the best overall value even if a Bronze plan has a lower monthly premium.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Rachel, Single at 36</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Rachel is 36 years old, a non-smoker shopping for individual ACA coverage. Her household income is $46,000 per year. The 2026 Federal Poverty Level for a single person is approximately $15,060. Rachel&apos;s income is 305% of FPL ($46,000 ÷ $15,060).
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1.5">
                <div className="flex justify-between gap-4"><span className="font-semibold">Silver base rate (age 21):</span><span>$500/month</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Age factor (age 36 ≈ 1.45×):</span><span>$725/month gross</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Income at 305% FPL — contribution cap:</span><span>~8.5% of income</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Max required contribution (8.5% × $46,000 ÷ 12):</span><span>$326/month</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Premium tax credit (subsidy):</span><span>$725 − $326 = $399/month</span></div>
                <div className="flex justify-between gap-4 border-t border-gray-200 dark:border-gray-600 pt-1.5 text-blue-700 dark:text-blue-400 font-bold"><span>Rachel&apos;s Net Monthly Premium:</span><span>≈ $326/month</span></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                If Rachel chose a Gold plan instead (gross premium ≈ $870/month at her age), her subsidy is still capped at $399, so she would pay $870 − $399 = $471/month — about $145 more per month for lower deductibles and out-of-pocket costs. Whether the Gold plan is worth it depends on Rachel&apos;s expected healthcare use: if she has regular prescriptions or planned procedures, the lower cost-sharing of Gold may more than offset the higher premium. If she is healthy and rarely sees a doctor, the Silver plan wins on total annual cost.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Health Insurance Premium</h2>
              <ul className="space-y-5">
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Age</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">ACA rules allow insurers to charge up to 3× as much for a 64-year-old as a 21-year-old. Premiums increase at approximately 3% per year of age from 21 to 64. This makes age the most significant pricing factor within an ACA plan — though unlike pre-ACA health insurance, your current health status cannot increase your premium regardless of medical history or pre-existing conditions.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Household Income and Subsidy Eligibility</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Your income relative to the Federal Poverty Level determines whether you qualify for premium tax credits and how large those credits are. Households earning 100–400% FPL receive subsidies that cap your premium at 0–8.5% of income (exact percentage varies by income level). Recent legislation has extended subsidies above 400% FPL, so even households earning $60,000–$80,000+ may qualify for meaningful savings. Enter your income accurately in the calculator to see your estimated subsidy.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Plan Tier (Metal Level)</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Bronze, Silver, Gold, and Platinum tiers represent how costs are split between you and the insurer. Bronze covers ~60% of expected costs (lowest premium, highest out-of-pocket exposure); Platinum covers ~90% (highest premium, lowest out-of-pocket). The right tier depends on your expected healthcare use. Healthy, infrequent users typically save money with Bronze; frequent users with regular medications or planned procedures often save more with Gold or Platinum despite higher premiums.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Tobacco Use</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">ACA plans can charge tobacco users up to 50% more in premium. Some states prohibit tobacco surcharges; others limit them. This surcharge applies regardless of your health status — it is based solely on self-reported tobacco use within the past six months. Importantly, the tobacco surcharge is NOT subsidized by premium tax credits, meaning the full surcharge comes out of your pocket even if you otherwise qualify for significant subsidy dollars.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Family Size</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Each additional person on your health insurance plan adds to the gross premium. ACA rating rules use individual age-based pricing for up to three children and then cover additional children under 21 at no extra cost. Family premiums are capped — you pay for a maximum of three children regardless of family size. Understanding how dependents affect your premium is important when comparing employer-sponsored coverage versus ACA marketplace plans, since employer plans often subsidize dependent coverage while ACA credits are tied to household income and family size.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pb-6 px-2">
            This calculator provides estimates for educational purposes only. Actual health insurance premiums and subsidy eligibility vary based on your specific situation, insurer, state marketplace, income, and policy factors. Consult a licensed insurance agent or broker for accurate quotes and coverage recommendations.
          </p>

          <div className="pb-6">
            <AdBanner slot="1212121212" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
