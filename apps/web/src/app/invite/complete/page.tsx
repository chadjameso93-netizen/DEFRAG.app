import Link from "next/link"

export default function InviteCompletePage({
  searchParams,
}: {
  searchParams: { name?: string }
}) {
  const name = searchParams.name || "your invite"

  return (
    <main className="min-h-screen bg-[#09090b] px-3 py-6 text-white sm:px-4 lg:px-6">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-white/42">Invite complete</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">Thank you. Intake submitted for {name}.</h1>
        <p className="mt-4 text-sm leading-7 text-white/60">
          Your details are now available in the relationship flow so the initiating dashboard can continue with better context.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-[#f3ece3]"
          >
            Return to main page
          </Link>
          <Link
            href="/support"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/72 transition hover:bg-white/10 hover:text-white"
          >
            Contact support
          </Link>
        </div>
      </div>
    </main>
  )
}
