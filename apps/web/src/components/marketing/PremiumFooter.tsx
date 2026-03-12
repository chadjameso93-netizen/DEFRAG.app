import Link from "next/link"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function PremiumFooter() {
  return (
    <PremiumPanel className="px-6 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-white/45">Defrag</p>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Relational intelligence platform for relationship mapping, timeline awareness, simulations, and practical guidance.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-white/60">
          <Link href="/pricing" className="transition hover:text-white">Pricing</Link>
          <Link href="/login" className="transition hover:text-white">Login</Link>
          <Link href="/signup" className="transition hover:text-white">Start trial</Link>
          <Link href="/dashboard" className="transition hover:text-white">Dashboard</Link>
        </div>
      </div>
    </PremiumPanel>
  )
}
