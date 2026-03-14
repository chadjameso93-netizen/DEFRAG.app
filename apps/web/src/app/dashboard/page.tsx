import AppShell from "@/components/layout/AppShell"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import DailyReadPanel from "@/components/dashboard/DailyReadPanel"
import GuidanceSummary from "@/components/dashboard/GuidanceSummary"
import TimelinePreview from "@/components/dashboard/TimelinePreview"
import PremiumPanel from "@/components/ui/PremiumPanel"
import RelationshipGraph from "@/components/graph/RelationshipGraph"
import { getEvents } from "@/lib/data/mockDb"

export default function DashboardPage() {
  const events = getEvents()

  return (
    <AppShell
      title="Dashboard"
      subtitle="See what is happening in your relationship system, where pressure is rising, and what next step may help most."
    >
      <DailyReadPanel />

      <section className="grid gap-4 lg:gap-6 2xl:grid-cols-[1.3fr_0.7fr]">
        <PremiumPanel className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Primary surface</p>
              <h2 className="mt-3 text-lg font-medium text-white">Live relationship display</h2>
              <p className="mt-2 text-sm text-white/60">
                See people in the system, relationship distance, pressure, repair, and shifting dynamics in one view.
              </p>
            </div>
            <Link href="/relationships" className="hidden items-center gap-2 text-sm text-white/68 transition hover:text-white sm:inline-flex">
              Open people
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-6">
            <RelationshipGraph />
          </div>
        </PremiumPanel>

        <div className="space-y-4">
          <GuidanceSummary />
          <PremiumPanel className="p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Defrag AI</p>
            <h3 className="mt-3 text-lg font-medium text-white">Open the strategic workspace</h3>
            <p className="mt-2 text-sm leading-7 text-white/62">
              Use AI after reviewing the relationship display and timeline so guidance can stay grounded in context.
            </p>
            <Link
              href="/ai"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-[#f3ece3]"
            >
              Open Defrag AI
              <ArrowRight size={16} />
            </Link>
          </PremiumPanel>
        </div>
      </section>

      <section>
        <PremiumPanel className="p-5 sm:p-6">
          <TimelinePreview events={events} />
        </PremiumPanel>
      </section>
    </AppShell>
  )
}
