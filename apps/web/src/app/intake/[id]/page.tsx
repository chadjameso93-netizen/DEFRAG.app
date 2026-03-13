import { notFound } from "next/navigation"
import IntakeForm from "@/components/intake/IntakeForm"
import { getInvite } from "@/lib/data/mockDb"

export default async function IntakePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invite = getInvite(id)

  if (!invite) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#09090b] px-3 py-6 text-white sm:px-4 lg:px-6">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-white/42">Defrag intake</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">Complete your intake for {invite.name}</h1>
          <p className="mt-4 text-sm leading-7 text-white/60">
            This page collects your name, birth date, birth time, and birth location so the initiating dashboard can place you correctly in the relationship system.
          </p>
          <div className="mt-8 space-y-3">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/68">
              Relationship: <span className="font-medium text-white">{invite.relationship}</span>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/68">
              Delivery: <span className="font-medium capitalize text-white">{invite.deliveryMethod}</span>
            </div>
          </div>
        </div>

        <IntakeForm inviteId={invite.id} inviteName={invite.name} />
      </div>
    </main>
  )
}
