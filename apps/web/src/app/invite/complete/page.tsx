import Link from "next/link"

export default async function InviteCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>
}) {
  const { name } = await searchParams
  const personName = name || "your invite"

  return (
    <main className="min-h-screen bg-[#000000] px-3 py-6 text-[#EAEAEA] sm:px-4 lg:px-6">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#555555]">Invite complete</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#EAEAEA]">Thank you. Intake submitted for {personName}.</h1>
        <p className="mt-4 text-sm leading-7 text-[#9A9A9A]">
          Your details are now available in the relationship flow so the initiating dashboard can continue with better context.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-[8px] bg-[#EAEAEA] px-4 py-2 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none"
          >
            Return to main page
          </Link>
          <Link
            href="/support"
            className="rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-2 text-sm font-medium text-[#EAEAEA] transition hover:bg-[#1F1F1F]"
          >
            Contact support
          </Link>
        </div>
      </div>
    </main>
  )
}
