import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      subtitle="Manage profile details, access, and account preferences."
    >
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <PremiumPanel className="p-6">
          <h3 className="text-lg font-medium text-zinc-950">Account</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-600">Manage email, password recovery, and account access.</p>
        </PremiumPanel>

        <PremiumPanel className="p-6">
          <h3 className="text-lg font-medium text-zinc-950">Subscription</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-600">View current plan and future billing actions.</p>
        </PremiumPanel>
      </div>
    </AppShell>
  )
}
