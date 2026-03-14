import Link from "next/link"
import GlowCard from "@/components/ui/GlowCard"

export default function PremiumFooter() {
  return (
    <GlowCard className="px-6 py-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[var(--text-muted)]">Defrag</p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
            Relational intelligence platform for relationship mapping, timeline awareness, simulations, and practical guidance.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[var(--text-secondary)] sm:grid-cols-3">
          <Link href="/why" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Why Defrag</Link>
          <Link href="/about" className="transition-colors duration-300 hover:text-[var(--text-primary)]">About</Link>
          <Link href="/principles" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Principles</Link>
          <Link href="/pricing" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Pricing</Link>
          <Link href="/login" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Login</Link>
          <Link href="/signup" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Start trial</Link>
          <Link href="/privacy" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Privacy</Link>
          <Link href="/terms" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Terms</Link>
        </div>
      </div>
    </GlowCard>
  )
}
