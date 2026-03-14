import BrandGradient from "@/components/brand/BrandGradient"

export default function Hero() {
  return (
    <section className="glass-surface relative overflow-hidden px-8 py-20 sm:px-12">
      <BrandGradient />
      <div className="relative max-w-4xl">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--text-muted)]">Defrag</p>
        <h1 className="text-5xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-6xl">Understand the patterns shaping your relationships.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">Clear, practical insight for communication, conflict, and recurring dynamics.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="/signup" className="rounded-2xl bg-[var(--text-primary)] px-6 py-3 text-sm font-medium text-[var(--surface-0)] shadow-[0_0_20px_rgba(245,245,240,0.04)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,245,240,0.08)]">Start free trial</a>
          <a href="/pricing" className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors duration-300 hover:bg-white/[0.06]">View pricing</a>
        </div>
      </div>
    </section>
  )
}
