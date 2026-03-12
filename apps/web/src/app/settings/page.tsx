import AppShell from "@/components/layout/AppShell"
import SettingsPanel from "@/components/settings/SettingsPanel"

export default function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Control profile information, access, and future notification preferences.">
      <div className="max-w-3xl"><SettingsPanel /></div>
    </AppShell>
  )
}
