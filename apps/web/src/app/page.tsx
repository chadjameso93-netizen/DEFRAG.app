import Hero from "@/components/marketing/Hero"

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-lg font-medium text-zinc-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{body}</p>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-white text-zinc-950">
      <Hero />
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">What Defrag helps with</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Clear insight for real relationships</h2>
          <p className="mt-4 text-zinc-600">Defrag is designed to make relationship patterns easier to understand, so people can communicate with more clarity and less friction.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Feature title="See relationship patterns" body="Map the people, tension points, and recurring cycles that shape your daily experience." />
          <Feature title="Prepare for difficult conversations" body="Explore likely outcomes before you act, with guidance aimed at healthier communication." />
          <Feature title="Follow daily insight" body="Get clear, calm guidance about timing, pressure, and ways to reduce avoidable friction." />
        </div>
      </section>
    </main>
  )
}
