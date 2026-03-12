import Link from "next/link"

export default function PremiumFooter() {
  return (
    <footer className="mt-8">
      <div className="rounded-[28px] border border-white/70 bg-white/82 px-6 py-6 shadow-[0_24px_100px_rgba(15,23,42,0.10),0_2px_8px_rgba(15,23,42,0.04)] backdrop-blur-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-zinc-500">Defrag</p>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Premium relational intelligence for healthier communication and better outcomes.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
            <Link href="/pricing" className="hover:text-zinc-950">Pricing</Link>
            <Link href="/login" className="hover:text-zinc-950">Login</Link>
            <Link href="/signup" className="hover:text-zinc-950">Start trial</Link>
            <Link href="/dashboard" className="hover:text-zinc-950">Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
