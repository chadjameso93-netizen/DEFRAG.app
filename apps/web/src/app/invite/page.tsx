import { redirect } from "next/navigation"
import AppShell from "@/components/layout/AppShell"
import InviteForm from "@/components/invite/InviteForm"
import InviteList from "@/components/invite/InviteList"
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
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[#EAEAEA]">Invite people</h1>
          <p className="mt-1 text-sm text-[#9A9A9A]">Add other people to the system, send them a simple intake page, and track whether their details have come back.</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr] xl:gap-6">
          <InviteForm />

          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Invite status</p>
            <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">People currently in the intake flow</h3>
            <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
              Use this view to see whether a person was added manually, invited by email, or invited by SMS.
            </p>
            <div className="mt-6">
              {storageError ? <p className="text-sm text-red-400">{storageError}</p> : <InviteList invites={invites} />}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
