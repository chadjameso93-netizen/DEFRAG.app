import AppShell from "@/components/layout/AppShell"

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[#EAEAEA]">Privacy</h1>
          <p className="mt-1 text-sm text-[#9A9A9A]">How Defrag handles profile data, relationship records, event logs, and generated guidance.</p>
        </div>

        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6 sm:p-8">
          <div className="space-y-6 text-sm leading-7 text-[#9A9A9A]">
            <section>
              <h2 className="text-lg font-medium text-[#EAEAEA]">What we store</h2>
              <p className="mt-2">
                Defrag stores account details, profile inputs, relationship records, timeline events, and generated guidance needed to operate the platform experience.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#EAEAEA]">How data is used</h2>
              <p className="mt-2">
                Data is used to render dashboards, personalize guidance, support simulations, and improve product reliability and support workflows.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#EAEAEA]">Your control</h2>
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
