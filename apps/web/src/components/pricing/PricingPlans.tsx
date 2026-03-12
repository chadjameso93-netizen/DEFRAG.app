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
}: {
  name: string
  price: string
  description: string
  featured?: boolean
  points: string[]
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
        onClick={checkout}
        className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-medium transition ${
          featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        Choose plan
      </button>
    </GlowCard>
  )
}

export default function PricingPlans() {
  return (
    <section className="grid gap-4 lg:grid-cols-3 lg:gap-6">
      <Plan
        name="Starter"
        price="Free"
        description="Explore the platform structure and core surfaces."
        points={["Core onboarding", "Basic dashboard", "Relationship overview"]}
      />
      <Plan
        name="Core"
        price="$24/mo"
        description="Use the full product for ongoing relationship analysis."
        featured
        points={["Dashboard access", "Simulations", "AI guidance", "Timeline tracking"]}
      />
      <Plan
        name="Practitioner"
        price="$99/mo"
        description="For deeper use cases and expanded workflow support."
        points={["Multiple profiles", "Expanded reporting", "Advanced workflow support"]}
      />
    </section>
  )
}
