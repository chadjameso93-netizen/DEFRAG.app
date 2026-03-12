#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/app/{privacy,terms,support}
mkdir -p apps/web/src/components/marketing

cat > apps/web/src/components/marketing/PremiumFooter.tsx <<'TSX'
import Link from "next/link"
import GlowCard from "@/components/ui/GlowCard"

export default function PremiumFooter() {
  return (
    <GlowCard className="px-6 py-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-white/45">Defrag</p>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Relational intelligence platform for relationship mapping, timeline awareness, simulations, and practical guidance.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/60 sm:grid-cols-3">
          <Link href="/pricing" className="transition hover:text-white">Pricing</Link>
          <Link href="/login" className="transition hover:text-white">Login</Link>
          <Link href="/signup" className="transition hover:text-white">Start trial</Link>
          <Link href="/dashboard" className="transition hover:text-white">Dashboard</Link>
          <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
          <Link href="/terms" className="transition hover:text-white">Terms</Link>
          <Link href="/support" className="transition hover:text-white">Support</Link>
        </div>
      </div>
    </GlowCard>
  )
}
TSX

cat > apps/web/src/app/privacy/page.tsx <<'TSX'
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
TSX

cat > apps/web/src/app/terms/page.tsx <<'TSX'
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
TSX

cat > apps/web/src/app/support/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import GlowCard from "@/components/ui/GlowCard"

export default function SupportPage() {
  return (
    <AppShell
      title="Support"
      subtitle="Get help with onboarding, account access, billing, or product questions."
    >
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Account</p>
          <h3 className="mt-4 text-lg font-medium text-white">Access and login</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Use this path for login issues, account recovery, and onboarding questions.
          </p>
        </GlowCard>

        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Billing</p>
          <h3 className="mt-4 text-lg font-medium text-white">Plans and subscriptions</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Use this path for checkout, plan access, renewals, or future billing controls.
          </p>
        </GlowCard>

        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Product</p>
          <h3 className="mt-4 text-lg font-medium text-white">Using Defrag well</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Use this path for relationship mapping, timeline logging, simulations, and guidance questions.
          </p>
        </GlowCard>
      </div>
    </AppShell>
  )
}
TSX

echo "phase_23_launch_readiness_pages.sh completed"
