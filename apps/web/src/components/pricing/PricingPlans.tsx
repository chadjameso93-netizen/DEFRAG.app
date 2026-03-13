"use client"

import GlowCard from "@/components/ui/GlowCard"

async function checkout() {
  try {
    const res = await fetch("/api/billing/create-checkout", { method: "POST" })
    const data = await res.json()
    if (data?.url) {
      window.location.href = data.url
      return
    }
  } catch {}
  window.location.href = "/signup"
}

function Plan({
  name,
  price,
  description,
  featured = false,
  points,
  actionLabel,
  onAction,
}: {
  name: string
  price: string
  description: string
  featured?: boolean
  points: string[]
  actionLabel: string
  onAction: () => void
}) {
  return (
    <GlowCard className={`p-6 ${featured ? "border-white/20 bg-white/[0.07]" : ""}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">{name}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-white">{price}</p>
      <p className="mt-3 text-sm leading-7 text-white/60">{description}</p>

      <div className="mt-6 space-y-3">
        {points.map((point) => (
          <div key={point} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            {point}
          </div>
        ))}
      </div>

      <button
        onClick={onAction}
        className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-medium transition ${
          featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        {actionLabel}
      </button>
    </GlowCard>
  )
}

export default function PricingPlans() {
  return (
    <section className="grid gap-4 lg:grid-cols-3 lg:gap-6">
      <Plan
        name="Free"
        price="$0"
        description="Limited access to start mapping your system."
        points={["Basic onboarding", "Relationship display preview", "Timeline sample"]}
        actionLabel="Get started"
        onAction={() => (window.location.href = "/signup")}
      />
      <Plan
        name="Core"
        price="$24/mo"
        description="Full access to the dashboard, timeline, and strategic guidance."
        featured
        points={["Daily read", "Bowen display", "Timeline + forward awareness", "AI strategic advisor"]}
        actionLabel="Start Core"
        onAction={checkout}
      />
      <Plan
        name="Developer / API"
        price="Contact"
        description="API access for teams, practitioners, and integrations."
        points={["Relational intelligence API", "Team onboarding", "Priority support"]}
        actionLabel="Contact"
        onAction={() => (window.location.href = "/support")}
      />
    </section>
  )
}
