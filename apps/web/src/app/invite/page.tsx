import AppShell from "@/components/layout/AppShell"
import InviteForm from "@/components/invite/InviteForm"
import InviteList from "@/components/invite/InviteList"
import PremiumPanel from "@/components/ui/PremiumPanel"
import { listInvites } from "@/lib/data/inviteRepository"

export default async function InvitePage() {
  const invites = await listInvites()

  return (
    <AppShell
      title="Invite people"
      subtitle="Add other people to the system, send them a simple intake page, and track whether their details have come back."
    >
      <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr] xl:gap-6">
        <InviteForm />

        <PremiumPanel className="p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Invite status</p>
          <h3 className="mt-4 text-lg font-medium text-white">People currently in the intake flow</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Use this view to see whether a person was added manually, invited by email, or invited by SMS.
          </p>
          <div className="mt-6">
            <InviteList invites={invites} />
          </div>
        </PremiumPanel>
      </div>
    </AppShell>
  )
}
