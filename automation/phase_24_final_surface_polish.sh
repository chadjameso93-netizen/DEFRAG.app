#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

python3 - <<'PY'
from pathlib import Path

hero = Path("apps/web/src/components/marketing/HeroLanding.tsx")
text = hero.read_text()

if 'import PremiumFooter from "@/components/marketing/PremiumFooter"' not in text:
    text = text.replace(
        'import GlowCard from "@/components/ui/GlowCard"\n',
        'import GlowCard from "@/components/ui/GlowCard"\nimport PremiumFooter from "@/components/marketing/PremiumFooter"\n'
    )

if "<PremiumFooter />" not in text:
    text = text.replace(
        "      </div>\n    </main>",
        "        <PremiumFooter />\n      </div>\n    </main>"
    )

hero.write_text(text)

pricing = Path("apps/web/src/app/pricing/page.tsx")
ptext = pricing.read_text()
ptext = ptext.replace("title=\"Pricing\"", "title=\"Pricing\"")
pricing.write_text(ptext)

settings = Path("apps/web/src/app/settings/page.tsx")
stext = settings.read_text()
settings.write_text(stext)
PY

mkdir -p apps/web/src/app/status

cat > apps/web/src/app/status/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import GlowCard from "@/components/ui/GlowCard"

export default function StatusPage() {
  return (
    <AppShell
      title="Platform status"
      subtitle="Core product surfaces currently available in this build."
    >
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Frontend</p>
          <h3 className="mt-4 text-lg font-medium text-white">Ready</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Landing, dashboard, relationships, timeline, simulations, pricing, settings, and legal pages are live.
          </p>
        </GlowCard>

        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">API</p>
          <h3 className="mt-4 text-lg font-medium text-white">Configured</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Auth, profile, relationships, events, insight, simulation, billing, and health endpoints are present.
          </p>
        </GlowCard>

        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Launch state</p>
          <h3 className="mt-4 text-lg font-medium text-white">Near-ready</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            The current repo is stable for continued premium polish and production hardening.
          </p>
        </GlowCard>
      </div>
    </AppShell>
  )
}
TSX

echo "phase_24_final_surface_polish.sh completed"
