import AppShell from "@/components/layout/AppShell"
import StatCard from "@/components/dashboard/StatCard"
import Surface from "@/components/ui/Surface"

export default function DashboardPage() {
  return (
    <AppShell
      title="Relational intelligence"
      subtitle="A clearer view of your current system, relationship pressure, and likely communication patterns."
    >
      <section className="grid gap-6 md:grid-cols-3">
        <StatCard label="System state" value="Elevated" note="Recent conflict signals suggest higher sensitivity." />
        <StatCard label="Repair potential" value="Moderate" note="Small clarifications may improve outcomes." />
        <StatCard label="Daily insight" value="Pause first" note="Allow a beat before reacting to sensitive messages." />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Surface className="p-6">
          <h2 className="text-lg font-medium text-zinc-950">Relationship map</h2>
          <p className="mt-2 text-sm text-zinc-600">Visual overview of the current relationship system.</p>
          <div className="mt-6 h-[360px] rounded-2xl bg-zinc-100" />
        </Surface>

        <Surface className="p-6">
          <h2 className="text-lg font-medium text-zinc-950">AI guidance</h2>
          <p className="mt-2 text-sm text-zinc-600">Describe a situation and Defrag will return practical guidance.</p>
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
            Defrag sees a pattern worth slowing down for. Reduce urgency, clarify what you need, and avoid reacting too quickly.
          </div>
        </Surface>
      </section>
    </AppShell>
  )
}
