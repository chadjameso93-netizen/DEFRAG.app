import Hero from "@/components/marketing/Hero"
import Surface from "@/components/ui/Surface"

function Feature({
  title,
  body,
}: {
  title: string
  body: string
}) {
  return (
    <Surface className="p-6">
      <h3 className="text-lg font-medium text-zinc-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-600">{body}</p>
    </Surface>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-4 text-zinc-950 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <Hero />

        <section className="grid gap-6 md:grid-cols-3">
          <Feature
            title="See relationship patterns"
            body="Map the people, tension points, and recurring cycles that shape your daily experience."
          />
          <Feature
            title="Prepare for difficult conversations"
            body="Explore likely outcomes before you act, with guidance aimed at healthier communication."
          />
          <Feature
            title="Follow daily insight"
            body="Get clear, calm guidance about timing, pressure, and ways to reduce avoidable friction."
          />
        </section>
      </div>
    </main>
  )
}
