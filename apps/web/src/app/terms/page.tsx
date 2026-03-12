import AppShell from "@/components/layout/AppShell"
import GlowCard from "@/components/ui/GlowCard"

export default function TermsPage() {
  return (
    <AppShell
      title="Terms"
      subtitle="Basic usage terms for the Defrag platform."
    >
      <GlowCard className="p-6 sm:p-8">
        <div className="space-y-6 text-sm leading-7 text-white/65">
          <section>
            <h2 className="text-lg font-medium text-white">Platform purpose</h2>
            <p className="mt-2">
              Defrag is a relational intelligence platform designed to help users organize relationship information, track events, and review guidance before making decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white">Account use</h2>
            <p className="mt-2">
              Users are responsible for maintaining access to their account and for using the platform in lawful, non-abusive ways.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white">Service changes</h2>
            <p className="mt-2">
              Features, pricing, and plan limits may change as the product matures toward full public launch readiness.
            </p>
          </section>
        </div>
      </GlowCard>
    </AppShell>
  )
}
