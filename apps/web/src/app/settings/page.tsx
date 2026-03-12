import AppShell from "@/components/layout/AppShell"
import SettingsPanels from "@/components/settings/SettingsPanels"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      subtitle="Manage profile details, access, and account preferences."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Account management</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">Control access, profile details, and future subscription settings.</h3>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            Your profile, billing status, and future account preferences will be managed here.
          </p>
        </div>
      </PremiumPanel>

      <SettingsPanels />
    </AppShell>
  )
}
