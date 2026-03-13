import AppShell from "@/components/layout/AppShell"
import AIWorkspace from "@/components/ai/AIWorkspace"
import PremiumPanel from "@/components/ui/PremiumPanel"
import { getEvents, getRelationships } from "@/lib/data/mockDb"

export default function AIPage() {
  const relationships = getRelationships()
  const events = getEvents()

  return (
    <AppShell
      title="Defrag AI"
      subtitle="A dedicated strategic workspace for pattern clarity, timing choices, and next-step wording."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">AI workspace</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">Work from context, not reaction.</h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Defrag AI reads relationship context and timeline movement so guidance stays focused on pressure, distance,
            repair, timing, and clear next steps.
          </p>
        </div>
      </PremiumPanel>

      <AIWorkspace relationships={relationships} events={events} />
    </AppShell>
  )
}
