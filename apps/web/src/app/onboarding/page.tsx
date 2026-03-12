import AppShell from "@/components/layout/AppShell"
import FlowIntro from "@/components/flow/FlowIntro"
import ProfileSetupForm from "@/components/onboarding/ProfileSetupForm"

export default function OnboardingPage() {
  return (
    <AppShell title="Profile setup" subtitle="Add the basics so Defrag can personalize insight and build your first system map.">
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <FlowIntro eyebrow="Onboarding" title="Build your starting profile" body="Birth details help Defrag build optional timing layers and more personalized insight. You can refine this later." />
        <div className="max-w-2xl">
          <ProfileSetupForm />
        </div>
      </div>
    </AppShell>
  )
}
