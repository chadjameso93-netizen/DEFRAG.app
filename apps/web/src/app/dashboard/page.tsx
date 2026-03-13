import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import AIChat from "@/components/chat/AIChat"
import { DashboardBowenDisplay, DashboardPatternSummary, DashboardTimeline } from "@/components/dashboard/DashboardData"
import DailyRead from "@/components/dashboard/DailyRead"
import { getSupabaseServer } from "@/lib/auth/session"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await getSupabaseServer()
  const { data } = await supabase.auth.getSession()
  if (!data.session) {
    redirect("/login")
  }

  return (
    <AppShell
      title="Dashboard"
      subtitle="Your relational control surface. See what is happening, where pressure is rising, and what may help next."
    >
      <DailyRead />

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.35fr_0.65fr] lg:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-white">Bowen relationship display</h2>
          <p className="mt-2 text-sm text-white/60">
            A live view of who is close, where tension is rising, and where repair is beginning.
          </p>
          <div className="mt-6">
            <DashboardBowenDisplay />
          </div>
        </PremiumPanel>

        <div className="space-y-4">
          <PremiumPanel className="p-5 sm:p-6">
            <AIChat />
          </PremiumPanel>
          <DashboardPatternSummary />
        </div>
      </section>

      <section className="mt-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-white">Timeline and forward awareness</h2>
          <p className="mt-2 text-sm text-white/60">
            Track what has happened and see timing guidance for what may be coming next.
          </p>
          <div className="mt-6">
            <DashboardTimeline />
          </div>
        </PremiumPanel>
      </section>
    </AppShell>
  )
}
