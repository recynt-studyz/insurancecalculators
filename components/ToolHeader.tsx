import CalcNav from './CalcNav'

export default function ToolHeader() {
  return (
    <header className="px-4 sm:px-6 pt-4">
      <div className="max-w-[1600px] mx-auto">
        <a
          href="/"
          className="font-mono font-bold text-xl text-white tracking-tight hover:text-blue-300 transition-colors"
        >
          insurancecalculators.app
        </a>
      </div>
      <CalcNav />
    </header>
  )
}
