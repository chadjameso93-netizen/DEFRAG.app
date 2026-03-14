import Link from "next/link"
import { ArrowRight } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import GlowCard from "@/components/ui/GlowCard"
import PremiumFooter from "@/components/marketing/PremiumFooter"

export const metadata = {
  title: "About — Defrag",
  description: "What Defrag is, what it is not, and the principles it is built on.",
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] px-3 py-3 text-white sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto max-w-4xl space-y-4 lg:space-y-6">
        <GlowCard className="p-8 sm:p-10 lg:p-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">About</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            A relational intelligence platform.
          </h1>
          <p className="mt-6 text-base leading-8 text-white/65">
            Defrag helps you see what is actually happening in your relationships — where pressure is building, where repair is possible, and what the most grounded next step looks like.
          </p>
        </GlowCard>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <GlowCard className="p-6">
            <h3 className="text-lg font-medium text-white">What Defrag is</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/60">
              <li>A tool for mapping, tracking, and understanding interpersonal dynamics</li>
              <li>An AI system that produces grounded, context-aware guidance</li>
              <li>A workspace for preparing before important conversations</li>
              <li>A private space where your data belongs to you alone</li>
            </ul>
          </GlowCard>
          <GlowCard className="p-6">
            <h3 className="text-lg font-medium text-white">What Defrag is not</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/60">
              <li>Not therapy, and not a replacement for professional care</li>
              <li>Not medical advice of any kind</li>
              <li>Not a tool for surveillance, manipulation, or control</li>
              <li>Not a social network — your data is never shared</li>
            </ul>
          </GlowCard>
        </div>

        <GlowCard className="p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-white">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Step 1</p>
              <p className="mt-3 text-sm font-medium text-white">Map your relationships</p>
              <p className="mt-2 text-sm text-white/60">Add the people who matter. Track trust, tension, and connection type.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Step 2</p>
              <p className="mt-3 text-sm font-medium text-white">Log events over time</p>
              <p className="mt-2 text-sm text-white/60">Capture moments of conflict, repair, stress, or observation. The timeline reveals the pattern.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Step 3</p>
              <p className="mt-3 text-sm font-medium text-white">Get grounded guidance</p>
              <p className="mt-2 text-sm text-white/60">Describe a situation. Defrag reads context and returns specific, actionable next steps.</p>
            </div>
          </div>
        </GlowCard>

        <GlowCard className="p-8 text-center sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Start understanding</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/60">
            Begin with one relationship. See what Defrag reveals about the pattern.
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
