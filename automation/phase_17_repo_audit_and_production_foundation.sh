#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p automation/_audit
mkdir -p apps/web/public
mkdir -p apps/web/src/app
mkdir -p apps/web/src/components/marketing
mkdir -p apps/web/src/components/ui

printf "DEFRAG PRODUCTION AUDIT\n" > automation/_audit/production_gap_report.txt
printf "Generated: %s\n\n" "$(date)" >> automation/_audit/production_gap_report.txt

check_path() {
  if [ -e "$1" ]; then
    printf "[OK] %s\n" "$1" >> automation/_audit/production_gap_report.txt
  else
    printf "[MISSING] %s\n" "$1" >> automation/_audit/production_gap_report.txt
  fi
}

check_path "apps/web/src/app/page.tsx"
check_path "apps/web/src/app/dashboard/page.tsx"
check_path "apps/web/src/app/relationships/page.tsx"
check_path "apps/web/src/app/timeline/page.tsx"
check_path "apps/web/src/app/simulations/page.tsx"
check_path "apps/web/src/app/pricing/page.tsx"
check_path "apps/web/src/app/settings/page.tsx"
check_path "apps/web/src/app/login/page.tsx"
check_path "apps/web/src/app/signup/page.tsx"
check_path "apps/web/src/app/onboarding/page.tsx"
check_path "apps/web/src/app/api/auth/login/route.ts"
check_path "apps/web/src/app/api/auth/signup/route.ts"
check_path "apps/web/src/app/api/billing/create-checkout/route.ts"
check_path "apps/web/src/app/api/insight/route.ts"
check_path "apps/web/src/app/api/simulate/route.ts"
check_path "apps/web/src/app/api/profile/route.ts"
check_path "apps/web/src/app/api/relationships/route.ts"
check_path "apps/web/src/app/api/events/route.ts"
check_path "apps/web/src/app/api/subscription/route.ts"
check_path "apps/web/src/lib/supabase/client.ts"
check_path "apps/web/src/lib/supabase/server.ts"
check_path "apps/web/src/lib/supabase/admin.ts"
check_path "apps/web/public/manifest.json"
check_path "apps/web/vercel.json"
check_path "infra"
check_path "docs"
check_path "docker-compose.yml"

printf "\nENV FILES\n" >> automation/_audit/production_gap_report.txt
if [ -f ".env.example" ]; then
  sed -n '1,220p' .env.example >> automation/_audit/production_gap_report.txt
else
  printf "[MISSING] .env.example\n" >> automation/_audit/production_gap_report.txt
fi

cat > apps/web/public/manifest.json <<'JSON'
{
  "name": "Defrag",
  "short_name": "Defrag",
  "description": "Relational intelligence platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#09090b",
  "theme_color": "#09090b",
  "icons": []
}
JSON

cat > apps/web/src/components/marketing/PremiumFooter.tsx <<'TSX'
import Link from "next/link"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function PremiumFooter() {
  return (
    <PremiumPanel className="px-6 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-white/45">Defrag</p>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Relational intelligence platform for relationship mapping, timeline awareness, simulations, and practical guidance.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-white/60">
          <Link href="/pricing" className="transition hover:text-white">Pricing</Link>
          <Link href="/login" className="transition hover:text-white">Login</Link>
          <Link href="/signup" className="transition hover:text-white">Start trial</Link>
          <Link href="/dashboard" className="transition hover:text-white">Dashboard</Link>
        </div>
      </div>
    </PremiumPanel>
  )
}
TSX

cat > apps/web/src/app/layout.tsx <<'TSX'
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Defrag",
  description: "Relational intelligence platform",
  applicationName: "Defrag",
  manifest: "/manifest.json"
}

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#09090b] text-white">
      <body className="min-h-screen bg-[#09090b] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
TSX

python3 - <<'PY'
from pathlib import Path

p = Path("apps/web/src/components/marketing/HeroLanding.tsx")
if p.exists():
    txt = p.read_text()
    if 'PremiumFooter' not in txt:
        txt = txt.replace(
            'import PremiumPanel from "@/components/ui/PremiumPanel"',
            'import PremiumPanel from "@/components/ui/PremiumPanel"\nimport PremiumFooter from "@/components/marketing/PremiumFooter"'
        )
        txt = txt.replace(
            "      </div>\n    </main>",
            "        <PremiumFooter />\n      </div>\n    </main>"
        )
        p.write_text(txt)

g = Path("apps/web/src/app/globals.css")
if g.exists():
    css = g.read_text()
    if "html, body" not in css:
        css += """

html, body {
  background: #09090b !important;
  color: white;
}

* {
  -webkit-tap-highlight-color: transparent;
}

input, textarea, select {
  color: white;
}
"""
        g.write_text(css)
PY

printf "\nNEXT APP FILES\n" >> automation/_audit/production_gap_report.txt
find apps/web/src/app -maxdepth 3 -type f | sort >> automation/_audit/production_gap_report.txt

printf "\nCOMPONENT FILES\n" >> automation/_audit/production_gap_report.txt
find apps/web/src/components -maxdepth 3 -type f | sort >> automation/_audit/production_gap_report.txt

printf "\nDONE\n" >> automation/_audit/production_gap_report.txt
echo "phase_17_repo_audit_and_production_foundation.sh completed"
