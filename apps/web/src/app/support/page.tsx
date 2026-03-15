import AppShell from "@/components/layout/AppShell"

export default function SupportPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[#EAEAEA]">Support</h1>
          <p className="mt-1 text-sm text-[#9A9A9A]">Get help with onboarding, account access, billing, or product questions.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Account</p>
            <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">Access and login</h3>
            <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
              Use this path for login issues, account recovery, and onboarding questions.
            </p>
          </div>

          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Billing</p>
            <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">Plans and subscriptions</h3>
            <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
              Use this path for checkout, plan access, renewals, or future billing controls.
            </p>
          </div>

          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Product</p>
            <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">Using Defrag well</h3>
            <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
              Use this path for relationship mapping, timeline logging, simulations, and guidance questions.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
