#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/app
mkdir -p apps/web/public

cat > apps/web/src/app/robots.ts <<'TS'
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "/sitemap.xml",
  }
}
TS

cat > apps/web/src/app/sitemap.ts <<'TS'
import type { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/pricing",
    "/login",
    "/signup",
    "/dashboard",
    "/relationships",
    "/timeline",
    "/simulations",
    "/settings",
    "/onboarding",
    "/privacy",
    "/terms",
    "/support",
    "/status",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
TS

cat > apps/web/public/site.webmanifest <<'JSON'
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

python3 - <<'PY'
from pathlib import Path
p = Path("apps/web/src/app/layout.tsx")
text = p.read_text()

text = text.replace('manifest: "/manifest.json"', 'manifest: "/site.webmanifest"')
if 'metadataBase:' not in text:
    text = text.replace(
        'export const metadata: Metadata = {\n',
        'export const metadata: Metadata = {\n  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),\n'
    )
if 'openGraph:' not in text:
    text = text.replace(
        '  description: "Relational intelligence platform",\n',
        '  description: "Relational intelligence platform",\n  openGraph: {\n    title: "Defrag",\n    description: "Relational intelligence platform",\n    url: "/",\n    siteName: "Defrag",\n    type: "website",\n  },\n  twitter: {\n    card: "summary_large_image",\n    title: "Defrag",\n    description: "Relational intelligence platform",\n  },\n'
    )
p.write_text(text)
PY

echo "phase_25_launch_bundle.sh completed"
