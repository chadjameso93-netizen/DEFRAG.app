import Link from "next/link"
import { ArrowRight } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import GlowCard from "@/components/ui/GlowCard"
import PremiumFooter from "@/components/marketing/PremiumFooter"

export const metadata = {
  title: "Why Defrag — Relational Intelligence Platform",
  description: "Why we built a system for understanding relationships before the next move.",
}

export default function WhyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] px-3 py-3 text-white sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto max-w-4xl space-y-4 lg:space-y-6">
        <GlowCard className="p-8 sm:p-10 lg:p-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Why Defrag</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Relationships are systems. Most tools ignore that.
          </h1>
          <p className="mt-6 text-base leading-8 text-white/65">
            Most relationship advice focuses on a single moment — what someone said, what you should say back. But relationships are not isolated moments. They are patterns that build over time, shaped by pressure, trust, repair, and timing.
          </p>
        </GlowCard>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <GlowCard className="p-6">
            <h3 className="text-lg font-medium text-white">The problem with reaction</h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              When we react to a single moment without understanding the pattern behind it, we often make things worse. We escalate when the other person is flooding. We withdraw when they need repair. We push when the timing is wrong.
            </p>
          </GlowCard>
          <GlowCard className="p-6">
            <h3 className="text-lg font-medium text-white">What changes with context</h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              When you can see the full pattern — who is involved, what has been happening, where pressure is building — your next step becomes clearer. Not perfect. Clearer. And that clarity is often the difference between escalation and repair.
            </p>
          </GlowCard>
        </div>

        <GlowCard className="p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-white">What Defrag does differently</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white">Maps the people and connections in your system</p>
              <p className="mt-2 text-sm text-white/60">Not a contact list. A live map of trust, tension, and closeness.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white">Tracks events over time</p>
              <p className="mt-2 text-sm text-white/60">Conflict, repair, stress, observation — sequenced so the build-up is visible.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white">Generates grounded guidance</p>
              <p className="mt-2 text-sm text-white/60">AI that reads your actual context and produces specific next steps, not fortune-cookie encouragement.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white">Shows its reasoning</p>
              <p className="mt-2 text-sm text-white/60">Every insight comes with a proof layer — what patterns were detected, what timing factors apply, and what the relational hypothesis looks like.</p>
            </div>
          </div>
        </GlowCard>

        <GlowCard className="p-8 text-center sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Ready to see the pattern?</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/60">
            Start with one relationship and one situation. See what Defrag finds.
          </p>
          <Link
            href="/onboarding"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
          >
            Get started
            <ArrowRight size={16} />
          </Link>
        </GlowCard>

        <PremiumFooter />
      </div>
    </main>
  )
}
