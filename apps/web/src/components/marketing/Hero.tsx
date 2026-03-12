export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">Defrag</p>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
            Understand the patterns shaping your relationships.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Defrag helps people make sense of communication, tension, timing, and recurring dynamics through clear, practical insight.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/signup" className="rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800">Start free trial</a>
            <a href="/login" className="rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">Log in</a>
          </div>
        </div>
      </div>
    </section>
  )
}
