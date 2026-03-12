import AppShell from "@/components/layout/AppShell"
import Surface from "@/components/ui/Surface"

export default function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Manage profile details, access, and account preferences.">
      <Surface className="max-w-3xl p-6">
        <h2 className="text-lg font-medium text-zinc-950">Account settings</h2>
        <p className="mt-2 text-sm text-zinc-600">Manage profile details, access, and future notification preferences.</p>
      </Surface>
    </AppShell>
  )
}
