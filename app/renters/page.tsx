import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import RentersCalculatorWrapper from '@/components/RentersCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Renters Insurance Calculator — Estimate Your Cost',
  description:
    'Estimate renters insurance costs based on personal property value and location. Free renters insurance calculator showing coverage options.',
  alternates: { canonical: 'https://insurancecalculators.app/renters' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'Is renters insurance required?',
    a: 'Renters insurance is not required by law, but many landlords require proof of renters insurance as a condition of the lease agreement. Even when not required, renters insurance is strongly recommended — it protects your belongings from theft, fire, and water damage and provides liability coverage if someone is injured in your rental. At an average cost of $15/month, renters insurance is one of the most affordable and highest-value insurance policies available.',
  },
  {
    q: 'What does renters insurance cover?',
    a: 'A standard renters insurance policy (HO-4) covers three main areas: (1) Personal property — your belongings including furniture, electronics, clothing, and appliances, typically covered for theft, fire, vandalism, and certain water damage. (2) Liability — if someone is injured in your apartment or you accidentally damage someone else\'s property, liability coverage pays for legal costs and damages up to your policy limit. (3) Additional living expenses — if your unit becomes uninhabitable due to a covered event, your policy pays for temporary housing, food, and other costs while repairs are made.',
  },
  {
    q: 'How much does renters insurance cost per month?',
    a: 'The national average renters insurance cost is approximately $15 per month ($180 per year). Your actual premium depends on the value of your personal property, your location, crime rates in your area, and the liability coverage amount you choose. High-crime or urban areas cost more. Adding optional riders for electronics, jewelry, or identity theft protection adds a few dollars per month. Bundling renters and auto insurance with the same company can save 5-15% on both policies.',
  },
  {
    q: 'Does renters insurance cover my car?',
    a: 'No — renters insurance does not cover your car. Damage to your vehicle or theft of your car requires auto insurance (comprehensive coverage for theft). However, renters insurance does cover personal belongings stolen from your car, such as a laptop or other items, up to your personal property coverage limit and subject to your deductible. It also does not cover damage to the building itself — that is covered by your landlord\'s property insurance.',
  },
  {
    q: 'How much personal property coverage do I need?',
    a: 'To determine how much personal property coverage you need, take a home inventory: walk through each room and estimate the value of your belongings. Include furniture, electronics, clothing, kitchen appliances, jewelry, sporting equipment, and any collections. Most renters underestimate their belongings — the average renter has $30,000 or more in personal property. Choose coverage that equals your total inventory value. Consider a replacement cost policy rather than actual cash value to ensure your payout covers the full cost of replacing items at today\'s prices.',
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
  name: 'Renters Insurance Calculator',
  url: 'https://insurancecalculators.app/renters',
  description: 'Free renters insurance cost estimator based on personal property value, location, and liability coverage needs.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Estimate Your Renters Insurance Cost',
  step: [
    { '@type': 'HowToStep', name: 'Estimate your personal property value', text: 'Add up the value of all your belongings — furniture, electronics, clothing, and other personal items. This determines your personal property coverage amount and is the primary driver of your renters insurance premium.' },
    { '@type': 'HowToStep', name: 'Select location and liability coverage', text: 'Choose your location type (urban, suburban, rural) and crime rate. Select your liability coverage amount — $300,000 is recommended for most renters. Higher liability limits add minimal cost.' },
    { '@type': 'HowToStep', name: 'Add optional riders and view your estimate', text: 'Optionally add coverage for electronics/jewelry, identity theft protection, or water backup. Your estimated annual and monthly renters insurance cost appears instantly.' },
  ],
}

const trustSignals = ['🔒 Protected', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function RentersPage() {
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
              Renters Insurance Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your renters insurance cost in seconds. Protect your personal property, get liability coverage, and add optional riders — all for less than $1 per day.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1616161616" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <RentersCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="1717171717" />
          </div>

          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 mb-2">
              Why renters insurance is the most overlooked policy
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-400 leading-relaxed">
              Only about half of all renters have renters insurance, despite it being one of the most affordable and valuable types of coverage available. Many renters mistakenly believe their landlord&apos;s insurance covers their belongings — it does not. The landlord&apos;s policy covers the building structure but provides zero protection for your furniture, electronics, clothing, or other personal property. Renters insurance also provides critical liability coverage: if a guest slips and falls in your apartment, your policy covers medical bills and potential lawsuits up to your liability limit. At just $15/month on average, renters insurance delivers exceptional value and peace of mind for any renter.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pb-6 px-2">
            This calculator provides estimates for educational purposes only. Actual renters insurance premiums vary based on your specific situation, insurer underwriting criteria, location, coverage limits, and policy factors. Consult a licensed insurance agent or broker for accurate quotes and coverage recommendations.
          </p>

          <div className="pb-6">
            <AdBanner slot="1818181818" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
