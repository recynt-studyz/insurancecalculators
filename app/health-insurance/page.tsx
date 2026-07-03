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
