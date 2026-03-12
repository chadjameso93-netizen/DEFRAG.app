import AppShell from "@/components/layout/AppShell"
import SettingsPanels from "@/components/settings/SettingsPanels"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      subtitle="Manage your profile, account access, and subscription details from one organized place."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Account management</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Control the details that shape how Defrag works for you.
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Update your account details, review subscription status, and manage the settings connected to your platform access.
          </p>
        </div>
      </PremiumPanel>

      <SettingsPanels />
    </AppShell>
  )
}
