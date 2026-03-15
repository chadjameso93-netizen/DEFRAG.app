import { Panel } from "@/components/ui/Panel";
import Link from "next/link"

export default function PremiumFooter() {
  return (
    <Panel className="px-6 py-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#555555]">Defrag</p>
          <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
            Relational intelligence platform for relationship mapping, timeline awareness, simulations, and practical guidance.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[#9A9A9A] sm:grid-cols-3">
          <Link href="/why" className="transition-colors duration-300 hover:text-[#EAEAEA]">Why Defrag</Link>
          <Link href="/about" className="transition-colors duration-300 hover:text-[#EAEAEA]">About</Link>
          <Link href="/principles" className="transition-colors duration-300 hover:text-[#EAEAEA]">Principles</Link>
          <Link href="/pricing" className="transition-colors duration-300 hover:text-[#EAEAEA]">Pricing</Link>
          <Link href="/login" className="transition-colors duration-300 hover:text-[#EAEAEA]">Login</Link>
          <Link href="/signup" className="transition-colors duration-300 hover:text-[#EAEAEA]">Start trial</Link>
          <Link href="/privacy" className="transition-colors duration-300 hover:text-[#EAEAEA]">Privacy</Link>
          <Link href="/terms" className="transition-colors duration-300 hover:text-[#EAEAEA]">Terms</Link>
        </div>
      </div>
    </Panel>
  )
}
