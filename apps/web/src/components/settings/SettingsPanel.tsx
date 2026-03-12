export default function SettingsPanel() {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-medium text-zinc-950">Account settings</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">Manage profile details, access, and account preferences.</p>
      <div className="mt-6 grid gap-4">
        <div className="rounded-2xl border border-zinc-200 p-4">
          <p className="text-sm font-medium text-zinc-950">Password recovery</p>
          <p className="mt-2 text-sm text-zinc-600">Use the login screen if you need to reset your password.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-4">
          <p className="text-sm font-medium text-zinc-950">Notifications</p>
          <p className="mt-2 text-sm text-zinc-600">Daily insight and account notifications will appear here later.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-4">
          <p className="text-sm font-medium text-zinc-950">Subscription</p>
          <p className="mt-2 text-sm text-zinc-600">Manage your access plan from the pricing page.</p>
        </div>
      </div>
    </div>
  )
}
