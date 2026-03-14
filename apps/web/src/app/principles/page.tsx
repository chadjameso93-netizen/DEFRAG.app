import BrandMesh from "@/components/brand/BrandMesh"
import GlowCard from "@/components/ui/GlowCard"
import PremiumFooter from "@/components/marketing/PremiumFooter"

export const metadata = {
  title: "Principles — Defrag",
  description: "The design and safety principles Defrag is built on.",
}

const PRINCIPLES = [
  {
    title: "Clarity over comfort",
    body: "Defrag tells you what the pattern looks like, not what you want to hear. Honest framing leads to better decisions than reassurance.",
  },
  {
    title: "Agency, not dependency",
    body: "Every insight ends by returning the decision to you. Defrag helps you see the situation more clearly — you choose what to do with that clarity.",
  },
  {
    title: "Context before advice",
    body: "Guidance without context is noise. Defrag reads relationship history, event sequence, and pattern evidence before producing any recommendation.",
  },
  {
    title: "Specific, not generic",
    body: "No fortune-cookie encouragement. Every response references the actual people, patterns, and timing in your situation.",
  },
  {
    title: "Safety as a constraint",
    body: "Defrag will not help with harassment, stalking, manipulation, or harm. If it detects a safety concern, it redirects to appropriate resources.",
  },
  {
    title: "Privacy by default",
    body: "Your relationship data is encrypted at rest and accessible only by you. Defrag does not share, sell, or train on your data.",
  },
  {
    title: "Transparency of reasoning",
    body: "Every insight includes a proof layer showing what patterns were detected, what evidence was used, and what the timing assessment looks like.",
  },
  {
    title: "Not therapy",
    body: "Defrag is a relational intelligence tool, not a clinical service. It does not diagnose, treat, or replace professional mental health care.",
  },
]

export default function PrinciplesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--surface-0)] px-3 py-3 text-[var(--text-primary)] sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto max-w-4xl space-y-4 lg:space-y-6">
        <GlowCard className="p-8 sm:p-10 lg:p-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">Principles</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            What we build on.
          </h1>
          <p className="mt-6 font-serif-accent text-base leading-8 text-[var(--text-secondary)]">
            Every feature, every prompt, and every design decision in Defrag is guided by these principles. They are not aspirational — they are constraints.
          </p>
        </GlowCard>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {PRINCIPLES.map((p) => (
            <GlowCard key={p.title} className="p-6">
              <h3 className="text-lg font-medium text-[var(--text-primary)]">{p.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{p.body}</p>
            </GlowCard>
          ))}
        </div>

        <PremiumFooter />
      </div>
    </main>
  )
}
