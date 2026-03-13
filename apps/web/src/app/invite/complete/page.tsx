import Link from "next/link"
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function InviteCompletePage() {
  return (
    <AppShell title="Invite complete" subtitle="This invite response has been recorded.">
      <PremiumPanel className="p-6 sm:p-8">
        <p className="text-sm leading-7 text-white/70">
          Thank you. Your details were submitted successfully. You can close this page or return to the dashboard.
        </p>
        <div className="mt-5">
          <Link href="/dashboard" className="text-sm text-white underline">
            Go to dashboard
          </Link>
        </div>
      </PremiumPanel>
    </AppShell>
  )
}
