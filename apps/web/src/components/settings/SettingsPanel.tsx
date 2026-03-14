export default function SettingsPanel() {
  return (
    <div className="glass-surface-light p-6 shadow-sm">
      <h2 className="text-lg font-medium text-[var(--text-primary)]">Account settings</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">Manage profile details, access, and account preferences.</p>
      <div className="mt-6 grid gap-4">
        <div className="glass-surface-light p-4">
          <p className="text-sm font-medium text-[var(--text-primary)]">Password recovery</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Use the login screen if you need to reset your password.</p>
        </div>
        <div className="glass-surface-light p-4">
          <p className="text-sm font-medium text-[var(--text-primary)]">Notifications</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Daily insight and account notifications will appear here later.</p>
        </div>
        <div className="glass-surface-light p-4">
          <p className="text-sm font-medium text-[var(--text-primary)]">Subscription</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Manage your access plan from the pricing page.</p>
        </div>
      </div>
    </div>
  )
}
