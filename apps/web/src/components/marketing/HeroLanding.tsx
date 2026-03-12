import Link from "next/link"
import { ArrowRight, Sparkles, ShieldCheck, Network, Brain, Clock3 } from "lucide-react"
import BrandBackground from "@/components/brand/BrandBackground"
import GlassPanel from "@/components/ui/GlassPanel"

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <GlassPanel className="p-6">
      <div className="inline-flex rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-medium text-zinc-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-600">{body}</p>
    </GlassPanel>
  )
}

export default function HeroLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fb] px-3 py-3 text-zinc-950 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandBackground />

      <div className="relative mx-auto max-w-7xl space-y-4 lg:space-y-6">
        <GlassPanel className="overflow-hidden px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-zinc-500">Defrag</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Understand the patterns shaping your relationships.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
                Defrag helps you make sense of communication, tension, timing, and recurring dynamics through clear, practical insight.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  Start free trial
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
                >
                  View pricing
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm text-zinc-700">Relationship maps</div>
                <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm text-zinc-700">Simulations</div>
                <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm text-zinc-700">AI guidance</div>
              </div>
            </div>

            <GlassPanel className="p-5 sm:p-6">
              <div className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-950">Daily relational insight</p>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">Live</span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">System state</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">Elevated</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">Recent signals suggest higher sensitivity around unresolved topics.</p>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Suggested approach</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-700">Use short clarifications, avoid urgency, and pause before reacting to sensitive messages.</p>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-950">Repair potential</span>
                      <span className="text-sm text-zinc-600">Moderate</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-zinc-200">
                      <div className="h-2 w-[62%] rounded-full bg-zinc-950" />
                    </div>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </GlassPanel>

        <section className="grid gap-4 md:grid-cols-3 md:gap-6">
          <Feature
            icon={<Network size={20} />}
            title="See relationship patterns"
            body="Map the people, tension points, and recurring cycles that shape your daily experience."
          />
          <Feature
            icon={<Brain size={20} />}
            title="Prepare for difficult conversations"
            body="Explore likely outcomes before you act, with guidance aimed at healthier communication."
          />
          <Feature
            icon={<ShieldCheck size={20} />}
            title="Follow daily insight"
            body="Get calm, practical guidance about timing, pressure, and ways to reduce avoidable friction."
          />
        </section>

        <GlassPanel className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">How Defrag helps</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">A premium system for relational clarity</h2>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5">
              <div className="inline-flex rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
                <Clock3 size={18} />
              </div>
              <h3 className="mt-4 text-base font-medium">Timeline awareness</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">Track how events build over time instead of reacting to isolated moments.</p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5">
              <div className="inline-flex rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
                <Sparkles size={18} />
              </div>
              <h3 className="mt-4 text-base font-medium">Calm AI guidance</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">Receive practical insight designed to support healthier outcomes for everyone involved.</p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </main>
  )
}
