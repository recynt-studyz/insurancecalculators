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
