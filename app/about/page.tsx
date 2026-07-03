import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — insurancecalculators.app',
  description: 'About insurancecalculators.app — free insurance calculators for life, auto, home, health, disability and renters insurance.',
  alternates: { canonical: 'https://insurancecalculators.app/about' },
}

export default function About() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat min-h-[200px]" style={{ backgroundImage: "url('/herobgic.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-8">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl font-bold">About insurancecalculators.app</h1>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-8 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is insurancecalculators.app?</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                insurancecalculators.app is a free suite of insurance calculators covering life insurance needs (using the DIME method), auto insurance premiums, homeowners insurance costs, health insurance premiums and ACA subsidy eligibility, disability insurance income protection, renters insurance estimates, term vs whole life comparisons, and deductible optimization. All 8 calculators are free, instant, and completely private.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our purpose</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Insurance is one of the most important financial decisions most people make, yet it remains opaque and confusing. Insurance agents are often compensated by commission, which creates potential conflicts of interest. We built insurancecalculators.app to give consumers a free, unbiased starting point for understanding their insurance coverage needs and estimated costs — before speaking with an agent or requesting quotes. Our calculators use standard actuarial principles and industry-standard formulas to produce reasonable estimates for educational purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                All calculations run entirely in your browser using pure JavaScript math with standard insurance formulas. No data is ever sent to a server. You can verify this by opening your browser&apos;s Network tab — you will see zero outbound requests when you use any calculator. Your financial information stays on your device. We use localStorage to remember your inputs across sessions for convenience.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Accuracy and limitations</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our calculators use industry-standard formulas and actuarial principles to produce reasonable estimates. However, actual insurance premiums are determined by dozens of factors specific to each insurer, your precise location, underwriting criteria, current market conditions, and individual risk characteristics that cannot be captured in a general calculator. Our estimates should be used as a ballpark starting point — not as a substitute for actual insurance quotes from licensed insurers. Always compare quotes from multiple insurance companies and consult a licensed insurance agent for personalized recommendations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Since all calculations happen client-side, your financial and personal information never leaves your device. We use Google AdSense for advertising, which may use cookies for ad personalization. We use localStorage to remember your last inputs so returning visitors see their previous calculation. See our <a href="/privacy" className="text-blue-700 dark:text-blue-400 hover:underline">Privacy Policy</a> for details.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                insurancecalculators.app provides educational insurance calculators for informational purposes only. Results are estimates and should not be construed as insurance advice, coverage recommendations, or premium guarantees. Actual insurance premiums depend on your specific underwriting profile, insurer, state regulations, and many other factors. Always consult a licensed insurance agent or broker before making insurance decisions. This site is not affiliated with any insurance company or regulatory body.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
