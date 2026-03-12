import Link from "next/link"
import GlowCard from "@/components/ui/GlowCard"

export default function PremiumFooter() {
  return (
    <GlowCard className="px-6 py-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-white/45">Defrag</p>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Relational intelligence platform for relationship mapping, timeline awareness, simulations, and practical guidance.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/60 sm:grid-cols-3">
          <Link href="/pricing" className="transition hover:text-white">Pricing</Link>
          <Link href="/login" className="transition hover:text-white">Login</Link>
          <Link href="/signup" className="transition hover:text-white">Start trial</Link>
          <Link href="/dashboard" className="transition hover:text-white">Dashboard</Link>
          <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
          <Link href="/terms" className="transition hover:text-white">Terms</Link>
          <Link href="/support" className="transition hover:text-white">Support</Link>
        </div>
      </div>
    </GlowCard>
  )
}
