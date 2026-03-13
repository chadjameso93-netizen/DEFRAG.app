import Link from "next/link"
import { ArrowRight } from "lucide-react"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function GuidanceSummary() {
  return (
    <PremiumPanel className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Guidance summary</p>
      <h3 className="mt-4 text-lg font-medium text-white">What the system suggests right now</h3>
      <div className="mt-5 space-y-4 text-sm leading-7 text-white/64">
        <p>
          The current pattern looks more responsive to steadiness than urgency. Keep the next move narrow, clear, and easy to follow.
        </p>
        <p>
          Review the most recent timeline entries before starting a new conversation. The sequence suggests that timing may matter more than wording.
        </p>
      </div>

      <div className="mt-6 grid gap-3">
        <div className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Best next step</p>
          <p className="mt-2 text-sm text-white/78">Use a short check-in instead of a full processing conversation.</p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Support surface</p>
          <p className="mt-2 text-sm text-white/78">Open AI for wording support after you review the map and timeline.</p>
        </div>
      </div>

      <Link
        href="/ai"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-[#f3ece3]"
      >
        Open Defrag AI
        <ArrowRight size={16} />
      </Link>
    </PremiumPanel>
  )
}
