import BrandGradient from "@/components/brand/BrandGradient"

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/60 bg-white/80 px-8 py-20 shadow-[0_10px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:px-12">
      <BrandGradient />
      <div className="relative max-w-4xl">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-500">Defrag</p>
        <h1 className="text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">Understand the patterns shaping your relationships.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">Clear, practical insight for communication, conflict, and recurring dynamics.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="/signup" className="rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">Start free trial</a>
          <a href="/pricing" className="rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">View pricing</a>
        </div>
      </div>
    </section>
  )
}
