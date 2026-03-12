import Link from "next/link"
import { ArrowRight, ShieldCheck, Sparkles, Network, BrainCircuit, Clock3, PlayCircle } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import PremiumPanel from "@/components/ui/PremiumPanel"
import PremiumFooter from "@/components/marketing/PremiumFooter"

function Metric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-tight text-white">{value}</p>
    </div>
  )
}

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
    <PremiumPanel className="p-6">
      <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-white shadow-sm transition duration-300 hover:bg-white/10">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-medium text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/60">{body}</p>
    </PremiumPanel>
  )
}

export default function HeroLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] px-3 py-3 text-white sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto max-w-7xl space-y-4 lg:space-y-6">
        <PremiumPanel className="overflow-hidden p-4 sm:p-6 lg:p-8">
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/50 shadow-sm">
                  Defrag
                </div>

                <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[68px] lg:leading-[1.02]">
                  Know what is happening in your relationships before it becomes a larger problem.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                  Defrag is a premium relational insight platform that helps people understand communication, tension, timing, and recurring patterns across families, teams, and partnerships through clear, practical guidance.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
                  >
                    Start free trial
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    View pricing
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <Metric label="What it does" value="Maps patterns" />
                  <Metric label="Why it matters" value="Reduce friction" />
                  <Metric label="Guidance" value="Calm and clear" />
                </div>
              </div>

              <PremiumPanel className="p-5 sm:p-6">
                <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Today’s relational field</p>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/65">Updated</span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">System state</p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">Elevated</p>
                      <p className="mt-2 text-sm leading-6 text-white/60">Recent signals suggest higher sensitivity around unresolved topics.</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Recommended approach</p>
                      <p className="mt-2 text-sm leading-7 text-white/65">Use short clarifications, avoid urgency, and pause before reacting to sensitive messages.</p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Repair</p>
                        <div className="mt-3 h-2 rounded-full bg-white/10">
                          <div className="h-2 w-[62%] rounded-full bg-white" />
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Guidance mode</p>
                        <p className="mt-2 text-sm font-medium text-white">Pause first</p>
                      </div>
                    </div>
                  </div>
                </div>
              </PremiumPanel>
            </div>
          </div>
        </PremiumPanel>

        <section className="grid gap-4 md:grid-cols-3 md:gap-6">
          <Feature
            icon={<Network size={20} />}
            title="What it is"
            body="A relational intelligence platform that turns events, tension, and interaction patterns into structured insight."
          />
          <Feature
            icon={<BrainCircuit size={20} />}
            title="What it does"
            body="Shows relationship maps, simulations, timelines, and calm AI interpretation across your most important dynamics."
          />
          <Feature
            icon={<ShieldCheck size={20} />}
            title="Why people need it"
            body="It helps people see larger patterns sooner, reduce avoidable friction, and move toward healthier outcomes."
          />
        </section>

        <PremiumPanel className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">How Defrag helps</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white lg:text-[40px]">A system for relational clarity and better decisions.</h2>
              <p className="mt-4 text-sm leading-7 text-white/60">
                Built for people who want to understand larger patterns, reduce avoidable friction, and approach important conversations with more awareness.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
                >
                  Open dashboard
                  <PlayCircle size={16} />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:bg-white/10">
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 shadow-sm">
                  <Clock3 size={18} />
                </div>
                <h3 className="mt-4 text-base font-medium text-white">Timeline awareness</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">Track how events build over time instead of reacting to isolated moments.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:bg-white/10">
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 shadow-sm">
                  <Sparkles size={18} />
                </div>
                <h3 className="mt-4 text-base font-medium text-white">AI interpretation</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">Turn raw experiences into clearer relational insight and practical next steps.</p>
              </div>
            </div>
          </div>
        </PremiumPanel>
        <PremiumFooter />
      </div>
    </main>
  )
}
