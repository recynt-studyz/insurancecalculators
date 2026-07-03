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
