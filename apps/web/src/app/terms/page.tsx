import AppShell from "@/components/layout/AppShell"

export default function TermsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-zinc-50">Terms</h1>
          <p className="mt-1 text-sm text-zinc-400">Basic usage terms for the Defrag platform.</p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
          <div className="space-y-6 text-sm leading-7 text-zinc-400">
            <section>
              <h2 className="text-lg font-medium text-zinc-100">Platform purpose</h2>
              <p className="mt-2">
                Defrag is a relational intelligence platform designed to help users organize relationship information, track events, and review guidance before making decisions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-zinc-100">Account use</h2>
              <p className="mt-2">
                Users are responsible for maintaining access to their account and for using the platform in lawful, non-abusive ways.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-zinc-100">Service changes</h2>
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
