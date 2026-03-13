"use client"

import GlowCard from "@/components/ui/GlowCard"

async function checkoutCore() {
  try {
    const res = await fetch("/api/billing/create-checkout", { method: "POST" })
    const data = await res.json()
    if (data?.url) {
      window.location.href = data.url
      return
    }
  } catch {
    // Fall back to signup if checkout cannot be created.
  }
  window.location.href = "/signup"
}

function Plan({
  name,
  price,
  description,
  cta,
  featured = false,
  points,
  onClick,
}: {
  name: string
  price: string
  description: string
  cta: string
  featured?: boolean
  points: string[]
  onClick: () => void
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
        onClick={onClick}
        className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-medium transition ${
          featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        {cta}
      </button>
    </GlowCard>
  )
}

export default function PricingPlans() {
  return (
    <section className="grid gap-4 lg:grid-cols-3 lg:gap-6">
      <Plan
        name="Free"
        price="Free"
        description="Start with a limited workspace and preview the core product surfaces."
        cta="Start free"
        points={["Guided onboarding", "Dashboard preview", "Relationship overview"]}
        onClick={() => {
          window.location.href = "/signup"
        }}
      />
      <Plan
        name="Core"
        price="$24/month"
        description="Use the full platform for ongoing relationship clarity, timeline tracking, and AI support."
        featured
        cta="Choose Core"
        points={["Daily read", "Relationship display", "AI guidance", "Timeline and invite flow"]}
        onClick={checkoutCore}
      />
      <Plan
        name="Developer / API"
        price="Contact"
        description="For API access, developer workflows, and integration planning."
        cta="Contact"
        points={["API access roadmap", "Developer onboarding", "Priority updates"]}
        onClick={() => {
          window.location.href = "/support"
        }}
      />
    </section>
  )
}
