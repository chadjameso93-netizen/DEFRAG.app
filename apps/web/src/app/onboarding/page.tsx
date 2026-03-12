import AppShell from "@/components/layout/AppShell"
import ProfileSetupForm from "@/components/onboarding/ProfileSetupForm"
import GlassPanel from "@/components/ui/GlassPanel"

export default function OnboardingPage() {
  return (
    <AppShell
      title="Profile setup"
      subtitle="Add the basics so Defrag can personalize insight and build your first system map."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel className="p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Onboarding</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">Build your starting profile</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            Birth details help Defrag build optional timing layers and more personalized insight. You can refine this later.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Why we ask</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">This helps create a more accurate baseline for insight, timing, and relationship patterns.</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">You stay in control</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">You can update, expand, or refine your profile later from settings.</p>
            </div>
          </div>
        </GlassPanel>

        <div className="max-w-2xl">
          <ProfileSetupForm />
        </div>
      </div>
    </AppShell>
  )
}
