import Link from "next/link"
import IntakeForm from "@/components/intake/IntakeForm"
import { getInviteById, markInviteOpened } from "@/lib/data/inviteRepository"
import { getOptionalAuthenticatedUserId } from "@/lib/auth/routeUser"

export default async function IntakePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let invite
  try {
    invite = await getInviteById(id)
  } catch {
    return (
      <main className="min-h-screen bg-[#000000] px-3 py-6 text-[#EAEAEA] sm:px-4 lg:px-6">
        <div className="mx-auto max-w-3xl rounded-[16px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#555555]">Invite intake</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#EAEAEA]">Invite storage is unavailable.</h1>
          <p className="mt-4 text-sm leading-7 text-[#9A9A9A]">
            Please try again shortly. If the issue persists, contact support.
          </p>
          <Link
            href="/support"
            className="mt-6 inline-flex rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-2 text-sm font-medium text-[#EAEAEA] transition hover:bg-[#111111]"
          >
            Contact support
          </Link>
        </div>
      </main>
    )
  }

  if (!invite) {
    return (
      <main className="min-h-screen bg-[#000000] px-3 py-6 text-[#EAEAEA] sm:px-4 lg:px-6">
        <div className="mx-auto max-w-3xl rounded-[16px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#555555]">Invite intake</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#EAEAEA]">This invite link is not available.</h1>
          <p className="mt-4 text-sm leading-7 text-[#9A9A9A]">
            The link may be invalid or no longer active. Please request a new invite from the person who shared it.
          </p>
          <Link
            href="/support"
            className="mt-6 inline-flex rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-2 text-sm font-medium text-[#EAEAEA] transition hover:bg-[#111111]"
          >
            Contact support
          </Link>
        </div>
      </main>
    )
  }

  const actorUserId = await getOptionalAuthenticatedUserId()
  await markInviteOpened(id, actorUserId)

  if (invite.status === "completed") {
    return (
      <main className="min-h-screen bg-[#000000] px-3 py-6 text-[#EAEAEA] sm:px-4 lg:px-6">
        <div className="mx-auto max-w-3xl rounded-[16px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#555555]">Invite intake</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#EAEAEA]">This intake is already complete.</h1>
          <p className="mt-4 text-sm leading-7 text-[#9A9A9A]">
            Your details are already in the relationship flow. You can close this page.
          </p>
          <Link
            href={`/invite/complete?name=${encodeURIComponent(invite.name)}`}
            className="mt-6 inline-flex rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-2 text-sm font-medium text-[#EAEAEA] transition hover:bg-[#111111]"
          >
            Open completion page
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#000000] px-3 py-6 text-[#EAEAEA] sm:px-4 lg:px-6">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[16px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#555555]">Defrag intake</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#EAEAEA]">Complete your intake for {invite.name}</h1>
          <p className="mt-4 text-sm leading-7 text-[#9A9A9A]">
            This page collects your name, birth date, birth time, and birth location so the initiating dashboard can place you correctly in the relationship system.
          </p>
          <div className="mt-8 space-y-3">
            <div className="rounded-[12px] border border-[#1F1F1F] bg-[#000000] p-4 text-sm text-[#9A9A9A]">
              Relationship: <span className="font-medium text-[#EAEAEA]">{invite.relationship}</span>
            </div>
            <div className="rounded-[12px] border border-[#1F1F1F] bg-[#000000] p-4 text-sm text-[#9A9A9A]">
              Delivery: <span className="font-medium capitalize text-[#EAEAEA]">{invite.deliveryMethod}</span>
            </div>
          </div>
        </div>

        <IntakeForm inviteId={invite.id} inviteName={invite.name} />
      </div>
    </main>
  )
}
