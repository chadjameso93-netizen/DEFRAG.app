import { Panel } from "@/components/ui/Panel";
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import PremiumFooter from "@/components/marketing/PremiumFooter"

export const metadata = {
  title: "Why Defrag — Relational Intelligence Platform",
  description: "Why we built a system for understanding relationships before the next move.",
}

export default function WhyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#000000] px-3 py-3 text-[#EAEAEA] sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto max-w-4xl space-y-4 lg:space-y-6">
        <Panel className="p-8 sm:p-10 lg:p-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#555555]">Why Defrag</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#EAEAEA] sm:text-5xl">
            Relationships are systems. Most tools ignore that.
          </h1>
          <p className="mt-6 font-serif-accent text-base leading-8 text-[#9A9A9A]">
            Most relationship advice focuses on a single moment — what someone said, what you should say back. But relationships are not isolated moments. They are patterns that build over time, shaped by pressure, trust, repair, and timing.
          </p>
        </Panel>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <Panel className="p-6">
            <h3 className="text-lg font-medium text-[#EAEAEA]">The problem with reaction</h3>
            <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
              When we react to a single moment without understanding the pattern behind it, we often make things worse. We escalate when the other person is flooding. We withdraw when they need repair. We push when the timing is wrong.
            </p>
          </Panel>
          <Panel className="p-6">
            <h3 className="text-lg font-medium text-[#EAEAEA]">What changes with context</h3>
            <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
              When you can see the full pattern — who is involved, what has been happening, where pressure is building — your next step becomes clearer. Not perfect. Clearer. And that clarity is often the difference between escalation and repair.
            </p>
          </Panel>
        </div>

        <Panel className="p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-[#EAEAEA]">What Defrag does differently</h2>
          <div className="mt-6 space-y-4">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5">
              <p className="text-sm font-medium text-[#EAEAEA]">Maps the people and connections in your system</p>
              <p className="mt-2 text-sm text-[#9A9A9A]">Not a contact list. A live map of trust, tension, and closeness.</p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5">
              <p className="text-sm font-medium text-[#EAEAEA]">Tracks events over time</p>
              <p className="mt-2 text-sm text-[#9A9A9A]">Conflict, repair, stress, observation — sequenced so the build-up is visible.</p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5">
              <p className="text-sm font-medium text-[#EAEAEA]">Generates grounded guidance</p>
              <p className="mt-2 font-serif-accent text-sm text-[#9A9A9A]">AI that reads your actual context and produces specific next steps, not fortune-cookie encouragement.</p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5">
              <p className="text-sm font-medium text-[#EAEAEA]">Shows its reasoning</p>
              <p className="mt-2 text-sm text-[#9A9A9A]">Every insight comes with a proof layer — what patterns were detected, what timing factors apply, and what the relational hypothesis looks like.</p>
            </div>
          </div>
        </Panel>

        <Panel className="p-8 text-center sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-[#EAEAEA]">Ready to see the pattern?</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#9A9A9A]">
            Start with one relationship and one situation. See what Defrag finds.
          </p>
          <Link
            href="/onboarding"
            className="mt-6 inline-flex items-center gap-2 rounded-[8px] bg-[#EAEAEA] px-6 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none"
          >
            Get started
            <ArrowRight size={16} />
          </Link>
        </Panel>

        <PremiumFooter />
      </div>
    </main>
  )
}
