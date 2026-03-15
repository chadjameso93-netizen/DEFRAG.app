import BrandGradient from "@/components/brand/BrandGradient"

export default function Hero() {
  return (
    <section className="glass-surface relative overflow-hidden px-8 py-20 sm:px-12">
      <BrandGradient />
      <div className="relative max-w-4xl">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#555555]">Defrag</p>
        <h1 className="text-5xl font-semibold tracking-tight text-[#EAEAEA] sm:text-6xl">Understand the patterns shaping your relationships.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9A9A9A]">Clear, practical insight for communication, conflict, and recurring dynamics.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="/signup" className="rounded-[8px] bg-[#EAEAEA] px-6 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none">Start free trial</a>
          <a href="/pricing" className="rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] px-6 py-3 text-sm font-medium text-[#EAEAEA] transition-colors duration-300 hover:bg-[#1F1F1F]">View pricing</a>
        </div>
      </div>
    </section>
  )
}
