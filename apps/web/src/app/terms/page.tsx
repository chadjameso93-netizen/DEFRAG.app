import AppShell from "@/components/layout/AppShell"

export default function TermsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Terms</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Basic usage terms for the Defrag platform.</p>
        </div>

        <div className="glass-surface-light p-6 sm:p-8">
          <div className="space-y-6 text-sm leading-7 text-[var(--text-secondary)]">
            <section>
              <h2 className="text-lg font-medium text-[var(--text-primary)]">Platform purpose</h2>
              <p className="mt-2">
                Defrag is a relational intelligence platform designed to help users organize relationship information, track events, and review guidance before making decisions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--text-primary)]">Account use</h2>
              <p className="mt-2">
                Users are responsible for maintaining access to their account and for using the platform in lawful, non-abusive ways.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--text-primary)]">Service changes</h2>
              <p className="mt-2">
                Features, pricing, and plan limits may change as the product matures toward full public launch readiness.
              </p>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
