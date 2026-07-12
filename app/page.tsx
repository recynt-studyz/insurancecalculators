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
    a: 'Most financial experts recommend 10–15 times your annual income as a starting point, but this rule of thumb can leave significant gaps if you carry a large mortgage or have young children. The DIME method provides a personalized calculation by adding four financial obligations your family would face: Debt (credit cards, auto loans, personal loans), Income replacement (annual income × years to retirement × 0.8), Mortgage balance, and Education costs per child — then subtracting existing savings and life insurance. Many people discover through DIME that they actually need 15–25 times income, especially with a recent home purchase and young dependents. The 0.8 income multiplier reflects that household expenses typically drop about 20% when one earner is gone, so your family does not need 100% income replacement. Review your coverage every 3–5 years or after major life events like marriage, divorce, having children, or buying a home.',
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
    a: 'Life insurance premiums depend on your age, health classification, tobacco use, coverage amount, term length, and biological sex. A healthy 30-year-old non-smoking male can typically get a 20-year, $500,000 term policy for $20–$28 per month; a 40-year-old in the same health class pays $38–$50 per month for identical coverage. Women pay approximately 20–30% less than men due to longer life expectancy. Smokers and recent nicotine users pay 2–3 times more than non-smokers for the same policy. Adding coverage is surprisingly affordable — upgrading from $500,000 to $1,000,000 often adds only $15–$25/month. Comparing quotes from at least 3–5 insurers is essential because rates for identical coverage can differ by 30–50% between companies.',
  },
  {
    q: 'At what age should I buy life insurance?',
    a: 'The best time to buy life insurance is as early and while as healthy as possible — premiums are lowest in your 20s and 30s and increase roughly 8–10% for each year you wait. Life insurance becomes most critical when others depend on your income: when you have a spouse, young children, or a mortgage. Even if you are single with no dependents today, purchasing a convertible term policy while you are young and healthy locks in the lowest rate and lets you convert to permanent coverage later without a new medical exam — regardless of any health changes that occur. If you have a health condition that may worsen, acting promptly is especially important since future insurability is never guaranteed. The most expensive life insurance is the policy you did not buy before receiving a serious medical diagnosis.',
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

          <div className="space-y-10 mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How the DIME Life Insurance Calculator Works</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                This calculator uses the DIME method — a structured formula used by financial planners to size life insurance needs precisely. Rather than applying a crude income multiple, DIME accounts for your actual financial obligations across four categories: Debt (all outstanding non-mortgage loans), Income replacement (annual earnings × years to retirement × 0.8), Mortgage balance, and Education costs per child. The complete formula is:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 font-mono text-sm text-gray-700 dark:text-gray-300 mb-3 overflow-x-auto">
                Coverage Need = Debt + (Income × Years × 0.8) + Mortgage + (Children × Education) − Savings − Existing Coverage
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                The 0.8 income multiplier reflects that household spending typically drops about 20% when one earner is gone — your surviving family does not need a full 100% income replacement. Subtracting existing savings and any life insurance you currently hold gives you the true coverage gap: the additional death benefit you actually need to purchase.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Premium estimates are generated by applying actuarial rating factors — age, biological sex, health classification, tobacco status, and term length — to a base rate per $1,000 of coverage. These factors mirror what life insurance underwriters use. Your actual quoted premium will follow a full medical underwriting review including blood work, BMI, blood pressure, and family medical history, so treat this estimate as a planning benchmark before requesting official quotes from insurers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Calculating Michael&apos;s Life Insurance Need</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Michael is 38, married, and has two children ages 8 and 10. He earns $85,000 per year and expects to retire in 25 years. He carries a $280,000 mortgage balance, $25,000 in credit card and auto loan debt, and estimates $120,000 per child for college. He has $45,000 in savings and a $50,000 group life policy through his employer.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl px-5 py-4 text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1.5">
                <div className="flex justify-between gap-4"><span className="font-semibold">D — Debt:</span><span>$25,000</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">I — Income × 25 yrs × 0.8:</span><span>$1,700,000</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">M — Mortgage balance:</span><span>$280,000</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">E — Education (2 × $120,000):</span><span>$240,000</span></div>
                <div className="flex justify-between gap-4 border-t border-gray-200 dark:border-gray-600 pt-1.5 font-semibold"><span>DIME Total:</span><span>$2,245,000</span></div>
                <div className="flex justify-between gap-4"><span className="font-semibold">Minus savings + existing coverage:</span><span>−$95,000</span></div>
                <div className="flex justify-between gap-4 text-blue-700 dark:text-blue-400 font-bold pt-0.5"><span>Coverage Gap:</span><span>≈ $2,150,000</span></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Michael would shop for a $2,000,000–$2,250,000 term life policy. For a healthy non-smoking male at 38, a 20-year term policy in this range typically costs $80–$110 per month based on standard actuarial rates. The equivalent whole life policy would cost approximately $700–$900 per month — roughly 8–10 times more for the same death benefit. The 20-year term carries Michael to age 58, by which point his mortgage will be paid off, both children will be financially independent, and he will have built substantial retirement savings, dramatically reducing his life insurance need.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Life Insurance Premiums</h2>
              <ul className="space-y-5">
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Age at Purchase</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Life insurance premiums rise approximately 8–10% for every year you delay. A healthy 30-year-old male pays roughly $22/month for $500,000 of 20-year term coverage; the same policy at 40 typically costs $38–$45/month, and at 50 the rate climbs to $90–$120/month. Every year you wait costs more — both in higher premiums and in the growing risk that a health change makes you uninsurable at standard rates.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Health Classification</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Insurers assign rating classes — typically Preferred Plus, Preferred, Standard Plus, and Standard — based on BMI, blood pressure, cholesterol, family history of cancer or heart disease, and driving record. Dropping one classification tier can raise premiums by 25–50%. Because each company evaluates health factors differently, shopping multiple insurers is especially valuable if you have specific health conditions.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Tobacco and Nicotine Use</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Smokers and nicotine users — including e-cigarettes, vaping, patches, and chewing tobacco — pay 2–3 times the non-smoker rate for identical life insurance coverage. Most insurers require 12 months to 5 years of complete nicotine-free status before reclassifying a former smoker. Quitting and then re-applying for non-smoker rates can save tens of thousands of dollars over the life of a 20- or 30-year policy.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Coverage Amount and Term Length</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">A longer term and a larger death benefit both increase your premium. A 30-year term typically costs 60–80% more than a 10-year term for the same coverage amount. Interestingly, adding an extra $250,000 in coverage often costs only $8–$15/month more — making it cost-effective to round up to the next increment when the DIME formula suggests higher coverage is warranted.</p>
                </li>
                <li>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Biological Sex</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Women statistically live approximately 5 years longer than men, producing meaningfully lower mortality risk and lower life insurance premiums. Female rates are typically 20–30% below male rates for identical coverage, age, and health profile. This actuarial pricing difference is legal and standard practice across the U.S. life insurance industry.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pb-6 px-2">
            This calculator provides estimates for educational purposes only. Actual life insurance premiums and coverage needs vary based on your specific situation, insurer underwriting criteria, age, health, and policy factors. Consult a licensed insurance agent or broker for accurate quotes and coverage recommendations.
          </p>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
