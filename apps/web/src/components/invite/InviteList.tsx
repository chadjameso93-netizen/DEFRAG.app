type InviteItem = {
  id: string
  name: string
  relationship: string
  deliveryMethod: string
  status: string
  created_at: string
  intake?: {
    fullName?: string
  }
}

export default function InviteList({ invites }: { invites: InviteItem[] }) {
  return (
    <div className="space-y-3">
      {invites.map((invite) => (
        <div key={invite.id} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-white">{invite.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">
                {invite.relationship} via {invite.deliveryMethod}
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium text-white/70">
              {invite.status}
            </div>
          </div>
          <p className="mt-3 text-sm text-white/62">
            Created {new Date(invite.created_at).toLocaleString()}
            {invite.intake?.fullName ? ` • Intake completed by ${invite.intake.fullName}` : ""}
          </p>
        </div>
      ))}
    </div>
  )
}
