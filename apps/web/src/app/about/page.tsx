import { Panel } from "@/components/ui/Panel";
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import PremiumFooter from "@/components/marketing/PremiumFooter"

export const metadata = {
  title: "About — Defrag",
  description: "What Defrag is, what it is not, and the principles it is built on.",
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#000000] px-3 py-3 text-[#EAEAEA] sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto max-w-4xl space-y-4 lg:space-y-6">
        <Panel className="p-8 sm:p-10 lg:p-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#555555]">About</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[#EAEAEA] sm:text-5xl">
            A relational intelligence platform.
          </h1>
          <p className="mt-6 font-serif-accent text-base leading-8 text-[#9A9A9A]">
            Defrag helps you see what is actually happening in your relationships — where pressure is building, where repair is possible, and what the most grounded next step looks like.
          </p>
        </Panel>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <Panel className="p-6">
            <h3 className="text-lg font-medium text-[#EAEAEA]">What Defrag is</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#9A9A9A]">
              <li>A tool for mapping, tracking, and understanding interpersonal dynamics</li>
              <li>An AI system that produces grounded, context-aware guidance</li>
              <li>A workspace for preparing before important conversations</li>
              <li>A private space where your data belongs to you alone</li>
            </ul>
          </Panel>
          <Panel className="p-6">
            <h3 className="text-lg font-medium text-[#EAEAEA]">What Defrag is not</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#9A9A9A]">
              <li>Not therapy, and not a replacement for professional care</li>
              <li>Not medical advice of any kind</li>
              <li>Not a tool for surveillance, manipulation, or control</li>
              <li>Not a social network — your data is never shared</li>
            </ul>
          </Panel>
        </div>

        <Panel className="p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-[#EAEAEA]">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Step 1</p>
              <p className="mt-3 text-sm font-medium text-[#EAEAEA]">Map your relationships</p>
              <p className="mt-2 text-sm text-[#9A9A9A]">Add the people who matter. Track trust, tension, and connection type.</p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Step 2</p>
              <p className="mt-3 text-sm font-medium text-[#EAEAEA]">Log events over time</p>
              <p className="mt-2 text-sm text-[#9A9A9A]">Capture moments of conflict, repair, stress, or observation. The timeline reveals the pattern.</p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Step 3</p>
              <p className="mt-3 text-sm font-medium text-[#EAEAEA]">Get grounded guidance</p>
              <p className="mt-2 text-sm text-[#9A9A9A]">Describe a situation. Defrag reads context and returns specific, actionable next steps.</p>
            </div>
          </div>
        </Panel>

        <Panel className="p-8 text-center sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-[#EAEAEA]">Start understanding</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#9A9A9A]">
            Begin with one relationship. See what Defrag reveals about the pattern.
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
