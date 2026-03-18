"use client"
import { Panel } from "@/components/ui/Panel";

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Users, Bot } from "lucide-react"

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
    <Panel className="p-8 text-center sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#EAEAEA]/45">Quick tour</p>

      <div className="mx-auto mt-6 inline-flex bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4">
        <Icon size={32} className="text-[#EAEAEA]" />
      </div>

      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#EAEAEA]">{current.title}</h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#9A9A9A]">{current.description}</p>

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
        className="mt-6 w-full rounded-[8px] bg-[#EAEAEA] px-6 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none"
      >
        {isLast ? "Go to your workspace" : "Next"}
      </button>
    </Panel>
  )
}
