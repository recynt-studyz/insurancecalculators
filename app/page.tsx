import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import LifeInsuranceCalculatorWrapper from '@/components/LifeInsuranceCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Life Insurance Calculator — How Much Coverage Do You Need?',
  description:
    'Calculate how much life insurance you need using the DIME method. Free life insurance needs calculator with premium estimates for term and whole life.',
  alternates: { canonical: 'https://insurancecalculators.app' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much life insurance do I need?',
    a: 'Most financial experts recommend 10–15 times your annual income in life insurance coverage. The DIME method offers a more precise approach: add up your Debt, Income replacement (annual income × years to retirement), Mortgage balance, and Education costs for children, then subtract existing savings and coverage. This calculator uses the DIME method to give you a personalized life insurance coverage estimate.',
  },
  {
    q: 'What is the DIME method for life insurance?',
    a: 'DIME stands for Debt, Income, Mortgage, and Education. It\'s a comprehensive way to calculate your life insurance needs. Debt covers all outstanding loans (credit cards, auto, personal). Income replacement covers your annual salary times the years until retirement. Mortgage covers your remaining home loan balance. Education covers future college costs for your children. Subtract existing savings and coverage to find your coverage gap.',
  },
  {
    q: 'What is the difference between term and whole life insurance?',
    a: 'Term life insurance provides coverage for a set period (10, 20, or 30 years) at lower premiums, with no cash value. It\'s ideal for income replacement during your working years. Whole life insurance covers you permanently and builds tax-deferred cash value, but premiums are typically 5–15 times higher. Most financial advisors recommend term life for the majority of people and investing the premium difference.',
  },
  {
    q: 'How much does life insurance cost per month?',
    a: 'Life insurance premiums depend on your age, health, smoking status, coverage amount, and policy type. A healthy 35-year-old non-smoker can typically get a 20-year, $500,000 term life policy for $20–$40 per month. Premiums increase with age — the same policy for a 45-year-old might cost $50–$80 per month. Getting quotes from multiple insurers is the best way to find the lowest premium for your specific situation.',
  },
  {
    q: 'At what age should I buy life insurance?',
    a: 'The best time to buy life insurance is as young and healthy as possible — premiums are lowest in your 20s and 30s. Life insurance is most critical when others depend on your income: when you have a spouse, children, or a mortgage. Even if you\'re single with no dependents today, locking in a low rate while you\'re young and healthy through a convertible term policy is a smart strategy.',
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
  name: 'Life Insurance Calculator',
  url: 'https://insurancecalculators.app',
  description: 'Free life insurance needs calculator using the DIME method with premium estimates for term and whole life insurance.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Life Insurance Needs',
  step: [
    { '@type': 'HowToStep', name: 'Enter your financial obligations', text: 'Enter your annual income, years until retirement, outstanding debts, mortgage balance, and education costs for children. These form the DIME method calculation.' },
    { '@type': 'HowToStep', name: 'Add existing coverage and assets', text: 'Enter any existing life insurance policies, spouse income, and savings. The calculator subtracts these from your total need to find your coverage gap.' },
    { '@type': 'HowToStep', name: 'View your coverage need and premium estimate', text: 'Your recommended coverage amount appears instantly using the DIME method. Enter your age, health, and smoking status to see an estimated monthly premium for term life insurance.' },
  ],
}

const trustSignals = ['🔒 Protected', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      {/* Hero */}
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgic.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Life Insurance Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Find out exactly how much life insurance coverage you need using the DIME method. Get instant premium estimates for term and whole life policies. Free, private, no signup.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <LifeInsuranceCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      {/* Below hero */}
      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '🔒', label: 'Private', sub: 'Your data never leaves your browser' },
              { icon: '⚡', label: 'Instant', sub: 'Results update as you type' },
              { icon: '🎯', label: 'Accurate', sub: 'Standard DIME insurance formula' },
              { icon: '✓', label: 'Free', sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              Why use the DIME method to calculate life insurance needs?
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              The DIME method is the most comprehensive approach to calculating how much life insurance coverage your family truly needs. Unlike the simple &quot;10x income&quot; rule of thumb, DIME accounts for your specific debt obligations, income replacement needs, mortgage payoff, and children&apos;s education costs. By subtracting existing coverage and savings, you get your precise coverage gap — the amount of additional life insurance needed to protect your family from financial hardship. Whether you&apos;re comparing term life vs whole life policies or getting your first life insurance quote, this calculator gives you a starting point grounded in standard insurance underwriting principles.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
