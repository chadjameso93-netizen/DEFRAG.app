"use client"

import PremiumPanel from "@/components/ui/PremiumPanel"

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
    <PremiumPanel className={`p-6 ${featured ? "border-zinc-900 bg-zinc-950 text-white" : ""}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${featured ? "text-zinc-300" : "text-zinc-500"}`}>{name}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{price}</p>
      <p className={`mt-3 text-sm leading-7 ${featured ? "text-zinc-300" : "text-zinc-600"}`}>{description}</p>

      <div className="mt-6 space-y-3">
        {points.map((point) => (
          <div
            key={point}
            className={`rounded-2xl border px-4 py-3 text-sm ${
              featured ? "border-zinc-800 bg-zinc-900/70 text-zinc-200" : "border-zinc-200 bg-white/80 text-zinc-700"
            }`}
          >
            {point}
          </div>
        ))}
      </div>

      <button
        onClick={checkout}
        className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-medium transition ${
          featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-zinc-950 text-white hover:bg-zinc-800"
        }`}
      >
        Choose plan
      </button>
    </PremiumPanel>
  )
}

export default function PricingPlans() {
  return (
    <section className="grid gap-4 lg:grid-cols-3 lg:gap-6">
      <Plan
        name="Starter"
        price="Free"
        description="A simple entry point for exploring the product."
        points={[
          "Core onboarding",
          "Basic daily insight",
          "Relationship overview",
        ]}
      />
      <Plan
        name="Core"
        price="$24/mo"
        description="The main plan for ongoing personal use."
        featured
        points={[
          "Full dashboard access",
          "Simulations and AI guidance",
          "Expanded relationship views",
        ]}
      />
      <Plan
        name="Practitioner"
        price="$99/mo"
        description="For coaches, facilitators, and advanced use."
        points={[
          "Multiple profiles",
          "Expanded reporting",
          "Advanced workflow support",
        ]}
      />
    </section>
  )
}
