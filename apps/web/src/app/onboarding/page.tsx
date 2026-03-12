import AppShell from "@/components/layout/AppShell"
import ProfileSetupForm from "@/components/onboarding/ProfileSetupForm"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function OnboardingPage() {
  return (
    <AppShell
      title="Profile setup"
      subtitle="Add the details Defrag uses to personalize your dashboard, timeline interpretation, and platform guidance."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <PremiumPanel className="p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Onboarding</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Build your starting profile</h2>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Defrag uses your profile details to create a more accurate starting view of timing, relationship patterns, and personalized guidance.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Why we ask</p>
              <p className="mt-2 text-sm leading-6 text-white/65">This helps Defrag create a stronger baseline for timing layers, insight, and pattern recognition.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">You stay in control</p>
              <p className="mt-2 text-sm leading-6 text-white/65">You can refine your profile later as your use of the platform expands.</p>
            </div>
          </div>
        </PremiumPanel>

        <div className="max-w-2xl">
          <ProfileSetupForm />
        </div>
      </div>
    </AppShell>
  )
}
