"use client"
import { useState } from "react"

function Plan({
  name,
  price,
  description,
  cta,
  featured = false,
  points,
  onClick,
  disabled,
}: {
  name: string
  price: string
  description: string
  cta: string
  featured?: boolean
  points: string[]
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <div className={`bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-[32px] transform-gpu transition-all duration-300 hover:border-[#333] hover:-translate-y-1 hover:shadow-2xl relative flex flex-col justify-between h-full`}>
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[#9A9A9A]">{name}</p>
        <p className="mt-[16px] text-4xl font-semibold tracking-tight text-[#EAEAEA]">{price}</p>
        <p className="mt-[16px] text-[14px] leading-relaxed text-[#9A9A9A] font-light min-h-[60px]">{description}</p>

        <div className="mt-[32px] space-y-[12px]">
          {points.map((point) => (
            <div key={point} className="flex items-center gap-[12px] text-[13px] text-[#EAEAEA] font-light">
              <div className="w-[4px] h-[4px] bg-[#4F6BFF] rounded-full" />
              {point}
            </div>
          ))}
        </div>
      </div>

      {featured ? (
        <div className="mt-[32px]">
          <button
            onClick={onClick}
            disabled={disabled}
            className="w-full rounded-[8px] bg-[#EAEAEA] text-[#000000] px-[24px] py-[12px] text-[13px] font-medium transition-colors duration-300 hover:bg-[#FFFFFF] disabled:opacity-50"
          >
            {cta}
          </button>
        </div>
      ) : (
        <div className="mt-[32px]">
          <button
            onClick={onClick}
            disabled={disabled}
            className="w-full rounded-[8px] border border-[#1F1F1F] bg-transparent text-[#EAEAEA] px-[24px] py-[12px] text-[13px] font-medium transition-colors duration-300 hover:bg-[#111111] disabled:opacity-50"
          >
            {cta}
          </button>
        </div>
      )}
    </div>
  )
}

export default function PricingPlans() {
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState("")

  async function checkoutCore() {
    if (checkoutLoading) return

    setCheckoutLoading(true)
    setCheckoutError("")

    try {
      const res = await fetch("/api/billing/create-checkout", { method: "POST" })
      const data = await res.json()
      if (res.ok && data?.url) {
        window.location.href = data.url
        return
      }
      setCheckoutError(data?.error || "Checkout could not be started. Please try again.")
    } catch {
      setCheckoutError("Network issue while starting checkout. Please try again.")
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <section className="grid gap-[24px] lg:grid-cols-3 items-stretch">
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
      <div>
        <Plan
          name="Core"
          price="$24/month"
          description="Use the full platform for ongoing relationship clarity, timeline tracking, and AI support."
          featured
          cta={checkoutLoading ? "Starting checkout..." : "Choose Core"}
          points={["Daily read", "Relationship display", "AI guidance", "Timeline and invite flow"]}
          onClick={checkoutCore}
          disabled={checkoutLoading}
        />
        {checkoutError ? <p className="mt-2 text-sm text-[#f87171]">{checkoutError}</p> : null}
      </div>
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
