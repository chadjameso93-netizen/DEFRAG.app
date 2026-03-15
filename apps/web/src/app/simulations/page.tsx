import { Panel } from "@/components/ui/Panel";
import AppShell from "@/components/layout/AppShell"
import SimulationPanel from "@/components/sim/SimulationPanel"

export default function SimulationsPage() {
  return (
    <AppShell>
      <div className="animate-[page-enter_0.5s_ease_both] space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[#EAEAEA]">Simulations</h1>
          <p className="mt-1 text-sm text-[#9A9A9A]">Use scenario testing to compare possible approaches before the next conversation happens.</p>
        </div>

        <div className="grid gap-[40px] lg:grid-cols-3">
          <Panel>
            <div className="flex flex-col gap-[16px]">
              <div className="text-[14px] font-semibold uppercase tracking-wider text-[#9A9A9A]">Purpose</div>
              <h3 className="text-[24px] font-medium text-[#EAEAEA]">Prepare before acting</h3>
              <p className="text-[16px] leading-[1.6] text-[#9A9A9A] font-light">
                Simulations help you compare options when you are deciding how to respond inside a live relationship pattern.
              </p>
            </div>
          </Panel>
          <Panel>
            <div className="flex flex-col gap-[16px]">
              <div className="text-[14px] font-semibold uppercase tracking-wider text-[#9A9A9A]">Use</div>
              <h3 className="text-[24px] font-medium text-[#EAEAEA]">Test different approaches</h3>
              <p className="text-[16px] leading-[1.6] text-[#9A9A9A] font-light">
                Compare direct confrontation, calm boundaries, or waiting, then use the result to sharpen your judgment.
              </p>
            </div>
          </Panel>
          <Panel>
            <div className="flex flex-col gap-[16px]">
              <div className="text-[14px] font-semibold uppercase tracking-wider text-[#9A9A9A]">Outcome</div>
              <h3 className="text-[24px] font-medium text-[#EAEAEA]">Make the next move with more clarity</h3>
              <p className="text-[16px] leading-[1.6] text-[#9A9A9A] font-light">
                The goal is not certainty. The goal is a more informed, less reactive decision.
              </p>
            </div>
          </Panel>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5 sm:p-6">
            <SimulationPanel />
          </div>

          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#555555]">How to use this</p>
            <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">Use simulations as preparation, not prediction.</h3>
            <p className="mt-4 font-serif-accent text-sm leading-7 text-[#9A9A9A]">
              This page helps you think through likely outcomes so your next step is more intentional, measured, and aligned with what the platform is showing.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
