"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Users, Bot } from "lucide-react"
import GlowCard from "@/components/ui/GlowCard"

const TOUR_STEPS = [
  {
    icon: LayoutDashboard,
    title: "Today",
    description: "Your home screen. See live relational pressure, priority relationships, and suggested next steps at a glance.",
  },
  {
    icon: Users,
    title: "Relationships",
    description: "Map and manage the people in your system. Review trust, tension, and connection history for each relationship.",
  },
  {
    icon: Bot,
    title: "Defrag AI",
    description: "Ask about situations, get timing guidance, practice conversations, and receive grounded next steps.",
  },
]

export default function StepGuidedTour() {
  const router = useRouter()
  const [tourIndex, setTourIndex] = useState(0)

  const current = TOUR_STEPS[tourIndex]
  const Icon = current.icon
  const isLast = tourIndex === TOUR_STEPS.length - 1

  return (
    <GlowCard className="p-8 text-center sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Quick tour</p>

      <div className="mx-auto mt-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-4">
        <Icon size={32} className="text-white" />
      </div>

      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">{current.title}</h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-white/60">{current.description}</p>

      <div className="mt-6 flex justify-center gap-2">
        {TOUR_STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-6 rounded-full transition ${i === tourIndex ? "bg-white/60" : "bg-white/15"}`}
          />
        ))}
      </div>

      <button
        onClick={() => {
          if (isLast) {
            router.push("/dashboard")
          } else {
            setTourIndex(tourIndex + 1)
          }
        }}
        className="mt-6 w-full rounded-2xl bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
      >
        {isLast ? "Go to your dashboard" : "Next"}
      </button>
    </GlowCard>
  )
}
