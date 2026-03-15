export default function SettingsPanel() {
  return (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6 shadow-sm">
      <h2 className="text-lg font-medium text-[#EAEAEA]">Account settings</h2>
      <p className="mt-2 text-sm leading-6 text-[#9A9A9A]">Manage profile details, access, and account preferences.</p>
      <div className="mt-6 grid gap-4">
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4">
          <p className="text-sm font-medium text-[#EAEAEA]">Password recovery</p>
          <p className="mt-2 text-sm text-[#9A9A9A]">Use the login screen if you need to reset your password.</p>
        </div>
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4">
          <p className="text-sm font-medium text-[#EAEAEA]">Notifications</p>
          <p className="mt-2 text-sm text-[#9A9A9A]">Daily insight and account notifications will appear here later.</p>
        </div>
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4">
          <p className="text-sm font-medium text-[#EAEAEA]">Subscription</p>
          <p className="mt-2 text-sm text-[#9A9A9A]">Manage your access plan from the pricing page.</p>
        </div>
      </div>
    </div>
  )
}
