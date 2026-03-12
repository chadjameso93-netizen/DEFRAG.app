import AppShell from "@/components/layout/AppShell"
import GlowCard from "@/components/ui/GlowCard"

export default function PrivacyPage() {
  return (
    <AppShell
      title="Privacy"
      subtitle="How Defrag handles profile data, relationship records, event logs, and generated guidance."
    >
      <GlowCard className="p-6 sm:p-8">
        <div className="space-y-6 text-sm leading-7 text-white/65">
          <section>
            <h2 className="text-lg font-medium text-white">What we store</h2>
            <p className="mt-2">
              Defrag stores account details, profile inputs, relationship records, timeline events, and generated guidance needed to operate the platform experience.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white">How data is used</h2>
            <p className="mt-2">
              Data is used to render dashboards, personalize guidance, support simulations, and improve product reliability and support workflows.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white">Your control</h2>
            <p className="mt-2">
              You can update profile information, manage account settings, and request support for account-related questions through the support page.
            </p>
          </section>
        </div>
      </GlowCard>
    </AppShell>
  )
}
