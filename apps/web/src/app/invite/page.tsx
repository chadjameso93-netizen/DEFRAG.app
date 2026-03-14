import { redirect } from "next/navigation"
import AppShell from "@/components/layout/AppShell"
import InviteForm from "@/components/invite/InviteForm"
import InviteList from "@/components/invite/InviteList"
import PremiumPanel from "@/components/ui/PremiumPanel"
import { listInvites } from "@/lib/data/inviteRepository"
import type { InviteRecord } from "@/lib/data/mockDb"
import { getSupabaseServer } from "@/lib/auth/session"

export default async function InvitePage() {
  const supabase = await getSupabaseServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user?.id) {
    redirect("/login")
  }

  let invites: InviteRecord[] = []
  let storageError = ""

  try {
    invites = await listInvites(session.user.id)
  } catch {
    storageError = "Invite storage is unavailable right now. Please try again."
  }

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
            {storageError ? <p className="text-sm text-rose-300">{storageError}</p> : <InviteList invites={invites} />}
          </div>
        </PremiumPanel>
      </div>
    </AppShell>
  )
}
