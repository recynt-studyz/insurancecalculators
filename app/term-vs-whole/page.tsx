import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import TermVsWholeCalculatorWrapper from '@/components/TermVsWholeCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Term vs Whole Life Insurance Calculator',
  description:
    'Compare term life vs whole life insurance costs and benefits. See the buy term and invest the difference strategy with real numbers.',
  alternates: { canonical: 'https://insurancecalculators.app/term-vs-whole' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the difference between term and whole life insurance?',
    a: 'Term life insurance provides a death benefit for a specific period — typically 10, 20, or 30 years. If you die during the term, your beneficiaries receive the death benefit. If you outlive the term, coverage ends and premiums paid are not returned. Whole life insurance is permanent: it never expires, premiums are fixed for life, and the policy accumulates cash value over time. The trade-off is cost — whole life premiums are typically 5-15 times higher than equivalent term life premiums for the same death benefit amount.',
  },
  {
    q: 'Is whole life insurance worth it?',
    a: 'For most people, whole life insurance is not the best value. The primary purpose of life insurance is income replacement and debt protection — needs that typically diminish over time as your mortgage is paid off, children become independent, and you accumulate retirement savings. Term life insurance covers this period at far lower cost. However, whole life can make sense for high-net-worth individuals with complex estate planning needs, business succession planning, or those who have maxed out all other tax-advantaged savings vehicles and want permanent, tax-deferred growth.',
  },
  {
    q: 'What does "buy term and invest the difference" mean?',
    a: '"Buy term and invest the difference" is a strategy popularized by financial advisors who argue that term life insurance\'s much lower premiums — compared to whole life — free up money that can be invested in low-cost index funds or retirement accounts. Over 20-30 years, the invested difference typically grows to far more than a whole life policy\'s cash value, while providing the same or greater death benefit during the coverage period. This calculator shows you the exact numbers for your situation.',
  },
  {
    q: 'Does whole life insurance build cash value?',
    a: 'Yes — whole life insurance accumulates cash value that grows tax-deferred over time. You can borrow against the cash value or surrender the policy for its cash value. However, the growth rate is typically modest (2-4% annually), and the insurance company keeps the cash value when you die (your beneficiaries receive only the death benefit, not both). It takes many years of premium payments before the cash value equals the premiums paid. This makes whole life a less efficient savings vehicle compared to 401(k)s, IRAs, or index fund investing for most people.',
  },
  {
    q: 'Which type of life insurance is better for most people?',
    a: 'Term life insurance is the right choice for the vast majority of people who need life insurance. It provides the most death benefit per premium dollar, covering your family during the years when coverage is most critical — while paying off a mortgage, raising children, and building retirement savings. Most people no longer need life insurance after retirement (when other income sources exist and debts are paid). The premium savings from term vs whole life, invested consistently over decades, typically result in substantially more wealth than whole life cash value accumulation.',
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
  name: 'Term vs Whole Life Insurance Calculator',
  url: 'https://insurancecalculators.app/term-vs-whole',
  description: 'Free calculator comparing term life vs whole life insurance costs with buy-term-invest-the-difference analysis.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Term vs Whole Life Insurance',
  step: [
    { '@type': 'HowToStep', name: 'Enter your profile and coverage amount', text: 'Enter the life insurance coverage amount you need, your age, health, and tobacco status. These determine the premiums for both term and whole life policies.' },
    { '@type': 'HowToStep', name: 'Select term length and return assumption', text: 'Choose the term length for the term policy comparison (10, 20, or 30 years) and your expected investment return rate for the "buy term and invest the difference" analysis.' },
    { '@type': 'HowToStep', name: 'Compare total costs and investment outcomes', text: 'See side-by-side monthly premiums, 30-year total costs, and a projection of what the premium difference would grow to if invested. Determine whether term + investing or whole life produces more wealth.' },
  ],
}

const trustSignals = ['🔒 Protected', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function TermVsWholePage() {
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
              Term vs Whole Life Insurance Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              See the real cost difference between term and whole life insurance. Calculate exactly how much more wealth you&apos;d build by buying term and investing the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1919191919" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <TermVsWholeCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2020202020" />
          </div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              Understanding the term vs whole life insurance debate
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              The debate between term life and whole life insurance is one of the most common discussions in personal finance. Term life insurance is simple: pure death benefit protection for a defined period at the lowest cost. Whole life insurance bundles insurance with a savings component, offering permanent coverage and cash value accumulation at a much higher premium. The fundamental question is whether the premium difference, invested consistently over decades in low-cost index funds, outpaces whole life cash value growth. Historically, the &quot;buy term and invest the difference&quot; strategy produces substantially better long-term wealth outcomes for disciplined investors. The key word is disciplined — the strategy only works if you actually invest the savings rather than spending them. Consult a fee-only financial advisor (not a commission-based insurance agent) to determine the right type of life insurance for your specific financial situation.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pb-6 px-2">
            This calculator provides estimates for educational purposes only. Actual life insurance premiums for term and whole life policies vary based on your specific situation, age, health, insurer underwriting criteria, and policy factors. Consult a licensed insurance agent or fee-only financial advisor for accurate quotes and coverage recommendations.
          </p>

          <div className="pb-6">
            <AdBanner slot="2121212121" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
