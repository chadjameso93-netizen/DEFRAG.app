import Link from "next/link"

export default async function InviteCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>
}) {
  const { name } = await searchParams
  const personName = name || "your invite"

  return (
    <main className="min-h-screen bg-[var(--surface-0)] px-3 py-6 text-white sm:px-4 lg:px-6">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/[0.06] bg-white/[0.04] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-white/42">Invite complete</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">Thank you. Intake submitted for {personName}.</h1>
        <p className="mt-4 text-sm leading-7 text-white/60">
          Your details are now available in the relationship flow so the initiating dashboard can continue with better context.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-2xl bg-[var(--text-primary)] px-4 py-2 text-sm font-medium text-[var(--surface-0)] shadow-[0_0_20px_rgba(245,245,240,0.04)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,245,240,0.08)]"
          >
            Return to main page
          </Link>
          <Link
            href="/support"
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/72 transition hover:bg-white/[0.06]"
          >
            Contact support
          </Link>
        </div>
      </div>
    </main>
  )
}
