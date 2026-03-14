import AppShell from "@/components/layout/AppShell"

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-zinc-50">Privacy</h1>
          <p className="mt-1 text-sm text-zinc-400">How Defrag handles profile data, relationship records, event logs, and generated guidance.</p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
          <div className="space-y-6 text-sm leading-7 text-zinc-400">
            <section>
              <h2 className="text-lg font-medium text-zinc-100">What we store</h2>
              <p className="mt-2">
                Defrag stores account details, profile inputs, relationship records, timeline events, and generated guidance needed to operate the platform experience.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-zinc-100">How data is used</h2>
              <p className="mt-2">
                Data is used to render dashboards, personalize guidance, support simulations, and improve product reliability and support workflows.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-zinc-100">Your control</h2>
              <p className="mt-2">
                You can update profile information, manage account settings, and request support for account-related questions through the support page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
