import { Panel } from "@/components/ui/Panel";
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function GuidanceSummary() {
  return (
    <Panel className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#EAEAEA]/40">Guidance summary</p>
      <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">What the system suggests right now</h3>
      <div className="mt-5 space-y-4 text-sm leading-7 text-[#EAEAEA]/64">
        <p>
          The current pattern looks more responsive to steadiness than urgency. Keep the next move narrow, clear, and easy to follow.
        </p>
        <p>
          Review the most recent timeline entries before starting a new conversation. The sequence suggests that timing may matter more than wording.
        </p>
      </div>

      <div className="mt-6 grid gap-3">
        <div className="rounded-[24px] border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#EAEAEA]/40">Best next step</p>
          <p className="mt-2 text-sm text-[#EAEAEA]/78">Use a short check-in instead of a full processing conversation.</p>
        </div>
        <div className="rounded-[24px] border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#EAEAEA]/40">Support surface</p>
          <p className="mt-2 text-sm text-[#EAEAEA]/78">Open AI for wording support after you review the map and timeline.</p>
        </div>
      </div>

      <Link
        href="/app"
        className="mt-6 inline-flex items-center gap-2 rounded-[8px] bg-[#EAEAEA] px-4 py-2 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none"
      >
        Open workspace
        <ArrowRight size={16} />
      </Link>
    </Panel>
  )
}
