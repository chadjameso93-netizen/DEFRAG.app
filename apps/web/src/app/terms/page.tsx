import AppShell from "@/components/layout/AppShell"

export default function TermsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[#EAEAEA]">Terms</h1>
          <p className="mt-1 text-sm text-[#9A9A9A]">Basic usage terms for the Defrag platform.</p>
        </div>

        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6 sm:p-8">
          <div className="space-y-6 text-sm leading-7 text-[#9A9A9A]">
            <section>
              <h2 className="text-lg font-medium text-[#EAEAEA]">Platform purpose</h2>
              <p className="mt-2">
                Defrag is a relational intelligence platform designed to help users organize relationship information, track events, and review guidance before making decisions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#EAEAEA]">Account use</h2>
              <p className="mt-2">
                Users are responsible for maintaining access to their account and for using the platform in lawful, non-abusive ways.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#EAEAEA]">Service changes</h2>
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
