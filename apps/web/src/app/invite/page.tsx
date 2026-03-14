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
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Invite people</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Add other people to the system, send them a simple intake page, and track whether their details have come back.</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr] xl:gap-6">
          <InviteForm />

          <div className="glass-surface-light p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Invite status</p>
            <h3 className="mt-4 text-lg font-medium text-[var(--text-primary)]">People currently in the intake flow</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
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
