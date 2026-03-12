import AppShell from "@/components/layout/AppShell"
import ProfileSetupForm from "@/components/onboarding/ProfileSetupForm"

export default function OnboardingPage() {
  return (
    <AppShell
      title="Profile setup"
      subtitle="Add the basics so Defrag can personalize insight and build your first relationship system."
    >
      <div className="max-w-2xl">
        <ProfileSetupForm />
      </div>
    </AppShell>
  )
}
